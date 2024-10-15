const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors');

const app = express()

app.use(express.json())
app.use(cookieParser())

const corsOptions = {
    origin: 'http://localhost:8080', // Substitua pelo seu domínio frontend
    credentials: true
  };
  
  app.use(cors(corsOptions));
require('./routes')(app)

app.get('/cookie', (req, res) => {
    res.cookie('auth', 'usuario logado!!!')
    res.send('cookie enviado!')
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Rodando...', 3000))