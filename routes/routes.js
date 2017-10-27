const Jimp = require("jimp");
const merge = require("../helpers/merge");
const express = require("express");
const path = require("path");
const formidable = require("formidable");
const md5 = require("md5");
const _ = require("lodash");
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

module.exports = app => {
  app.post("/upload", function(req, res) {
    var form = new formidable.IncomingForm();

    form.uploadDir = path.join(global.appRoute, "/assets/uploads");

    form.on("file", function(field, file) {
      fs.readdirAsync(form.uploadDir).then(items => {
        // filtering out all the files that are not jpegs
        items = _.filter(items, function(item) {
          return [".jpg", ".png"].includes(path.extname(item));
        });

        console.log(items);

        // choosing a random image from the existing ones
        var existingImageFilename =
          items[Math.floor(Math.random() * items.length)];

        var newImage;
        var newImageFilename = md5(Date.now()) + path.extname(file.name);
        res.cookie("newImageFilename", newImageFilename);

        fs
          .renameAsync(file.path, path.join(form.uploadDir, newImageFilename))
          .then(() => {
            fs.unlink(file.path, err => {});
            return Jimp.read(form.uploadDir + "/" + newImageFilename);
          })
          .then(image => {
            console.log("resizing new image");
            newImage = image.resize(190, 190);

            console.log("writing new image");
            // we are not chaining the promise of write() here, because the image object has already been resized
            // we can write the file in parallel, we don't have to wait for it to finish before proceeding
            newImage.write(form.uploadDir + "/" + newImageFilename);

            console.log("reading new image");
            return Jimp.read(form.uploadDir + "/" + existingImageFilename);
          })
          .then(existingImage => {
            console.log("read existing image");
            merge(newImage, existingImage).write(
              path.join(global.appRoute, "/assets/merged/") + newImageFilename,
              () => {
                res.redirect("http://localhost:3000/result");
              }
            );
          });
      });
    });

    form.on("error", function(err) {
      console.log("An error has occured: \n" + err);
    });

    form.on("end", function() {});

    form.parse(req);
  });
};
