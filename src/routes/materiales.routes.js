import { Router } from 'express';
import PartidasPresupuestariasService from "../services/partidas_presupuestarias.service.js";

const router = Router();

router.get('/nuevo', async (req, res) => {
  const { obraId } = req.query;
  const todasPartidas = await PartidasPresupuestariasService.getAll();
  const partidas = todasPartidas.filter(
    (p) => String(p.obra_id) === String(obraId),
  );

  res.render('materiales/form', {
    obraId,
    partidas,
    pageTitle: 'Solicitud de materiales',
  });
});

export default router;
