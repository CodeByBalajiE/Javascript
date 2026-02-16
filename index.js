var express = require("express");
 

var app = express();
app.use(express.json()); // to read JSON body
 
app.get('/greeting',function(req,resp){
    resp.send("Hello from API");
});
app.get('/time',function(reg,resp){
    var time=new Date().toLocaleTimeString();
    resp.send(`Time is ${time}`);
})
app.get('/date',function(req,resp){
    var date=new Date().toLocaleDateString();
    resp.send(`Date is:${date}`);
})
// app.listen(9000, ()=>console.log("API Started listening..."));




// In-memory array (acts like DB)
let users = [
  { id: 1, name: "Ali", age: 25 },
  { id: 2, name: "Sara", age: 22 }
];


// ================= CREATE =================
// POST /users
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age
  };

  users.push(newUser);
  res.send(newUser);
});


// ================= READ =================
// GET /users
app.get("/users", (req, res) => {
  res.send(users);
});

// GET /users/:id
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);

  if (!user) return res.status(404).send("User not found");

  res.send(user);
});


// ================= UPDATE =================
// PUT /users/:id
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);

  if (!user) return res.status(404).send("User not found");

  user.name = req.body.name;
  user.age = req.body.age;

  res.send(user);
});


// ================= DELETE =================
// DELETE /users/:id
app.delete("/users/:id", (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.send("User deleted");
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});

