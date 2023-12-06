import './App.css';
import 'react-tippy/dist/tippy.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { MyNavbar } from './layout/Navbar'; 
// import { MyFooter } from './components/Footer/Footer.jsx'; 
import { Home } from './pages/Home.jsx'
import { AddUser } from './users/AddUser.jsx'
import { EditUser } from './users/EditUser.jsx'
import { ViewUser } from './users/ViewUser.jsx';

function App() {
  return (
    <>
    <Router>

      <MyNavbar/>

        <Routes>
          <Route exact path="/adduser" element={<AddUser/>}></Route>
          <Route exact path="/edituser/:id" element={<EditUser/>}></Route>
          <Route exact path="/viewuser/:id" element={<ViewUser/>}></Route>

          <Route exact path="/" element={<Home/>}></Route>
        </Routes>

      {/* <MyFooter/> */}

    </Router>
      
    </>
  );
}

export default App;
