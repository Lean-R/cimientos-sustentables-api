import { Router } from 'express';

const router = Router();

router.get('/nuevo', (req, res) => {
  const { obraId } = req.query;

  res.render('materiales/form', { obraId });
});

export default router;