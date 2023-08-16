import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import {
  faSearch,
  faUser,
  faChevronDown,
  faChevronUp,
  faBox,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../../../assets/kmmart-logo/kmmart-logo.png";
import MobileSideBar from "../sideBar";
import { logout, getLoggedInUser } from "../../../../redux/_actions/authAction";

const SellerDashboardHeader = () => {
  const dispatch = useDispatch();
  const user = useState(JSON.parse(localStorage.getItem("token")));
  const currentUser = useSelector((state) => state.auth.user);
  const [searchbox, setSearchbox] = useState(false);
  const [dropdown, setdropdown] = useState(false);
  const [mobileSidebarShow, setMobileSidebarShow] = useState(false);
  const HandleDropdownChange = (e) => {
    setdropdown(!dropdown);
  };
  const HandleSidebarBarChange = (e) => {
    setMobileSidebarShow(!mobileSidebarShow);
  };
  function Logout() {
    dispatch(logout());
    window.location.href = "/";
  }
  const listenScrollEvent = (e) => {
    if (window.scrollY < 300) {
      setSearchbox(true);
    } else {
      setSearchbox(false);
    }
  };
  setInterval(() => {
    window.addEventListener("scroll", listenScrollEvent());
  }, 100);

  useEffect(() => {
    if (user[0]) {
      dispatch(getLoggedInUser());
    }
  }, [dispatch]);
  return (
    <>
      <header className="adminpanel-header">
        <Grid container>
          <Grid item lg={2} xs={5}>
            <div className="logo-box">
              <Link to="/">
                <img src={Logo} alt="" />
              </Link>
            </div>
          </Grid>
          <Grid item lg={10} xs={7}>
            <div className="nav-item nav-item2">
              <div
                className={
                  searchbox === true
                    ? `search-box-wrapper active`
                    : `search-box-wrapper`
                }
              >
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search Product Here"
                    onChange={(e) => {
                   
                    }}
                  />
                  <FontAwesomeIcon icon={faSearch} />
                </div>
              </div>
              <div className="account-list">
                <span
                  className="account-list-button"
                  onClick={(e) => HandleDropdownChange(e)}
                >
                  <FontAwesomeIcon icon={faUser} />
                  <label className="user-name">
                    Hi {currentUser?.fullName.split()}
                  </label>
                  {dropdown === true ? (
                    <FontAwesomeIcon icon={faChevronUp} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                  )}
                </span>
                {dropdown === true && (
                  <div className="dropdown-content">
                    <ul>
                      <li>
                        <Link to="/">
                          <FontAwesomeIcon icon={faBox} />
                          Orders
                        </Link>
                      </li>
                      <li>
                        <Link to="/profile">
                          <FontAwesomeIcon icon={faCog} />
                          Setting
                        </Link>
                      </li>
                      <li>
                        <span onClick={(e) => Logout()}>
                          <FontAwesomeIcon icon={faSignOutAlt} />
                          Logout
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <Link to="/">
                <div className="side-box">
                  <FontAwesomeIcon icon={faCog} />
                </div>
              </Link>
              <div className="side-box toggle-box">
                <button
                  className="toggle-button"
                  onClick={(e) => HandleSidebarBarChange(e)}
                >
                  <span
                    className={mobileSidebarShow ? "line1-change" : ""}
                  ></span>
                  <span
                    className={mobileSidebarShow ? "line2-change" : ""}
                  ></span>
                  <span
                    className={mobileSidebarShow ? "line3-change" : ""}
                  ></span>
                </button>
              </div>
            </div>
          </Grid>
        </Grid>
      </header>
      {mobileSidebarShow === true ? (
        <MobileSideBar currentUser={currentUser} show={"show"} />
      ) : (
        <MobileSideBar currentUser={currentUser} />
      )}
    </>
  );
};
export default SellerDashboardHeader;
