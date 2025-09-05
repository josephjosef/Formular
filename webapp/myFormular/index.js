const express = require("express")
const app = express()
const path = require("path");
const port = 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));

const tickets = []

app.get("/", function(req, res){
    res.sendFile(path.join('index.html'));
});

app.get("/api/getTickets", function(req, res) {
  res.json({tickets})
})

app.post("/api/postTicket/", (req, res) => {
  const newPerson = req.body.person
  const id = tickets.length
  const ticket = {id, newPerson}
  tickets.push(ticket)
  console.log("Empfangen: ", newPerson)
  res.json({status: "ok", empfangen: newPerson})
});

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});