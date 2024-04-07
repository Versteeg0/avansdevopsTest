const request = require('supertest');

const app = require('../../app');

describe('Error Handling', () => {
    it('should respond with a 404 status when a non-existent route is accessed', async () => {
      const response = await request(app).get('/non-existent-route');
      expect(response.status).toBe(404);
    });
  
    it('should render the error page when an error occurs', async () => {
      const response = await request(app).get('/some-invalid-route');
      expect(response.status).toBe(404);
      expect(response.text).toContain('<h1>Not Found</h1>');
    });
  });