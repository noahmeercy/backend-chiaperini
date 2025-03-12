import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()


// 📌 Rota privada para cadastrar uma ficha de funcionário

router.post("/cadastro-ficha", async (req, res) => {
    try {
        const {nome, registro, cargo, setor, camisa, calca, calcado, admissao,} = req.body;

        const novaFicha = await prisma.Ficha.create({
            data: {
               nome,
               registro,
               cargo,
               setor,
               camisa,
               calca,
               calcado,
               admissao,
               
            }
        })
        res.status(201).json(novaFicha)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Falha no Servidor' })
    }

})

export default router;