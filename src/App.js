import HospitalInterface from "./Component/HospitalInterface";
import DisplayHospital from "./Component/DisplayHospital";
import StateInterface from "./Component/StateInterface";
import DisplayState from "./Component/DisplayState";
import CityInterface from "./Component/CityInterface";
import DisplayCity from "./Component/DisplayCity"
import FoodProviderInterface from "./Component/FoodProviderInterface";
import DisplayFoodProvider from "./Component/DisplayFoodProvider"
import FoodTypesInterface from "./Component/FoodTypesInterface";
import DisplayAllFoodTypes from "./Component/DisplayAllFoodTypes"
import DaysInterface from "./Component/DaysInterface";
import DisplayAllDays from "./Component/DisplayAllDays";
import RoomsInterface from "./Component/RoomsInterface";
import DisplayRooms from "./Component/DisplayRooms";
import RoomTypesInterface from "./Component/RoomTypesInterface";
import DisplayRoomTypes from "./Component/DisplayRoomTypes";
import NgoInterface from "./Component/NgoInterface";
import DisplayNgo from "./Component/DisplayNgo";
import NgoWorkInterface from "./Component/NgoWorkInterface";
import DisplayNgoWork from "./Component/DisplayNgoWork";
import NewsAgencyInterface from "./Component/NewsAgencyInterface";
import DisplayNewsAgency from "./Component/DisplayNewsAgency";
import NewsInterface from "./Component/NewsInterface";
import DisplayNews from "./Component/DisplayNews";
import SupplierCategoryInterface from "./Component/SupplierCategoryInterface";
import DisplaySupplierCategory from "./Component/DisplaySupplierCategory";
import SupplierInterface from "./Component/SupplierInterface";
import DisplaySupplier from "./Component/DisplaySupplier";
import SupplierProducts from "./Component/SupplierProducts";
import DisplaySupplierProducts from "./Component/DisplaySupplierProducts";
import Request from "./Component/Request";
import DisplayRequest from "./Component/DisplayRequest";

import AdminDashBoard from "./Component/AdminDashBoard";
import AdminLogin from "./Component/AdminLogin"
import ListItems from "./Component/ListItems"
import HospitalDashboard from "./Component/HospitalDashboard";
import HospitalLogin from "./Component/HospitalLogin"
import HospitalListItems from "./Component/HospitalListItems"
import FoodDashboard from "./Component/FoodDashboard";
import FoodLogin from "./Component/FoodLogin"
import FoodListItems from "./Component/FoodListItems"
import NewsDashBoard from "./Component/NewsDashBoard";
import NewsLogIn from "./Component/NewsLogIn"
import NewsListItems from "./Component/NewsListItems"
import NgoDashboard from "./Component/NgoDashboard";
import NgoLogIn from "./Component/NgoLogIn"
import NgoListItems from "./Component/NgoListItems"
import SupplierDashBoard from "./Component/SupplierDashBoard";
import SupplierLogin from "./Component/SupplierLogin"
import ListSupplier from "./Component/ListSupplier"
import SliderImages from "./Component/SliderImages"
import DisplaySlider from "./Component/DisplaySlider"
import FoodSlider from "./Component/FoodSlider"
import Displayfoodslider from "./Component/Displayfoodslider"
import Displaygallery from "./Component/Displaygallery";
import Gallery from "./Component/Gallery";
import Contact from "./Component/ClientView/Contact"
import Tips from "./Component/Tips"
import Displaytips from "./Component/Displaytips"
import About from "./Component/About"
import Displayabout from "./Component/Displayabout"


import Footer from "./Component/ClientView/Footer"
import Home from "./Component/ClientView/Home"
import AllFoodProvider from "./Component/ClientView/AllFoodProvider"
import PerticularFoodProvider from "./Component/ClientView/PerticularFoodProvider"
import Header from "./Component/ClientView/Header"
import Description from "./Component/ClientView/Description"
import Showgallery from "./Component/ClientView/Showgallery"
import Qtyspinner from "./Component/ClientView/Qtyspinner";
import Abouts from "./Component/ClientView/Abouts";

import {BrowserRouter as Router,Route} from "react-router-dom"


function App(props) {
  return (
    <div>
      <Router>

      <Route
        strict
        exact
        component={Abouts}
        path="/abouts"
        history={props.history}>
        </Route>

      <Route
        strict
        exact
        component={Qtyspinner}
        path="/qtyspinner"
        history={props.history}>
        </Route>

      <Route
        strict
        exact
        component={Displayabout}
        path="/displayabout"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={About}
        path="/about"
        history={props.history}>
        </Route>


      <Route
        strict
        exact
        component={Displaytips}
        path="/displaytips"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={Tips}
        path="/tips"
        history={props.history}>
        </Route>


      <Route
        strict
        exact
        component={Contact}
        path="/contact"
        history={props.history}>
        </Route>

      <Route
        strict
        exact
        component={Showgallery}
        path="/showgallery"
        history={props.history}>
        </Route>

      <Route
        strict
        exact
        component={Gallery}
        path="/gallery"
        history={props.history}>
        </Route>

      <Route
        strict
        exact
        component={Displaygallery}
        path="/displaygallery"
        history={props.history}>
        </Route>

      <Route
        strict
        exact
        component={Displayfoodslider}
        path="/displayfoodslider"
        history={props.history}>
        </Route>


      <Route
        strict
        exact
        component={FoodSlider}
        path="/foodslider"
        history={props.history}>
        </Route>


      <Route
        strict
        exact
        component={DisplaySlider}
        path="/displayslider"
        history={props.history}>
        </Route>


      <Route
        strict
        exact
        component={SliderImages}
        path="/sliderimages"
        history={props.history}>
        </Route>

      <Route
        strict
        exact
        component={Description}
        path="/description"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={Header}
        path="/header"
        history={props.history}>
        </Route>

      <Route
        strict
        exact
        component={PerticularFoodProvider}
        path="/perticularfood"
        history={props.history}>
        </Route>

      <Route
        strict
        exact
        component={AllFoodProvider}
        path="/allfoodprovider"
        history={props.history}>
        </Route>

      <Route
        strict
        exact
        component={Home}
        path="/home"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={HospitalInterface}
        path="/hospitalinterface"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={DisplayHospital}
        path="/displayhospital"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={StateInterface}
        path="/stateinterface"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={DisplayState}
        path="/displaystate"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={CityInterface}
        path="/cityinterface"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={DisplayCity}
        path="/displaycity"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={FoodProviderInterface}
        path="/foodproviderinterface"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={DisplayFoodProvider}
        path="/displayfoodProvider"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={FoodTypesInterface}
        path="/foodtypesinterface"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={DisplayAllFoodTypes}
        path="/displayfoodtypes"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={DaysInterface}
        path="/daysinterface"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={DisplayAllDays}
        path="/displayalldays"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={RoomsInterface}
        path="/roomsinterface"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={DisplayRooms}
        path="/displayrooms"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={RoomTypesInterface}
        path="/roomtypesinterface"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={DisplayRoomTypes}
        path="/displayroomtypes"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={NgoInterface}
        path="/ngointerface"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={DisplayNgo}
        path="/displayngo"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={NgoWorkInterface}
        path="/ngoworkinterface"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={DisplayNgoWork}
        path="/displayngowork"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={NewsAgencyInterface}
        path="/newsagencyinterface"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={DisplayNewsAgency}
        path="/displaynewsagency"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={NewsInterface}
        path="/newsinterface"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={DisplayNews}
        path="/displaynews"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={SupplierCategoryInterface}
        path="/suppliercategoryinterface"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={DisplaySupplierCategory}
        path="/displaysuppliercategory"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={SupplierInterface}
        path="/supplierinterface"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={DisplaySupplier}
        path="/displaysupplier"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={SupplierProducts}
        path="/supplierproducts"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={DisplaySupplierProducts}
        path="/displaysupplierproducts"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={Request}
        path="/request"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={DisplayRequest}
        path="/displayrequest"
        history={props.history}>
        </Route>






        <Route
        strict
        exact
        component={AdminDashBoard}
        path="/admindashboard"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={AdminLogin}
        path="/adminlogin"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={ListItems}
        path="/listitems"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={HospitalDashboard}
        path="/hospitaldashboard"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={HospitalLogin}
        path="/hospitallogin"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={HospitalListItems}
        path="/hospitallistitems"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={FoodDashboard}
        path="/fooddashboard"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={FoodLogin}
        path="/foodlogin"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={FoodListItems}
        path="/foodlistitems"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={NewsDashBoard}
        path="/newsdashboard"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={NewsLogIn}
        path="/newslogin"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={NewsListItems}
        path="/newslistitems"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={NgoDashboard}
        path="/ngodashboard"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={NgoLogIn}
        path="/ngologin"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={NgoListItems}
        path="/ngolistitems"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={SupplierDashBoard}
        path="/supplierdashboard"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={SupplierLogin}
        path="/Supplierlogin"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={ListSupplier}
        path="/listsupplier"
        history={props.history}>
        </Route>



        <Route
        strict
        exact
        component={Footer}
        path="/footer"
        history={props.history}>
        </Route>


      </Router>
      
    </div>
    
  );
}

export default App;
