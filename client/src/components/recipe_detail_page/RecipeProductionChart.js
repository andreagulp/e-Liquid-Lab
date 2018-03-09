import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Brush  } from 'recharts';


class RecipeProductionChart extends Component {

  render () {
    const recipeProductionByMonth = this.props.recipeProductionByMonth
    // console.log('recipeProductionByMonth', recipeProductionByMonth)

    return (
      <div>
        <ResponsiveContainer width='100%' aspect={4.0/1.5}>
          <LineChart data={recipeProductionByMonth} margin={{top: 10, right: 20, left: 0, bottom: 10}}>
            <Line type="monotone" dataKey="mlProduced" stroke="#8884d8" />
            <Tooltip />
            <Brush dataKey='yearMonth' height={30} stroke="#8884d8"/>
            <XAxis dataKey="yearMonth" padding={{ left: 20, right: 20 }} tick={{fontSize: 12}}/>
            <YAxis tick={{fontSize: 12}}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
};

export default RecipeProductionChart
