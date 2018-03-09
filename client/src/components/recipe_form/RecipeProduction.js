import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import {updateRecipe, updateRecipeWithProduction} from '../../actions/recipes_action';
import {updateFlavor, fetchFlavors} from '../../actions/flavors_action';


class RecipeProduction extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      // height: '300px',
      // width: '600px',
      comment: ''
    }
  }

  componentDidMount = () => {
      this.props.fetchFlavors()
  }

  handleCommentFieldChange = (e) => {
    this.setState({comment: e.target.value})
  }

  produceRecipe = () => {
      const selectedRecipe = this.props.recipes.selectedRecipe
      let createdAt = new Date()
      let newProduction = {
        _id: Math.round((new Date()).getTime() / 1000),
        productionDate: createdAt.toISOString(),
        mlProduced: selectedRecipe.mlToProduce,
        comment: this.state.comment
      }

      let newRecipe = {...selectedRecipe, production: [
        ...selectedRecipe.production, newProduction
      ] }

      // create new flavors object for the flavors that need update. loop and change

      this.props.updateRecipeWithProduction(selectedRecipe._id, newRecipe)
      this.consumeFlavorsQty()
      this.props.handleCloseProduction()
  }

  consumeFlavorsQty = () => {
      const selectedRecipe = this.props.recipes.selectedRecipe
      const flavors = this.props.flavors.inventoryFlavors
      // const selectedFlavor = this.props.flavors.selectedFlavor
      let newFlavor = {}

      flavors.forEach(flavor => {
        selectedRecipe.recipeFlavors.forEach(recipeFlavor => {
          if(flavor._id === recipeFlavor._id) {
            let flavorQtyNedeed = (recipeFlavor.perc / 100) * selectedRecipe.mlToProduce
            newFlavor = {...flavor, qty: flavor.qty - flavorQtyNedeed, alertList: (flavor.qty - flavorQtyNedeed) < flavor.minQtyAlert ? true : false}
            this.props.updateFlavor(flavor._id, newFlavor)
          }
        })
      })

  }

  render () {
    if(!this.props.flavors.inventoryFlavors[0]) {
      return (
        <div>...loading</div>
      )
    }

    const flavors = this.props.flavors.inventoryFlavors
    const selectedRecipe = this.props.recipes.selectedRecipe

    return (
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <p>You are mixing {selectedRecipe.mlToProduce} ml of {selectedRecipe.name}</p>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Table
              height={this.state.height}
              fixedHeader={this.state.fixedHeader}
              fixedFooter={this.state.fixedFooter}
              selectable={this.state.selectable}
              multiSelectable={this.state.multiSelectable}
            >
              <TableHeader
                displaySelectAll={this.state.showCheckboxes}
                adjustForCheckbox={this.state.showCheckboxes}
                enableSelectAll={this.state.enableSelectAll}
              >
                <TableRow>
                  <TableHeaderColumn style={{whiteSpace:'normal', minWidth: "40px"}}>Flavor</TableHeaderColumn>
                  <TableHeaderColumn style={{width: "35px"}}>Qty Needed</TableHeaderColumn>
                  <TableHeaderColumn style={{width: "55px"}}>Qty Left</TableHeaderColumn>
                </TableRow>
              </TableHeader>

              <TableBody
                displayRowCheckbox={this.state.showCheckboxes}
                deselectOnClickaway={this.state.deselectOnClickaway}
                showRowHover={this.state.showRowHover}
                stripedRows={this.state.stripedRows}
              >
                {selectedRecipe.recipeFlavors.map( flavor => (
                  <TableRow key={flavor._id}>
                    <TableRowColumn style={{whiteSpace:'normal', minWidth: "40px"}}>{flavor.name}</TableRowColumn>
                    <TableRowColumn style={{width: "35px"}}>{parseFloat((flavor.perc / 100) * selectedRecipe.mlToProduce).toFixed(1)}</TableRowColumn>
                    <TableRowColumn style={{width: "55px"}}>
                      {parseFloat((flavors.find(x => x._id === flavor._id).qty) - ((flavor.perc / 100) * selectedRecipe.mlToProduce)).toFixed(1)}
                    </TableRowColumn>
                  </TableRow>
                ))}

              </TableBody>

            </Table>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <TextField
              name="comment"
              hintText="Enter Comment"
              floatingLabelText="Enter Comment"
              fullWidth={true}
              multiLine={true}
              rows={2}
              rowsMax={4}
              onChange={this.handleCommentFieldChange}
              value={this.state.comment}
            />
          </Col>

          <Col xs={12} sm={12} md={12} lg={12}>
            <Row end="xs" style={{margin:"50px 0 30px 0"}}>
              <FlatButton
                label="Cancel"
                primary={false}
                onClick={this.props.handleCloseProduction}
              />
              <FlatButton
                label="Produce"
                primary={true}
                disabled={false}
                onClick={this.produceRecipe}
              />
            </Row>
          </Col>
        </Row>
    )
  }
};


const mapStateToProps = (state) => {return {recipes: state.recipes, flavors: state.flavors}}
const mapDispatchToProps  = (dispatch) => bindActionCreators({updateRecipe, updateFlavor, fetchFlavors, updateRecipeWithProduction}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RecipeProduction)
