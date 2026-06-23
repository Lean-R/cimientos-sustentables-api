import { Router } from "express";
import ObrasService from "../services/obras-service.js";
import PartidasPresupuestariasService from "../services/partidas_presupuestarias.service.js";
import GastosService from "../services/gastos.service.js";

const { getAllObras, getObraByID, createObra, updateObra, deleteObra } =
  ObrasService;

// Router creado para manejar las vistas PUG
const router = Router();

// Ruta raíz
router.get("/", (req, res) => {
  res.render("index", {
    pageTitle: "Iniciar sesion",
    hideShell: true,
    bodyClass: "login-page",
  });
});

// ---------- Rutas para OBRAS ----------
router.get("/obras", async (req, res) => {
  try {
    const obras = await getAllObras();
    res.render("obras/index", { obras, pageTitle: "Obras cargadas" });
  } catch (error) {
    console.error("Error al renderizar obras:", error);
    res.status(500).send("Error interno al cargar obras");
  }
});

// Crear obra
router.get("/obras/nueva", (req, res) => {
  res.render("obras/form", { pageTitle: "Nueva obra" });
});

// Guardar obra nueva
router.post("/obras", async (req, res) => {
  try {
    req.body.presupuestoTotal = req.body.presupuestoTotal
      ? Number(req.body.presupuestoTotal)
      : 0;
    const nuevaObra = await createObra(req.body);
    res.redirect(`/obras/${nuevaObra.id}`);
  } catch (error) {
    console.error("Error al crear la obra:", error);
    res.status(500).send("Error interno al crear obra");
  }
});

// Editar obra
router.get("/obras/editar/:id", async (req, res) => {
  try {
    const obra = await getObraByID(req.params.id);
    if (!obra) {
      return res.status(404).send("Obra no encontrada");
    }
    res.render("obras/form", { obra, pageTitle: "Editar obra" });
  } catch (error) {
    console.error("Error al obtener la obra para editar:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Guardar obra editada
router.post("/obras/editar/:id", async (req, res) => {
  try {
    if (req.body.presupuestoTotal) {
      req.body.presupuestoTotal = Number(req.body.presupuestoTotal);
    }
    await updateObra(req.params.id, req.body);
    res.redirect("/obras");
  } catch (error) {
    console.error("Error al actualizar la obra:", error);
    res.status(500).send("Error interno al actualizar obra");
  }
});

// Eliminar obra
router.get("/obras/eliminar/:id", async (req, res) => {
  try {
    await deleteObra(req.params.id);
    res.redirect("/obras");
  } catch (error) {
    console.error("Error al eliminar la obra:", error);
    res.status(500).send("Error interno al eliminar obra");
  }
});

// Detalle de obra
router.get("/obras/:id", async (req, res) => {
  try {
    const obra = await getObraByID(req.params.id);

    if (!obra) {
      return res.status(404).send("Obra no encontrada");
    }

    const todasPartidas = await PartidasPresupuestariasService.getAll();
    const partidasDeLaObra = todasPartidas.filter(
      (p) => String(p.obra_id) === String(obra.id),
    );

    const todosGastos = await GastosService.getAll();
    const gastosDeLaObra = todosGastos
      .filter((g) => String(g.obra_id) === String(obra.id))
      .map((g) => {
        const partida = todasPartidas.find(
          (p) => String(p.id) === String(g.partida_id),
        );

        return {
          ...g,
          partidaRubro: partida ? partida.rubro : "Sin partida",
        };
      });

    const totalPartidas = partidasDeLaObra.reduce(
      (acc, partida) => acc + (Number(partida.precio_total) || 0),
      0,
    );
    const totalGastos = gastosDeLaObra.reduce(
      (acc, gasto) => acc + (Number(gasto.monto) || 0),
      0,
    );

    res.render("obras/detail", {
      obra,
      partidas: partidasDeLaObra,
      gastos: gastosDeLaObra,
      totalPartidas,
      totalGastos,
      pageTitle: obra.nombre,
    });
  } catch (error) {
    console.error("Error al obtener detalles de la obra:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// ---------- Rutas para PARTIDAS ----------

// Crear partida
router.get("/partidas/nueva", (req, res) => {
  const obraId = req.query.obraId;
  res.render("partidas/form", {
    obraId,
    partidaId: null,
    pageTitle: "Nueva partida presupuestaria",
  });
});

// Editar partida
router.get("/partidas/editar", (req, res) => {
  const obraId = req.query.obraId;
  const partidaId = req.query.partidaId;
  res.render("partidas/form", {
    obraId,
    partidaId,
    pageTitle: "Editar partida presupuestaria",
  });
});

// ---------- Rutas para GASTOS ----------

// Crear gasto
router.get("/gastos/nuevo", async (req, res) => {
  const obraId = req.query.obraId;
  const todasPartidas = await PartidasPresupuestariasService.getAll();
  const partidas = todasPartidas.filter(
    (p) => String(p.obra_id) === String(obraId),
  );
  res.render("gastos/form", {
    obraId,
    partidas,
    pageTitle: "Nuevo gasto",
  });
});

export default router;
