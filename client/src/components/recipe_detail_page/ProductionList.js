import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import { Row, Col } from 'react-flexbox-grid';
import CircularProgress from 'material-ui/CircularProgress';
import moment from 'moment'

class ProductionList extends Component {

  render() {
    if (!this.props.recipes.selectedRecipe.production) {
      return (
        <CircularProgress size={60} thickness={7} />
      )
    }
    const selectedRecipeProduction = this.props.recipes.selectedRecipe.production

    return (
      <Row>

        {selectedRecipeProduction.map(prodBatch => {
          return (
            <Col xs={12} sm={12} md={12} lg={12} key={prodBatch._id}>
              <Card style={{ margin: "10px 0 10px 0" }}>
                <CardHeader
                  title={prodBatch._id}
                  style={{ height: "100px" }}
                  subtitle={
                    <div>
                      <span>production date: {moment(prodBatch.productionDate).format('DD MMM YYYY')}</span>
                      <p>ml produced: {prodBatch.mlProduced}</p>
                    </div>
                  }
                  actAsExpander={false}
                  showExpandableButton={true}
                />

                <Divider />
                <CardText expandable={true}>
                  <h5>Comments</h5>
                  <p>{prodBatch.comment}</p>
                </CardText>
              </Card>
            </Col>
          )
        })}
      </Row>
    )
  }
};

const mapStateToProps = (state) => { return { recipes: state.recipes } }

export default connect(mapStateToProps, null)(ProductionList);
