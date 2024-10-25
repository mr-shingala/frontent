
import { Route, useNavigate } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Home from '../src/page/Home'
import './App.css'
import Navbar from './component/Navbar/Navbar';
import Login from './page/Login'
import SignUp from './page/SignUp'
import Deshboard from './page/Deshboard';
import Cart from './page/Cart';
import Forgot from './page/Forgot';
import ResetPassword from './page/ResetPassword';
import OtpVerification from './component/auth/OtpVerification';
import AboutUs from './page/AboutUs';
import Contextus from './page/Contextus';
import InvoiceDetails from './component/Dashboard/InvoiceDetails'
import Mycourses from './component/Dashboard/Mycourses'
import Addcouse from './component/Dashboard/Addcouse'
import EnrollCourses from './component/Dashboard/EnrollCourses'
import Schedule from './component/Dashboard/Schedule'
import Resources from './component/Dashboard/Resources'
import Communication from './component/Dashboard/Communication'
import EditProfile from './component/Dashboard/EditProfile';
import Notification from './component/Dashboard/Notification';
import GetProfile from './component/Dashboard/GetProfile';
import Setting from './component/Dashboard/Setting';
import DashHome from './component/Dashboard/DashHome';
import Modal from './component/Modal/Modal';
import Catelog from './page/Catelog';
import NotFound from './page/NotFound';
import { NavLink } from 'react-router-dom';
import DetailCourseDes from './page/DetailCourseDes';
import LerningCourse from './page/LerningCourse';
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import ProtectedRoute from './page/ProtectedRoute';
import ProtectedRoute2 from './page/ProtectedRoute2';
import Admin from './page/Admin';
import ProtecedIns from './page/ProtecedIns';
import IsStudet from './page/IsStudet';



function App() {

  const fleg = useSelector((state) => state.modal.fleg)
  const location = useLocation();


  const shouldHideNavbar = () => {
    // Regex pattern for dynamic routes
    const dynamicRoutes = [/^\/restpassword\/[a-f0-9]{40}$/];
    
    // Check if the current route matches any of the static routes or dynamic routes
    return (
     
      dynamicRoutes.some((route) => route.test(location.pathname))
    );
  };

  



  

  return (
    <div className={`relative ${fleg && 'h-screen overflow-y-hidden sm2:min-h-[200vh]'} ${ true && ''}`}>
      {/* navbar */}
      {!shouldHideNavbar()  && (
        <div>
          <Navbar />
        </div>
      )}


      <Routes>
        <Route path="/" element={<Home></Home>} />
      
        <Route path="/Login" element={<ProtectedRoute2><Login /></ProtectedRoute2>} />
        <Route path="/SignUp" element={<ProtectedRoute2><SignUp></SignUp></ProtectedRoute2>} />
        <Route path='/forgotpassword' element={<ProtectedRoute2><Forgot></Forgot></ProtectedRoute2>} />
        <Route path='/restpassword/:id' element={<ProtectedRoute2><ResetPassword></ResetPassword></ProtectedRoute2>} />
        <Route path='/otp-verification' element={<ProtectedRoute2><OtpVerification></OtpVerification></ProtectedRoute2>} />

        <Route path="/Contactus" element={<Contextus></Contextus>} />
        <Route path="/Catelog/:category" element={<Catelog></Catelog>} />
        <Route path="/Catelog/course/:id" element={<DetailCourseDes></DetailCourseDes>} />
        <Route path="/AboutUs" element={<AboutUs></AboutUs>} />
        <Route path="/Admin" element={<ProtectedRoute><Admin></Admin></ProtectedRoute>}></Route>
        <Route path="*" element={<NotFound></NotFound>} />

        <Route>
            <Route path='/lerning/course/:cid'  element={<ProtectedRoute><LerningCourse></LerningCourse></ProtectedRoute>}></Route>
        </Route>
 
        {/* remaing page or components */}
 
        <Route path="/dashboard" element={ <ProtectedRoute><Deshboard /></ProtectedRoute>}>
          <Route path='/dashboard' element={<ProtectedRoute><DashHome /></ProtectedRoute>} />
          <Route path='/dashboard/view Profile' element={<GetProfile></GetProfile>} />
          <Route path='/dashboard/Notification' element={<Notification></Notification>} />
          <Route path='/dashboard/Edit Profile' element={<EditProfile></EditProfile>} />
          <Route path='/dashboard/Communication' element={<Communication></Communication>} />
          <Route path='/dashboard/Resources' element={<Resources></Resources>} />
          <Route path='/dashboard/Schedule and Calendar' element={<Schedule></Schedule>} />
          <Route path='/dashboard/Enroll Courses' element={<IsStudet><EnrollCourses></EnrollCourses></IsStudet>} />
          <Route path='/dashboard/Add Course' element={<ProtecedIns><Addcouse></Addcouse></ProtecedIns>} />
          <Route path='/dashboard/My Courses' element={<ProtecedIns><Mycourses></Mycourses></ProtecedIns>} />
          <Route path='/dashboard/Invoice Details' element={<IsStudet><InvoiceDetails></InvoiceDetails></IsStudet>} />
          <Route path='/dashboard/Setting' element={<Setting></Setting>} />
        </Route>
        <Route path='/deshboard/cart' element={<ProtectedRoute><Cart></Cart></ProtectedRoute>} />

      </Routes>
      <Modal></Modal>
     
    </div>
  )
}

export default App
