import homeBackground from "../assets/logo512.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { vietnamese } from "../language/vietnamese";
import { english } from "../language/english";
function Home() {
  const user = useSelector((state) => state.user.account);
  const isViLanguage = useSelector((state) => state.language.isViLanguage);
  const viLanguage = vietnamese.home;
  const enLanguage = english.home;
  return (
    <>
      <div className="HomeInfo mainBody d-md-flex d-block mt-2">
        <div className="HomeNotify col-12 col-md-6 p">
          <span style={{ fontWeight: "500" }}>
            {user.auth
              ? isViLanguage
                ? viLanguage.HomeNoftyContent_auth
                : enLanguage.HomeNoftyContent_auth
              : isViLanguage
              ? viLanguage.HomeNoftyContent_notAuth
              : enLanguage.HomeNoftyContent_notAuth}
          </span>
          <Link
            className=" col-4 btn loginBtn btn-primary d-block mx-auto mt-2"
            to={user.auth ? "/manage/1" : "/login"}
          >
            {user.auth
              ? isViLanguage
                ? viLanguage.HomeNoftyButton_auth
                : enLanguage.HomeNoftyButton_auth
              : isViLanguage
              ? viLanguage.HomeNoftyButton_notAuth
              : enLanguage.HomeNoftyButton_notAuth}
          </Link>
        </div>
        <img
          className="col-12 col-md-5 "
          alt="background"
          style={{
            backgroundrRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "calc(100% - 66px)",
          }}
          src={homeBackground}
        />
      </div>
    </>
  );
}

export default Home;
