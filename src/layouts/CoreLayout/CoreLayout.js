import React, { PropTypes } from 'react'
import '../../styles/core.scss'

import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class CoreLayout extends React.Component {

  _getAppWidth() {
    return window.innerWidth > 1350 ? 1320 : 960
  }

  render() {
    const appWidth = this._getAppWidth()
    return (
      <div className='page-container'>
        <Navbar>
          <Nav>
            <LinkContainer to="/" ><NavItem>Graphs</NavItem></LinkContainer>
            <LinkContainer to="/tables" ><NavItem>Tables</NavItem></LinkContainer>
          </Nav>
        </Navbar>
        <div style={{width: appWidth, margin: '0px auto'}} className='view-container'>
          {this.props && this.props.children
            ? React.cloneElement(this.props.children, { width: appWidth })
            : null}
        </div>
      </div>
    )
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
