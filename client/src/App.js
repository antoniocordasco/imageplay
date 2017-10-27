import React, { Component } from "react";
import logo from "./logo.svg";
import FormComponent from "./Form";
import MergedImage from "./MergedImage";
import { Cookies } from "react-cookie";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    var cookies = new Cookies();
    var imagePath = "/assets/merged/" + cookies.get("newImageFilename");

    const MergedImageWithPath = props => {
      return <MergedImage imagePath={imagePath} />;
    };

    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1>Welcome to Image Play</h1>
          </header>

          <div>
            <p>Please choose an image to upload</p>
            <Route exact path="/" component={FormComponent} />
            <Route exact path="/result" component={MergedImageWithPath} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
