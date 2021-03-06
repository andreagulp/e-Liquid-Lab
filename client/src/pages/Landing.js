import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import './Landing.css'
import imgBackground from '../images/color-vapor.jpg'
import RaisedButton from 'material-ui/RaisedButton';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';

class Landing extends Component {

    render() {
        return (
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <img alt="altalt" src={imgBackground} className="bg" />
                </Col>
                <div className="wrapper">
                    <div className="message">

                        <h1>eLiquid Lab</h1>
                        <p>Design, Produce and Manage your recipes and flavors.
                            Login to use the full features
                        </p>

                        <a href={process.env.REACT_APP_GOOGLE_AUTH_LOGIN} style={{ textDecoration: 'none' }}>
                            <RaisedButton
                                label="Login to access full features"
                                labelPosition="after"
                                icon={<AccountCircle />}
                                style={{ textAlign: 'center' }}
                            />
                        </a>
                    </div>
                </div>
            </Row>
        )
    }
};

export default Landing