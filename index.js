const express = require("express")
const uuid = require("uuid")

const port = 3000
const app = express()
app.use(express.json())


const usuarios = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = usuarios.findIndex(user => user.id === id)


    if (index < 0) {
        return response.status(404).json({ mensagem: "usuário nao encontrado" })
    }

    request.userIndex = index

    request.userId = id

    next()
}

app.get('/cliente', (request, response) => {
    return response.json(usuarios)
})

app.post('/cliente', (request, response) => {
    const { nome, idade, cep } = request.body

    const usuario = { id: uuid.v4(), nome, idade, cep }

    usuarios.push(usuario)

    return response.status(201).json(usuario)
})


app.put('/cliente/:id', checkUserId, (request, response) => {
    const { nome, idade, cep } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, nome, idade, cep }

    usuarios[index] = updateUser

    return response.json(updateUser)
})

app.delete('/cliente/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    usuarios.splice(index, 1)

    return response.status(204).json()
})


app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port} ❤️`)
})
