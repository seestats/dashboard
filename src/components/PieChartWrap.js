import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { apiUrl } from '../appConfig'

import chartjs from 'react-chartjs'
const { Line, Bar, Radar, Pie } = chartjs

import getDataFromApi from 'utils/getDataFromApi'
import parseApiData from 'utils/parseApiData'

export class BarChartWrap extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      xs: [],
      ys: [],
    }
  }

  _requestData() {
    getDataFromApi(this.props.apiType, 'top', this.props.size, this.props.dateFrom, this.props.dateTo).then((resp) => {
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

    const colors = ['#fd8a78', '#5d1dc0', '#5d1dc0', '#bba586', '#bba586', '#2ba41b', '#8f8f57',
                    '#f09022', '#61ad1f', '#49c8ba', '#083792']

    const domains = xs.map((x) => {
      return x.replace('http://', '')
              .replace('https://', '')
              .split(':')[0]
              .replace('?', '')
    })

    let pieData = []
    for (let i = 0; i < xs.length; i++) {
      pieData.push({
        label: domains[i],
        value: ys[i],
        color: colors[i],
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
    const padding = 10
    const graphWidth = this.props.width - padding * 2
    const graphHeight = this.props.height ? this.props.height - padding * 2 : graphWidth - padding * 2
    return (
      <div style={{ width: graphWidth, padding: padding, display: 'flex', flexFlow: 'column', border: '1px solid black', boxSizing: 'border-box' }}>
        {this.props.title ? (
          <h3>{this.props.title}</h3>
        ) : null}
        <Pie data={this._prepareDataForChart(this.state.xs, this.state.ys)}
          style={{
            width: graphWidth - 2 * padding,
            height: graphHeight - 2 * padding,
            padding: padding,
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
