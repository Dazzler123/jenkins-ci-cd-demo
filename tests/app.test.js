
const request = require("supertest");
const app = require("../app");

describe("Jenkins CI/CD Demo API", () => {
    test("GET / should return the welcome message", async () => {
        const response = await request(app).get("/");

        expect(response.statusCode).toBe(200);
        expect(response.body.application).toBe("jenkins-ci-cd-demo");
        expect(response.body.version).toBe("1.0.0");
    });

    test("GET /health should return UP", async () => {
        const response = await request(app).get("/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("UP");
    });

    test("GET /api/info should return application information", async () => {
        const response = await request(app).get("/api/info");

        expect(response.statusCode).toBe(200);
        expect(response.body.application).toBe("jenkins-ci-cd-demo");
        expect(response.body.environment).toBe("test");
    });
});
