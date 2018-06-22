import React, { Component } from "react";
import { Row, Col } from "react-flexbox-grid";
import ContentAdd from "material-ui/svg-icons/content/add";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import Divider from "material-ui/Divider";
import CircularProgress from "material-ui/CircularProgress";

import withRecipeFormLogic from "./withRecipeFormLogic";
import FormLiquidQty from "../commons/FormLiquidQty";
import FormBaseVgPg from "../commons/FormBaseVgPg";
import RecipeFormBaseNico from "../recipe_form/RecipeFormBaseNico";
import RecipeFormTable from "./RecipeFormTable";
import FlavorToRecipeForm from "../recipe_form/FlavorToRecipeForm";
import FlavorToRecipeList from "../recipe_form/FlavorToRecipeList";
import RecipeProduction from "./RecipeProduction";
import RecipeInformation from "./RecipeInformation";
import RecipeFormButtons from "./RecipeFormButtons";

class RecipeForm extends Component {
  render() {
    const {
      handleMlToProduceChange,
      handleBaseVgChange,
      handleBasePgChange,
      handleNicoVgChange,
      handleNicoPgChange,
      handleNicoStrengthChange,
      handleDesiredNicoStrengthChange,
      handleRatingChange,
      handleFieldChange,
      handleIsPrivateChange,
      recipeFormAction,
      deleteRecipe,
      handleCancel,
      enableSubmit,
      handleOpenFlavorToRecipeForm,
      handleCloseFlavorToRecipeForm,
      handleOpenProduction,
      handleCloseProduction,
      selectedRecipe,
      mode,
      user,
      open,
      errorMsg,
      openProduction
    } = this.props;

    if (mode !== "CREATE" && !selectedRecipe.recipeFlavors) {
      return <CircularProgress size={60} thickness={7} />;
    }

    return (
      <form>
        <Row>
          <Col xs={12} sm={12} md={7} lg={7}>
            <Row>
              <Col xs={12} sm={12} md={4} lg={4}>
                <FormLiquidQty
                  mlOfLiquid={selectedRecipe.mlToProduce}
                  handleMlOfLiquidChange={handleMlToProduceChange}
                  chartValue={selectedRecipe.mlToProduce}
                  chartLabel="ml"
                  title="Quantity"
                />
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <FormBaseVgPg
                  chartValue={selectedRecipe.baseVg}
                  chartLabel="VG"
                  basePg={selectedRecipe.basePg}
                  baseVg={selectedRecipe.baseVg}
                  onBasePgChange={handleBasePgChange}
                  onBaseVgChange={handleBaseVgChange}
                />
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <RecipeFormBaseNico
                  nicoVg={selectedRecipe.nicoVg}
                  nicoPg={selectedRecipe.nicoPg}
                  nicoStrength={selectedRecipe.nicoStrength}
                  desiredNicoStrength={selectedRecipe.desiredNicoStrength}
                  onNicoVgChange={handleNicoVgChange}
                  onNicoPgChange={handleNicoPgChange}
                  onNicoStrengthChange={handleNicoStrengthChange}
                  onDesiredNicoStrengthChange={handleDesiredNicoStrengthChange}
                />
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <RaisedButton
                  label="Add Flavor"
                  labelPosition="before"
                  primary={true}
                  icon={<ContentAdd />}
                  style={{ marginTop: "15px" }}
                  onClick={handleOpenFlavorToRecipeForm}
                />
                <Dialog
                  title="Add Flavor To Recipe"
                  modal={true}
                  open={open}
                  contentStyle={{ width: "70%", maxWidth: "100%" }}
                  autoScrollBodyContent={true}
                >
                  <FlavorToRecipeForm
                    handleCloseFlavorToRecipeForm={
                      handleCloseFlavorToRecipeForm
                    }
                    mode={mode}
                  />
                </Dialog>
              </Col>
            </Row>
            <div>
              <FlavorToRecipeList mode={mode} />
            </div>
          </Col>
          <Col xs={12} sm={12} md={5} lg={5}>
            <Row style={{ margin: "30px -15px 30px -15px" }}>
              <RecipeFormTable />
            </Row>

            {/* <Row center="xs" style={{ marginLeft: "10px", marginRight: "10px" }}> */}
            <Row style={{ margin: "30px 0 30px 0" }}>
              <RecipeInformation
                selectedRecipe={selectedRecipe}
                handleFieldChange={handleFieldChange}
                handleRatingChange={handleRatingChange}
                handleIsPrivateChange={handleIsPrivateChange}
                user={user}
                mode={mode}
              />
            </Row>
          </Col>
        </Row>
        <Row end="xs" style={{ margin: "10px 0 30px 0" }}>
          <RecipeFormButtons
            handleCancel={handleCancel}
            mode={mode}
            recipeFormAction={recipeFormAction}
            enableSubmit={enableSubmit}
            deleteRecipe={deleteRecipe}
            handleOpenProduction={handleOpenProduction}
            user={user}
          />
        </Row>
        <Dialog
          title="Mix Recipe"
          modal={true}
          open={openProduction}
          contentStyle={{
            height: "98%",
            maxHeight: "98%",
            width: "90%",
            maxWidth: "98%"
          }}
          autoScrollBodyContent={true}
        >
          <RecipeProduction
            handleCloseProduction={handleCloseProduction}
            user={user}
            errorMsg={errorMsg}
          />
        </Dialog>
      </form>
    );
  }
}

export default withRecipeFormLogic(RecipeForm);
