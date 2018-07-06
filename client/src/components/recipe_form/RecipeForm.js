import React, { Component } from "react";
import { Row, Col } from "react-flexbox-grid";
import ContentAdd from "material-ui/svg-icons/content/add";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import Divider from "material-ui/Divider";
import CircularProgress from "material-ui/CircularProgress";

import "../commons/dialog.css";

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
import TimerForm from "../recipe_timer/TimerForm";

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
      openProduction,
      handleOpenTimer,
      handleCloseTimer,
      openTimerForm
    } = this.props;

    if (mode !== "CREATE" && !selectedRecipe.recipeFlavors) {
      return <CircularProgress size={60} thickness={7} />;
    }

    // let width = window.innerWidth;

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
                  repositionOnUpdate={false}
                  autoDetectWindowHeight={false}
                  autoScrollBodyContent={false}
                  className="dialog-root"
                  contentClassName="dialog-content"
                  bodyClassName="dialog-body"
                >
                  <div className="dialog-scroll">
                    <FlavorToRecipeForm
                      handleCloseFlavorToRecipeForm={
                        handleCloseFlavorToRecipeForm
                      }
                      mode={mode}
                    />
                  </div>
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
        <Row end="xs" style={{ margin: "10px 0 80px 0", zIndex: 2 }}>
          <RecipeFormButtons
            handleCancel={handleCancel}
            mode={mode}
            recipeFormAction={recipeFormAction}
            enableSubmit={enableSubmit}
            deleteRecipe={deleteRecipe}
            handleOpenProduction={handleOpenProduction}
            user={user}
            handleOpenTimer={handleOpenTimer}
          />
        </Row>
        <Dialog
          title="Mix Recipe"
          modal={true}
          open={openProduction}
          repositionOnUpdate={false}
          autoDetectWindowHeight={false}
          autoScrollBodyContent={false}
          className="dialog-root"
          contentClassName="dialog-content"
          bodyClassName="dialog-body"
        >
          <div className="dialog-scroll">
            <RecipeProduction
              handleCloseProduction={handleCloseProduction}
              user={user}
              errorMsg={errorMsg}
            />
          </div>
        </Dialog>

        <Dialog
          title="Add Timer"
          modal={true}
          open={openTimerForm}
          repositionOnUpdate={false}
          autoDetectWindowHeight={false}
          autoScrollBodyContent={false}
          className="dialog-root"
          contentClassName="dialog-content"
          bodyClassName="dialog-body"
        >
          <div className="dialog-scroll">
            <TimerForm handleCloseTimer={handleCloseTimer} mode="CREATE" />
          </div>
        </Dialog>
      </form>
    );
  }
}

export default withRecipeFormLogic(RecipeForm);
