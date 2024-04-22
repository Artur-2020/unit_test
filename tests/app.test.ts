import App from '../src/app';
import request from 'supertest';

describe('App', () => {
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
      await app.stop(); // Stop the server after running tests
      done()
    })();
  });

  it('starts the server', async () => {
    const response = await request(app.app).get('/api/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, Express with TypeScript!');
  });
});
