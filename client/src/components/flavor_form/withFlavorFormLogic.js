import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addFlavor,
  fetchSingleFlavor,
  updateFlavor,
  deleteFlavor,
  updateFlavorField,
  cleanSelectedFlavor
} from "../../actions/flavors_action";
import { BRANDS } from "../../brands_db";

export default function(ComposedComponent) {
  class withFlavorFormLogic extends Component {
    constructor(props) {
      super(props);

      this.state = {
        brands: BRANDS
      };
    }

    componentDidMount = () => {
      if (this.props.mode === "UPDATE" && this.props.flavorid) {
        this.props.fetchSingleFlavor(this.props.flavorid);
      }
    };

    handleFieldChange = e => {
      this.props.updateFlavorField(e.target.value, e.target.name);
    };

    handleExpirationAlertChange = e => {
      const selectedFlavor = this.props.flavors.selectedFlavor;
      this.props.updateFlavorField(
        !selectedFlavor.expirationDateAlertActive,
        "expirationDateAlertActive"
      );
    };

    handleMinQtyAlertChange = e => {
      const selectedFlavor = this.props.flavors.selectedFlavor;
      this.props.updateFlavorField(
        !selectedFlavor.minQtyAlertActive,
        "minQtyAlertActive"
      );
    };

    handleBrandChange = value => {
      this.props.updateFlavorField(value, "brand");
    };

    handleQtyChange = (event, value) => {
      this.props.updateFlavorField(parseInt(value, 10), "qty");
    };
    handleMinQtyChange = (event, value) => {
      this.props.updateFlavorField(parseInt(value, 10), "minQtyAlert");
    };

    handleExpirationDateChange = (event, date) => {
      this.props.updateFlavorField(date, "expirationDate");
    };

    handleBaseVgChange = (event, value) => {
      Promise.resolve(
        this.props.updateFlavorField(parseInt(value, 10), "baseVg")
      ).then(this.props.updateFlavorField(100 - value, "basePg"));
    };

    handleBasePgChange = (event, value) => {
      Promise.resolve(
        this.props.updateFlavorField(parseInt(value, 10), "basePg")
      ).then(this.props.updateFlavorField(parseInt(100 - value, 10), "baseVg"));
    };

    flavorFormAction = id => {
      const selectedFlavor = this.props.flavors.selectedFlavor;
      let expirationDate = selectedFlavor.expirationDate;

      const alertListQty =
        selectedFlavor.qty < selectedFlavor.minQtyAlert &&
        selectedFlavor.minQtyAlertActive
          ? true
          : false;
      const alertListExpiration =
        selectedFlavor.expirationDate < Date.now() &&
        selectedFlavor.expirationDateAlertActive
          ? true
          : false;

      if (this.props.mode === "CREATE") {
        //CREATE MODE
        let newFlavor = {
          brand: selectedFlavor.brand,
          name: selectedFlavor.name,
          iconUrl: selectedFlavor.iconUrl,
          qty: selectedFlavor.qty,
          rating: selectedFlavor.rating,
          baseVg: selectedFlavor.baseVg,
          basePg: selectedFlavor.basePg,
          comment: selectedFlavor.comment,
          storageLocation: selectedFlavor.storageLocation,
          expirationDate: expirationDate,
          minQtyAlert: selectedFlavor.minQtyAlert,
          expirationDateAlertActive: selectedFlavor.expirationDateAlertActive,
          minQtyAlertActive: selectedFlavor.minQtyAlertActive,
          alertList: alertListQty || alertListExpiration ? true : false
        };
        this.props.addFlavor(newFlavor);
        this.handleCancel();
      } else {
        //UPDATE MODE
        this.props.updateFlavor(selectedFlavor._id, {
          ...selectedFlavor,
          _user: selectedFlavor._user._id,
          alertList: alertListQty || alertListExpiration ? true : false
        });
        this.props.history.push("/flavors");
      }
    };

    deleteFlavor = () => {
      const selectedFlavor = this.props.flavors.selectedFlavor;
      this.props.deleteFlavor(selectedFlavor._id, selectedFlavor._rev);
      this.props.history.push("/flavors");
    };

    handleCancel = () => {
      if (this.props.mode === "UPDATE") {
        this.props.history.push("/flavors");
        this.props.cleanSelectedFlavor();
      } else {
        this.props.handleClose();
        this.props.cleanSelectedFlavor();
      }
    };

    enableSubmit = () => {
      const selectedFlavor = this.props.flavors.selectedFlavor;
      if (!selectedFlavor.name.length > 0 || !selectedFlavor.brand.length > 0) {
        return true;
      }
      return false;
    };

    render() {
      return (
        <ComposedComponent
          {...this.props}
          handleFieldChange={this.handleFieldChange}
          handleExpirationAlertChange={this.handleExpirationAlertChange}
          handleMinQtyAlertChange={this.handleMinQtyAlertChange}
          handleBrandChange={this.handleBrandChange}
          handleQtyChange={this.handleQtyChange}
          handleMinQtyChange={this.handleMinQtyChange}
          handleExpirationDateChange={this.handleExpirationDateChange}
          handleBaseVgChange={this.handleBaseVgChange}
          handleBasePgChange={this.handleBasePgChange}
          flavorFormAction={this.flavorFormAction}
          deleteFlavor={this.deleteFlavor}
          handleCancel={this.handleCancel}
          enableSubmit={this.enableSubmit}
          selectedFlavor={this.props.flavors.selectedFlavor}
          brands={this.state.brands}
        />
      );
    }
  }
  const mapStateToProps = state => {
    return { flavors: state.flavors, user: state.user };
  };
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        addFlavor,
        fetchSingleFlavor,
        deleteFlavor,
        updateFlavor,
        updateFlavorField,
        cleanSelectedFlavor
      },
      dispatch
    );

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(withFlavorFormLogic);
}
