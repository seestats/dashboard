import React, { PropTypes } from 'react'

import BarChartWrap from 'components/BarChartWrap'
import PieChartWrap from 'components/PieChartWrap'
import LineChartWrap from 'components/LineChartWrap'

import moment from 'moment'

import appConfig from '../../appConfig'
const { apiDateFormat } = appConfig

export class HomeView extends React.Component {
  render () {
    // console.log(this.props.dashboardData)
    const pageWidth = this.props.width
    const thirdPageGraphWidth = pageWidth / 3 - 10
    const halfPageGraphWidth = pageWidth / 2 - 15
    const dateTo = moment().add(1, 'd').format(apiDateFormat)
    const dateFrom = moment().subtract(7, 'd').format(apiDateFormat)
    return (
      <div className='container text-center charts-container'
        style={{
          width: pageWidth,
        }}
      >
        <BarChartWrap
          apiType="target"
          width={thirdPageGraphWidth}
          height={thirdPageGraphWidth}
          title="Target Bar"
          realTime={true}
          size={8}
          allowChangeSize={true}
          dateFrom={dateFrom}
          dateTo={dateTo}
          ordering="top"
        />
        <PieChartWrap apiType="target" width={thirdPageGraphWidth} height={thirdPageGraphWidth} title="Target Pie" realTime={true}
          size={6} dateFrom={dateFrom} dateTo={dateTo} allowChangeSize={true} ordering="top"
        />
        <LineChartWrap apiType="target" width={thirdPageGraphWidth} height={thirdPageGraphWidth} title="Target Line" realTime={true}
          size={10} dateFrom={dateFrom} dateTo={dateTo} allowChangeSize={true} ordering="top"
        />
        <BarChartWrap apiType="target" width={halfPageGraphWidth} height={halfPageGraphWidth * 0.8} title="Target Bar" realTime={true}
          size={15} allowChangeSize={false} dateFrom={dateFrom} dateTo={dateTo} ordering="top"
        />
        <LineChartWrap apiType="target" width={halfPageGraphWidth} height={halfPageGraphWidth * 0.8} title="Target Line" realTime={true}
          size={20} dateFrom={dateFrom} dateTo={dateTo} allowChangeSize={false} ordering="top"
        />
      </div>
    )
  }
}

export default HomeView
