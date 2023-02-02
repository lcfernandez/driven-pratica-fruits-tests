import { app } from "index";
import { FruitInput } from "services/fruits-service";
import supertest from "supertest";

describe("tests about fruits api", () => {
    it("should create a valid fruit", async () => {
        const body: FruitInput = {
            "name": "Banana",
            "price": 1000
        };

        // POST /fruits
        const result = await supertest(app).post("/fruits").send(body);
        expect(result.status).toBe(201);
    });
});
