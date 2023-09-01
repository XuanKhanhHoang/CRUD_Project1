import React from "react";
import avatar from "../assets/about_avatar.jpg";
import { english } from "../language/english";
import { vietnamese } from "../language/vietnamese";
import { useSelector } from "react-redux";

const AboutMe = () => {
  const engLanguage = english.about;
  const viLanguage = vietnamese.about;
  const isViLanguage = useSelector((state) => state.language.isViLanguage);
  return (
    <div className="about-me mainBody mt-3">
      <h1>{isViLanguage ? viLanguage.aboutTitle : engLanguage.aboutTitle}</h1>
      <div className="headerInfo d-flex">
        <img
          srcSet={avatar}
          alt="avatar"
          style={{
            height: "120px",
            borderRadius: "10px",
            marginBottom: "0.4rem",
          }}
        />
        <div className="headerContactInfo ms-3 d-flex flex-column justify-content-center">
          <div>
            <i
              className="fa-solid fa-user"
              style={{ fontSize: "17px", width: "18px" }}
            ></i>
            {isViLanguage ? "Họ và tên " : "Full name "}:
            <span style={{ fontWeight: "600" }}>
              {" "}
              {isViLanguage ? "Hoàng Xuân Khanh" : "Xuan Khanh Hoang"}
            </span>
          </div>
          <div className="emailInfo">
            <i className="fa-solid fa-envelope"></i> Email :{" "}
            <span className="fw-semibold cursorPointer">
              hoangxuankhanh.work@gmail.com
            </span>
          </div>
          <div className="githubInfo">
            <i
              className="fa-brands fa-square-github"
              style={{ fontSize: "18px" }}
            ></i>{" "}
            Github :{" "}
            <span
              className="fw-semibold cursorPointer"
              onClick={() => {
                window.open("https://github.com/XuanKhanhHoang", "_blank");
              }}
            >
              https://github.com/XuanKhanhHoang
            </span>
          </div>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: isViLanguage
            ? viLanguage.aboutContent
            : engLanguage.aboutContent,
        }}
      ></div>
    </div>
  );
};

export default AboutMe;
