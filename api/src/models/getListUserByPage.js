const connection = require("../config/db");
const getUserListByPage = async (
  page,
  keyword,
  fieldSearch,
  sortMode,
  orderCol
) => {
  if (!parseInt(page))
    return { status: 404, statusText: "Page not exits", data: {} };
  let offsetQuery = (page - 1) * 6;
  let total = 0;
  let total_pages = 0;
  let sortModeUpper = "";
  if (sortMode != "no") sortModeUpper = sortMode.toUpperCase();
  try {
    // let count = await connection.query(
    //   `SELECT COUNT(ID) as Count FROM UsersInfo `
    // );
    // total = count[0][0].Count;
    // total_pages = Math.ceil(total / 6);
    let params = [
      // offsetQuery
    ];
    let [userList] = await connection.query(
      `SELECT * FROM UsersInfo ` +
        (keyword &&
          fieldSearch &&
          `WHERE ${fieldSearch} LIKE "%${keyword}%" `) +
        (sortModeUpper &&
          sortMode != "NO" &&
          orderCol &&
          ` ORDER BY ${orderCol} ${sortModeUpper} `),
      //   +
      // ` LIMIT 6 OFFSET ?`
      [...params]
    );

    if (keyword && fieldSearch && userList.length === 0)
      return {
        status: 404,
        statusText: "Not found ",
        data: { page: page, per_page: 0, total: 0, total_pages: 0 },
      };
    if (userList.length === 0)
      return {
        status: 404,
        statusText: "Page not exits",
        data: { page: page, per_page: 6, total: 0, total_pages: 0 },
      };
    total = userList.length;
    total_pages = Math.ceil(total / 6);
    let resData = {
      page: page,
      per_page: 6,
      total: total,
      total_pages: total_pages,
      data: [...userList.slice((page - 1) * 6, (page - 1) * 6 + 6)],
    };
    return { status: 200, statusText: "OK", data: resData };
  } catch (error) {
    console.log(error);
    if (total === 0 || total_pages === 0)
      return { status: 500, statusText: "Server error", data: {} };
  }
};

module.exports = getUserListByPage;
