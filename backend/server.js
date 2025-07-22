import express from'express'

const app = express()
app.use(express.json())

const users = []

app.post('/usuarios', (req, res ) =>{


    users.push(req.body)

    res.send('ok aqui deu certo')

})

app.get('/usuarios', (req, res ) => {
    res.send('ok, deu bom')

})

app.listen(3000)