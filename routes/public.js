import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

//Cadastro
router.post('/cadastro', async (req, res) => {
    const user = req.body


    await prisma.user.create({
        data: {
            email: user.email,
            name: user.name,
            password
        }
    })

    res.status(201).json(user)
})

export default router