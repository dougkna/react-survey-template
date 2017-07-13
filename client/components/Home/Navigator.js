import React, {Component} from 'react';
import { Navbar, NavItem, Nav, Collapse} from 'react-bootstrap';
import { Router, Route, hashHistory, Link} from 'react-router'
import Login from './Login'

export default class Navigator extends Component {
	render() {
		return(
			<Navbar style={{borderRadius: 0, zIndex : 2,
        position: "fixed", right: 0, left: 0, width: "100%"
        }} collapseOnSelect inverse
      >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/"><strong>LOGO</strong></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              <div className='body-x'>
                {!this.props.loggedIn && "Please log in."}
              </div>
            </NavItem>
            {this.props.loggedIn && <li><a name="signoff" onClick={this.props.logout}>Sign Off</a></li>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
		)
	}
}


			      