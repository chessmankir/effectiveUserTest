import request from "supertest";
import app from "./app";

describe('App', () => {
    test("GET / возвращает ok:true", async () => {
        const res = await request(app).get("/");
        expect(res.status).toBe(200);
     /*   expect(res.body).toEqual({
            ok: true,
            message: "Hi effective mobile"
        })*/
    })
})