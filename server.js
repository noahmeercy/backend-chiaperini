import express from 'express'
import publicRoutes from './routes/public.js'
import privateRoutes from './routes/private.js'
import fichaRoutes from './routes/CadastroFicha.js'
import cors from 'cors'
import auth from './middlewares/auth.js'

const app = express()
app.use(express.json())
app.use(cors())


// 🔓 Rotas públicas
app.use('/', publicRoutes)


// 🔒 Rotas privadas protegidas
app.use('/private', auth, privateRoutes)
app.use('/private', auth, fichaRoutes)

app.listen(3000, () => console.log("Servidor Rodando"))