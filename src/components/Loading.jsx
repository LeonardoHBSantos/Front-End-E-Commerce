import { Component } from 'react';
import styles from './Loading.module.css';

class Loading extends Component {
  render() {
    return (
      <div className={ styles.loading }>
        <div className={ styles.lds_ellipsis }>
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
