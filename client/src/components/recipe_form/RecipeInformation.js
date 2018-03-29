import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { Rating } from 'material-ui-rating'
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Link } from 'react-router-dom'
import moment from 'moment'
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

class RecipeInformation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isPrivate: true
    }
  }



  renderSubtitle = () => {
    const { selectedRecipe } = this.props
    if (selectedRecipe.isForked === 'yes') {
      return (
        <div>
          {`created on ${moment(selectedRecipe.creationDate).format('DD MMM YYYY')}`}
          {` - forked from: `}
          <Link to={`/recipes/${selectedRecipe.recipeForkedId}`} target="_blank">
            {`${selectedRecipe.recipeForkedName}`}
          </Link>
        </div>
      )
    } else {
      return (
        <div>
          {`created on ${moment(selectedRecipe.creationDate).format('DD MMM YYYY')}`}
        </div>
      )
    }
  }

  render() {
    const { selectedRecipe, handleFieldChange, handleRatingChange, handleIsPrivateChange } = this.props

    return (
      <div>

        {/* <Card> */}
        <Card style={{ boxShadow: 'white' }} >
          <CardHeader
            title={selectedRecipe.user.userName}
            subtitle={this.renderSubtitle()}
            avatar={selectedRecipe.user.userPhoto}
          />
          <CardText>
            <Rating
              value={selectedRecipe.rating}
              max={5}
              onChange={handleRatingChange}
            />
            <TextField
              name="name"
              hintText="Enter Recipe Name"
              floatingLabelText="Enter Recipe Name"
              onChange={handleFieldChange}
              value={selectedRecipe.name}
              fullWidth={true}
            />
            <TextField
              name="comment"
              hintText="Enter Comment"
              floatingLabelText="Enter Comment"
              fullWidth={true}
              multiLine={true}
              rows={2}
              rowsMax={4}
              onChange={handleFieldChange}
              value={selectedRecipe.comment}
            />

            <Checkbox
              checkedIcon={<Visibility />}
              uncheckedIcon={<VisibilityOff />}
              onCheck={handleIsPrivateChange}
              checked={selectedRecipe.isPubblic}
              label={selectedRecipe.isPubblic ? 'Pubblic Recipe' : 'Private Recipe'}
              style={{ marginTop: "20px" }}
            />
          </CardText>
        </Card>
      </div>
    )
  }
};

export default RecipeInformation