import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Row } from 'react-flexbox-grid';

import {updateFlavorField} from '../../actions/flavors_action';

class FlavorImage extends Component {

  handleFieldChange = (e) => {this.props.updateFlavorField(e.target.value, e.target.name)}

  render () {
    const {selectedFlavor, closeAddImageDialog} = this.props

    return (
        <div>
          <Row>
            <TextField
              name="iconUrl"
              hintText="Enter Image Url"
              floatingLabelText="Enter Image Url"
              fullWidth={true}
              onChange={this.handleFieldChange}
              value={selectedFlavor.iconUrl}
            />
          </Row>
          <Row end="xs" style={{marginTop: "80px", marginBottom: "40px"}}>
            <FlatButton
              label="Cancel"
              primary={false}
              onClick={closeAddImageDialog}
            />
            <FlatButton
              label="ADD"
              primary={true}
              disabled={false}
              onClick={closeAddImageDialog}
            />
          </Row>
        </div>
    )
  }
};

const mapDispatchToProps  = (dispatch) => bindActionCreators({updateFlavorField}, dispatch)

export default connect(null, mapDispatchToProps)(FlavorImage)
