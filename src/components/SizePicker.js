import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'

export default class SizePicker extends React.Component {
  render() {
    const sizeOptions = this.props.sizeOptions || [6, 8, 10, 15, 25]
    return (
      <div style={{marginTop: 15, marginBottom: 5}}>
        <ButtonGroup>
          {sizeOptions.map((so) => (
            <Button className={so === this.props.value ? 'sp-btn btn btn-primary' : 'sp-btn btn btn-default'}
              onClick={() => {this.props.onChange(so)}} key={so}
            >
              {so}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    )
  }
}

SizePicker.propTypes = {
  // value: React.PropTypes.number.isRequired,
  // onChange: React.PropTypes.func.isRequired,
}
