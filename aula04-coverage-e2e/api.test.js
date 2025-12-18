const {describe, it} = require('mocha')
const request = require('supertest');
const app = require('./api');
const {deepStrictEqual} = require('assert');

describe('API Suite Test', () => {
  describe(' /contact', () => {
    it('should return the contact us page and return HTTP Status 200', async () => {
      const response = await request(app)
      .get('/contact')
      .expect(200);
    deepStrictEqual(response.text, 'contact us page');
    });
  });

  describe(" /contact", () => {
    it("should request a inexistent route /hi and redirect to /hello", async () => {
      const response = await request(app).get("/hi").expect(200);
      deepStrictEqual(response.text, "Hello World!");
    });
  });

   describe(" /login", () => {
     it("should login successfully on the login route and return HTTP Status 200", async () => {
       const response = await request(app)
       .post("/login")
       .send({username: "davi", password: "1234"})
       .expect(200);

       deepStrictEqual(response.text, "Logging has succeeded!");
     });

     it("should unauthorize request when requesting it using wrong credentials return HTTP Status 401", async () => {
       const response = await request(app)
         .post("/login")
         .send({ username: "wrongUsername", password: "12345" })
         .expect(401);

         console.log('response', response)

       deepStrictEqual(response.text, "Login failed!");
     });
   });
});