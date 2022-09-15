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

app.get("/statement/:cpf", (request, response) => {
  const { cpf } = request.params;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ errr: "Customer not found" });
  }

  return response.json(customer.statement);
});
app.listen(3333);
