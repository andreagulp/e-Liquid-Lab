import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MenuItem from "material-ui/MenuItem";
import InvertColor from "material-ui/svg-icons/action/invert-colors";

import { toggleTheme } from "../../actions/theme_actions";

class ToggleTheme extends Component {
  changeTheme = e => {
    e.preventDefault();
    let newStatus = !this.props.theme;
    this.props.toggleTheme(newStatus);
  };

  render() {
    return (
      <div onClick={this.changeTheme}>
        <MenuItem
          primaryText="Switch Theme"
          leftIcon={<InvertColor />}
          onClick={this.props.handleClose}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { theme: state.theme };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleTheme }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleTheme);
