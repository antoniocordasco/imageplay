import React, { Component } from 'react';
import logo from './logo.svg';
import FormComponent from './Form';
import MergedImage from './MergedImage';
import { Cookies } from 'react-cookie';
import './App.css';

class App extends Component {
  render() {

    var cookies = new Cookies();
    var imagePath = 'http://localhost:5000/assets/merged/' + cookies.get('newImageFilename');

    return (
      <div className="App">
        <header className="App-header">
        </header>

        <FormComponent path="/"/>
        <MergedImage path="/result" imagePath={imagePath} />

      </div>
    );
  }
}

export default App;
