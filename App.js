import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./App.scss";
import AppRoutes from "./AppRoutes";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
import Footer from "./shared/Footer";
import { withTranslation } from "react-i18next";
import { Provider } from "react-redux";
import store from "./Redux/index";
class App extends Component {
  state = {};
  componentDidMount() {
    this.onRouteChanged();
  }
  render() {
    let navbarComponent = !this.state.isFullPageLayout ? <Navbar /> : "";
    let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar /> : "";
    let footerComponent = !this.state.isFullPageLayout ? <Footer /> : "";
    return (
      <Provider store={store}>
        <div className="container-scroller">
          {navbarComponent}
          <div className="container-fluid page-body-wrapper">
            {sidebarComponent}
            <div className="main-panel">
              <div className="content-wrapper">
                <AppRoutes />
              </div>
              {footerComponent}
            </div>
          </div>
        </div>
      </Provider>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log("ROUTE CHANGED");
    const body = document.querySelector("body");
    if (this.props.location.pathname === "/layout/RtlLayout") {
      body.classList.add("rtl");
    } else {
      body.classList.remove("rtl");
    }
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ["/login"];
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true,
        });
        document
          .querySelector(".page-body-wrapper")
          .classList.add("full-page-wrapper");
        break;
      } else {
        this.setState({
          isFullPageLayout: false,
        });
        document
          .querySelector(".page-body-wrapper")
          .classList.remove("full-page-wrapper");
      }
    }
  }
}

export default withTranslation()(withRouter(App));
