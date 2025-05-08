import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/filtro-troca", async (req, res) => {
  // console.log("🚀 Rota filtro-troca foi chamada!");

  try {
    const { dataInicio, dataFim } = req.query;
    

    //  Definir as datas corretamente com horário completo
    if (dataInicio) dataInicio = new Date(`${dataInicio}T00:00:00.000Z`);
    if (dataFim) dataFim = new Date(`${dataFim}T23:59:59.999Z`);

    const trocas = await prisma.trocaEpi.findMany({
      where: {
        AND: [
          dataInicio ? { dataTroca: { gte: dataInicio } } : {},
          dataFim ? { dataTroca: { lte: dataFim } } : {},
        ],
      },
      include: { funcionario: true, epi: true },
    });

    res.json(trocas);
  } catch (error) {
    console.error("Erro ao buscar trocas:", error);
    res.status(500).json({ error: "Erro ao buscar trocas" });
  }
});

export default router;
