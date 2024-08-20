// __tests__/reuniones.test.js

const request = require('supertest');
const app = require('../server'); // Asegúrate de que tu app esté exportada

describe('GET /api/reuniones', () => {
    it('debería devolver un array de reuniones', async () => {
        const response = await request(app).get('/api/reuniones');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
