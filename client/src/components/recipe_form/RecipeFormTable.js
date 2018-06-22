import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import { connect } from "react-redux";

// import RecipeStackChart from './RecipeStackChart';

class RecipeFormTable extends Component {
  state = {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: false,
    selectable: true,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: false
    // height: '300px',
    // width: '600px',
  };

  render() {
    if (!this.props.recipes.selectedRecipe) {
      return <div>...loading</div>;
    }

    const {
      mlToProduce,
      baseVg,
      basePg,
      nicoVg,
      nicoPg,
      nicoStrength,
      desiredNicoStrength,
      recipeFlavors
    } = this.props.recipes.selectedRecipe;

    let desiredVg = (baseVg / 100) * mlToProduce;
    let desiredPg = (basePg / 100) * mlToProduce;
    let nicoBaseTot = (1 / nicoStrength) * desiredNicoStrength * mlToProduce;
    let nicoBaseVg = (nicoVg / 100) * nicoBaseTot;
    let nicoBasePg = (nicoPg / 100) * nicoBaseTot;

    let flavorsTable = recipeFlavors.map(flavor => {
      return {
        _id: flavor._id,
        name: flavor.name,
        perc: flavor.perc,
        ml: (flavor.perc / 100) * mlToProduce,
        gr: (flavor.perc / 100) * mlToProduce,
        vg: (flavor.vg / 100) * ((flavor.perc / 100) * mlToProduce),
        pg: (flavor.pg / 100) * ((flavor.perc / 100) * mlToProduce)
      };
    });

    let flavorsVg = flavorsTable.reduce((a, b) => a + b.vg, 0);
    let flavorsPg = flavorsTable.reduce((a, b) => a + b.pg, 0);
    // let flavorPercTotal = flavorsTable.reduce((a, b) => a + b.perc, 0)

    let baseTable = [
      {
        id: "001",
        name: "VG",
        ml:
          (desiredPg - (nicoBasePg + flavorsPg)) / mlToProduce < 0
            ? desiredVg - (nicoBaseVg + flavorsVg + flavorsPg)
            : desiredVg - (nicoBaseVg + flavorsVg),
        perc:
          (desiredPg - (nicoBasePg + flavorsPg)) / mlToProduce < 0
            ? (desiredVg - (nicoBaseVg + flavorsVg + flavorsPg)) / mlToProduce
            : (desiredVg - (nicoBaseVg + flavorsVg)) / mlToProduce,
        gr:
          (desiredPg - (nicoBasePg + flavorsPg)) / mlToProduce < 0
            ? (desiredVg - (nicoBaseVg + flavorsVg + flavorsPg)) * 1.26
            : (desiredVg - (nicoBaseVg + flavorsVg)) * 1.26
      },
      {
        id: "002",
        name: "PG",
        ml: desiredPg - (nicoBasePg + flavorsPg),
        perc: (desiredPg - (nicoBasePg + flavorsPg)) / mlToProduce,
        gr: (desiredPg - (nicoBasePg + flavorsPg)) * 1.04
      },
      {
        id: "003",
        name: "Nicotine",
        ml: nicoBaseTot,
        perc: nicoBaseTot / mlToProduce,
        gr: nicoBaseVg * 1.26 + nicoBasePg * 1.04
      }
    ];

    // let stackBarData = {
    //   vgTot: baseTable[0].perc,
    //   pgTot: baseTable[1].perc,
    //   nicoTot: baseTable[2].perc,
    //   flavorsTot: flavorPercTotal / 100
    // }

    return (
      <div>
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
              <TableHeaderColumn style={{ minWidth: "50px" }}>
                Ingredient
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: "35px" }}>%</TableHeaderColumn>
              <TableHeaderColumn style={{ width: "35px" }}>
                gr
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: "35px" }}>
                ml
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {baseTable.filter(x => x.ml > 0).map(ingredient => (
              <TableRow key={ingredient.id}>
                <TableRowColumn
                  style={{ whiteSpace: "normal", minWidth: "50px" }}
                >
                  {ingredient.name}
                </TableRowColumn>
                <TableRowColumn style={{ width: "35px" }}>
                  {parseFloat(ingredient.perc * 100).toFixed(1)}
                </TableRowColumn>
                <TableRowColumn style={{ width: "35px" }}>
                  {parseFloat(ingredient.gr).toFixed(2)}
                </TableRowColumn>
                <TableRowColumn style={{ width: "35px" }}>
                  {parseFloat(ingredient.ml).toFixed(2)}
                </TableRowColumn>
              </TableRow>
            ))}
            <TableRow>
              <TableHeaderColumn
                colSpan="4"
                tooltip="Flavors"
                style={{ textAlign: "left" }}
              >
                Flavors
              </TableHeaderColumn>
            </TableRow>

            {flavorsTable.map(flavor => (
              <TableRow key={flavor._id}>
                <TableRowColumn
                  style={{ whiteSpace: "normal", minWidth: "40px" }}
                >
                  {flavor.name}
                </TableRowColumn>
                <TableRowColumn>
                  {parseFloat(flavor.perc).toFixed(1)}
                </TableRowColumn>
                <TableRowColumn>
                  {parseFloat(flavor.gr).toFixed(2)}
                </TableRowColumn>
                <TableRowColumn>
                  {parseFloat(flavor.ml).toFixed(2)}
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <RecipeStackChart stackBarData={stackBarData} /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { recipes: state.recipes };
};

export default connect(
  mapStateToProps,
  null
)(RecipeFormTable);
