import React, { Component } from 'react';
import Slider from 'material-ui-slider-label/Slider';
import { cyan500 } from 'material-ui/styles/colors';
import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import RecipeFormChart from '../commons/RecipeFormChart';

class RecipeFormBaseNico extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    if (!this.props) {
      return (
        <CircularProgress size={60} thickness={7} />
      )
    }

    const styles = {
      subheader: {
        textTransform: 'capitalize',
        textAlign: 'start'
      },
      labelStyleOuter: {
        width: '30px',
        height: '30px',
        borderRadius: '50% 50% 50% 0',
        background: cyan500,
        position: 'absolute',
        transform: 'rotate(-45deg)',
        top: '-40px',
        left: '-9px',
      },
      labelStyleInner: {
        transform: 'rotate(45deg)',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        top: '10px',
        right: '0px',
        fontSize: '10px',
      },
    };

    if (!this.state.open) {
      return (
        <div onClick={this.handleOpen}>
          <h3>Nicotine</h3>
          <RecipeFormChart
            vg={this.props.nicoVg}
            pg={this.props.nicoPg}
            centralLabelValue={this.props.desiredNicoStrength}
            centralLabelText="mg"
          />
        </div>
      )
    }

    return (
      <Dialog
        title="Add Nicotine to Recipe"
        modal={true}
        open={this.state.open}
        contentStyle={{ height: '98%', maxHeight: '98%', width: '80%', maxWidth: '98%' }}
        autoScrollBodyContent={true}
      >
        <div style={{ marginBottom: "60px" }}>
          <h3>Nicotine</h3>
          <Row>
            <Subheader style={styles.subheader}>
              <h3>Desired Nico Strenght</h3>
            </Subheader>
            <Col xs={9} sm={9} md={9} lg={9}>
              <Slider
                min={0}
                max={20}
                step={0.5}
                value={this.props.desiredNicoStrength}
                onChange={this.props.onDesiredNicoStrengthChange}
                label={
                  <div style={styles.labelStyleOuter}>
                    <div style={styles.labelStyleInner}>
                      {this.props.desiredNicoStrength}%
                  </div>
                  </div>
                }
              />
            </Col>
            <Col xs={3} sm={3} md={3} lg={3}>
              <TextField
                name="desiredNicoStrength"
                type="number"
                hintText="desiredNicoStrength"
                onChange={this.props.onDesiredNicoStrengthChange}
                value={this.props.desiredNicoStrength}
                fullWidth={true}
              />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Subheader style={styles.subheader}>
              <h3>Base Nico Strenght</h3>
            </Subheader>
            <Col xs={8} sm={8} md={8} lg={8}>
              <Slider
                min={0}
                max={20}
                step={0.5}
                value={this.props.nicoStrength}
                onChange={this.props.onNicoStrengthChange}
                label={
                  <div style={styles.labelStyleOuter}>
                    <div style={styles.labelStyleInner}>
                      {this.props.nicoStrength}%
                  </div>
                  </div>
                }
              />
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <TextField
                name="nicoStrength"
                type="number"
                hintText="nicoStrength"
                onChange={this.props.onNicoStrengthChange}
                value={this.props.nicoStrength}
                fullWidth={true}
              />
            </Col>
          </Row>

          <Row>
            <Subheader style={styles.subheader}>
              <h3>Base Nico VG/PG</h3>
            </Subheader>
            <Col xs={8} sm={8} md={8} lg={8}>
              <Slider
                min={0}
                max={100}
                step={1}
                value={this.props.nicoVg}
                onChange={this.props.onNicoVgChange}
                label={
                  <div style={styles.labelStyleOuter}>
                    <div style={styles.labelStyleInner}>
                      {this.props.nicoVg}VG
                  </div>
                  </div>
                }
              />
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <Row>

                <Col xs={6} sm={6} md={6} lg={6}>
                  <TextField
                    name="nicoVg"
                    type="number"
                    hintText="nicoVg"
                    onChange={this.props.onNicoVgChange}
                    value={this.props.nicoVg}
                    fullWidth={true}
                  />
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <TextField
                    name="nicoPg"
                    type="number"
                    hintText="nicoPg"
                    onChange={this.props.onNicoPgChange}
                    value={this.props.nicoPg}
                    fullWidth={true}
                  />
                </Col>

              </Row>
            </Col>
          </Row>
          <Row end="xs" style={{ marginTop: "80px", marginBottom: "40px" }}>
            <FlatButton
              label='UPDATE'
              primary={true}
              onClick={this.handleClose}
            />
          </Row>
        </div>
      </Dialog>
    )
  }
};

export default RecipeFormBaseNico
