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

    it("should return specific fruit", async () => {
        // GET /fruits/:id
        const result = await supertest(app).get("/fruits/1");

        expect(result.status).toBe(200);
        expect(result.body).toMatchObject({
            "id": 1,
            "name": "Banana",
            "price": 1000
        });
    });
    
    it("should trim fruit name before insert", async () => {
        const body: FruitInput = {
            "name": "  Coconut  ",
            "price": 3000
        };

        // POST /fruits
        await supertest(app).post("/fruits").send(body);

        // GET /fruits/:id
        const result = await supertest(app).get("/fruits/2");
        
        expect(result.body).toBe(201);
        expect(result.body).toMatchObject({
            "id": 2,
            "name": "Coconut",
            "price": 3000
        });
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

    it("should return not found when id doesn't exists", async () => {
        // GET /fruits/:id
        const result = await supertest(app).get("/fruits/5");

        expect(result.status).toBe(404);
    });

    it("should return all valid fruits", async () => {
        // GET /fruits
        const result = await supertest(app).get("/fruits");

        expect(result.status).toBe(200);
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number) 
                })
            ])
        );
        expect(result.body).toHaveLength(2);
    });
});
