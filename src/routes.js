/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import FilterFramesIcon from '@material-ui/icons/FilterFrames';

// core components/views for Admin layout
import AddUser from "./views/Dashboard.js";
import ApiTest from "./views/apitest.js";
import test from "./views/test.js";
import login from "./components/login.js";
import RawMaterialDemand from "./views/RM/RM_Demand.js";
import { RemoveFromQueue } from "@material-ui/icons";
import RM_IGP from "./views/RM/RM_IGP.js";
import RM_GRN from "./views/RM/RM_GRN.js";
import RM_Post_GRN from "./views/RM/RM_Post_GRN.js";

import planning from "./views/Planning/planning";

//packing mterial Routes
import PMDemand from "./views/PM/PM_Demand.js";
import PM_IGP from "./views/PM/PM_IGP.js";
import PM_GRN from "./views/PM/PM_GRN.js";
import PM_Post_GRN from "./views/PM/PM_Post_GRN.js";
// import StoreDashboard from "./views/PM/Dashboard";

//QC
import BlockAnalyst from './views/QC/AnalystBlocking/BlockAnalyst.js'
// QC dash
import QCDashboard from './views/QC/Dashboard'

// QC View
import RMViewSpecifications from './views/QC/ViewSpecifications/RawMaterialSpecifications'
import PMViewSpecifications from './views/QC/ViewSpecifications/PackingMaterialSpecifications'
import ProdViewSpecifications from './views/QC/ViewSpecifications/ProductSpecifications'
// QC New
import RMNewSpecifications from './views/QC/NewSpecifications/RMNewSpecifications'
import PMNewSpecifications from './views/QC/NewSpecifications/PMNewSpecifications'
import ProdNewSpecifications from './views/QC/NewSpecifications/ProdNewSpecifications'
// QC Edit
import RMEditSpecifications from './views/QC/EditSpecifications/RMEditSpecifications'
import PMEditSpecifications from './views/QC/EditSpecifications/PMEditSpecifications'
import ProdEditSpecifications from './views/QC/EditSpecifications/ProdEditSpecifications'
//QC Sample
import RMSampleAssignment from './views/QC/SampleAssignment/SampleAssignmentRaw'
import PMSampleAssignment from './views/QC/SampleAssignment/SampleAssignmentPM'
import ProdSampleAssignment from './views/QC/SampleAssignment/SampleAssignmentProd'

// Results Loading

import RMPendingReports from "./views/QC/ResultsLoading/RMPendingReports";
import ProductPendingReports from "./views/QC/ResultsLoading/ProductPendingReport";

import PMPendingReports from "./views/QC/ResultsLoading/PMPendingReports";
import DataEntryOfTestResults from "./views/QC/ResultsLoading/DataEntryOfTestResults";
import PMDataEntry from "./views/QC/ResultsLoading/PMDataEntry";
import ProductDataEntry from "./views/QC/ResultsLoading/ProductDataEntry";

// COA
import COARM from "./views/QC/COAApproval/COARM";
import COAPM from "./views/QC/COAApproval/COAPM";
import COAProduct from "./views/QC/COAApproval/COAProduct";

// DA
import DARM from "./views/QC/DataAnalysis/DARM";
import DAPM from "./views/QC/DataAnalysis/DAPM";
import DAProduct from "./views/QC/DataAnalysis/DAProduct";
// import TableList from "views/TableList/TableList.js";
// import Typography from "views/Typography/Typography.js";
//import Icons from "views/Icons/Icons.js";
// import Maps from "views/Maps/Maps.js";
// import NotificationsPage from "views/Notifications/Notifications.js";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// // core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.js";

// Production
import RFBatchIss from "./views/Production/ReqForBatchIssuence";

import BatchTaP from "./views/Production/BatchTaP";
import LCR from "./views/Production/LineClearanceRequest"
import DailyPacking from "./views/Production/DailyPacking"
import CloseOrder from "./views/Production/CloseOrders.js"
import RMAssessment from "./views/Production/RMAssessment.js"
import PMNewFormulation from "./views/Production/PMNewFormulation"
//Line Clearance
// import LCR from "./views/LineClearance/LineClearanceRequest";


// QA
import IBatchNo from "./views/QA/issueBtachNo";
import RMSample from  "./views/QA/Sample/RMSamplingLog"
import RMNewFormula from "./views/QA/RMNewFormulation"
import NC from "./views/QA/NonConformance"
import addProduct from "./views/QA/addaproduct"
import addRM from "./views/QA/addrawmaterial"
import batchDeviation from "./views/QA/BatchDeviationForm"
import changeControl from "./views/QA/ChangeControl"
import CloseBatch from "./views/QA/CloseBatch"
import ViewProduct from "./views/QA/ViewProduct"
import ViewRM from "./views/QA/ViewRawMaterial"
import batchReview from "./views/QA/batchReview"
import AddPackSize from "./views/QA/AddPackSize"


//------------------ Admin Routes ------------------------ 

const dashboardRoutes = [
	{
		path: "/dashboard",
		name: "Dashboard",
		icon: Dashboard,
		component: AddUser,

		layout: "/saffron",
		role: "Admin",
	},

	//--------------------Store Routes -----------------------------

	//planning

	// {
	//   path: "/PM/Dashboard",
	//   name: "DashBoard",
	//   icon: Dashboard,
	//   component: StoreDashboard ,
	//   layout: "/saffron",
	//   role:"Store"
	// },

	{
		path: "/planning",
		name: "Planning ",
		icon: FilterFramesIcon,
		component: planning,
		layout: "/saffron",
		role: "Store",
	},

	{
		path: "/RM/Demand",
		name: "RM Demand Form",
		icon: FilterFramesIcon,
		component: RawMaterialDemand,
		layout: "/saffron",
		role: "Store",
	},
	{
		path: "/RM/IGP",
		name: "RM IGP Note",
		icon: FilterFramesIcon,
		// RM IGP Form
		component: RM_IGP,
		layout: "/saffron",
		role: "Store",
	},
	{
		path: "/RM/GRN",
		name: "RM Generate GRN",
		icon: FilterFramesIcon,
		component: RM_GRN,
		layout: "/saffron",
		role: "Store",
	},
	{
		path: "/RM/PostGRN",
		name: "RM Post GRN",
		icon: FilterFramesIcon,
		component: RM_Post_GRN,
		layout: "/saffron",
		role: "Store",
	},

	// Packing material

	{
		path: "/PM/Demand",
		name: "PM Demand Form",
		icon: FilterFramesIcon,
		component: PMDemand,
		layout: "/saffron",
		role: "Store",
	},

	{
		path: "/PM/IGP",
		name: "PM IGP Note",
		icon: FilterFramesIcon,
		// RM IGP Form
		component: PM_IGP,
		layout: "/saffron",
		role: "Store",
	},
	{
		path: "/PM/GRN",
		name: "PM Generate GRN",
		icon: FilterFramesIcon,
		component: PM_GRN,
		layout: "/saffron",
		role: "Store",
	},
	{
		path: "/PM/PostGRN",
		name: "PM Post GRN",
		icon: FilterFramesIcon,
		component: PM_Post_GRN,
		layout: "/saffron",
		role: "Store",
	},

	//APi test
	{
		path: "/apitest",
		name: "My Api Tests",
		icon: LibraryBooks,
		component: ApiTest,
		layout: "/saffron",
		role: "Admin",
	},

	//--------------------QC---------------

	// Dashboard
	{
		path: "/QC/dashboard",
		name: "Dasboard",
		icon: Dashboard,
		component: QCDashboard,
		layout: "/saffron",
		role: "Quality Control",
	},
	//Block analyst
	{
		path: "/QC/blockanalyst",
		name: "Block Analyst",
		icon: LibraryBooks,
		component: BlockAnalyst,
		layout: "/saffron",
		role: "Quality Control",
	},

	// View
	{
		path: "/QC/RM/view-specs",
		name: "RM View Specs",
		icon: LibraryBooks,
		component: RMViewSpecifications,
		layout: "/saffron",
		role: "Quality Control",
	},
	{
		path: "/QC/PM/view-specs",
		name: "PM View Specs",
		icon: LibraryBooks,
		component: PMViewSpecifications,
		layout: "/saffron",
		role: "Quality Control",
	},
	{
		path: "/QC/Product/view-specs",
		name: "View Product Specs",
		icon: LibraryBooks,
		component: ProdViewSpecifications,
		layout: "/saffron",
		role: "Quality Control",
	},
	// New
	{
		path: "/QC/RM/new-specs",
		name: "RM New Specs",
		icon: LibraryBooks,
		component: RMNewSpecifications,
		layout: "/saffron",
		role: "Quality Control",
	},
	{
		path: "/QC/PM/new-specs",
		name: "PM New Specs",
		icon: LibraryBooks,
		component: PMNewSpecifications,
		layout: "/saffron",
		role: "Quality Control",
	},
	{
		path: "/QC/Product/new-specs",
		name: "Prod New Specs",
		icon: LibraryBooks,
		component: ProdNewSpecifications,
		layout: "/saffron",
		role: "Quality Control",
	},
	// Edit
	{
		path: "/QC/RM/edit-specs",
		name: "RM Edit Specs",
		icon: LibraryBooks,
		component: RMEditSpecifications,
		layout: "/saffron",
		role: "Quality Control",
	},
	{
		path: "/QC/PM/edit-specs",
		name: "PM Edit Specs",
		icon: LibraryBooks,
		component: PMEditSpecifications,
		layout: "/saffron",
		role: "Quality Control",
	},
	{
		path: "/QC/Product/edit-specs",
		name: "Prod Edit Specs",
		icon: LibraryBooks,
		component: ProdEditSpecifications,
		layout: "/saffron",
		role: "Quality Control",
	},
	// Sample Assignment
	{
		path: "/QC/RM/sample-assignment",
		name: "RM Sample",
		icon: LibraryBooks,
		component: RMSampleAssignment,
		layout: "/saffron",
		role: "Quality Control",
	},
	{
		path: "/QC/PM/sample-assignment",
		name: "PM Sample",
		icon: LibraryBooks,
		component: PMSampleAssignment,
		layout: "/saffron",
		role: "Quality Control",
	},
	{
		path: "/QC/product/sample-assignment",
		name: "Product Sample",
		icon: LibraryBooks,
		component: ProdSampleAssignment,
		layout: "/saffron",
		role: "Quality Control",
	},

	//ResultsLoading
	{
		path: "/QC/RM/pending-reports",
		name: "RM Pending Reports",
		icon: LibraryBooks,
		component: RMPendingReports,
		layout: "/saffron",
		role: "QC_Analyst",
	},
	{
		path: "/QC/PM/pending-reports",
		name: "PM Pending Reports",
		icon: LibraryBooks,
		component: PMPendingReports,
		layout: "/saffron",
		role: "QC_Analyst",
	},
	{
		path: "/QC/Product/pending-reports",
		name: "Product Pending Reports",
		icon: LibraryBooks,
		component: ProductPendingReports,
		layout: "/saffron",
		role: "QC_Analyst",
	},
	{
		path: "/QC/RM/data-entry",
		name: "Data Entry of RM",
		icon: LibraryBooks,
		component: DataEntryOfTestResults,
		layout: "/saffron",
		role: "QC_Analyst",
	},
	{
		path: "/QC/PM/data-entry",
		name: "Data Entry of PM",
		icon: LibraryBooks,
		component: PMDataEntry,
		layout: "/saffron",
		role: "QC_Analyst",
	},
	{
		path: "/QC/product/data-entry",
		name: "Product Data Entry",
		icon: LibraryBooks,
		component: ProductDataEntry,
		layout: "/saffron",
		role: "QC_Analyst",
	},

	//COA
	{
		path: "/QC/RM/COA",
		name: "COA RM",
		icon: LibraryBooks,
		component: COARM,
		layout: "/saffron",
		role: "Quality Control",
	},
	{
		path: "/QC/PM/COA",
		name: "COA PM",
		icon: LibraryBooks,
		component: COAPM,
		layout: "/saffron",
		role: "Quality Control",
	},
	{
		path: "/QC/product/COA",
		name: "COA Product",
		icon: LibraryBooks,
		component: COAProduct,
		layout: "/saffron",
		role: "Quality Control",
	},
	//DA
	{
		path: "/QC/RM/data-analysis",
		name: "RM Data Aanlysis",
		icon: LibraryBooks,
		component: DARM,
		layout: "/saffron",
		role: "Quality Control",
	},
	{
		path: "/QC/PM/data-analysis",
		name: "PM Data Aanlysis",
		icon: LibraryBooks,
		component: DAPM,
		layout: "/saffron",
		role: "Quality Control",
	},

	{
		path: "/QC/Product/data-analysis",
		name: "Product Data Aanlysis",
		icon: LibraryBooks,
		component: DAProduct,
		layout: "/saffron",
		role: "Quality Control",
	},

	//Production
	{
		path: "/production/batch/request",
		name: "Req Batch Issuence",
		icon: LibraryBooks,
		component: RFBatchIss,
		layout: "/saffron",
		role: "Production",
	},
	// {
	//   path: "/production/batch/issue",
	//   name: "Issue Batch No",
	//   icon: LibraryBooks,
	//   component: IBatchNo,
	//   layout: "/saffron",
	//   role: "Quality Control",
	// },
	{
		path: "/production/batch/track",
		name: "Batch Track",
		icon: LibraryBooks,
		component: BatchTaP,
		layout: "/saffron",
		role: "Production",
	},
	//Line Clearance
	{
		path: "/production/lc-request",
		name: "LC Requests",
		icon: LibraryBooks,
		component: LCR,
		layout: "/saffron",
		role: "Production",
	},
	{
		path: "/production/daily-packing",
		name: "Daily Packing",
		icon: LibraryBooks,
		component: DailyPacking,
		layout: "/saffron",
		role: "Production",
	},
	{
		path: "/production/order",
		name: "Close Order",
		icon: LibraryBooks,
		component: CloseOrder,
		layout: "/saffron",
		role: "Production",
	},
	{
		path: "/production/RM/Assessment",
		name: "RM Assessment",
		icon: LibraryBooks,
		component: RMAssessment,
		layout: "/saffron",
		role: "Production",
	},
	{
		path: "/production/pm/new",
		name: "PM New Formulation",
		icon: LibraryBooks,
		component: PMNewFormulation,
		layout: "/saffron",
		role: "Production",
	},

	//Quality Assurance

	{
		path: "/QA/batch/issue",
		name: "Issue Batch No",
		icon: LibraryBooks,
		component: IBatchNo,
		layout: "/saffron",
		role: "Quality Assurance",
		showNav: true,
	},
	{
		path: "/QA/RM/sample",
		name: "RM Sample",
		icon: LibraryBooks,
		component: RMSample,
		layout: "/saffron",
		role: "Quality Assurance",
		showNav: true,
	},
	{
		path: "/QA/formulation/add",
		name: "New Formulation",
		icon: LibraryBooks,
		component: RMNewFormula,
		layout: "/saffron",
		role: "Quality Assurance",
		showNav: true,
	},
	// {
	//   path: "/QA/formulation/edit",
	//   name: "Edit Formulation",
	//   icon: LibraryBooks,
	//   component: IBatchNo,
	//   layout: "/saffron",
	//   role: "Quality Assurance",
	//	 showNav: true
	// },
	{
		path: "/QA/non-conformance",
		name: "Non Conformance",
		icon: LibraryBooks,
		component: NC,
		layout: "/saffron",
		role: "Quality Assurance",
		showNav: true,
	},
	{
		path: "/QA/product/add",
		name: "Add Product",
		icon: LibraryBooks,
		component: addProduct,
		layout: "/saffron",
		role: "Quality Assurance",
		showNav: true,
	},
	{
		path: "/QA/RM/add",
		name: "Add RM",
		icon: LibraryBooks,
		component: addRM,
		layout: "/saffron",
		role: "Quality Assurance",
		showNav: true,
	},
	{
		path: "/QA/packSize/add",
		name: "Add Pack Size",
		icon: LibraryBooks,
		component: AddPackSize,
		layout: "/saffron",
		role: "Quality Assurance",
		showNav: true,
	},
	{
		path: "/QA/batch-deviation",
		name: "Batch Deviation",
		icon: LibraryBooks,
		component: batchDeviation,
		layout: "/saffron",
		role: "Quality Assurance",
		showNav: true,
	},
	{
		path: "/QA/change-control",
		name: "Change Control",
		icon: LibraryBooks,
		component: changeControl,
		layout: "/saffron",
		role: "Quality Assurance",
		showNav: true,
	},
	{
		path: "/QA/print-change-control",
		name: "Print Change Control",
		icon: LibraryBooks,
		component: changeControl,
		layout: "/saffron",
		role: "Quality Assurance",
		showNav: false,
	},
	{
		path: "/QA/close-batch",
		name: "Close Batch",
		icon: LibraryBooks,
		component: CloseBatch,
		layout: "/saffron",
		role: "Quality Assurance",
		showNav: true,
	},
	{
		path: "/QA/product/view",
		name: "View Products",
		icon: LibraryBooks,
		component: ViewProduct,
		layout: "/saffron",
		role: "Quality Assurance",
		showNav: true,
	},
	{
		path: "/QA/RM/view",
		name: "View RM",
		icon: LibraryBooks,
		component: ViewRM,
		layout: "/saffron",
		role: "Quality Assurance",
		showNav: true,
	},
	{
		path: "/QA/batch-review",
		name: "Batch Review",
		icon: LibraryBooks,
		component: batchReview,
		layout: "/saffron",
		role: "Quality Assurance",
		showNav: true,
	},
];

export default dashboardRoutes;
