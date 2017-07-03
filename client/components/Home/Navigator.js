import React, {Component} from 'react';
import { Navbar, NavItem, Nav} from 'react-bootstrap';
import { Router, Route, hashHistory, Link} from 'react-router'
import Login from './Login'

export default class Navigator extends Component {
	constructor() {
    	super();
    	this.state = {
    		open : false
    	}
    }

	render() {
		return(
			<Navbar style={{borderRadius: 0, 
				position: "fixed", right: 0, left: 0, width: "100%",
				zIndex : 2,}} collapseOnSelect inverse >
			    <Navbar.Header>
			      <Navbar.Brand>
			        <a href="/"><strong>LOGO</strong></a>
			      </Navbar.Brand>
			    </Navbar.Header>
			    <Navbar.Collapse>
				    <Nav pullRight>
							<Nav>
				        <NavItem eventKey={1} href="#">
									<div>
				            {!this.state.open && !this.props.loggedIn && "Please log in."}
					        </div>
				        </NavItem>
				      </Nav>
			        {this.props.loggedIn && <li><a name="signoff" onClick={this.props.logout}>Sign Off</a></li>}
			      </Nav>
			    </Navbar.Collapse>
			</Navbar>
		)
	}
}

			      