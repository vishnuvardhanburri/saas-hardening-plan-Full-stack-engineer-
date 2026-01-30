import request from 'supertest';
import app from '../../src/index'; // Export your app for testing

describe('POST /v1/extract', () => {
  it('should return 400 for invalid URL', async () => {
    const response = await request(app)
      .post('/v1/extract')
      .send({ url: 'not-a-url' });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('INVALID_INPUT');
  });

  it('should return 200 for a valid brand URL', async () => {
    // Note: In real CI, you would mock the BrowserManager
    const response = await request(app)
      .post('/v1/extract')
      .send({ url: 'https://example.com' });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title');
  });
});
