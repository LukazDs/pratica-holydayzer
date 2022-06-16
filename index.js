import express from "express";
import chalk from "chalk";

const app = express();

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "3/1/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
];

app.get("/holiday", (req, resp) => {
    resp.send(holidays)
})

app.get("/is-today-holiday", (req, res) => {
    const today = new Date().toLocaleDateString("en-us")
    const holiday = holidays.find(day => day.date === today)
    holiday ? res.send(`Sim hoje é feriado de ${holiday.name}`) : 
        res.send("Não infelizmente hoje é mais um dia de Trabalho!!!")
})

app.get("/holiday/:mouth", (req, resp) => {
    const mouth = req.params.mouth;
    if(mouth <= 9) {
        resp.send(holidays.filter(v => v.date[0] === mouth && v.date[1] === "/"));
    }
    else {
        resp.send(holidays.filter(v => v.date.slice(0, 2) === mouth));
    }
})

app.listen(5000)
