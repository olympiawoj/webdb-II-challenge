const router = require("express").Router();

const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/lambda.sqlite3"
  },
  debug: true
};

const db = knex(knexConfig);

//GET /api/zoos`

router.get("/", (req, res) => {
  console.log(req.body);
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//GET by id /api/zoos/:id

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where({ id })
    .first()
    .then(zoo => res.status(200).json(zoo))
    .catch(err => res.status(500).json(error));
});

//POST /api/zoos

router.post("/", (req, res) => {
  console.log(req.body);
  db("zoos")
    .insert(req.body)
    .then(ids => {
      const id = ids[0];
      db("zoos")
        // .first()
        .where({ id })
        .first()
        .then(ids => {
          res.status(201).json(ids);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//UPDATE
router.put("/:id", (req, res) => {
  console.log(req.params);
  db("zoos")
    .where({ id: req.params.id })
    .update(req.body, req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ cunt });
      } else {
        res.status(404).json({ errorMessage: "Zoo not found" });
      }
    })
    .catch(err => res.status(500).json(error));
});

//DELETE
router.delete("/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ errorMessage: "Zoo not found" });
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
