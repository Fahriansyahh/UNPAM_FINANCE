import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import axios from "axios";
export class Dashboard extends Component {
  render() {
    const LockToken = sessionStorage.getItem("key");
    let token = LockToken ? LockToken.slice(0, 29) : "";
    if (token === "1hLJn7bKqW3mVfIg9XoZtUDpYcExr") {
      return (
        <div>
          <h1>pages dashboard</h1>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default Dashboard;
