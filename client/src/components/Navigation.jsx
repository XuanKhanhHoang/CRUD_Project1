import "../styles/Navigation.scss";
import vnLogo_Img from "../assets/vietnam-flat-rounded-flag-icon-with-transparent-background-free-png.png";
import enLogo_Img from "../assets/flag-of-the-united-kingdom-flags-of-the-world-nordic-cross-flag-united-kingdom-d00246040eb432dc3d45e446354454ec.png";
import logo from "../assets/logoMain.jpg";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOGOUT } from "../redux/actions/userAction";
import { vietnamese } from "../language/vietnamese";
import { english } from "../language/english";
import { toEngLanguage, toViLanguage } from "../redux/actions/languageAction";
function Navigation(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.account);

  const isViLanguage = useSelector((state) => state.language.isViLanguage);
  const viLanguage = vietnamese.navigation;
  const enLanguage = english.navigation;
  const HandleLogInOut = () => {
    if (user.auth) {
      toast.success("Log out succesful");
      dispatch({
        type: USER_LOGOUT,
      });
      navigate("/");
    } else navigate("/login");
  };
  const handleChangeLanguage = (language) => {
    if (!isViLanguage) {
      if (language === toEngLanguage) return;
    }
    if (isViLanguage) {
      if (language === toViLanguage) return;
    }
    dispatch({ type: language });
  };
  return (
    <>
      <Navbar expand="lg" collapseOnSelect className="bg-body-tertiary">
        <Container>
          <Navbar.Brand to="/" as={NavLink}>
            <img alt="" className="logo" srcSet={logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="me-auto text-center col-12 ">
              {user.auth && (
                <Nav.Item
                  className="m-auto d-block d-lg-none p-1"
                  style={{ fontFamily: "serif", color: "#999" }}
                >
                  {isViLanguage
                    ? viLanguage.userUsingNofty
                    : enLanguage.userUsingNofty}{" "}
                  {user.email}
                </Nav.Item>
              )}
              <Nav.Link
                className="fontWeight500"
                eventKey="1"
                to="/"
                as={NavLink}
              >
                {isViLanguage
                  ? viLanguage.homePageLink
                  : enLanguage.homePageLink}
              </Nav.Link>
              {user.auth && (
                <>
                  <Nav.Link
                    to="/manage/1"
                    className="fontWeight500"
                    eventKey="2"
                    as={NavLink}
                  >
                    {isViLanguage ? viLanguage.manage : enLanguage.manage}
                  </Nav.Link>
                  <Nav.Item
                    className="m-auto d-none d-lg-block"
                    style={{ fontFamily: "serif", color: "#999" }}
                  >
                    {isViLanguage ? "Xin chào" : "Hello"} {user.email}
                  </Nav.Item>
                </>
              )}
              <Dropdown className="me-lg-3 ms-md-auto my-0 mx-auto">
                <Dropdown.Toggle variant="dark flex-nowrap" id="dropdown-basic">
                  <img
                    srcSet={isViLanguage ? vnLogo_Img : enLogo_Img}
                    alt=""
                    className="languageLogo vnLanguageLogo"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu
                  className="mt-1 show-Fade_in"
                  style={isViLanguage ? { fontFamily: "serif" } : {}}
                >
                  <Dropdown.Item
                    onClick={() => handleChangeLanguage(toViLanguage)}
                    className={isViLanguage && " choosingLang"}
                  >
                    <img
                      srcSet={vnLogo_Img}
                      alt=""
                      className="languageLogo vnLanguageLogo"
                    />
                    {isViLanguage
                      ? viLanguage.viLangName
                      : enLanguage.viLangName}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleChangeLanguage(toEngLanguage)}
                    className={!isViLanguage && " choosingLang"}
                  >
                    <img
                      srcSet={enLogo_Img}
                      alt=""
                      className="languageLogo enLanguageLogo"
                    />
                    {isViLanguage
                      ? viLanguage.enLangName
                      : enLanguage.enLangName}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <NavDropdown
                title={isViLanguage ? viLanguage.more : enLanguage.more}
                id="basic-nav-dropdown"
                className="mx-auto mx-lg-0 fontWeight500 "
              >
                <div className="show-Fade_in">
                  <NavDropdown.Item
                    to="/About"
                    className="fontWeight500"
                    as={NavLink}
                    eventKey="3"
                  >
                    {isViLanguage
                      ? viLanguage.more_about
                      : enLanguage.more_about}
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="https://github.com/XuanKhanhHoang/crudProject.git"
                    target="_blank"
                  >
                    {isViLanguage
                      ? viLanguage.more_toGithub
                      : enLanguage.more_toGithub}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className="fontWeight500"
                    onClick={HandleLogInOut}
                  >
                    {user.auth
                      ? isViLanguage
                        ? viLanguage.logout
                        : enLanguage.logout
                      : isViLanguage
                      ? viLanguage.login
                      : enLanguage.login}
                  </NavDropdown.Item>
                </div>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Navigation;
