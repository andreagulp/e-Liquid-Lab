import React, { Component } from "react";
import TextField from "material-ui/TextField";
import { Rating } from "material-ui-rating";
import { Card, CardHeader, CardText } from "material-ui/Card";
import { Link } from "react-router-dom";
import moment from "moment";
import Checkbox from "material-ui/Checkbox";
import Visibility from "material-ui/svg-icons/action/visibility";
import VisibilityOff from "material-ui/svg-icons/action/visibility-off";

class RecipeInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPrivate: true
    };
  }

  renderSubtitle = () => {
    const { selectedRecipe } = this.props;
    if (selectedRecipe.isForked === "yes") {
      return (
        <div>
          {`created on ${moment(selectedRecipe.creationDate).format(
            "DD MMM YYYY"
          )}`}
          {` - forked from: `}
          <Link
            to={`/recipes/${selectedRecipe.recipeForkedId}`}
            target="_blank"
          >
            {`${selectedRecipe.recipeForkedName}`}
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          {`created on ${moment(selectedRecipe.creationDate).format(
            "DD MMM YYYY"
          )}`}
        </div>
      );
    }
  };

  render() {
    if (!this.props.selectedRecipe._user && !this.props.user.name) {
      return <div>...loading</div>;
    }
    const {
      selectedRecipe,
      handleFieldChange,
      handleRatingChange,
      handleIsPrivateChange,
      user,
      mode
    } = this.props;
    // console.log('selectedRecipe', selectedRecipe)

    return (
      <Card style={{ boxShadow: "white", width: "100%" }}>
        <CardHeader
          title={mode === "CREATE" ? user.name : selectedRecipe._user.name}
          subtitle={this.renderSubtitle()}
          avatar={mode === "CREATE" ? user.photo : selectedRecipe._user.photo}
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
            errorText={
              !selectedRecipe.name.length > 0 ? "This field is required" : ""
            }
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
            checked={selectedRecipe.isPublic}
            label={selectedRecipe.isPublic ? "Public Recipe" : "Private Recipe"}
            style={{ marginTop: "20px" }}
          />
        </CardText>
      </Card>
    );
  }
}

export default RecipeInformation;
