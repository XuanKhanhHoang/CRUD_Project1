import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../services/UserServices";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";
import { useSelector } from "react-redux";
const ModalConfirm = (props) => {
  const { title, content, modalHandleShow, handleUser, userList, setUserList } =
    props;
  const user = handleUser.user;
  const [isWaiting, setIsWaiting] = useState(false);
  const isViLanguage = useSelector((state) => state.language.isViLanguage);
  const toastConfig = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  const handleClose = async () => {
    await handleUser.handleUser({});
    modalHandleShow.handleModalShow(false);
  };
  const handleSubmit = async () => {
    setIsWaiting(true);
    let res = await deleteUser(user.id);
    if (res.status === 204) {
      let item = userList.filter((item) => item.id !== user.id);
      setUserList(item);
      toast.success("User deleted", toastConfig);
      handleClose();
    } else {
      let errText = "Erorr...";
      if (res.response.data) errText = res.response.data;
      toast.error(errText);
      handleClose();
    }
    setIsWaiting(false);
  };
  return (
    <>
      <Modal show={modalHandleShow.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {isViLanguage ? "Đóng" : "Close"}
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isWaiting ? (
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            ) : isViLanguage ? (
              "Xác nhận"
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ModalConfirm;
