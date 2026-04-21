const { Router } = require("express");

// Datos de ejemplo. Serán eliminados al conectar con la API real
const obras = [
  {
    id: 1,
    nombre: "Casa en Castelar",
    direccion: "Francia 3400, Castelar",
    provincia: "Buenos Aires",
    directorObra: "Joaquín Suaya",
    tipoContratacion: "Inversión",
    estado: "Construcción",
    presupuesto: "$95.000.000",
    telefono: "11-4567-8901",
  },
  {
    id: 2,
    nombre: "Complejo residencial en Chacras de Coria",
    direccion: "Mariano Boedo y Vieytes, Chacras de Coria",
    provincia: "Mendoza",
    directorObra: "María Teresa Weber",
    tipoContratacion: "Privada",
    estado: "Planificación",
    presupuesto: "$180.000.000",
    telefono: "261-555-1234",
  },
  {
    id: 3,
    nombre: "Casa de montaña en San Martín de los Andes",
    direccion: "Ruta Nacional 40 km 2226 S/N, San Martín de los Andes",
    provincia: "Neuquén",
    directorObra: "Justiniano Russo",
    tipoContratacion: "Licitación",
    estado: "Construcción",
    presupuesto: "$120.000.000",
    telefono: "294-555-9876",
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
  res.render("obras/index", { obras });
});

// Crear obra
router.get("/obras/nueva", (req, res) => {
  res.render("obras/form");
});

// Editar obra
router.get("/obras/editar/:id", (req, res) => {
  const obra = obras.find((o) => o.id === Number(req.params.id));
  res.render("obras/form", { obra });
});

// Detalle de obra
router.get("/obras/:id", (req, res) => {
  const obra = obras.find((o) => o.id === Number(req.params.id));

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
