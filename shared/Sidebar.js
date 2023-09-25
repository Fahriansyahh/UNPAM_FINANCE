import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { Logout } from "../Components";
class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach((i) => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  onRouteChanged() {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: "/apps", state: "appsMenuOpen" },
      { path: "/advanced-ui", state: "advancedUiMenuOpen" },
      { path: "/finance", state: "financeMenuOpen" },
      { path: "/maps", state: "mapsMenuOpen" },
      { path: "/", state: "masterData" },
      { path: "/ecommerce", state: "ecommercePagesMenuOpen" },
    ];

    dropdownPaths.forEach((obj) => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true });
      }
    });
  }

  render() {
    const data = JSON.parse(sessionStorage.getItem("user")) || {
      name: false,
      email: false,
    };
    let twoChars = data.name ? data.name.substring(0, 2) : "";
    let Chars;
    if (twoChars) {
      Chars = twoChars.toUpperCase();
    }
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <div className="m-auto nav-link m-auto">
              <div className="nav-profile-image d-flex justify-content-center align-items-center">
                <div
                  style={{
                    backgroundColor: "salmon",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h3 className="text-center mt-2 px-2 ms-1">{Chars}</h3>
                </div>
              </div>
              <div className="nav-profile-text">
                <span className="font-weight-bold mb-2">{data.name}</span>
                <span className="text-secondary text-small">{data.email}</span>
              </div>
              <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
            </div>
          </li>

          <li
            className={
              this.isPathActive("/dashboard") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/dashboard">
              <span className="menu-title">Dashboard</span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/finance") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                this.state.financeMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("financeMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-title">Transaksi</span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-currency-usd menu-icon"></i>
            </div>
            <Collapse in={this.state.financeMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/finance/Income")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/finance/Income"
                  >
                    Pendapatan
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/finance/Expense")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/finance/Expense"
                  >
                    Pengeluaran
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/finance/Asset")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/finance/Asset"
                  >
                    Asset
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          <li
            className={this.isPathActive("/") ? "nav-item active" : "nav-item"}
          >
            <div
              className={
                this.state.masterData ? "nav-link menu-expanded" : "nav-link"
              }
              onClick={() => this.toggleMenuState("masterData")}
              data-toggle="collapse"
            >
              <span className="menu-title">Master Data</span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-lock menu-icon"></i>
            </div>
            <Collapse in={this.state.masterData}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/user")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/user"
                  >
                    Pengguna
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Roles_Permission")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/Roles_Permission"
                  >
                    Peran & Izin
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Units")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/Units"
                  >
                    Satuan
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Facility_type")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/Facility_type"
                  >
                    Fasilitas Tipe
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Cashflow_Categories")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/Cashflow_Categories"
                  >
                    Kategori Arus Kas
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Institusions")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/Institusions"
                  >
                    Institusi
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li className="nav-item mt-5 d-lg-none">
            <Logout />
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }
}

export default withRouter(Sidebar);
