import { Button, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Spinner } from 'flowbite-react';
import { IoAddOutline } from "react-icons/io5";
import {Tooltip} from 'react-tippy';
// import {Cards} from '../components/Cards/Cards'
// import { MyFooter } from '../components/Footer/Footer.jsx'; 
import { Footer } from 'flowbite-react';
import logoJava from '../assets/logo-java.png'
import { FaReact } from "react-icons/fa";
import {Cards} from '../components/Cards/Cards'
import { useMediaQuery } from '@react-hook/media-query';



export const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const isScreenAbove968px = useMediaQuery('(min-width: 968px)');


  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true); // Inicia el estado de carga
      const result = await axios.get('http://localhost:8080/users');
      setUsers(result.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id, username) => {

    const isConfirmed = window.confirm(`¿Estás seguro de querer eliminar al usuarix: ${username}?`);

    if (isConfirmed) {
      await axios.delete(`http://localhost:8080/user/${id}`)
      loadUsers();
    }
    
  }

  if(users) {
    console.log(users)
  }
  return (
    <>
    <div className='container-custom flex justify-between items-start md:items-center'>
      <div>
        <h1 className="text-4xl text-start font-bold text-sky-950 pb-1">Listado de Usuarios en Tablas</h1>
      </div>
      <div className="flex items-center gap-2 ms-5 cursor-pointer">
        <Tooltip title='Crear Usuario'>
          <Link to={"/adduser"}><IoAddOutline className="boton-crear-usuario"/> </Link>
        </Tooltip>
        {/* <p className="text-xl">Crear un Usuario</p> */}
      </div>
    </div>

    {loading ? <span className="flex justify-center items-start min-h-screen"><Spinner className="spinner" color="failure" aria-label="Extra large spinner example" size="xl"  /> </span> : (
      <>      
      <div className="container-custom min-h-screen">

      <div className="contenedor-tabla-overflow">
      <Table className="shadow-md overflow-custom custom-table" striped>
        <Table.Head>
          <Table.HeadCell className="text-base">INDEX</Table.HeadCell>
          <Table.HeadCell className="text-base">NOMBRE</Table.HeadCell>
          <Table.HeadCell className="text-base">EDAD</Table.HeadCell>
          <Table.HeadCell className="text-base">USUARIO</Table.HeadCell>
          <Table.HeadCell className="text-base">EMAIL</Table.HeadCell>
          {/* <Table.HeadCell className="text-base">AVATAR</Table.HeadCell> */}
          <Table.HeadCell className="text-base">ACCIONES</Table.HeadCell>
        </Table.Head>

        <Table.Body className="clase-custom-overflow">
          {users.slice(0, 3).map((user, index) => (
            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="text-lg text-neutral-850">{index + 1}</Table.Cell>
              <Table.Cell className="dark:text-white">{user.name}</Table.Cell>
              <Table.Cell className="dark:text-white">{user.eda}</Table.Cell>
              <Table.Cell className="dark:text-white">{user.username}</Table.Cell>
              <Table.Cell className="dark:text-white">{user.email}</Table.Cell>
              {/* <Table.Cell><img className="avatar" src={user.image}/></Table.Cell> */}
              <Table.Cell className="flex g-5 items-center">

            <div className="flex justify-between items-center gap-1 p-0 renglon">

              
              {isScreenAbove968px ? (
                <>
                <Table.Cell>
                <Tooltip
                  // options
                  title="Ver usuario"
                  // position="bottom"
                  // trigger="hover"
                >
                  <Link to={`/viewuser/${user.id}`} className="me-2 p-2 flex items-center font-medium text-blue-600 hover:underline">
                  {/* <FaEye className="iconos text-blue-400" /> */}
                  <img className="avatar iconos" src={user.image}/>
                  </Link>
                </Tooltip>
                </Table.Cell>
  
                <Table.Cell>
                <Tooltip
                  // options
                  title="Editar usuario"
                  // position="bottom"
                  // trigger="hover"
                >
                  <Link to={`/edituser/${user.id}`} className="me-2 p-2 flex items-center text-blue-600 hover:underline">
                  <MdEdit className="iconos text-blue-400" />
                  </Link>
                </Tooltip>
                </Table.Cell>
  
                <Table.Cell>
                <Tooltip
                  // options
                  title="Eliminar usuario"
                  // position="bottom"
                  // trigger="hover"
                >
                  <Link onClick={()=> deleteUser(user.id, user.username)} href="#" className="me-2 p-2 flex items-center text-red-400 hover:underline">
                    <MdDelete className="iconos" />
                  </Link>
                </Tooltip>
                </Table.Cell>
                </>
              ) : (
                <>
                <Table.Cell>
                <Tooltip
                  // options
                  title="Ver usuario"
                  // position="bottom"
                  // trigger="hover"
                >
                  <Link to={`/viewuser/${user.id}`} className="font-medium p-1 text-blue-600 hover:underline">
                  {/* <FaEye className="iconos text-blue-400" /> */}
                  <Button className="botones-tabla-mobile">VER</Button>
                  </Link>
                </Tooltip>
                </Table.Cell>
  
                <Table.Cell>
                <Tooltip
                  // options
                  title="Editar usuario"
                  // position="bottom"
                  // trigger="hover"
                >
                  <Link to={`/edituser/${user.id}`} className="font-medium p-1 text-blue-600 hover:underline">
                  {/* <MdEdit className="iconos text-blue-400" /> */}
                  <Button className="botones-tabla-mobile">EDITAR</Button>
                  </Link>
                </Tooltip>
                </Table.Cell>
  
                <Table.Cell>
                <Tooltip
                  // options
                  title="Eliminar usuario"
                  // position="bottom"
                  // trigger="hover"
                >
                  <Link onClick={()=> deleteUser(user.id)} href="#" className="font-medium text-red-400 hover:underline">
                    <MdDelete className="iconos" />
                  </Link>
                </Tooltip>
                </Table.Cell>
                </>
              )}
              
              </div>

              
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      </div>
      <Cards/>
    </div>
    </>   
    )}
    {isScreenAbove968px ? (
         <Footer container className='rounded-none py-2 footer'>
         <div className="w-full text-center">
           <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
             {/* <h1 className="text-yellow-400 text-2xl font-bold">Agustin Trezza</h1> */}
             <div className="flex items-center justify-between gap-5 p-2 ">
               <img className="logo-java" src={logoJava}/>
               <FaReact className="text-blue-400 text-4xl" />
             </div>
   
   
             <Footer.LinkGroup className="flex justify-center gap- mt-4">
               <Footer.Link href="#">Nosotros</Footer.Link>
               <Footer.Link href="#">Políticas de Privacidad</Footer.Link>
               <Footer.Link href="#">Licencia</Footer.Link>
               <Footer.Link href="#">Contacto</Footer.Link>
             </Footer.LinkGroup>
           </div>
           <Footer.Divider />
           <Footer.Copyright href="#" by="Agustin Trezza Dev™" year={2024} />
         </div>
       </Footer>
    ) : (
      <Footer container className='rounded-none py-2 footer'>
      <div className="w-full text-center">
        <div className="w-full justify-center sm:flex sm:items-center sm:justify-between">
          {/* <h1 className="text-yellow-400 text-2xl font-bold">Agustin Trezza</h1> */}
          <div className="flex items-center justify-center gap-5 pt-4 ">
            <img className="logo-java" src={logoJava}/>
            <FaReact className="text-blue-400 text-4xl" />
          </div>
        </div>
        <Footer.Divider />
        <Footer.Copyright className="text-xl" href="#" by="Agustin Trezza Dev™" year={2024} />
      </div>
    </Footer>
    )}
   
    {/* <MyFooter/> */}
    </>

  );
};