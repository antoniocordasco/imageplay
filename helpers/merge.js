const Jimp = require('jimp');

module.exports = (src, dst, cb) => {
  if (!(src instanceof Jimp) || !(src instanceof Jimp))
    return throwError.call(
      this,
      'The source and destination must be Jimp images',
      cb
    );

  if (
    dst.bitmap.width != src.bitmap.width ||
    dst.bitmap.height != src.bitmap.height
  ) {
    return throwError.call(
      this,
      'The source and destination have different sizes',
      cb
    );
  }

  var that = dst;
  src.scan(0, 0, src.bitmap.width, src.bitmap.height, function(sx, sy, idx) {
    that.bitmap.data[idx + 0] =
      (that.bitmap.data[idx + 0] + this.bitmap.data[idx + 0]) / 2;
    that.bitmap.data[idx + 1] =
      (that.bitmap.data[idx + 1] + this.bitmap.data[idx + 1]) / 2;
    that.bitmap.data[idx + 2] =
      (that.bitmap.data[idx + 2] + this.bitmap.data[idx + 2]) / 2;
    that.bitmap.data[idx + 3] =
      (that.bitmap.data[idx + 3] + this.bitmap.data[idx + 3]) / 2;
  });

  if ('function' === typeof cb) {
    return cb.call(this, null, this);
  } else return dst;
};
