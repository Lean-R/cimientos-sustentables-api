const { Router } = require("express");
const { getAllObras, getObraByID, createObra, updateObra, deleteObra } = require("../services/obras-service");

const gastos = [
  {
    id: 1,
    obraId: 1,
    partidaId: 1,
    fecha: "10/04/2026",
    monto: "$1.200.000",
    estado: "Pagado",
  },
  {
    id: 2,
    obraId: 1,
    partidaId: 2,
    fecha: "15/04/2026",
    monto: "$2.850.000",
    estado: "Autorizado",
  },
  {
    id: 3,
    obraId: 2,
    partidaId: 3,
    fecha: "20/04/2026",
    monto: "$6.500.000",
    estado: "Solicitado",
  },
  {
    id: 4,
    obraId: 3,
    partidaId: 4,
    fecha: "22/04/2026",
    monto: "$5.400.000",
    estado: "Pagado",
  },
];

// Router creado para manejar las vistas PUG
const router = Router();

// Ruta raíz
router.get("/", (req, res) => {
  res.render("index");
});

// ---------- Rutas para OBRAS ----------
router.get("/obras", (req, res) => {
  const obras = getAllObras();
  res.render("obras/index", { obras });
});

// Crear obra
router.get("/obras/nueva", (req, res) => {
  res.render("obras/form");
});

// Guardar obra nueva
router.post("/obras", (req, res) => {
  if (req.body.presupuestoTotal) {
    req.body.presupuestoTotal = Number(req.body.presupuestoTotal);
  }
  createObra(req.body);
  res.redirect("/obras");
});

// Editar obra
router.get("/obras/editar/:id", (req, res) => {
  const obra = getObraByID(req.params.id);
  res.render("obras/form", { obra });
});

// Guardar obra editada
router.post("/obras/editar/:id", (req, res) => {
  if (req.body.presupuestoTotal) {
    req.body.presupuestoTotal = Number(req.body.presupuestoTotal);
  }
  updateObra(req.params.id, req.body);
  res.redirect("/obras");
});

// Eliminar obra
router.get("/obras/eliminar/:id", (req, res) => {
  deleteObra(req.params.id);
  res.redirect("/obras");
});

// Detalle de obra
router.get("/obras/:id", (req, res) => {
  const obra = getObraByID(req.params.id);
  const partidasDeLaObra = partidas.filter((p) => p.obraId === obra.id);
  const gastosDeLaObra = gastos
    .filter((g) => g.obraId === obra.id)
    .map((g) => {
      const partida = partidas.find(
        (p) => Number(p.id) === Number(g.partidaId),
      );

      return {
        ...g,
        partidaRubro: partida ? partida.rubro : "Sin partida",
      };
    });

  const totalPartidas = partidasDeLaObra.reduce((acc, partida) => {
    const valor = Number(
      partida.precioTotal
        .replace(/\$/g, "")
        .replace(/\./g, "")
        .replace(",", "."),
    );
    return acc + valor;
  }, 0);

  const totalGastos = gastosDeLaObra.reduce((acc, gasto) => {
    const valor = Number(
      gasto.monto.replace(/\$/g, "").replace(/\./g, "").replace(",", "."),
    );
    return acc + valor;
  }, 0);

  res.render("obras/detail", {
    obra,
    partidas: [],
    gastos: [],
    totalPartidas: 0,
    totalGastos: 0,
  });
});

// ---------- Rutas para PARTIDAS ----------

// Crear partida
router.get("/partidas/nueva", (req, res) => {
  const obraId = req.query.obraId;
  res.render("partidas/form", { obraId, partidaId: null });
});

// Editar partida
router.get("/partidas/editar", (req, res) => {
  const obraId = req.query.obraId;
  const partidaId = req.query.partidaId;
  res.render("partidas/form", { obraId, partidaId });
});

// ---------- Rutas para GASTOS ----------

// Crear gasto
router.get("/gastos/nuevo", (req, res) => {
  const obraId = req.query.obraId;
  res.render("gastos/form", { obraId });
});

module.exports = router;
