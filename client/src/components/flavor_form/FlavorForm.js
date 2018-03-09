import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import { Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import CircularProgress from 'material-ui/CircularProgress';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';

import {addFlavor, fetchSingleFlavor, updateFlavor, deleteFlavor, updateFlavorField, cleanSelectedFlavor} from '../../actions/flavors_action';
import {BRANDS} from '../../brands_db';
import FormBaseVgPg from '../../components/commons/FormBaseVgPg';
import FormLiquidQty from '../../components/commons/FormLiquidQty';
import FlavorFormCard from './FlavorFormCard';

class FlavorForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      brands: BRANDS,
    }
  }

  componentDidMount = () => {
    if(this.props.mode === 'EDIT' && this.props.flavorid) {
      this.props.fetchSingleFlavor(this.props.flavorid)
    }
  }

  handleFieldChange = (e) => {this.props.updateFlavorField(e.target.value, e.target.name)}

  handleExpirationAlertChange = (e) => {
    const selectedFlavor = this.props.flavors.selectedFlavor
    this.props.updateFlavorField(!selectedFlavor.expirationDateAlertActive, 'expirationDateAlertActive')
  }

  handleMinQtyAlertChange = (e) => {
    const selectedFlavor = this.props.flavors.selectedFlavor
    this.props.updateFlavorField(!selectedFlavor.minQtyAlertActive, 'minQtyAlertActive')
  }

  handleBrandChange = (value) => {this.props.updateFlavorField(value, 'brand')}

  handleQtyChange = (event, value) => {this.props.updateFlavorField(parseInt(value, 10), 'qty')}
  handleMinQtyChange = (event, value) => {this.props.updateFlavorField(parseInt(value, 10), 'minQtyAlert')}

  handleExpirationDateChange = (event, date) => {this.props.updateFlavorField(date, 'expirationDate')}

  handleBaseVgChange = (event, value) => {Promise.resolve(this.props.updateFlavorField(parseInt(value, 10), 'baseVg'))
    .then(this.props.updateFlavorField(100 - value, 'basePg'))}

  handleBasePgChange = (event, value) => {Promise.resolve(this.props.updateFlavorField(parseInt(value, 10), 'basePg'))
    .then(this.props.updateFlavorField(parseInt((100 - value), 10), 'baseVg'))}

  flavorFormAction = (id) => {
    const selectedFlavor = this.props.flavors.selectedFlavor
    const user = this.props.user
    let expirationDate = selectedFlavor.expirationDate === null ? Date.now() :  selectedFlavor.expirationDate
    if(this.props.mode === 'CREATE') {                      //CREATE MODE
      let newFlavor = {
          brand: selectedFlavor.brand,
          name: selectedFlavor.name,
          iconUrl: selectedFlavor.iconUrl,
          qty: selectedFlavor.qty,
          rating: selectedFlavor.rating,
          baseVg: selectedFlavor.baseVg,
          basePg: selectedFlavor.basePg,
          comment: selectedFlavor.comment,
          storageLocation: selectedFlavor.storageLocation ,
          expirationDate: expirationDate,
          minQtyAlert: selectedFlavor.minQtyAlert,
          expirationDateAlertActive: selectedFlavor.expirationDateAlertActive,
          minQtyAlertActive: selectedFlavor.minQtyAlertActive,
          alertList: selectedFlavor.qty < selectedFlavor.minQtyAlert ? true : false,
          user: {
            userId: user.googleId,
            userName: user.name,
            userPhoto: user.photo
          }
      }
      this.props.addFlavor(newFlavor)
      this.handleCancel()
    } else {                                                //EDIT MODE
      this.props.updateFlavor(selectedFlavor._id, {...selectedFlavor, alertList: selectedFlavor.qty < selectedFlavor.minQtyAlert ? true : false})
      this.props.history.push("/flavors");
    }
  }

  deleteFlavor = () => {
    const selectedFlavor = this.props.flavors.selectedFlavor
    this.props.deleteFlavor(selectedFlavor._id, selectedFlavor._rev)
    this.props.history.push("/flavors");
  }

  handleCancel = () => {
    if(this.props.mode === 'EDIT') {
      this.props.history.push("/flavors");
      this.props.cleanSelectedFlavor()
    } else {
      this.props.handleClose()
      this.props.cleanSelectedFlavor()
    }
  }

  render () {
    if(this.props.mode === 'EDIT' && !this.props.flavors.selectedFlavor.name) {
      return (
        <CircularProgress size={60} thickness={7} />
      )
    }

    const selectedFlavor = this.props.flavors.selectedFlavor

    return (
      <form>
        <Row>
          <Col xs={12} sm={12} md={4} lg={4}>
            <FlavorFormCard
              flavorid={this.props.flavorid}
              selectedFlavor={selectedFlavor}
            />
          </Col>
          <Col xs={12} sm={12} md={8} lg={8}>
            <Row>
              <Col xs={12} sm={6} md={6} lg={6}>
                <AutoComplete
                  name="brand"
                  hintText="Enter Brand"
                  floatingLabelText="Select Brand"
                  filter={AutoComplete.fuzzyFilter}
                  dataSource={this.state.brands}
                  onUpdateInput={this.handleBrandChange}
                  searchText={selectedFlavor.brand}
                />
              </Col>
              <Col xs={12} sm={6} md={6} lg={6}>
                <TextField
                  name="name"
                  hintText="Enter flavor"
                  floatingLabelText="Enter flavor"
                  onChange={this.handleFieldChange}
                  value={selectedFlavor.name}
                />
              </Col>
            </Row>
            <Row style={{marginTop: "20px"}}>
              <Col xs={12} sm={12} md={6} lg={6}>
                <FormLiquidQty
                  mlOfLiquid={selectedFlavor.qty}
                  handleMlOfLiquidChange={this.handleQtyChange}
                  chartValue={selectedFlavor.qty}
                  chartLabel="ml"
                  title="Quantity Owned"
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <FormBaseVgPg
                  chartLabel="PG"
                  chartValue={selectedFlavor.basePg}
                  basePg={selectedFlavor.basePg}
                  baseVg={selectedFlavor.baseVg}
                  onBasePgChange={this.handleBasePgChange}
                  onBaseVgChange={this.handleBaseVgChange}
                />
              </Col>
            </Row>
            <Row style={{marginTop: "20px"}}>
              <Col xs={12} sm={12} md={12} lg={12}>
                <TextField
                  name="storageLocation"
                  hintText="Enter Storage Location"
                  floatingLabelText="Enter Storage Location"
                  onChange={this.handleFieldChange}
                  value={selectedFlavor.storageLocation}
                  fullWidth={true}
                />
              </Col>
            </Row>
            <Row style={{marginTop: "20px"}}>
              <Col xs={6} sm={6} md={6} lg={6}>
                <DatePicker
                  hintText="Set Expiration Date"
                  // mode="landscape"
                  onChange={this.handleExpirationDateChange}
                  value={new Date(selectedFlavor.expirationDate)}
                  fullWidth={true}
                />
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Toggle
                  label="OFF/ON"
                  labelPosition="right"
                  onToggle={this.handleExpirationAlertChange}
                  toggled={selectedFlavor.expirationDateAlertActive}
                />
              </Col>
            </Row>
            <Row style={{marginTop: "20px"}}>
              <Col xs={6} sm={6} md={6} lg={6}>
                <TextField
                  name="minQtyAlert"
                  type="number"
                  hintText="Enter the minimum quantity to trigger the alert"
                  onChange={this.handleMinQtyChange}
                  value={selectedFlavor.minQtyAlert}
                  fullWidth={true}
                />
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Toggle
                  label="OFF/ON"
                  labelPosition="right"
                  onToggle={this.handleMinQtyAlertChange}
                  toggled={selectedFlavor.minQtyAlertActive}
                />
              </Col>
            </Row>
            <Row end="xs" style={{marginTop: "80px", marginBottom: "40px"}}>
              <FlatButton
                label="Cancel"
                primary={false}
                onClick={this.handleCancel}
              />
              <FlatButton
                label={this.props.mode}
                primary={true}
                disabled={false}
                onClick={this.flavorFormAction}
              />
              {this.props.mode === 'EDIT' ?
                <FlatButton
                  label="Delete"
                  secondary={true}
                  disabled={false}
                  onClick={this.deleteFlavor}
                /> : <div></div>
              }
            </Row>
          </Col>
        </Row>
      </form>
    )
  }
};

const mapStateToProps = (state) => {return {flavors: state.flavors, user: state.user}}
const mapDispatchToProps  = (dispatch) => bindActionCreators({
  addFlavor,
  fetchSingleFlavor,
  deleteFlavor,
  updateFlavor,
  updateFlavorField,
  cleanSelectedFlavor,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(FlavorForm)
