import express from "express";

const app = express();

app.post("signup", (req, res) => {
    res.send()
})

app.post("/signin", (req, res) => {
    res.send()
})

app.post("/chat", (req, res) => {
    res.send();
})

function main(){
    console.log(`Listening on port 30001`);
    app.listen(3001)
}