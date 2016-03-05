import React from 'react'
import { connect } from 'react-redux'

export class TablesView extends React.Component {
  render() {
    return (
      <div>
        Tables View
      </div>
    )
  }
}

const mapStateToProps = () => ({

});

export default connect(mapStateToProps, {})(TablesView)
