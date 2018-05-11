import React, { Component } from 'react';

import PublicRecipeReviewCard from './PublicRecipeReviewCard'

class PublicRecipeReviewList extends Component {

    render() {
        const { reviews } = this.props
        return (
            <div>
                {
                    reviews.map(review => {
                        return (
                            <PublicRecipeReviewCard
                                review={review}
                            />
                        )
                    })
                }
            </div>
        )
    }
};

export default PublicRecipeReviewList