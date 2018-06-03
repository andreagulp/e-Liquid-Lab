import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col } from 'react-flexbox-grid';
import { Rating } from 'material-ui-rating'
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo';
import TextField from 'material-ui/TextField';
import moment from 'moment'

import { fetchSingleFlavor, deleteFlavor, updateFlavor, updateFlavorField } from '../../actions/flavors_action';
import FlavorImage from './FlavorImage';


class FlavorFormCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addImgOpen: false
    }
  }

  handleFieldChange = (e) => { this.props.updateFlavorField(e.target.value, e.target.name) }
  handleRatingChange = (value) => { this.props.updateFlavorField(parseInt(value, 10), 'rating') }

  openAddImageDialog = () => { this.setState({ addImgOpen: true }) }
  closeAddImageDialog = () => { this.setState({ addImgOpen: false }) }

  render() {
    if (!this.props.user) {
      return <div>...loading</div>
    }

    const { selectedFlavor, user } = this.props
    const addImg = 'https://extension.ucsd.edu/UCSDExtension/media/UCSDExtensionsMedia/placeholder.png'

    return (
      <Row style={{ marginTop: "20px" }}>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Card>
            <CardHeader
              title={user.name || selectedFlavor._user.userName}
              subtitle={`created on ${moment(selectedFlavor.creationDate).format('DD MMM YYYY')}` || `Today`}
              avatar={user.photo || selectedFlavor._user.userPhoto}
            />

            <CardMedia
              overlay={
                <CardTitle
                  title={selectedFlavor.name}
                  subtitle={selectedFlavor.brand}
                />
              }
            >
              {
                selectedFlavor.iconUrl ?
                  <img src={selectedFlavor.iconUrl} alt={selectedFlavor.name} onClick={this.openAddImageDialog} /> :
                  <img src={addImg} alt="CLICK TO ADD IMG" onClick={this.openAddImageDialog} />
              }

            </CardMedia>
            <FloatingActionButton
              style={{ margin: "-25px 10px 0 0", float: "right" }}
              onClick={this.openAddImageDialog}
              mini={true}
            >
              <AddAPhoto />
            </FloatingActionButton>
            <CardText>
              <span style={{ fontFamily: 'Roboto' }}>Rating:</span>
              <Rating
                max={5}
                readOnly={false}
                itemStyle={{ width: "30px", height: "30px" }}
                itemIconStyle={{ width: "30px", height: "30px" }}
                onChange={this.handleRatingChange}
                value={selectedFlavor.rating}
              />
            </CardText>
            <CardText>
              <TextField
                name="comment"
                hintText="Flavor Profile"
                floatingLabelText="Flavor Profile"
                fullWidth={true}
                multiLine={true}
                rows={4}
                rowsMax={175}
                onChange={this.handleFieldChange}
                value={selectedFlavor.comment}
              />
            </CardText>
          </Card>
        </Col>
        <Dialog
          title="Add Image to Flavor"
          modal={true}
          open={this.state.addImgOpen}
          contentStyle={{ height: '98%', maxHeight: '98%', width: '80%', maxWidth: '98%' }}
          autoScrollBodyContent={true}
        >
          <FlavorImage
            selectedFlavor={selectedFlavor}
            closeAddImageDialog={this.closeAddImageDialog}
          />
        </Dialog>
      </Row>
    )
  }
};

const mapStateToProps = (state) => { return { flavors: state.flavors, user: state.user } }
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchSingleFlavor, deleteFlavor, updateFlavor, updateFlavorField }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FlavorFormCard)
