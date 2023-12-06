// import { Dropdown, Avatar } from 'flowbite-react';
import { Navbar } from 'flowbite-react';
import { Link, NavLink } from 'react-router-dom';
import { useMediaQuery } from '@react-hook/media-query';


export function MyNavbar() {

  const isScreenAbove768px = useMediaQuery('(min-width: 768px)');

  return (
    <Navbar fluid rounded className="p-4">
      <>

      {isScreenAbove768px ? (
        <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-2xl font-semibold"> <span className="text-white me-1">CRUD</span><span className="text-red-400 me-1">JAVA</span><span className="text-blue-400 me-1">REACT</span></span>
        </Navbar.Brand>
        
      ) : (
        <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-2xl font-semibold"> <span className="text-white me-1">CRUD</span><span className="text-red-400 me-1"></span><span className="text-blue-400 me-1"></span></span>
        </Navbar.Brand>
      )}
      
      <div className="flex md:order-2 items-center">
        <Link to={"/"}>
          <h1 className="dark:text-yellow-500 text-xl font-bold me-6">Agustin Trezza</h1>
        </Link>
        {/* <Dropdown 
          arrowIcon={true}
          inline
          label={
            <Avatar alt="User settings" img="https://res.cloudinary.com/djpifu0cl/image/upload/v1700773114/agusbata_bkqoxz.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown> */}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <NavLink data-tip="Este es un tooltip" className="clase-link dark:text-white" to="/" activeclassname="active">
          USUARIOS
        </NavLink>
        {/* <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link> */}
         <NavLink className="clase-link dark:text-white" to="/adduser" activeclassname="active">
          CREAR USUARIO
        </NavLink>
      </Navbar.Collapse>
      </>
    </Navbar>
  );
}


'use client';



