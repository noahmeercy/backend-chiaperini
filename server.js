import express from 'express'
import publicRoutes from './routes/public.js'
import privateRoutes from './routes/private.js'
import fichaRoutes from './routes/CadastroFicha.js'
import epiRoutes from './routes/CadastroEpi.js'
import trocaRoutes from './routes/TrocarEpi.js'
import testeRoutes from './routes/teste.js'
import cors from 'cors'
import auth from './middlewares/auth.js'


export const app = express()
app.use(cors())
app.use(express.json())


// 🔓 Rotas públicas
app.use('/', publicRoutes)
app.use('/', trocaRoutes)
app.use('/', testeRoutes)


app.use('/private', epiRoutes)
app.use('/private', fichaRoutes)



app.use('/private', auth, privateRoutes)

app.listen(3000, () => console.log("Servidor Rodando"))