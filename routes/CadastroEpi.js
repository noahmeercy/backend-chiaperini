import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()


// 📌 Rota privada para cadastrar um EPI

router.post('/cadastro-epi', async (req, res) => {
    console.log("🚀 Rota cadastro-epi foi chamada!")

    try {

        const { codigo, descricao, ca } = req.body;

        const novoEpi = await prisma.epi.create({
            data: {
                codigo,
                descricao,
                ca,
            }
        })
        res.status(201).json(novoEpi)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Falha no Servidor' })

    }
})

export default router;