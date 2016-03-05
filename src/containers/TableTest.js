import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Table, Column, Cell } from 'fixed-data-table'

type Props = {

}
export class TableTest extends React.Component {
  render() {
    const tableData = this.props.tableData
    return (
      <div>
        <Table
          rowsCount={tableData.length}
          rowHeight={50}
          headerHeight={50}
          width={450}
          height={500}>
          <Column
            header={<Cell>Number</Cell>}
            cell={props => (
              <Cell {...props}>
                {tableData[props.rowIndex].number1}
              </Cell>
            )}
            width={150}
          />
          <Column
            header={<Cell>Other Number</Cell>}
            cell={props => (
              <Cell {...props}>
                {tableData[props.rowIndex].number2}
              </Cell>
            )}
            width={150}
          />
          <Column
            header={<Cell>Another Number</Cell>}
            cell={props => (
              <Cell {...props}>
                {tableData[props.rowIndex].number3}
              </Cell>
            )}
            width={150}
          />
        </Table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tableData: state.dashboardData.tableData,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableTest)
