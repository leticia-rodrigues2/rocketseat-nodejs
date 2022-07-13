const { request, response } = require("express");
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const customers = [];
const app = express();
app.use(express.json());
app.post("/account", (request, response) => {
  const { cpf, name } = request.body;
  const customerAlredyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlredyExists) {
    return response.status(400).json({ erroe: "customer already exists !" });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });
  return response.status(201).send();
});
app.listen(3333);
