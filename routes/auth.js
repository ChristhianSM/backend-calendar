const express = require("express");
const { check } = require("express-validator");
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = express.Router();

router.post(
  "/new",
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El Email es obligatorio').isEmail(),
    check('password', 'El Password debe de ser de 6 caracteres').isLength({min: 6}),
    validateFields
  ],
  createUser
)

router.post(
  "/",
  [
    check('email', 'El Email es obligatorio').isEmail(),
    check('password', 'El Password debe de ser de 6 caracteres').isLength({min: 6}),
    validateFields
  ],
  loginUser
)

router.get("/renew",validateJWT, renewToken)

module.exports = router;