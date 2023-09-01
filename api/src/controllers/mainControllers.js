const express = require("express");
const getUserListByPage = require("../models/getListUserByPage");
const deleteUserByPage = require("../models/deleteUserById");
const updateAnUser = require("../models/updateAnUser");
const creatAnUser = require("../models/createAnUser");
const authenticalAccount = require("../models/authenticalAccount");
const {
  deleteLevel,
  updateLevel,
  createLevel,
} = require("../config/setLevelAccessVar");
const login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let authData = await authenticalAccount(email, password);
  if (authData.status_action === -1)
    return res.status(500).send("SERVER error");
  else if (authData.status_action === 0)
    return res.status(404).send("User not found or password error");
  return res.status(200).send(JSON.stringify({ token: authData.token }));
};
const getUserList = async (req, res) => {
  let page = req.query.page ? req.query.page : 1;
  let sortMode = req.query.sortMode;
  let orderCol = req.query.orderCol;
  let keyword = req.query.keyword;
  let fieldSearch = req.query.fieldSearch;
  if ((sortMode !== "no" && !orderCol) | (sortMode === "no" && orderCol))
    return res.status(400).send("Error");
  if ((keyword && !fieldSearch) | (!keyword && fieldSearch))
    return res.status(400).send("Error");
  let result = await getUserListByPage(
    page,
    keyword,
    fieldSearch,
    sortMode,
    orderCol
  );
  if (result.status === 200) {
    return res.status(200).send(JSON.stringify(result.data));
  } else return res.status(result.status).send(result.statusText);
};

const deleteUser = async (req, res) => {
  let id = req.body.id;
  let level_access = req.user_level_access;
  if (level_access > deleteLevel)
    return res.status(403).send("User not have permission !");
  if (id && id != {} && level_access <= deleteLevel) {
    let results = await deleteUserByPage(id);
    if (results === 0) return res.status(404).send("Err");
    if (results === -1) return res.status(500).send("Err");
    return res.status(204).send("OK");
  } else return res.status(400).send("id is invalid");
};
const updateUser = async (req, res) => {
  let userData = req.body;
  let level_access = req.user_level_access;
  console.log(level_access);
  if (level_access > updateLevel)
    return res.status(403).send("User have no permisson");
  if (userData) {
    let result = await updateAnUser(userData);
    if (result === "") return res.status(500).send("Error");
    if (result === "not-found") return res.status(404).send("User not found");
    if (result === "invalid_data")
      return res.status(400).send("User is invalid");
    return res.status(200).send(JSON.stringify({ updatedAt: result }));
  } else return res.status(400).send("User is invalid");
};
const creatUser = async (req, res) => {
  let level_access = req.user_level_access;
  if (level_access > createLevel)
    return res.status(403).send("User have no permisson");
  let userData = req.body;
  if (userData) {
    let result = await creatAnUser(userData);
    if (result.id === -1) return res.status(500).send("Error");
    if (result.id === -2) return res.status(400).send("User Data is invalid");
    console.log("check res: ", result);
    return res.status(200).send(JSON.stringify(result));
  } else return res.status(400).send("User Data is invalid");
};
const authToken = async (req, res) => {
  let data = { ...req.user };
  return res.status(200).send(data);
};
module.exports = {
  getUserList,
  login,
  deleteUser,
  updateUser,
  creatUser,
  authToken,
};
