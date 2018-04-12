import React, { Component } from 'react';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Rating } from 'material-ui-rating'
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom'

class PublicRecipeCard extends Component {
    constructor(props) {
        super(props)
        this.state = { newRating: 0 }
    }

    render() {
        let { recipe } = this.props
        return (
            <Card style={{ margin: "10px 0 10px 0" }}>
                <CardHeader
                    title={recipe.name}
                    style={{ height: "100px" }}
                    subtitle={
                        <div>
                            <Rating
                                value={recipe.rating}
                                max={5}
                                readOnly={true}
                                itemStyle={{ width: "20px", height: "20px" }}
                                itemIconStyle={{ width: "20px", height: "20px" }}
                            />
                            {recipe.recipeFlavors.map(flavor => {
                                return (
                                    <Avatar key={flavor._id} src={flavor.iconUrl} style={{ width: 30, height: 30 }} />
                                )
                            })}
                        </div>
                    }
                    actAsExpander={false}
                    showExpandableButton={false}
                />
                <CardActions style={{ textAlign: "right" }}>
                    <Link to={`/recipes/fork/${recipe._id}`} style={{ textDecoration: "none" }}>
                        <FlatButton
                            label="OPEN"
                            primary={true}
                        />
                    </Link>
                    {/* <Link to={`/recipes/fork/${recipe._id}`} style={{ textDecoration: "none" }}>
                        <FlatButton
                            label="FORK"
                            labelPosition="before"
                            labelStyle={{ color: 'green' }}
                            icon={<i className="fa fa-code-fork" aria-hidden="true" style={{ color: "green" }} />}
                        />
                    </Link> */}
                </CardActions>
                <Divider />
            </Card>
        )
    }
};

export default PublicRecipeCard