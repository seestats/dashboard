import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classes from './HomeView.scss'

export class HomeView extends React.Component {
  static propTypes = {

  };

  render () {
    const pageWidth = this.props.width
    const graphPadding = 20
    const graphWidth = (pageWidth / 2) - graphPadding
    const graphHeight = graphWidth / 2
    return (
      <div className='container text-center' style={{width: this.props.width}}>
        App Home
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
})
export default connect(mapStateToProps, {})(HomeView)
