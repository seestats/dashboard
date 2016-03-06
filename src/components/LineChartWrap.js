import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { apiUrl } from '../appConfig'

import chartjs from 'react-chartjs'
const { Line, Bar, Radar, Pie } = chartjs

import getDataFromApi from 'utils/getDataFromApi'
import parseApiData from 'utils/parseApiData'
import SizePicker from './SizePicker'
import getDomain from 'utils/getDomain'

export class LineChartWrap extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      size: this.props.size
    }
  }

  _requestData() {
    getDataFromApi(this.props.apiType, this.props.ordering, this.state.size, this.props.dateFrom, this.props.dateTo).then((resp) => {
      if (resp.data.success) {
        const { xs, ys } = parseApiData(resp.data)
        this.setState({
          xs,
          ys,
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
      }, 1000)
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
    const domains = xs.map(getDomain)
    return {
        labels: domains,
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(100,255,218,0.45)",
                strokeColor: "rgba(100,255,218,0.8)",
                highlightFill: "rgba(100,255,218,0.7)",
                highlightStroke: "rgba(100,255,218,1)",
                data: ys,
            }
        ]
    }
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
        <Line className="chart" data={this._prepareDataForChart(this.state.xs, this.state.ys)}
          style={{
            width: graphWidth,
            height: graphHeight,
          }}
          options={{
            scaleFontColor: '#BDBDBD',
            scaleShowGridLines : true,
            scaleGridLineColor : "rgba(255,255,255,.14)",
            scaleGridLineWidth : 1,
          }}
        />
      </div>
    )
  }
}

LineChartWrap.propTypes = {
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

export default LineChartWrap
