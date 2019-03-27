const router = require("express").Router();

const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/lambda.sqlite3"
  }
};

const db = knex(knexConfig);

//GET /api/zoos`

router.get("/", (req, res) => {
  console.log(req.body);
  db("zoos")
    .then(roles => {
      res.status(200).json(roles);
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

// router.post("/", (req, res) => {
//   db("zoos")
//     .insert(req.body)
//     .then(zoos => {
//       const zoo = zoos[0];
//       db("zoos")
//         .where({ id })
//         // .first()
//         .then(zoo => {
//           res.status(201).json(zoo);
//         });
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

module.exports = router;
