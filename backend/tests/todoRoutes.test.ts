import request from 'supertest'
import app from '../src/app'

describe('GET /todos', () => {
    it('should return all todos', async () => {
        const response = await request(app).get('/todos')

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(3)
    })

    // it('should return todos that are completed', async () => {
        
    // })

    // it('should return todos that are not completed', async () => {
        
    // })
})

// describe('DELETE /todos', () => {
//     it('should delete a single todo', async () => {
        
//     })
    
//     it('should delete a all todos', async () => {

//     })
// })

// describe('POST /todos', () => {
//     it('should not create an empty todo', async () => {

//     })

//     it('should create a todo that has name', async () => {

//     })
    
//     it('should not create a todo that already exists', async () => {

//     })

//     it('should not create a todo that has too many characters', async () => {

//     })
// })

// describe('PUT /todos', () => {
//     it('should be able to be edited', async () => {

//     })

//     it('should change the state for a single todo when done', async () => {
        
//     })
// })