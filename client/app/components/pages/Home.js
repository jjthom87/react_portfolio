import React, {Component} from 'react';

import {HomeStyles} from './../../styles/Home.js';
import AllNav from './../navs/All_Nav';

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <AllNav/>
        <div className="text-center center-block">
          <img src="./images/jared.png"/><img style={HomeStyles.port_image} src="./images/port_pic.png"/><br></br>
        </div>
      </div>
    );
  }
};
