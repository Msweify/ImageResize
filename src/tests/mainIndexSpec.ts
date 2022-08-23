import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Tests for the server', () => {
  it('Server should return OK code for /', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
  it('Server should return OK code for /api', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
  it('Server should return OK code for /api/images', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(200);
  });
  it('Server should return OK code for /api/images?filename=encenadaport&width=500&height=300', async () => {
    const response = await request.get(
      '/api/images?filename=encenadaport&width=500&height=300'
    );
    expect(response.status).toBe(200);
  });
  it('Server should return Fail code for /api/images1', async () => {
    const response = await request.get('/api/images1');
    expect(response.status).toBe(404);
  });
});
