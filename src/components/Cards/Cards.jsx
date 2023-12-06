import { Card } from 'flowbite-react';
import axios from 'axios';
// import logo from '../../assets/react.svg';
import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {Link} from 'react-router-dom';

export const Cards = () => {

  // const {id} = useParams();

  const [users, setUsers] = useState([]);

    if(users) {
      console.log(users)
    }

  const loadUser = async () => {
    try {
        const result = await axios.get(`http://localhost:8080/users`);
        setUsers(result.data);
    } catch (error) {
        console.error("Error fetching user:", error);
    }
};

  useEffect(()=> {
      loadUser();
  }, [])
  return (
    <div>
       <div>
        <h1 className="text-4xl text-center sm:text-start font-bold text-sky-950 pb-1 mt-10">Listado de Usuarios en Tarjetas</h1>
      </div>
    <div className="custom-grid">
     
      {Array.isArray(users) &&
        users.map((user) => (
          
          <Link to={`/viewuser/${user.id}`} key={user.id}>
          <Card  className="max-w-sm card-custom mt-10 cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
            {/* <div className="flex gap-5 justify-end">
              <Dropdown inline label="">
                <Dropdown.Item>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Editar
                  </a>
                </Dropdown.Item>
                <Dropdown.Item>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Eliminar
                  </a>
                </Dropdown.Item>
              </Dropdown>
            </div> */}
            <div className="flex flex-col items-center">
              <img className="avatar-2" src={user.image}/>
              {/* <span className="text-sm text-gray-500 dark:text-gray-400">{index + 1}</span> */}

              <div>
                <div className="flex justify-center items-center py-4">
                  <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">{user.name}</h5>          
                </div>
                <div className="flex flex-col justify-center items-center gap-1">
                  <span className="text-md text-gray-500 dark:text-gray-400">user: <span className="resaltado-card dark:text-white">{user.username}</span></span>
                  <span className="text-md text-gray-500 dark:text-gray-400">edad: <span className="resaltado-card dark:text-white">{user.eda}</span></span>
                  <span className="text-md text-gray-500 dark:text-gray-400">correo: <span className="resaltado-card dark:text-white">{user.email}</span></span>
                </div>
                
                <div className="mt-4 flex space-x-3 lg:mt-6">
                </div>
              </div>
              
            </div>
          </Card>
          </Link>
          
        ))}
    </div>
    </div>
  )
}


