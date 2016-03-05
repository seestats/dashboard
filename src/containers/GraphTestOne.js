import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import chartjs from 'react-chartjs'
const { Line, Bar, Radar, Pie } = chartjs

type Props = {

}

const options = {
  animationSteps: 45,
}

export class GraphTestOne extends React.Component {
  props: Props;

  render() {
    const componentWidth = this.props.width
    const graphPadding = 20
    const graphWidth = (componentWidth / 2) - graphPadding
    const graphHeight = graphWidth / 2
    return (
      <div style={{display: 'flex', flexFlow: 'row', flexWrap: 'wrap'}}>
        <Line data={this.props.dashboardData.lineData}
          style={{width: graphWidth, height: graphHeight, padding: graphPadding}}
          options={options}
        />
        <Bar data={this.props.dashboardData.barData}
          style={{width: graphWidth, height: graphHeight, padding: graphPadding}}
          options={options}
        />
        <Pie data={this.props.dashboardData.pieData}
          style={{width: graphWidth, height: graphHeight, padding: graphPadding}}
          options={options}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dashboardData: state.dashboardData,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphTestOne)
