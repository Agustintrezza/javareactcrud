import { useState } from 'react';
import { Button, TextInput, Textarea } from 'flowbite-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Footer } from 'flowbite-react';
import { useMediaQuery } from '@react-hook/media-query';



export const AddUser = () => {

    const isScreenAbove968px = useMediaQuery('(min-width: 968px)');
    let navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    eda: 0,
    image: '',
    fechaNacimiento: null,
    comentario: '',
    gustos: []
  });

  const { name, username, email, eda, image, fechaNacimiento, comentario, gustos } = user;

  const onInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
  
    if (name === 'eda') {
      const intValue = parseInt(value, 10);
  
      if (!isNaN(intValue)) {
        setUser((prevUser) => ({ ...prevUser, [name]: intValue }));
      } else {
        console.error("Error: 'Edad' debe ser un número válido");
      }
    } else if (name === 'gustos') {
      // Divide la cadena de gustos usando comas como separadores
      const gustosArray = value.split(',');
      
      // Elimina espacios en blanco alrededor de cada gusto
      const trimmedGustos = gustosArray.map(gusto => gusto.trim());
  
      setUser((prevUser) => ({ ...prevUser, [name]: trimmedGustos }));
    } else {
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Convertir la fecha de nacimiento a un formato adecuado (puedes ajustarlo según tu necesidad)
    const formattedFechaNacimiento = new Date(fechaNacimiento).toISOString();

    const userToSend = { ...user, eda: parseInt(user.eda, 10), fechaNacimiento: formattedFechaNacimiento };
    console.log(userToSend);
    await axios.post("http://localhost:8080/user", userToSend);
    navigate("/");
};

  return (

    <>
    <div className="container-custom-center">


          <div className='flex items-center justify-center w-full'>
                <div className='w-10/12 md:w-10/12 lg:w-10/12 md:mb-7'>
                  <div className='mt-2'>
                      <h1 className="text-4xl text-center sm:text-start font-bold text-sky-950">Creá un usuario</h1>
                      <p className='py-1 text-center sm:text-start text-sky-950 font-medium text-xl'>
                            Creá un nuevo usuario y agregalo al listado.
                        </p>
                  </div>
                  <form className='' onSubmit={onSubmit}>

                      <div className="grid-user">
                          <div>
                          <div className='flex flex-col'>
                          <label className='py-2 text-sm font-base text-sky-950'>Nombre</label>
                          <TextInput
                            id="name"
                            name="name"  
                            type="text"
                            value={name}
                            onChange={onInputChange}
                            placeholder="Ingresá tu nombre"
                            required
                          />
                      </div>
                      <div className='flex flex-col'>
                          <label className='py-2 text-sm font-base text-sky-950'>Usuario</label>
                          <TextInput
                            id="username"
                            name="username"  
                            type="text"
                            value={username}
                            onChange={onInputChange}
                            placeholder="Ingresá tu usuario"
                            required
                          />
                      </div>
                      <div className='flex flex-col'>
                          <label className='py-2 text-sm font-base text-sky-950'>Email</label>
                          <TextInput
                            id="email"
                            name="email"  
                            type="email"
                            value={email}
                            onChange={onInputChange}
                            placeholder="Ingresá tu email"
                            required
                          />
                      </div>
                      <div className='flex flex-col'>
                          <label className='py-2 text-sm font-base text-sky-950'>Edad</label>
                          <TextInput
                            id="eda"
                            name="eda"  
                            type="number"
                            value={eda}
                            onChange={onInputChange}
                            placeholder="Ingresá tu Edad"
                            required
                          />
                      </div>
                          </div>
                          <div>
                          <div className='flex flex-col'>
                          <label className='py-2 text-sm font-base text-sky-950'>Imagen URL</label>
                          <TextInput
                            id="image"
                            name="image"  
                            type="text"
                            value={image}
                            onChange={onInputChange}
                            placeholder="Pegá tu avatar"
                            required
                          />
                      </div>
                      <div className='flex flex-col'>
                          <label className='py-2 text-sm font-base text-sky-950'>Fecha Relevante</label>
                          <TextInput
                            id="fechaNacimiento"
                            name="fechaNacimiento"  
                            type="date"
                            value={fechaNacimiento}
                            onChange={onInputChange}
                            placeholder="Ingresa una fecha"
                            required
                          />
                      </div>
                      <div className='flex flex-col'>
                          <label className='py-2 text-sm font-base text-sky-950'>Gustos</label>
                          <TextInput
                            id="gustos"
                            name="gustos"  
                            type="text"
                            value={gustos}
                            onChange={onInputChange}
                            placeholder="Ingresá gustos separados por coma"
                            required
                          />
                      </div>
                      <div className='flex flex-col '>
                          <label className='py-2 text-sm font-base text-sky-950'>Comentario</label>
                          <Textarea
                            className="p-2"
                            id="comentario"
                            name="comentario"  
                            rows={2}
                            value={comentario}
                            onChange={onInputChange}
                            placeholder="Ingresá una breve comentario"
                            required
                          />
                      </div>
                      <div className="flex justify-end mt-5">
                        <Button type="submit" className="me-2 boton-azul">
                          CREAR
                        </Button>
                        <Button href={'/'} type="submit" className="bg-red-500 text-white boton-rojo">
                          CANCELAR
                        </Button>
                      </div>
                          </div>
                      </div>

                     
                      
                  </form>
                 
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
    </>
  );
};