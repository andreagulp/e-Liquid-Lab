import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import AutoComplete from 'material-ui/AutoComplete';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { fetchFlavors } from '../../actions/flavors_action';
import { addFlavorToRecipe, updateRecipeField } from '../../actions/recipes_action';
import { flavorsAutocomplete } from '../../reducers';

class FlavorToRecipeForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newFlavor: '',
      newFlavorsPerc: 0,
    }
  }

  componentDidMount = () => {
    if (this.props.mode === 'CREATE') {
      this.props.fetchFlavors()
    }
  }

  handleFlavorToRecipeChange = (value) => { this.setState({ newFlavor: value }) }
  handleFlavorPercToRecipeChange = (e) => { this.setState({ newFlavorsPerc: parseFloat(e.target.value) }) }

  addFlavorToRecipe = () => {
    const { nameBrand, name, brand, iconUrl, pg, vg } = this.state.newFlavor
    // console.log({ ...this.state.newFlavor })
    let flavor = {
      nameBrand, name, brand, iconUrl, pg, vg,
      flavorId: this.state.newFlavor._id,
      perc: this.state.newFlavorsPerc,
      ml: (this.state.newFlavorsPerc / 100) * this.props.recipes.selectedRecipe.mlToProduce
    }

    this.props.addFlavorToRecipe(flavor)
    this.props.handleCloseFlavorToRecipeForm()
  }

  render() {
    // console.log('state in flavor to reciepe form', this.state)
    if (!this.props.flavorsAutocomplete) {
      return (
        <div>...loading</div>
      )
    }
    const dataSourceConfig = {
      text: 'nameBrand',
      value: '_id'
    }

    const recipeFlavors = this.props.recipes.selectedRecipe.recipeFlavors

    return (
      <form onSubmit={this.addFlavorToRecipe}>
        <Row>
          <Col xs={12} sm={6} md={6} lg={6}>
            <AutoComplete
              name="flavor"
              floatingLabelText="Add flavor"
              floatingLabelFixed={true}
              filter={AutoComplete.fuzzyFilter}
              dataSource={this.props.flavorsAutocomplete}
              dataSourceConfig={dataSourceConfig}
              onUpdateInput={this.handleFlavorToRecipeChange}
              onNewRequest={this.handleFlavorToRecipeChange}
              listStyle={{ maxHeight: 200, overflow: 'auto' }}
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={6}>
            <TextField
              name="newFlavorsPerc"
              type="number"
              step="0.1"
              floatingLabelFixed={true}
              // hintText="newFlavorsPerc"
              floatingLabelText="Flavor %"
              onChange={this.handleFlavorPercToRecipeChange}
              value={this.props.mode !== 'CREATE' ? this.state.newFlavorsPerc : recipeFlavors.perc}
              fullWidth={true}
            />
          </Col>
        </Row>
        <Row end="xs">
          <FlatButton
            label="Back"
            primary={true}
            onClick={this.props.handleCloseFlavorToRecipeForm}
          />
          <FlatButton
            label="Submit"
            primary={true}
            disabled={false}
            onClick={this.addFlavorToRecipe}
          />
        </Row>
      </form>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    flavors: state.flavors,
    flavorsAutocomplete: flavorsAutocomplete(state),
    recipes: state.recipes
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchFlavors, addFlavorToRecipe, updateRecipeField }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FlavorToRecipeForm)
