import express from "express";
import { PrismaClient } from "@prisma/client";
import { startOfDay, endOfDay } from "date-fns";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/tabela-troca", async (_req, res) => {
  //  _ no REQ Indica que o parâmetro não será usado
  console.log("🚀 Rota tabela-troca foi chamada!");

  // Pegue a data de hoje 
  const hoje = new Date(); 

  try {
    const teste = await prisma.trocaEpi.findMany({
      where: {
        dataTroca: {
          gte: startOfDay(hoje), // Começo do dia (00:00)
          lte: endOfDay(hoje), // Fim do dia (23:59)
        },
      },

      select: {
        id: true,
        motivo: true,
        quantidade: true,
        dataTroca: true,

        funcionario: {
          select: {
            nome: true,
            registro: true,
            setor: true,
          },
        },

        epi: {
          select: {
            descricao: true,
            ca: true,
          },
        },
      },
    });

    res.status(200).json(teste);
  } catch (error) {
    res.status(500).json({ message: "Falha no Servidor" });
    console.log(error);
  }
});

//Rota para Deletar uma Troca

router.delete("/tabela-troca/:id", async (req, res) => {
  console.log("🚀 Rota Delete Troca foi chamada!");
  try {
    const { id } = req.params;

    const trocaEpi = await prisma.trocaEpi.findUnique({
      where: { id },
    });

    if (!trocaEpi) {
      return res.status(404).json({ message: "Troca de EPI não encontrada" });
    }

    await prisma.trocaEpi.delete({
      where: { id },
    });

    return res
      .status(200)
      .json({ message: "Troca de EPI deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Falha no Servidor" });
  }
});

export default router;
