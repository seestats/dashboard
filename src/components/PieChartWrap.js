import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { apiUrl } from '../appConfig'

import chartjs from 'react-chartjs'
const { Line, Bar, Radar, Pie } = chartjs

import getDataFromApi from 'utils/getDataFromApi'
import parseApiData from 'utils/parseApiData'
import getDomain from 'utils/getDomain'
import SizePicker from './SizePicker'

export class BarChartWrap extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      xs: [],
      ys: [],
      size: this.props.size
    }
  }

  _requestData() {
    getDataFromApi(this.props.apiType, this.props.ordering, this.state.size, this.props.dateFrom, this.props.dateTo).then((resp) => {
      if (resp.data.success) {
        const { xs, ys } = parseApiData(resp.data)
        this.setState({
          xs: xs,
          ys: ys,
          loaded: true,
        })
      } else {
        console.error('ERROR', resp)
      }
    }).catch((err) => {
      console.error('ERROR', err)
    })
  }

  componentWillMount() {
    if (this.props.realTime) {
      this._requestData()
      const repeatInterval = setInterval(() => {
        this._requestData()
      }, 2000)
      this.setState({
        repeatInterval,
      })
    } else {
      this._requestData()
    }
  }

  componentWillUnMount() {
    if (this.state.repeatInterval) {
      clearInterval(this.state.repeatInterval)
    }
  }

  _prepareDataForChart(xs, ys) {

    const colors = ['#651FFF', '#FF1744', '#D500F9', '#1DE9B6', '#2979FF',
                    '#FF9100', '#FFEA00', '#00E676', '#76FF03', '#00E5FF']

    const domains = xs.map(getDomain)

    let pieData = []
    for (let i = 0; i < xs.length; i++) {
      pieData.push({
        label: domains[i],
        value: ys[i],
        color: colors[i % colors.length],
      })
    }
    return pieData
  }

  render() {
    if (!this.state.loaded) {
      return (
        <div style={{width: this.props.width}}>
          Loading...
        </div>
      )
    }
    const margin = 10
    const padding = 25

    const containerWidth = this.props.width - 2 * margin

    const graphWidth = containerWidth - 2 * padding
    const graphHeight = this.props.height ? this.props.height : graphWidth
    return (
      <div className="chart-wrap"
        style={{ width: containerWidth, padding: padding, margin: margin, display: 'flex', flexFlow: 'column' }}>
        {this.props.title ? (
          <h3 className="chart-title">{this.props.title}</h3>
        ) : null}
        {this.props.allowChangeSize
          ? <SizePicker value={this.state.size} onChange={(selectedSize) => {this.setState({size: selectedSize})}} />
          : null
        }
        <Pie className="chart" data={this._prepareDataForChart(this.state.xs, this.state.ys)}
          style={{
            width: graphWidth,
            height: graphHeight,
          }}
          options={{
            animationSteps: 10,
          }}
        />
      </div>
    )
  }
}

BarChartWrap.propTypes = {
  realTime: React.PropTypes.bool, // done
  width: React.PropTypes.number.isRequired, // done
  height: React.PropTypes.number, // done
  title: React.PropTypes.string, // done
  xAxisTitle: React.PropTypes.string, // TODO
  yAxisTitle: React.PropTypes.string, // TODO
  apiType: React.PropTypes.string.isRequired, // done
  size: React.PropTypes.number, // done?
  allowChangeDates: React.PropTypes.bool, // TODO
  allowChangeSize: React.PropTypes.bool, // TODO
}


export default BarChartWrap
