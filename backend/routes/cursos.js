import express from "express";
import { body, validationResult } from "express-validator";
import { cursoController } from "../controller/index.js";

const router = express.Router();

router.get("/:curso_id", async (req, res) => {
  const curso_id = req.params.curso_id;
  const cursos = await cursoController.getByID(curso_id)
  res.json(cursos);
});

router.get("/", async (req, res) => {
  const cursos = await cursoController.getAll();
  res.json(cursos);
});

router.post(
  "/create",
  [
    //validação dos dados
    body("nome").notEmpty().trim().withMessage("O campo nome é obrigatório"),
    body("ch")
      .isNumeric()
      .isLength({ min: 2 })
      .withMessage("O campo ch deve ser numérico apenas"),
    body("categoria_ids").notEmpty().isArray().withMessage("O campo categoria_ids deve ser inteiro é obrigatório"),
  ],
  async (req, res) => {
    // caso encontre erros, ficará nessa variável errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //se os dados forem válidos, o sistema executará aqui
    const { nome, ch, categoria_ids } = req.body;
    await cursoController.adicionar({ nome, ch, categoria_ids });
    res.status(201).send("Curso criado com sucesso!");
  }
);

export default router;
