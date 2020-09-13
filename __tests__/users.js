const supertest = require("supertest")
const server = require("../server")
const db = require("../data/config")
const usersModel = require("../users/users-model")


beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})


describe("users integration tests", () => {
    it("GET /users", async () => {
        const res = await supertest(server).get("/users")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.length).toBeGreaterThanOrEqual(3)
        expect(res.body[0].username).toBe("user1")
    })

    it("POST /users", async () => {
        const res = await supertest(server)
            .post("/users")
            .send({ username: "user4", password: "pass4" })
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.username).toBe("user4")
    })

    it("DELETE /users/:id", async () => {
        const res = await supertest(server)
            .delete("/users/1")
            expect(res.statusCode).toBe(200)
            expect(res.type).toBe("application/json")
    })
})