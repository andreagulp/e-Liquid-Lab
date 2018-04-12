import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import { red500 } from 'material-ui/styles/colors';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CircularProgress from 'material-ui/CircularProgress';

import { editFlavorToRecipe, deleteFlavorToRecipe } from '../../actions/recipes_action';

class FlavorToRecipeList extends Component {


  onFlavorPercEdit = (e) => {
    this.props.editFlavorToRecipe(e.target.name, e.target.value)
  }

  deleteFlavor = (id) => {
    this.props.deleteFlavorToRecipe(id)
  }

  render() {
    if (!this.props.recipes.selectedRecipe.recipeFlavors) {
      return (
        <CircularProgress size={60} thickness={7} />
      )
    }

    let flavors = this.props.recipes.selectedRecipe.recipeFlavors

    const styles = {
      smallIcon: {
        width: 20,
        height: 20,
        // marginTop: 10
      },
      small: {
        width: 30,
        height: 30,
        padding: -16,
      }
    };

    return (

      <List>
        {flavors.map(flavor =>
          <div key={flavor._id}>
            <ListItem
              leftAvatar={<Avatar src={flavor.iconUrl} />}
              primaryText={flavor.name}
              secondaryText={flavor.brand}
              rightIconButton={
                <div>
                  <TextField
                    name={flavor.flavorId}
                    type="number"
                    step="0.1"
                    hintText="Flavor Percentage"
                    onChange={this.onFlavorPercEdit}
                    value={flavor.perc}
                    style={{ width: "50px" }}
                  />%
                    <IconButton
                    iconStyle={styles.smallIcon}
                    style={styles.small}
                    onClick={() => this.deleteFlavor(flavor._id)}
                  >
                    <Cancel color={red500} />
                  </IconButton>
                </div>
              }
            />
            <Divider />
          </div>
        )}
      </List>
    )
  }
};

const mapStateToProps = (state) => { return { recipes: state.recipes } }
const mapDispatchToProps = (dispatch) => bindActionCreators({ editFlavorToRecipe, deleteFlavorToRecipe }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FlavorToRecipeList);
