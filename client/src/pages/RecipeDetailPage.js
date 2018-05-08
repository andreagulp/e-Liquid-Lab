import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import {Tabs, Tab} from 'material-ui/Tabs';

import RecipeForm from '../components/recipe_form/RecipeForm';
import ProductionList from '../components/recipe_detail_page/ProductionList';
import ProductionListSummary from '../components/recipe_detail_page/ProductionListSummary';

class RecipeDetailPage extends Component {


  render () {

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Tabs style={{marginTop: "10px"}}>
            <Tab
              label="DESIGN"
              style={{backgroundColor: "#673AB7"}}
            >
              <Col xs={12} sm={12} md={12} lg={12}>
                <RecipeForm
                  mode="UPDATE"
                  history={this.props.history}
                  recipeid={this.props.match.params.recipeid}
                />
              </Col>
            </Tab>
            <Tab
              label="PRODUCE"
              style={{backgroundColor: "#673AB7"}}
            >
              <ProductionListSummary />
              <ProductionList />
            </Tab>
            <Tab
              label="STEEP"
                style={{backgroundColor: "#673AB7"}}
              >
              </Tab>
            </Tabs>
          </Col>
        </Row>
    )
  }
};

export default RecipeDetailPage;
