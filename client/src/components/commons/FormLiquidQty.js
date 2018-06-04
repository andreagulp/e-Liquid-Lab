import React, { Component } from 'react';
import Slider from 'material-ui-slider-label/Slider';
import { cyan500 } from 'material-ui/styles/colors';
import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';

import RecipeFormChart from '../commons/RecipeFormChart';

class FormLiquidQty extends Component {
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

        const { mlOfLiquid, handleMlOfLiquidChange, chartValue, chartLabel, title } = this.props

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
                // top: '-30px',
                // position: 'static'
                // overflow: 'hidden',
                // display: 'block',
                // margin: 'auto',
            }
        };

        if (!this.state.editing) {
            return (
                <div onClick={this.clickToEdit} style={styles.controllerBox}>
                    <h3>{title}</h3>
                    <RecipeFormChart
                        vg={chartValue}
                        centralLabelValue={chartValue}
                        centralLabelText={chartLabel}
                    />
                </div>
            )
        }

        return (
            <div onMouseLeave={this.clickToEdit} style={styles.controllerBox}>
                <h3>{title}</h3>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Slider
                            min={0}
                            max={100}
                            step={1}
                            value={mlOfLiquid}
                            onChange={handleMlOfLiquidChange}
                            label={
                                <div style={styles.labelStyleOuter}>
                                    <div style={styles.labelStyleInner}>
                                        {mlOfLiquid}ml
                                    </div>
                                </div>
                            }
                        />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <TextField
                            name="mlToProduce"
                            type="number"
                            hintText="ml To Produce"
                            onChange={handleMlOfLiquidChange}
                            value={mlOfLiquid}
                            fullWidth={true}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
};

export default FormLiquidQty
