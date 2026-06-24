import { Router } from "express";
import ObrasService from "../services/obras-service.js";
import PartidasPresupuestariasService from "../services/partidas_presupuestarias.service.js";
import GastosService from "../services/gastos.service.js";
import authViews from "../middleware/authViews.js";
import { COOKIE_OPTIONS } from "../helpers/jwt.js";
import { authenticateUser } from "../services/auth.service.js";

const { getAllObras, getObraByID, createObra, updateObra, deleteObra } =
  ObrasService;

// Router creado para manejar las vistas PUG
const router = Router();

// Middleware de autenticación para todas las vistas
// La raíz (login) está en la whitelist del middleware
router.use(authViews);

// Ruta raíz (login) — GET renderiza el formulario
router.get("/", (_, res) => {
  res.render("index", {
    pageTitle: "Iniciar sesion",
    hideShell: true,
    bodyClass: "login-page",
  });
});

// POST /login — procesa el formulario de inicio de sesión
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const renderError = (error) => {
    return res.render("index", {
      pageTitle: "Iniciar sesion",
      hideShell: true,
      bodyClass: "login-page",
      error,
    });
  };

  try {
    const result = await authenticateUser(username, password);

    if (result.error) {
      return renderError("Credenciales incorrectas");
    }

    res.cookie("token", result.token, COOKIE_OPTIONS);
    res.redirect("/obras");
  } catch (error) {
    console.error("Error en login:", error.message);
    return renderError("Error interno. Intente nuevamente.");
  }
});

// Ruta de logout
router.get("/logout", (_, res) => {
  res.clearCookie("token", COOKIE_OPTIONS);
  res.redirect("/");
});

// ---------- Rutas para OBRAS ----------
router.get("/obras", async (_, res) => {
  try {
    const obras = await getAllObras();
    res.render("obras/index", { obras, pageTitle: "Listado de obras" });
  } catch (error) {
    console.error("Error al renderizar obras:", error);
    res.status(500).send("Error interno al cargar obras");
  }
});

// Crear obra
router.get("/obras/nueva", (_, res) => {
  res.render("obras/form", { pageTitle: "Nueva obra" });
});

// Guardar obra nueva
router.post("/obras", async (req, res) => {
  try {
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

    const tienePartidas = partidasDeLaObra.length > 0;

    const totalPartidas = partidasDeLaObra.reduce(
      (acc, partida) => acc + (Number(partida.precio_total) || 0),
      0,
    );

    let gastosDeLaObra = [];
    let totalGastos = 0;

    if (tienePartidas) {
      const todosGastos = await GastosService.getAll();
      gastosDeLaObra = todosGastos
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

      totalGastos = gastosDeLaObra.reduce(
        (acc, gasto) => acc + (Number(gasto.monto) || 0),
        0,
      );
    }

    res.render("obras/detail", {
      obra,
      partidas: partidasDeLaObra,
      gastos: gastosDeLaObra,
      tienePartidas,
      totalPartidas,
      totalGastos,
      pageTitle: `Detalle de obra - ${obra.nombre}`,
    });
  } catch (error) {
    console.error("Error al obtener detalles de la obra:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// ---------- Rutas para PARTIDAS ----------

// Wizard (asistente): carga secuencial de las 7 partidas
router.get("/partidas/cargar", (req, res) => {
  const obraId = req.query.obraId;
  if (!obraId) {
    return res.status(400).send("ID de obra requerido");
  }
  res.render("partidas/wizard", {
    obraId,
    pageTitle: "Cargar partidas presupuestarias",
  });
});

// Editar partida individual
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
router.get("/gastos/nuevo", (req, res) => {
  const obraId = req.query.obraId;
  res.render("gastos/form", { obraId, pageTitle: "Nuevo gasto" });
});

// ---------- Rutas para MATERIALES ----------
router.get("/materiales/nueva-solicitud", (req, res) => {
  const { obraId } = req.query;

  res.render("materiales/form", {
    obraId,
    pageTitle: "Solicitud de materiales",
  });
});

export default router;
