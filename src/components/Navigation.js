import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import { capitalize } from '../utils/helpers';

class Navigation extends Component {

  state = {
    isOpen: false,
    dropdownOpen: false
  }
  
  toggleNav = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggleNav} />
          <NavbarBrand href="/">Readable</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="w-100" navbar>
              {this.props.categories.map((category) => (
                <NavItem
                  key={category}
                >
                  <NavLink href={`/${category}`}>
                    {capitalize(category)}
                  </NavLink>
                </NavItem>
              ))}
              <NavItem className="ml-auto">
                <NavLink href="/new/">New Post</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/TWHou/readable">Github</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

Navigation.propTypes = {
  categories: PropTypes.array
};

Navigation.defaultProps = {
  categories: []
};

const mapStateToProps = ({ category }) => ({
  ...category
});

export default connect(
  mapStateToProps,
  null
)(Navigation);