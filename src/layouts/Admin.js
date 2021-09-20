import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core ../components
import { makeStyles } from "@material-ui/core/styles";
// core ../components
import Navbar from "../components/Navbars/Navbar.js";
import Footer from "../components/Footer/Footer.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin.js";

import routes from "../routes.js";

import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "../assets/img/sidebar-2.jpg";
import saffbg from "../assets/img/saffron-building.jpg"
import logo from "../assets/img/reactlogo.png";
import Saffronlogo from "../assets/img/saffronLogo.png";

import ApiTest from "../views/apitest.js";
import RMDemand from "../views/RM/RM_Demand.js";
import IGPNote from "../views/RM/RM_IGP.js";
import GenerateGRN from "../views/RM/RM_GRN.js";
import PostGRN from "../views/RM/RM_Post_GRN.js";

//PM 
import PM_Demand from "../views/PM/PM_Demand.js";
import PM_IGPNote from "../views/PM/PM_IGP.js";
import PM_GenerateGRN from "../views/PM/PM_GRN.js";
import PM_PostGRN from "../views/PM/PM_Post_GRN.js";



import ProtectedRoute from "../components/ProtectedRoute.js"
import auth from "../Services/auth/login.js";
import MateriaPlan from "../views/Planning/MaterialPlan.js";
import ProductionPlan from "../views/Planning/ProductionPlan";
import ProductsSelection from "../views/Planning/ProductsSelection";

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/saffron") {
        return (
          <ProtectedRoute
            path={prop.layout + prop.path}
            component={prop.component}
            role={prop.role}

          />
        );
      }
      return null;
    })}
    
    {/* <ProtectedRoute path="/saffron/apitest" component={ApiTest} role="Admin"/>

    RM Routes 
    <ProtectedRoute path="/saffron/RM/GRN"  component={GenerateGRN} role="Store"/>
    <ProtectedRoute path="/saffron/RM/Demand"   component={RMDemand} role="Store"/>
    <ProtectedRoute path="/saffron/RM/IGP" component={IGPNote}  role="Store"/>
    <ProtectedRoute path="/saffron/RM/PostGRN" component={PostGRN}  role="Store"/>

    PM routes
    <ProtectedRoute path="/saffron/PM/Demand" component={PM_Demand} role="Store" />
    <ProtectedRoute path="/saffron/PM/IGP" component={PM_IGPNote}  role="Store"/>
    <ProtectedRoute path="/saffron/PM/PostGRN" component={PM_PostGRN}  role="Store"/>
    <ProtectedRoute path="/saffron/PM/GRN" component={PM_GenerateGRN} role="Store"/>
    
    planning routes
    <ProtectedRoute path="/saffron/planning/material" component={MateriaPlan }   role="Admin"/>
    <ProtectedRoute path="/saffron/planning/production"component={ProductionPlan } role="Admin" />
    <ProtectedRoute path="/saffron/planning/selection" component={ProductsSelection}  role="Admin"/> */}

    {/* <Redirect from="/saffron" to="/saffron/dashboard" /> */}
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(saffbg);
  const [color, setColor] = React.useState("blue");
  // const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
 
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"Saffron"}
        logo={Saffronlogo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel} style={{backgroundColor:"#e2e2e2",height:"100%"}}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}> {switchRoutes}</div>
        )}
        {/* {getRoute() ? <Footer /> : null} */}
        {/* <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        /> */}
      </div>
    </div>
  );
}
