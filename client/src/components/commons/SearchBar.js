import React, { Component } from "react";
import "./SearchBar.css";

class SearchBar extends Component {
  render() {
    const { handleFieldChange, keyword } = this.props;

    return (
      <div id="search">
        <input type="text" value={keyword} onChange={handleFieldChange} />
      </div>
    );
  }
}

export default SearchBar;
