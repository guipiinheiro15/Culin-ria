import { fastify } from 'fastify'
import {DatabaseMemory} from "./database-memory.js"

const server = fastify()
const database = new DatabaseMemory()

server.get('/', () => {
    return 'Receitas da titia'
})

server.post('/receita', (request, reply) => {
    //Acessando dados da receita
   const {nmReceita, ingredientes, tipo } = request.body
    database.create({
        nmReceita: nmReceita,
        ingredientes: ingredientes,
        tipo: tipo,
    })
    
    return reply.status(201).send()
})

server.get('/receita', (request) => {
    const search = request.query.search
    console.log(search)
    const receitas = database.list(search)
    console.log(search)
    return receitas
})

server.put('/receita/:id', (request, reply) => {
    const receitaId = request.params.id
    const {nmReceita, ingredientes, tipo} = request.body
    database.update(receitaId, {
        nmReceita,
        ingredientes,
        tipo,
    })
    return reply.status(204).send()
})

server.delete('/receita/:id', (request, reply) => {
    const receitaId = request.params.id

    database.delete(receitaId)

    return reply.status(204).send()
})

server.listen({
    port: 3333,
})