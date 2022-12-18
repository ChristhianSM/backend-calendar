const express = require("express");
const { check } = require("express-validator");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = express.Router();
router.use( validateJWT );

router.get("/", getEvents);
router.post(
  "/"
  ,[
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalizacion es obligatoria").custom(isDate),
    validateFields
  ]
  ,createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);


module.exports = router;