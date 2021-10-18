const express = require("express");
const router = express.Router();
const { users } = require("../DataFiles/users.json");
const { companies } = require("../DataFiles/companies.json");
const { leads } = require("../DataFiles/lead.json");
const axios = require("axios");
// leads route

//login route
router.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await axios.post(
      "https://cx9dev.contegris.com:8443/apis/auth",
      {
        username: username,
        password: password,
      }
    );
    res.status(200).json({
      status: "ok",
      data: {
        token: result.data.data.token,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
});

//companies route
router.post("/api/leads", async (req, res) => {
  //console.log("REQEST: ", req.headers.authorization.split(" ")[1]);
  try {
    const { companyId } = req.body;
    const response = await axios.post(
      "https://cx9dev.contegris.com:8443/apis/adb/companies/searchLeads?$top=5&$skip=0",
      { id: "132" },
      { headers: { Authorization: req.headers.authorization.split(" ")[1] } }
    );
    return res.status(200).json({
      status: "ok",
      data: response.data.data,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
});

router.post("/api/companies", async (req, res) => {
  try {
    const { email, name, phone, weblink } = req.body;
    const response = await axios.get(
      "https://cx9dev.contegris.com:8443/apis/adb/companies/search?$top=50&$skip=0&$filter=name eq 'some Compoany'",
      { headers: { Authorization: req.headers.authorization.split(" ")[1] } }
    );
    return res.status(200).json({
      status: "ok",
      data: response.data,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
});

module.exports = router;
