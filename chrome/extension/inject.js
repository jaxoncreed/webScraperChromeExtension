import React, { Component } from 'react';
import { render } from 'react-dom';
import Dock from 'react-dock';

class InjectApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      selectingPage: false
    };
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 81 && event.ctrlKey) {
        // Toggle the panel
        this.setState({ isVisible: !this.state.isVisible });
      } else if (event.keyCode === 87 && event.ctrlKey) {
        // Toggle Selecting
        this.setState({ selectingPage: !this.state.selectingPage });
      }
    });
  }

  buttonOnClick = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    return (
      <div>
        <Dock
          position="right"
          defaultSize={0.4}
          dimMode="none"
          isVisible={this.state.isVisible}
        >
          <iframe
            style={{
              width: '100%',
              height: '100%',
            }}
            frameBorder={0}
            allowTransparency="true"
            src={chrome.extension.getURL(`inject.html?protocol=${location.protocol}`)}
          />
        </Dock>
      </div>
    );
  }
}

window.addEventListener('load', () => {
  const injectDOM = document.createElement('div');
  injectDOM.className = 'inject-react-example';
  injectDOM.style.textAlign = 'center';
  document.body.appendChild(injectDOM);
  render(<InjectApp />, injectDOM);
});
