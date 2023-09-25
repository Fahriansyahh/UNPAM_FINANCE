import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Spinner from "../app/shared/Spinner";

const Login = lazy(() => import("./master-data/Login"));

const dashboard = lazy(() => import("./dashboard/Dashboard"));

//!master data
//?authenthication
const Register1 = lazy(() => import("./master-data/Register"));
//?user
const Edit_User = lazy(() => import("./master-data/Edit_User"));
const User = lazy(() => import("./master-data/User"));
//? roles & permision
const Roles_Permission = lazy(() => import("./master-data/Roles_Permission"));
const Create_Permission = lazy(() => import("./master-data/Create_Permission"));
const Edit_Permission = lazy(() => import("./master-data/Edit_Permission"));
//?units
const Units = lazy(() => import("./master-data/Units"));
const Create_Units = lazy(() => import("./master-data/Create_Units"));
const Edit_Units = lazy(() => import("./master-data/Edit_Units"));
//?Facility_type
const Facility_type = lazy(() => import("./master-data/Facility_type"));
const Create_Facility_type = lazy(() =>
  import("./master-data/Create_Facility_type")
);
const Edit_Facility_type = lazy(() =>
  import("./master-data/Edit_Facility_type")
);
//? cashflow categories

const Cashflow_Categories = lazy(() =>
  import("./master-data/Cashflow_Categories")
);
const Create_Cashflow_Categories = lazy(() =>
  import("./master-data/Create_Cashflow_Categories")
);
const Edit_Cashflow_Categories = lazy(() =>
  import("./master-data/Edit_Cashflow_Categories")
);

//? Institusiions
const Institusions = lazy(() => import("./master-data/Institusions"));
const Create_Institusions = lazy(() =>
  import("./master-data/Create_Institusions")
);
const Edit_Instisusions = lazy(() => import("./master-data/Edit_Institusions"));

//! tutup master data
//?income

const Income = lazy(() => import("./finance/Income"));
const ItemIncome = lazy(() => import("./finance/ItemIncome"));
const Create_Income = lazy(() => import("./finance/CreateIncome"));
const EditIncome = lazy(() => import("./finance/EditIncome"));
//? Expense
const Expense = lazy(() => import("./finance/Expense"));
const ItemExpense = lazy(() => import("./finance/ItemExpense"));
const Create_Expense = lazy(() => import("./finance/CreateExpense"));
const EditExpense = lazy(() => import("./finance/EditExpense"));

//? asset

const asset = lazy(() => import("./finance/Asset"));
const ItemAsset = lazy(() => import("./finance/ItemAsset"));
const CreateAsset = lazy(() => import("./finance/CreateAsset"));
const EditAsset = lazy(() => import("./finance/EditAsset"));

//! Transiction

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/dashboard" component={dashboard} />
          {/* master data */}
          {/* User */}
          <Route path="/user" component={User} />
          <Route path="/Edit_User" component={Edit_User} />
          {/* Roles & Permission */}
          <Route path="/Roles_Permission" component={Roles_Permission} />
          <Route path="/Create_Permission" component={Create_Permission} />
          <Route path="/Edit_Permission" component={Edit_Permission} />
          {/* Units */}
          <Route path="/Units" component={Units} />
          <Route path="/Create_Units" component={Create_Units} />
          <Route path="/Edit_Units" component={Edit_Units} />
          {/* facility types */}
          <Route path="/Facility_type" component={Facility_type} />
          <Route
            path="/Create_Facility_type"
            component={Create_Facility_type}
          />
          <Route path="/Edit_Facility_type" component={Edit_Facility_type} />
          {/* Cashflow Categories */}

          <Route path="/Cashflow_Categories" component={Cashflow_Categories} />
          <Route
            path="/Create_Cashflow_Categories"
            component={Create_Cashflow_Categories}
          />
          <Route
            path="/Edit_Cashflow_Categories"
            component={Edit_Cashflow_Categories}
          />

          {/* Authenthication */}
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register1} />

          {/* Institusions */}

          <Route path="/Institusions" component={Institusions} />
          <Route path="/Create_Institusions" component={Create_Institusions} />
          <Route path="/Edit_Institusions" component={Edit_Instisusions} />
          {/* tutup master data */}
          {/* finnce */}
          {/* asset */}
          <Route path="/finance/Asset" component={asset} />
          <Route path="/finance/ItemAsset" component={ItemAsset} />
          <Route path="/finance/CreateAsset" component={CreateAsset} />
          <Route path="/finance/EditAsset" component={EditAsset} />
          {/* income */}
          <Route path="/finance/Income" component={Income} />
          <Route path="/finance/ItemIncome" component={ItemIncome} />
          <Route path="/finance/CreateIncome" component={Create_Income} />
          <Route path="/finance/EditIncome" component={EditIncome} />
          {/* expense */}
          <Route path="/finance/Expense" component={Expense} />
          <Route path="/finance/ItemExpense" component={ItemExpense} />
          <Route path="/finance/CreateExpense" component={Create_Expense} />
          <Route path="/finance/EditExpense" component={EditExpense} />

          {/* tutup finance */}
          <Redirect to="/login" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
