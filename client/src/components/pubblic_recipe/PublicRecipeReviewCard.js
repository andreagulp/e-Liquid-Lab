import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import moment from 'moment'

class PublicRecipeReviewCard extends Component {

    render() {
        const { review } = this.props
        return (
            <div>
                <Card style={{ boxShadow: 'white' }} >
                    <CardHeader
                        title={review._user.name}
                        subtitle={moment(review.creationDate).format('DD MMM YYYY')}
                        avatar={review._user.photo}
                    />

                    <CardText>
                        {review.text}
                    </CardText>
                </Card>
                <Divider />
            </div>
        )
    }
};

export default PublicRecipeReviewCard