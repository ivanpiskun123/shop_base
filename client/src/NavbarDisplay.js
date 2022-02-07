import React from 'react'
import { navigate } from 'react-big-calendar/lib/utils/constants'
import {Navbar,Container,Nav,NavDropdown} from "react-bootstrap"
import {useNavigate} from 'react-router-dom'
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import {useDispatch,useSelector} from "react-redux"
import {currentUserAdded} from "./features/signup/signinSlice"

function NavbarDisplay({itemCount}) {
  const currentUser=useSelector((state=>state.currentUser.entities))
  // console.log(currentUser.cart.id)
  const dispatch=useDispatch()
  function handleSignout(){
    fetch("/signout",{
      method:"delete",
    })

    dispatch(currentUserAdded(null))
    
  }
    return (
        <Navbar collapseOnSelect fixed="top" expand="sm" bg="dark" variant="dark">
        <Container>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        
        <Navbar.Collapse id="responsive-navbar-nav">
        <Navbar.Brand href="/">Shoppaige</Navbar.Brand>
          <Nav className="me-auto" collapseOnSelect fixed="top" expand="sm">
          {/* <Nav.Link href="/">Home</Nav.Link> */}
          {currentUser!==null || currentUser==={}?<Nav.Link onClick={handleSignout}>Signout</Nav.Link>:<Nav.Link href="/signin">Signin</Nav.Link>}
          {currentUser!==null &&<Nav.Link>Sellers</Nav.Link>}
          {currentUser!==null&& <><NavDropdown
          id="nav-dropdown-dark-example"
          title="Profile"
          menuVariant="dark"
          >
        <NavDropdown.Item href="/addProduct">Become a seller</NavDropdown.Item>
        <NavDropdown.Item href={`/yourListings/${currentUser.id}`}>Listings</NavDropdown.Item>
        </NavDropdown></>}
        </Nav>
        <Nav>
        <Navbar.Collapse className="justify-content-end">
          
        {currentUser!==null&&<Navbar.Text>
        Hello, <a href="#login">{currentUser.first_name}</a>
        </Navbar.Text>}
       </Navbar.Collapse>
        
      <Nav.Link href={currentUser!==null?`/carts/${currentUser.cart.id}`:null} eventKey={2} className="justify-content-end"><Badge color="secondary" badgeContent={1}><ShoppingCartIcon style={{color:"white"}} />{" "}</Badge></Nav.Link>
        </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NavbarDisplay
