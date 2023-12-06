// import { Card, Button } from "flowbite-react";
// import Image from 'next/image';
// import logo from '../assets/react.svg'
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import {Button} from 'flowbite-react';
import { Footer } from 'flowbite-react';
import { useMediaQuery } from '@react-hook/media-query';
// import { MyFooter } from '../components/Footer/Footer.jsx';

export const ViewUser = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const isScreenAbove968px = useMediaQuery('(min-width: 968px)');

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    image: "",
    eda: "",
    fechaNacimiento: "",
    gustos: []
  });

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/user/${id}`);
      setUser(result.data);
      console.log("User data from server:", result.data);
      console.log("User gustos:", result.data.gustos); // Agrega este log para verificar los gustos
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    console.log("User data:", user);
    console.log("Fecha de nacimiento:", user.fechaNacimientoString);
  }, [user]);

  const deleteUser = async (id, username) => {

    const isConfirmed = window.confirm(`¿Estás seguro de querer eliminar al usuarix ${username}?`);

    if (isConfirmed) {
      await axios.delete(`http://localhost:8080/user/${id}`)
      navigate("/")
      // loadUsers();
    }
    
  }
  return (
    <>
      <div>
        <div className="contenedor-cumstom-2 mb-10 md:mb-0">
          <div className="py-1">
            <div>
              <img src={user.image} className="avatar-grande rounded" alt="logo" />
            </div>
            <div className="mb-6 mt-5">
              <h1 className="text-5xl">{user.name}</h1>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-2xl md:text-lg">Usuarix</h2>
                <span className="font-bold text-2xl md:text-lg">{user.username}</span>
              </div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-2xl md:text-lg">Edad</h2>
                <span className="font-bold text-2xl md:text-lg">{user.eda} años</span>
              </div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-2xl md:text-lg">Correo</h2>
                <span className="font-bold text-2xl md:text-lg">{user.email}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="my-5 md:my-0">
              <div className="flex items-center mb-4 gap-2">
                <h2 className="font-bold text-2xl md:text-lg">Fecha de Nacimiento</h2>
                <span className="font-bold text-2xl md:text-lg">
                  {user.fechaNacimiento
                    ? new Date(user.fechaNacimiento).toLocaleDateString(
                        "es-ES",
                        { timeZone: "UTC" }
                      )
                    : "N/A"}
                </span>
              </div>

              {Array.isArray(user.gustos) && user.gustos.length > 0 ? (
                <>
                  <div className="mb-4">
                    <h2 className="font-bold text-2xl md:text-lg">Gustos</h2>
                    <span className="font-bold text-2xl md:text-lg">
                      {user.gustos.map((gusto, index) => (
                        <li key={index}>{gusto}</li>
                      ))}
                    </span>
                  </div>  
                </>
              ) : (
                <p>No hay gustos disponibles.</p>
              )}

              <div className="flex flex-col items-start gap-2 mt-10">
                <div>
                  <h2 className="font-bold text-2xl md:text-lg">Breve información:</h2>       
                </div>
                <div>
                  <span className="font-medium text-2xl md:text-lg">{user.comentario}</span>    
                </div>
              </div>

              <div className="flex justify-start mt-10 items-center">
                <Link to={`/edituser/${user.id}`}>
                  <Button type="submit" className="me-2 boton-azul">
                    EDITAR
                  </Button>
                </Link>

                <Link onClick={() => deleteUser(user.id, user.username)} href="#">
                  <Button type="submit" className="me-2 boton-rojo">
                    ELIMINAR
                  </Button>
                </Link>
                <Link to={`/`}>
                  <Button type="submit" className="me-2 boton-custom-editar">
                    VOLVER
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {isScreenAbove968px ? (
          <Footer container className="fixed bottom-0">
          <Footer.Copyright className="" href="#" by="Agustin Trezza Dev" year={2024} />
          <Footer.LinkGroup>
            <Footer.Link href="#">Nosotros</Footer.Link>
            <Footer.Link href="#">Políticas de Privacidad</Footer.Link>
            <Footer.Link href="#">Licencia</Footer.Link>
            <Footer.Link href="#">Contacto</Footer.Link>
          </Footer.LinkGroup>
        </Footer>
        ) : (
          <Footer container className="">
          <Footer.Copyright className="text-center text-xl" href="#" by="Agustin Trezza Dev" year={2024} />
        </Footer>
        )}

      
      </div>

      {/* <MyFooter/> */}
    </>
  );
};
