import request from 'supertest'
import app from '../src/app'

describe('GET /ping', () => {
    it('should respond with status 200 and text "pong"', async () => {
        const response = await request(app).get('/ping')

        expect(response.status).toBe(200)
        expect(response.text).toBe('pong')
    })
})