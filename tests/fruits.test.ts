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

    it("should return conflict when repeat a fruit name (case sensitive)", async () => {
        const body: FruitInput = {
            "name": "Banana",
            "price": 1000
        };

        // POST /fruits
        const result = await supertest(app).post("/fruits").send(body);
        
        expect(result.status).toBe(409);
    });

    it("should return conflict when repeat a fruit name (case insensitive)", async () => {
        const body: FruitInput = {
            "name": "banana",
            "price": 1000
        };

        // POST /fruits
        const result = await supertest(app).post("/fruits").send(body);
        
        expect(result.status).toBe(409);
    });

    it("should return specific fruit", async () => {
        // GET /fruits/:id
        const result = await supertest(app).get("/fruits/1");

        expect(result.body).toMatchObject({
            "id": 1,
            "name": "Banana",
            "price": 1000
        });
        expect(result.status).toBe(200);
    });

    it("should return not found when id doesn't exists", async () => {
        // GET /fruits/:id
        const result = await supertest(app).get("/fruits/3");

        expect(result.status).toBe(404);
    });

    it("should return all valid fruits", async () => {
        const body: FruitInput = {
            "name": "Apple",
            "price": 2000
        };

        // POST /fruits
        await supertest(app).post("/fruits").send(body);

        // GET /fruits
        const result = await supertest(app).get("/fruits");

        expect(result.body.length).toBe(2);
        expect(result.status).toBe(200);
    });
});
