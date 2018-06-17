import React, { Component } from "react";
import AutoComplete from "material-ui/AutoComplete";
import TextField from "material-ui/TextField";
import { Row, Col } from "react-flexbox-grid";
import CircularProgress from "material-ui/CircularProgress";
import DatePicker from "material-ui/DatePicker";
import Toggle from "material-ui/Toggle";

import withFlavorFormLogic from "./withFlavorFormLogic";
import FormBaseVgPg from "../../components/commons/FormBaseVgPg";
import FormLiquidQty from "../../components/commons/FormLiquidQty";
import FlavorFormCard from "./FlavorFormCard";
import FormButtons from "../commons/FormButtons";

class FlavorForm extends Component {
  render() {
    const {
      handleFieldChange,
      handleExpirationAlertChange,
      handleMinQtyAlertChange,
      handleBrandChange,
      handleQtyChange,
      handleMinQtyChange,
      handleExpirationDateChange,
      handleBaseVgChange,
      handleBasePgChange,
      flavorFormAction,
      deleteFlavor,
      handleCancel,
      enableSubmit,
      selectedFlavor,
      brands
    } = this.props;

    if (this.props.mode === "UPDATE" && !selectedFlavor.name) {
      return <CircularProgress size={60} thickness={7} />;
    }

    const expirationDateCalculated =
      selectedFlavor.expirationDate !== null
        ? selectedFlavor.expirationDate
        : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    return (
      <form>
        <Row>
          <Col xs={12} sm={12} md={12} lg={4}>
            <FlavorFormCard
              flavorid={this.props.flavorid}
              selectedFlavor={selectedFlavor}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={8}>
            <Row>
              <Col xs={12} sm={6} md={6} lg={6}>
                <AutoComplete
                  name="brand"
                  hintText="Enter Brand"
                  floatingLabelText="Select Brand"
                  filter={AutoComplete.fuzzyFilter}
                  dataSource={brands}
                  onUpdateInput={handleBrandChange}
                  searchText={selectedFlavor.brand}
                  errorText={
                    !selectedFlavor.brand.length > 0
                      ? "This field is required"
                      : ""
                  }
                />
              </Col>
              <Col xs={12} sm={6} md={6} lg={6}>
                <TextField
                  name="name"
                  hintText="Enter flavor"
                  floatingLabelText="Enter flavor"
                  onChange={handleFieldChange}
                  value={selectedFlavor.name}
                  errorText={
                    !selectedFlavor.name.length > 0
                      ? "This field is required"
                      : ""
                  }
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col xs={12} sm={12} md={6} lg={6}>
                <FormLiquidQty
                  mlOfLiquid={selectedFlavor.qty}
                  handleMlOfLiquidChange={handleQtyChange}
                  chartValue={selectedFlavor.qty}
                  chartLabel="ml"
                  title="Quantity Owned"
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <FormBaseVgPg
                  chartLabel="PG"
                  chartValue={selectedFlavor.basePg}
                  basePg={selectedFlavor.basePg}
                  baseVg={selectedFlavor.baseVg}
                  onBasePgChange={handleBasePgChange}
                  onBaseVgChange={handleBaseVgChange}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col xs={12} sm={12} md={12} lg={12}>
                <TextField
                  name="storageLocation"
                  hintText="Enter Storage Location"
                  floatingLabelText="Enter Storage Location"
                  onChange={handleFieldChange}
                  value={selectedFlavor.storageLocation}
                  fullWidth={true}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col xs={6} sm={6} md={6} lg={6}>
                <DatePicker
                  hintText="Set Expiration Date"
                  floatingLabelText="Set Expiration Date"
                  // mode="landscape"
                  onChange={handleExpirationDateChange}
                  value={new Date(expirationDateCalculated)}
                  fullWidth={true}
                />
              </Col>
              <Col xs={6} sm={6} md={6} lg={6} style={{ marginTop: "20px" }}>
                <Toggle
                  label="OFF/ON"
                  labelPosition="right"
                  onToggle={handleExpirationAlertChange}
                  toggled={selectedFlavor.expirationDateAlertActive}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col xs={6} sm={6} md={6} lg={6}>
                <TextField
                  name="minQtyAlert"
                  type="number"
                  hintText="Minimum Quantity (ml) Before Alert"
                  floatingLabelText="Minimum Quantity (ml) Before Alert"
                  onChange={handleMinQtyChange}
                  value={selectedFlavor.minQtyAlert}
                  fullWidth={true}
                />
              </Col>
              <Col xs={6} sm={6} md={6} lg={6} style={{ marginTop: "20px" }}>
                <Toggle
                  label="OFF/ON"
                  labelPosition="right"
                  onToggle={handleMinQtyAlertChange}
                  toggled={selectedFlavor.minQtyAlertActive}
                />
              </Col>
            </Row>
            <Row end="xs" style={{ marginTop: "80px", marginBottom: "40px" }}>
              <FormButtons
                formAction={flavorFormAction}
                handleCancel={handleCancel}
                mode={this.props.mode}
                enableSubmit={enableSubmit}
                deleteItem={deleteFlavor}
              />
            </Row>
          </Col>
        </Row>
      </form>
    );
  }
}

export default withFlavorFormLogic(FlavorForm);
