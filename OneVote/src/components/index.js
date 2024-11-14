import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import About from "./About/About";
import User from "./User/User"
import Extra from "./Footer/Extra";
import Login from "./Registeration/Login/Login";
import SignUp from "./Registeration/SignUp/SignUp";
import Profile from "./Profile/Profile";
import Hero from "./Hero/Hero";
import Result from "./Result/Result";
import Modal from "./Modal/Modal";
import FaceCapture from "./FaceCapture/FaceCapture";
import FaceCaptureModal from "./Modal/FaceCaptureModal";

const apiUrl = import.meta.env.VITE_BASE_URL_PROD;
// const apiUrl = import.meta.env.VITE_BASE_URL_DEV;

export {Header,Footer , Home,About , User,Extra, Login, SignUp , Profile , Hero , Result , Modal , FaceCapture , FaceCaptureModal , apiUrl};