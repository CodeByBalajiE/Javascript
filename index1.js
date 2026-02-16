const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let students = [
  { id: 1, name: "A", mobileno: 8978735498, address: "ABC", age: 20 },
  { id: 2, name: "B", mobileno: 7873547890, address: "BCD", age: 25 }
];

app.get("/students", (req, res) => {
  res.json(students);
});

app.post("/students", (req, res) => {
  students.push(req.body);
  res.json(students);
});

app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  res.json(student || {});
});

app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  if (student) Object.assign(student, req.body);
  res.json(student || {});
});

app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(s => s.id !== id);
  res.json(students);
});

app.listen(3000);
