import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux'
import { Row, Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {blue500, greenA200} from 'material-ui/styles/colors';

import {recipeProductionMetrics, recipeProductionByMonth} from '../../reducers';
import RecipeProductionChart from './RecipeProductionChart';

class ProductionListSummary extends Component {

  render () {

    const recipeMetrics = this.props.recipeProductionMetrics
    const recipeProductionByMonth = this.props.recipeProductionByMonth

    return (
      <Paper zDepth={1} style={{marginTop: "10px"}}>
        <Row>
          <Col xs={12} sm={4} md={4} lg={4}>
            <List>
              <ListItem
                leftAvatar={<Avatar color={blue500} icon={<i className="fa fa-flask" aria-hidden="true" />} />}
                primaryText="Total ml Produced"
                secondaryText={`${recipeMetrics.totalMlProduced} ml`}
              />
              <ListItem
                leftAvatar={<Avatar color={greenA200} icon={<i className="fa fa-industry" aria-hidden="true" />} />}
                primaryText="Total number of batches"
                secondaryText={`${recipeMetrics.countProductionBatches}`}
              />
            </List>
          </Col>
          <Col xs={12} sm={8} md={8} lg={8}>
            {
              recipeProductionByMonth[0] ?
                <RecipeProductionChart
                  recipeProductionByMonth={recipeProductionByMonth}
                /> :
                <div></div>
            }
          </Col>
        </Row>
      </Paper>

    )
  }
};

const mapStateToProps = (state) => {return {
  recipes: state.recipes,
  recipeProductionMetrics: recipeProductionMetrics(state),
  recipeProductionByMonth: recipeProductionByMonth(state),
}}

export default connect(mapStateToProps, null)(ProductionListSummary);
