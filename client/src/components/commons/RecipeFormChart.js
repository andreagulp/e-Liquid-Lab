import React, { Component } from "react";
import { VictoryPie, VictoryLabel } from "victory";

class RecipeFormChart extends Component {
  render() {
    return (
      <div>
        <svg viewBox="0 0 400 400">
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={[{ x: " ", y: this.props.vg }, { x: " ", y: this.props.pg }]}
            innerRadius={108}
            labelRadius={50}
            style={{ labels: { fontSize: 20, fill: "white" } }}
            colorScale={["#2E86C1", "#F39C12", "teal"]}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 40 }}
            x={200}
            y={200}
            text={`${parseFloat(this.props.centralLabelValue).toFixed(1)}${
              this.props.centralLabelText
            }`}
          />
        </svg>
      </div>
    );
  }
}

export default RecipeFormChart;
