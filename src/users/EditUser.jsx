import { useEffect, useState } from 'react';
import { Button,  TextInput, Textarea } from 'flowbite-react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Footer } from 'flowbite-react';
import { useMediaQuery } from '@react-hook/media-query';

export const EditUser = () => {
  const isScreenAbove968px = useMediaQuery('(min-width: 968px)');

  let navigate = useNavigate();

  const {id} = useParams();

  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    eda: '',
    image: '',
    fechaNacimiento: '',
    gustos: [],
    comentario: '',
  });

  const { name, username, email, eda, image, fechaNacimiento, gustos, comentario } = user;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: name === 'gustos' ? (value ? value.split(',').map(gusto => gusto.trim()) : []) : value || '',
    }));
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    await axios.put(`http://localhost:8080/user/${id}`, user)
    navigate("/");
  };

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/user/${id}`);
      const loadedUser = result.data;
  
      // Verificar si fechaNacimiento es null
      if (loadedUser.fechaNacimiento === null) {
        // Establecer un valor predeterminado, por ejemplo, una cadena vacía
        loadedUser.fechaNacimiento = '';
      }
  
      setUser(loadedUser);
    } catch (error) {
      console.error('Error al cargar el usuario:', error);
    }
  };

  return (
    <div className="container-custom-center">


          <div className='flex items-center justify-center w-full'>
                <div className='w-10/12 md:w-10/12 lg:w-10/12 mb-28 md:mb-7'>
                  <div className=''>
                      <h1 className="text-4xl text-center sm:text-start font-bold text-sky-950 my-3">Editar usuarix: {user.name}</h1>
                      {/* <p className='py-1 text-center sm:text-start text-sky-950 font-medium text-xl mb-1'>
                            Editá el usuario: 
                        </p> */}
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
                          <label className='py-2 text-sm font-base text-sky-950'>Avatar URL</label>
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
                          <label className='py-2 text-sm font-base text-sky-950'>Fecha de nacimiento</label>
                          <TextInput
                            id="fechaNacimiento"
                            name="fechaNacimiento"  
                            type="date"
                            value={fechaNacimiento}
                            onChange={onInputChange}
                            placeholder="Pegá tu avatar"
                            required
                          />
                      </div>
                      <div className='flex flex-col'>
                        <label className='py-2 text-sm font-base text-sky-950'>Gustos</label>
                        <Textarea
                          className="p-2"
                          id="gustos"
                          name="gustos"  
                          rows={1}
                          value={gustos.join(', ')}  // Convertir la lista de gustos a una cadena separada por comas
                          onChange={onInputChange}
                          placeholder="Ingresa tus gustos separados por comas"
                          required
                        />
                      </div>
                      <div className='flex flex-col'>
                          <label className='py-2 text-sm font-base text-sky-950'>Comentario</label>
                          <Textarea
                            className="p-2"
                            id="comentario"
                            name="comentario"  
                            rows={3}
                            value={comentario}
                            onChange={onInputChange}
                            placeholder="Ingresá una breve descripción"
                            required
                          />
                      </div>
                      <div className="flex justify-end mt-5">
                        <Button type="submit" className="me-2 boton-azul">
                          APLICAR
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
      {isScreenAbove968px && (
          <Footer container className="fixed bottom-0">
          <Footer.Copyright className="" href="#" by="Agustin Trezza Dev" year={2024} />
          <Footer.LinkGroup>
            <Footer.Link href="#">Nosotros</Footer.Link>
            <Footer.Link href="#">Políticas de Privacidad</Footer.Link>
            <Footer.Link href="#">Licencia</Footer.Link>
            <Footer.Link href="#">Contacto</Footer.Link>
          </Footer.LinkGroup>
        </Footer>
        ) }
      
      
    </div>
    // <div className="container-custom-center">
    // <div className='flex items-center justify-center w-full'>
    //       <div className='w-10/12 md:w-8/12 lg:w-5/12 mb-28 md:mb-7'>
    //         <div className='flex justify-between items-center'>
    //             <div>
    //               <h1 className="text-4xl text-center sm:text-start font-bold text-sky-950 pb-2">Editá el usuario</h1>

                  
    //                 <p className='py-1 text-center sm:text-start text-sky-950 font-medium text-xl mb-2 '>
    //                       Editar el usuario: {user.name}
    //                   </p>
                  
                  
    //             </div>
    //             <Link to={`/viewuser/${user.id}`}>
    //               <div className="cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
    //                 <img className="avatar-edit" src={user.image} alt="logo"/>           
    //               </div>
    //             </Link>
                
    //         </div>
    //         <form className='' onSubmit={onSubmit}>

    //                   <div className="grid-user">
    //                       <div>
    //                       <div className='flex flex-col py-1'>
    //                       <label className='py-2 text-sm font-base text-sky-950'>Nombre</label>
    //                       <TextInput
    //                         id="name"
    //                         name="name"  
    //                         type="text"
    //                         value={name}
    //                         onChange={onInputChange}
    //                         placeholder="Ingresá tu nombre"
    //                         required
    //                       />
    //                   </div>
    //                   <div className='flex flex-col py-1'>
    //                       <label className='py-2 text-sm font-base text-sky-950'>Usuario</label>
    //                       <TextInput
    //                         id="username"
    //                         name="username"  
    //                         type="text"
    //                         value={username}
    //                         onChange={onInputChange}
    //                         placeholder="Ingresá tu usuario"
    //                         required
    //                       />
    //                   </div>
    //                   <div className='flex flex-col py-1'>
    //                       <label className='py-2 text-sm font-base text-sky-950'>Email</label>
    //                       <TextInput
    //                         id="email"
    //                         name="email"  
    //                         type="email"
    //                         value={email}
    //                         onChange={onInputChange}
    //                         placeholder="Ingresá tu email"
    //                         required
    //                       />
    //                   </div>
    //                   <div className='flex flex-col py-1'>
    //                       <label className='py-2 text-sm font-base text-sky-950'>Edad</label>
    //                       <TextInput
    //                         id="eda"
    //                         name="eda"  
    //                         type="number"
    //                         value={eda}
    //                         onChange={onInputChange}
    //                         placeholder="Ingresá tu Edad"
    //                         required
    //                       />
    //                   </div>
    //                       </div>
    //                       <div>
    //                       <div className='flex flex-col py-1'>
    //                       <label className='py-2 text-sm font-base text-sky-950'>Avatar URL</label>
    //                       <TextInput
    //                         id="image"
    //                         name="image"  
    //                         type="text"
    //                         value={image}
    //                         onChange={onInputChange}
    //                         placeholder="Pegá tu avatar"
    //                         required
    //                       />
    //                   </div>
    //                   <div className='flex flex-col py-1'>
    //                       <label className='py-2 text-sm font-base text-sky-950'>Fecha de nacimiento</label>
    //                       <TextInput
    //                         id="fechaNacimiento"
    //                         name="fechaNacimiento"  
    //                         type="date"
    //                         value={fechaNacimiento}
    //                         onChange={onInputChange}
    //                         placeholder="Pegá tu avatar"
    //                         required
    //                       />
    //                   </div>
    //                   <div className='flex flex-col py-1'>
    //                       <label className='py-2 text-sm font-base text-sky-950'>Gustos</label>
    //                       <TextInput
    //                         id="gustos"
    //                         name="gustos"  
    //                         type="text"
    //                         value={gustos}
    //                         onChange={onInputChange}
    //                         placeholder="Pegá tu avatar"
    //                         required
    //                       />
    //                   </div>
    //                   <div className='flex flex-col py-1'>
    //                       <label className='py-2 text-sm font-base text-sky-950'>Comentario</label>
    //                       <Textarea
    //                         className="p-2"
    //                         id="comentario"
    //                         name="comentario"  
    //                         rows={3}
    //                         value={comentario}
    //                         onChange={onInputChange}
    //                         placeholder="Ingresá una breve descripción"
    //                         required
    //                       />
    //                   </div>
    //                   <div className="flex justify-end mt-3">
    //                     <Button type="submit" className="me-2 boton-azul">
    //                       CREAR
    //                     </Button>
    //                     <Button href={'/'} type="submit" className="bg-red-500 text-white boton-rojo">
    //                       CANCELAR
    //                     </Button>
    //                   </div>
    //                       </div>
    //                   </div>

                     
                      
    //               </form>
    //         {/* <form className='' onSubmit={onSubmit}>
    //             <div className='flex flex-col py-1'>
    //                 <label className='py-2 text-sm font-base text-sky-950'>Nombre</label>
    //                 <TextInput
    //                   id="name"
    //                   name="name"  
    //                   type="text"
    //                   value={name}
    //                   onChange={onInputChange}
    //                   placeholder="Ingresá tu nombre"
    //                   required
    //                 />
    //             </div>
    //             <div className='flex flex-col py-1'>
    //                 <label className='py-2 text-sm font-base text-sky-950'>Usuario</label>
    //                 <TextInput
    //                   id="username"
    //                   name="username"  
    //                   type="text"
    //                   value={username}
    //                   onChange={onInputChange}
    //                   placeholder="Ingresá tu usuario"
    //                   required
    //                 />
    //             </div>
    //             <div className='flex flex-col py-1'>
    //                 <label className='py-2 text-sm font-base text-sky-950'>Email</label>
    //                 <TextInput
    //                   id="email"
    //                   name="email"  
    //                   type="email"
    //                   value={email}
    //                   onChange={onInputChange}
    //                   placeholder="Ingresá tu email"
    //                   required
    //                 />
    //             </div>
    //             <div className='flex flex-col py-1'>
    //                 <label className='py-2 text-sm font-base text-sky-950'>Edad</label>
    //                 <TextInput
    //                   id="eda"
    //                   name="eda"  
    //                   type="number"
    //                   value={eda}
    //                   onChange={onInputChange}
    //                   placeholder="Ingresá tu Edad"
    //                   required
    //                 />
    //             </div>
    //             {/* <div className='flex flex-col py-1'>
    //                 <label className='py-2 text-sm font-base text-sky-950'>Avatar</label>
    //                 <TextInput
    //                   id="image"
    //                   name="image"  
    //                   type="text"
    //                   value={image}
    //                   onChange={onInputChange}
    //                   placeholder="Ingresá una URL válida."
    //                   required
    //                 />
    //             </div> */}
    //             {/* <div className="flex justify-end mt-3">
    //               <Button type="submit" className="me-2 boton-azul">
    //                 APLICAR
    //               </Button>
    //               <Button href={'/'} type="submit" className="bg-red-500 text-white boton-rojo">
    //                 CANCELAR
    //               </Button>
    //             </div>
    //         </form> */}
           
    //       </div> 
    
    //   </div>
    //   </div>
  );
};