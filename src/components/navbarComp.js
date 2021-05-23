import React from "react";
import {
  Badge,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { connect } from "react-redux";

class NavbarComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  printSum = () => {
    let tot = 0;
    this.props.products.forEach((item) => {
      if (item.status === "avaiable") {
        tot += 1;
      }
    });
    return tot;
  };
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={!this.state.isOpen} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  GitHub
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <NavbarText>
              Total Product &nbsp;
              <Badge style={{ backgroundColor: "red" }} color="danger">
                {this.printSum()}
              </Badge>
            </NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
const mapToProps = ({ productReducers }) => {
  return {
    products: productReducers.products_list,
  };
};

export default connect(mapToProps)(NavbarComp);
