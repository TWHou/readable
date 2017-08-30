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
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';


import { selectCategory } from '../actions/categoryActions';
import { getPostsAPI } from '../actions/postActions';
import { capitalize } from '../utils/helpers';

class Navigation extends Component {

  state = {
    isOpen: false,
    dropdownOpen: false
  }

  onSelect = (category) => {
    this.props.selectCategory(category);
    this.props.getPosts(category);
  }
  
  toggleNav = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  toggleDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggleNav} />
          <NavbarBrand href="/">Readable</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                  <DropdownToggle caret nav>
                    Category
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => this.onSelect(null)}>
                      All
                    </DropdownItem>
                    {this.props.categories.map((category) => (
                      <DropdownItem
                        key={category}
                        onClick={
                          () => this.onSelect(category)
                        }
                      >
                        {capitalize(category)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
              <NavItem>
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
  categories: PropTypes.array,
  selectCategory: PropTypes.func,
  getPosts: PropTypes.func
};

Navigation.defaultProps = {
  categories: []
};

const mapStateToProps = ({ category }) => ({
  ...category
});

export default connect(
  mapStateToProps,
  { 
    selectCategory: selectCategory,
    getPosts: getPostsAPI
  }
)(Navigation);