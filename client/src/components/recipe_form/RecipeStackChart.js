import React, { Component } from 'react';
import {BarChart, ResponsiveContainer, Bar, XAxis, YAxis} from 'recharts';

class RecipeStackChart extends Component {

  render () {
    const stackBarData = this.props.stackBarData
    // console.log(stackBarData)
    const data = [stackBarData];

    return (
      <ResponsiveContainer width='100%' height='100%' aspect={4.0/1.5}>
        <BarChart
          // height={'10px'}
          maxBarSize={30}
          data={data}
          margin={{top: 0, right: 20, left: 20, bottom: 0}}
          layout="vertical"
          label
        >
          {/* <Tooltip/> */}
          <XAxis type="number" hide />
          <YAxis type="category" hide />
          <Bar dataKey="vgTot" stackId="a" fill="#8884d8" />
          <Bar dataKey="pgTot" stackId="a" fill="#ffc658" />
          <Bar dataKey="nicoTot" stackId="a" fill="#82ca9d" />
          <Bar dataKey="flavorsTot" stackId="a" fill="#AA7F39" />
        </BarChart>
      </ResponsiveContainer>
    )
  }
};

export default RecipeStackChart
