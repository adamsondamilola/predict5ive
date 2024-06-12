import React, { Component } from 'react';
const loader = require("../Images/loader.gif");
export default class Loading extends Component {
    render() {
        return <center><img src={loader} style={{height: 30, width: 30}} /></center>;
      }
}
