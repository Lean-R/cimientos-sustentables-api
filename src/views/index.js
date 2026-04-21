const { Router } = require("express");
const { getAllObras, getObraByID, createObra, updateObra, deleteObra } = require("../services/obras-service");

const partidas = [
  {
    id: 1,
    obraId: 1,
    rubro: "Trabajos preliminares y gestión verde",
    items: [
      {
        cantidad: 1,
        unidadMedida: "lote",
        detalle: "Limpieza inicial del terreno y cerramiento perimetral",
        precioUnitario: "$1.200.000",
        precioParcial: "$1.200.000",
      },
      {
        cantidad: 1,
        unidadMedida: "servicio",
        detalle: "Gestión ambiental y planificación de obra sustentable",
        precioUnitario: "$850.000",
        precioParcial: "$850.000",
      },
    ],
    precioTotal: "$2.050.000",
  },
  {
    id: 2,
    obraId: 1,
    rubro: "Infraestructura y fundaciones",
    items: [
      {
        cantidad: 30,
        unidadMedida: "m3",
        detalle: "Hormigón elaborado H21",
        precioUnitario: "$95.000",
        precioParcial: "$2.850.000",
      },
      {
        cantidad: 500,
        unidadMedida: "unidades",
        detalle: "Ladrillos cerámicos",
        precioUnitario: "$2.000",
        precioParcial: "$1.000.000",
      },
    ],
    precioTotal: "$3.850.000",
  },
  {
    id: 3,
    obraId: 2,
    rubro: "Envolvente sustentable",
    items: [
      {
        cantidad: 1,
        unidadMedida: "sistema",
        detalle: "Aislación térmica exterior y revestimiento eficiente",
        precioUnitario: "$6.500.000",
        precioParcial: "$6.500.000",
      },
    ],
    precioTotal: "$6.500.000",
  },
  {
    id: 4,
    obraId: 3,
    rubro: "Aberturas de alta prestación",
    items: [
      {
        cantidad: 12,
        unidadMedida: "unidades",
        detalle: "Ventanas de aluminio con DVH",
        precioUnitario: "$450.000",
        precioParcial: "$5.400.000",
      },
    ],
    precioTotal: "$5.400.000",
  },
];

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
    partidas: partidasDeLaObra,
    gastos: gastosDeLaObra,
    totalPartidas,
    totalGastos,
  });
});

// ---------- Rutas para PARTIDAS ----------

// Crear partida
router.get("/partidas/nueva", (req, res) => {
  const obraId = req.query.obraId;
  res.render("partidas/form", { obraId });
});

// ---------- Rutas para GASTOS ----------

// Crear gasto
router.get("/gastos/nuevo", (req, res) => {
  const obraId = req.query.obraId;
  res.render("gastos/form", { obraId });
});

module.exports = router;
