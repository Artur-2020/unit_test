import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import App from "../src/app";

describe('UserController', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/unit_test');
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  let app: App;

  beforeAll(  (done) => {
    (async () => {
      app = new App(3001);
      await app.start(); // Start the server before running tests
      done()
    })();
  });

  afterAll( (done) => {
    (async () => {
      await mongoose.disconnect();
      await app.stop(); // Stop the server after running tests
      done()
    })();
  });
  it('should create a new user', async () => {
    const res = await request(app.app)
      .post('/api/users')
      .send({ name: 'Test User', email: 'tes3@example.com' });


    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual('Test User');
    expect(res.body.email).toEqual('tes3@example.com');
  });

  // Add more test cases for other controller methods
});
