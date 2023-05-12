import { Component } from 'react';
import './Loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <div className="lds-ellipsis">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}

export default Loading;
