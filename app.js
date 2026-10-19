
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;
const APP_VERSION = process.env.APP_VERSION || "1.0.0";

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the Jenkins CI/CD Demo API!",
        application: "jenkins-ci-cd-demo",
        version: APP_VERSION
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP"
    });
});

app.get("/api/info", (req, res) => {
    res.status(200).json({
        application: "jenkins-ci-cd-demo",
        version: APP_VERSION,
        environment: process.env.NODE_ENV || "development"
    });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
