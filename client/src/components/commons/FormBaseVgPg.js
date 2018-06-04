import React, { Component } from 'react';
import Slider from 'material-ui-slider-label/Slider';
import { cyan500 } from 'material-ui/styles/colors';
import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

import RecipeFormChart from '../commons/RecipeFormChart';

class FormBaseVgPg extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editing: false
    }
  }

  clickToEdit = () => {
    if (this.state.editing) {
      this.setState({ editing: false })
    } else { this.setState({ editing: true }) }
  }

  render() {
    if (!this.props) {
      return (
        <CircularProgress size={60} thickness={7} />
      )
    }

    const styles = {
      subheader: {
        textTransform: 'capitalize',
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
      controllerBox: {
        minHeight: '400px',
        // height: '400px',
        // clear: 'both',
        // alignText: 'center',
        // top: '-30px',
        // position: 'static',
        // overflow: 'hidden',
        // display: 'block',
        // margin: 'auto',
        // display: 'block',
        // width: '90%',
        // margin: 'auto',
      }
    };

    if (!this.state.editing) {
      return (
        <div onClick={this.clickToEdit} style={styles.controllerBox} >
          <h3>VG/PG</h3>
          <RecipeFormChart
            vg={this.props.baseVg}
            pg={this.props.basePg}
            centralLabelValue={this.props.chartValue}
            centralLabelText={this.props.chartLabel}
          />
        </div>
      )
    }

    return (
      <div onMouseLeave={this.clickToEdit} style={styles.controllerBox}>
        <h3>VG/PG</h3>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Slider
              min={0}
              max={100}
              step={1}
              value={this.props.baseVg}
              onChange={this.props.onBaseVgChange}
              label={
                <div style={styles.labelStyleOuter}>
                  <div style={styles.labelStyleInner}>
                    {this.props.baseVg}VG
                </div>
                </div>
              }
            />
          </Col>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <TextField
                name="baseVg"
                type="number"
                hintText="baseVg"
                onChange={this.props.onBaseVgChange}
                value={this.props.baseVg}
                fullWidth={true}
              />
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <TextField
                name="basePg"
                type="number"
                hintText="basePg"
                onChange={this.props.onBasePgChange}
                value={this.props.basePg}
                fullWidth={true}
              />
            </Col>
          </Row>

        </Row>
      </div>
    )
  }
};

export default FormBaseVgPg
