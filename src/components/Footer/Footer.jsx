import { Footer } from 'flowbite-react';
import logoJava from '../../assets/logo-java.png'
import { FaReact } from "react-icons/fa";

export const MyFooter = () => {
  return (
    <Footer container className='rounded-none py-2 footer'>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          {/* <h1 className="text-yellow-400 text-2xl font-bold">Agustin Trezza</h1> */}
          <div className="flex items-center justify-between gap-5 ">
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
        <Footer.Copyright href="#" by="Agustin Trezza Dev™" year={2023} />
      </div>
    </Footer>
  )
}

