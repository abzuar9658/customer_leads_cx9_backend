const express = require("express");
const router = express.Router();
const { users } = require("../DataFiles/users.json");
const { companies } = require("../DataFiles/companies.json");
const { leads } = require("../DataFiles/lead.json");

// leads route
router.post("/api/leads", (req, res) => {
    try {
        const { company_id } = req.body;
        const leadsArray = leads.filter((elem) => elem.company_id == company_id);
        if (leadsArray.length > 0) {
            res.status(200).json({ data: leadsArray });
        } else {
            res.status(401).json({ data: [], error: "No data found" });
        }
    } catch (error) {
        console.log(error);
    }
});

//login route
router.post("/api/login", (req, res) => {
    try {
        const { username, password } = req.body;
        const user = users.find(
            (elem) => elem.username === username && elem.password === password
        );
        if (user) {
            res.status(200).json({ message: "User Logged In Successfully" });
        } else {
            res.status(401).json({ error: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error);
    }
});

//companies route
router.post("/api/companies", (req, res) => {
    try {
        const { name, affiliation, email } = req.body;
        if (name && email && affiliation) {
            const resultAgainstNameEmailAffiliation = companies.find(
                (elem) =>
                elem.name === name &&
                elem.email === email &&
                elem.affiliation.includes(affiliation)
            );
            if (resultAgainstNameEmailAffiliation) {
                res.status(200).json({
                    data: [resultAgainstNameEmailAffiliation],
                });
            } else {
                res.status(404).json({
                    data: [],
                    message: "Invalid Credentials, company not found",
                });
            }
        } else if (!name && !email && affiliation) {
            const resultAgainstAffiliation = companies.filter((elem) =>
                elem.affiliation.includes(affiliation)
            );
            if (
                resultAgainstAffiliation.length > 0 &&
                resultAgainstAffiliation.length < 10
            ) {
                res.status(200).json({
                    results: resultAgainstAffiliation.length,
                    data: resultAgainstAffiliation,
                });
            } else if (resultAgainstAffiliation.length > 10) {
                res.status(200).json({
                    results: resultAgainstAffiliation.length,
                    data: [],
                    message: "Records are more than 10, please filter some more",
                });
            } else {
                res.status(404).json({
                    results: resultAgainstAffiliation.length,
                    data: [],
                    message: "Invalid Credentials, company not found",
                });
            }
        } else if (name && !email && !affiliation) {
            const resultAgainstName = companies.find((elem) => elem.name === name);
            if (resultAgainstName) {
                res.status(200).json({
                    data: [resultAgainstName],
                });
            } else {
                res.status(404).json({
                    data: [],
                    message: "Invalid Credentials, company not found",
                });
            }
        } else if (!name && email && !affiliation) {
            const resultAgainstEmail = companies.find((elem) => elem.email === email);
            if (resultAgainstEmail) {
                res.status(200).json({
                    data: [resultAgainstEmail],
                });
            } else {
                res.status(404).json({
                    data: [],
                    message: "Invalid Credentials, company not found",
                });
            }
        } else if (name && email && !affiliation) {
            const resultAgainstNameEmail = companies.find(
                (elem) => elem.email === email && elem.name === name
            );
            if (resultAgainstNameEmail) {
                res.status(200).json({
                    data: [resultAgainstNameEmail],
                });
            } else {
                res.status(404).json({
                    data: [],
                    message: "Invalid Credentials, company not found",
                });
            }
        } else {
            res.status(401).json({
                results: 0,
                data: [],
                message: "Please Fill all the fields first",
            });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;