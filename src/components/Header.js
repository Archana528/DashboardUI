import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import defaultAvatar from '../assets/images/portrait/avatar-s-11.jpg'
import extropyLogo from '../assets/images/ExtropyDataLabsLogoFinal.png'
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <Navbar sticky="top" bg="light">
      <Container className="navContainer">
        <Navbar.Brand href="#">
          <img width={200} height={100} src={extropyLogo} />         
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <img height={50} src = {defaultAvatar}/>       
            <div>
              <div className='fw-bold'>John Smith</div>
              <div>Pricing Analyst</div>
            </div>
            <div className="w-100 text-center mt-2">
              <Link to="/login">LogOut</Link>
            </div>
            
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  )
}
