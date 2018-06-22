import React, { Component } from "react";

class HelpPage extends Component {
  render() {
    return (
      <div style={{ margin: "0 1px 0 1px", textAlign: "center" }}>
        <a
          href="https://github.com/andreagulp/e-Liquid-Lab/issues/new"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <h4>Click here to Report a bug</h4>
        </a>
      </div>
    );
  }
}

export default HelpPage;
