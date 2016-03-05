import React, { PropTypes } from 'react'
import classes from './HomeView.scss'

import BarChartWrap from 'components/BarChartWrap'
import PieChartWrap from 'components/PieChartWrap'
import LineChartWrap from 'components/LineChartWrap'

import moment from 'moment'

import appConfig from '../../appConfig'
const { apiDateFormat } = appConfig

export class HomeView extends React.Component {
  render () {
    // console.log(this.props.dashboardData)
    // const pageWidth = this.props.width
    const pageWidth = 900
    const graphWidth = pageWidth / 2
    const dateTo = moment().add(1, 'd').format(apiDateFormat)
    const dateFrom = moment().subtract(7, 'd').format(apiDateFormat)
    return (
      <div className='container text-center'
        style={{
          width: pageWidth,
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        <BarChartWrap
          apiType="target"
          width={graphWidth}
          height={graphWidth}
          title="Target_Bar"
          realTime={true}
          size={14}
          allowChangeSize={false}
          allowChangeDates={false}
          xAxisTitle={''}
          yAxisTitle={''}
          dateFrom={dateFrom}
          dateTo={dateTo}
        />
        <PieChartWrap apiType="target" width={graphWidth} height={graphWidth} title="Target_Pie" realTime={true} size={6}
          dateFrom={dateFrom} dateTo={dateTo}
        />
        <LineChartWrap apiType="target" width={graphWidth} height={graphWidth} title="Target_Line" realTime={true} size={9}
          dateFrom={dateFrom} dateTo={dateTo}
        />
      </div>
    )
  }
}

export default HomeView
