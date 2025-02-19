import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';  

const prisma = new PrismaClient();

const app = express();
const port = 3000;
// use é um método que permite adicionar middlewares
// Middlewares são funções que são executadas antes da rotas
// O express.json() é um middleware que permite que a aplicação entenda requisições no formato JSON
app.use(express.json());
app.use(cors());

app.post('/usuarios', async (req, res) => {
 
  await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
  }})
  res.status(201).json(req.body);
})


app.put('/usuarios/:id', async (req, res) => {
 
  await prisma.user.update({
    where: {id: req.params.id},
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
  }})
  res.status(201).json(req.body);
})

app.get('/usuarios', async (req, res) => {
  let users = [];
  if (req.query.age) {
    users = await prisma.user.findMany({
      where: {
        age: req.query.age,
        name: req.query.name,
        email: req.query.email
      }
    });
  } else {
    users = await prisma.user.findMany();
  }
  res.status(200).json(users);
});

app.delete('/usuarios/:id', async (req, res) => {
  await prisma.user.delete({
    where: {id: req.params.id}
  })
  res.status(204).send();
}
)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});