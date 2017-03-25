// @flow
import React, { Component } from 'react';
import WebSockets from 'ws';

let wss = null;

export default class ControlInputs extends Component {

  constructor(props) {
    super(props);

    this.state = {
      host: 'ws://raspberrypi.locals:8081',
      port: 8081
    };


    this.connect = this.connect.bind(this);
    this.save = this.save.bind(this);
    this.moveForward = this.moveForward.bind(this);
    this.moveBackward = this.moveBackward.bind(this);
    this.rotateLeft = this.rotateLeft.bind(this);
    this.rotateRight = this.rotateRight.bind(this);
    this.releaseMotor = this.releaseMotor.bind(this);
    this.handelKeyPress = this.handelKeyPress.bind(this);

  }

  handelKeyPress(event) {
    const {key} = event;
    console.log(key);
  }

  connect() {

    const {host} = this.state;
    console.log(host);
    this.wss = new WebSocket(host);
    console.log(this.wss);
    this.wss.onopen = () => {
      console.log('online');
      this.wss.send('hello world');
    };

    this.wss.onclose = () => {
      console.log('lost connection');
    };
  }

  moveForward() {
    this.wss.send('forward');
  }

  moveBackward () {
    this.wss.send('backward');
  }

  rotateLeft() {
    this.wss.send('rotate-left');
  }

  rotateRight() {
    this.wss.send('rotate-right');
  }

  releaseMotor() {
    this.wss.send('release');
  }

  save() {
    const {host} = this.refs;
    this.setState({host});
  }

  render() {
    const {host} = this.state;
    return (
      <div className="control-system">
        <input ref="host" defaultValue={host} /> <button onClick={this.save}>Save</button>
        <hr />
        <button onClick={this.connect}>Connect</button> <button onClick={this.releaseMotor}>Stop</button>
        <div className="controls">
          <div className="ctr-btn" onMouseDown={this.moveForward} onKeyDown={this.moveForward} onMouseUp={this.releaseMotor} onKeyUp={this.releaseMotor}><i className="fa fa-arrow-up" aria-hidden="true"></i></div>
          <br />
          <div className="ctr-btn" onMouseDown={this.rotateLeft} onKeyDown={this.rotateLeft} onMouseUp={this.releaseMotor} onKeyUp={this.releaseMotor}><i className="fa fa-undo" aria-hidden="true"></i></div>
          <div className="ctr-btn" onMouseDown={this.moveBackward} onKeyDown={this.moveBackward} onMouseUp={this.releaseMotor} onKeyUp={this.releaseMotor}><i className="fa fa-arrow-down" aria-hidden="true"></i></div>
          <div className="ctr-btn" onMouseDown={this.rotateRight} onKeyDown={this.rotateRight} onMouseUp={this.releaseMotor} onKeyUp={this.releaseMotor}><i className="fa fa-repeat" aria-hidden="true"></i></div>
        </div>
      </div>
    );
  }
}
