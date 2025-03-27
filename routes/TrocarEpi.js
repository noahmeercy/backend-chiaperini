import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Rota para buscar funcionário pelo registro

// router.get('/funcionario/:registro', async (req, res) => {
//   const { registro } = req.params;

//   try {
//     const funcionario = await prisma.ficha.findUnique({
//       where: { registro: registro },
//         select: {
//           nome: true
//         }
//     });

//     if (!funcionario)
//       return res.status(404).json({ message: "Funcionário não encontrado" });

//     res.json(funcionario);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Erro ao buscar funcionário" });
//   }
// });

// Rota para registrar a troca de EPI

router.post("/trocar-epi", async (req, res) => {
  console.log("🚀 Rota trocar-epi foi chamada!");
  try {
    const { registro, codigo, motivo, quantidade, dataTroca } = req.body;

    // Verifica se o funcionário existe
    const funcionario = await prisma.ficha.findUnique({
      where: { registro: registro }
    });

    if (!funcionario) {
      return res.status(404).json({ message: "Funcionário não encontrado" });
    }

    // Buscar o EPI pelo código para obter o ID
    const epi = await prisma.epi.findUnique({
      where: { codigo: codigo },
    });

    if (!epi) {
      return res.status(404).json({ message: "EPI não encontrado" });
    }

    // Criar a troca com o ID do EPI encontrado

    const trocaEpi = await prisma.trocaEpi.create({
      data: {
        funcionario: {
          connect: { id: funcionario.id }, // Aqui usamos o id do funcionário
        },
        epi: {
          connect: { id: epi.id }, // Aqui usamos o id do EPI encontrado
        },
        motivo,
        quantidade,
        dataTroca: dataTroca ? new Date(`${dataTroca}T12:00:00`) : undefined, // Certifique-se de enviar uma data válida
      },
    });
 
    // Resposta de sucesso com o recurso criado
    return res.status(201).json({ message: "Troca de EPI registrada com sucesso", trocaEpi });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Falha no Servidor" });
  }
});


export default router;
