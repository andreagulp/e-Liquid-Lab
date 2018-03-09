import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Row, Col } from 'react-flexbox-grid';
import { Rating } from 'material-ui-rating'
import Avatar from 'material-ui/Avatar';
// import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom'
import CircularProgress from 'material-ui/CircularProgress';
import moment from 'moment'

class RecipesList extends Component {
  constructor(props) {
    super(props)
    this.state = {newRating: 0}
  }

  render () {
    if(!this.props.recipes) {
      return <CircularProgress size={80} thickness={5} />
    }

    let recipes = this.props.recipes
    return (
      <Row>
        {recipes.map(recipe => {
          return (
            <Col xs={12} sm={6} md={6} lg={4} key={recipe._id}>
              <Card style={{margin: "10px 0 10px 0"}}>
                <CardHeader
                  title={recipe.name}
                  style={{height: "100px"}}
                  subtitle={
                    <div>
                      <Rating
                        value={recipe.rating}
                        max={5}
                        readOnly={true}
                        itemStyle={{width:"20px", height:"20px"}}
                        itemIconStyle={{width:"20px", height:"20px"}}
                      />
                      {recipe.recipeFlavors.map(flavor => {
                        return (
                          <Avatar key={flavor._id} src={flavor.iconUrl} style={{width: 30, height: 30}}/>
                        )
                      })}
                    </div>
                  }
                  actAsExpander={false}
                  showExpandableButton={true}
                />
                <CardActions style={{textAlign: "right"}}>
                  <Link to={`/recipes/${recipe._id}`} style={{textDecoration: "none"}}>
                    <FlatButton
                      label="OPEN"
                      primary={true}
                    />
                  </Link>
                  <Link to={`/recipes/fork/${recipe._id}`} style={{textDecoration: "none"}}>
                    <FlatButton
                      label="FORK"
                      labelPosition="before"
                      labelStyle={{color:'green'}}
                      icon={<i className="fa fa-code-fork" aria-hidden="true" style={{color: "green"}} />}
                    />
                  </Link>
                </CardActions>
                <Divider />
                <CardText expandable={true}>
                  <div style={{fontSize: "10px"}}>
                    created: {moment(recipe.creationDate).format('DD MMM YYYY')}
                  </div>
                  <div style={{fontSize: "10px"}}>
                    {recipe.updateDate ? `updated: ${moment(recipe.updateDate).format('DD MMM YYYY')}` : <div></div>}
                  </div>
                  <Row>
                    <Col xs={6} sm={6} md={6} lg={6}>
                      <div>
                        <h4>{`${recipe.baseVg} VG / ${recipe.basePg}PG`}</h4>
                      </div>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                      <div>
                        <h4 style={{textAlign: 'right'}}>{`${recipe.desiredNicoStrength} mg nicotine`}</h4>
                      </div>
                    </Col>
                  </Row>

                </CardText>
              </Card>
            </Col>
          )
        })}
      </Row>
    )
  }
};

export default RecipesList;
