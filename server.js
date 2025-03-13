import express from 'express'
import publicRoutes from './routes/public.js'
import privateRoutes from './routes/private.js'
import fichaRoutes from './routes/CadastroFicha.js'
import cors from 'cors'
import auth from './middlewares/auth.js'

const app = express()
app.use(cors())
app.use(express.json())


// 🔓 Rotas públicas
app.use('/', publicRoutes)


// 🔒 Rotas privadas protegidas
app.use('/private', fichaRoutes)
app.use('/private', auth, privateRoutes)

app.listen(3000, () => console.log("Servidor Rodando"))