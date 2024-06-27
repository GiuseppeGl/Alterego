const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let dispositivi = [
    { id: 1, nome: 'Luci stanza', categoria: 'STANZA PRINCIPALE', acceso: false },
    { id: 2, nome: 'Condizionatore', categoria: 'STANZA PRINCIPALE', acceso: false },
    { id: 3, nome: 'Computer', categoria: 'STANZA PRINCIPALE', acceso: false },
    { id: 4, nome: 'Verisure', categoria: 'STANZA PRINCIPALE', acceso: false },
    { id: 5, nome: 'Luce', categoria: 'BATHROOM', acceso: false }
];

app.get('/dispositivi', (req, res) => {
    res.send(dispositivi);
});

app.post('/accendi/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const dispositivo = dispositivi.find(d => d.id === id);
    if (dispositivo) {
        dispositivo.acceso = true;
        res.send({ message: `Dispositivo ${dispositivo.nome} acceso` });
    } else {
        res.status(404).send({ message: 'Dispositivo non trovato' });
    }
});

app.post('/spegni/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const dispositivo = dispositivi.find(d => d.id === id);
    if (dispositivo) {
        dispositivo.acceso = false;
        res.send({ message: `Dispositivo ${dispositivo.nome} spento` });
    } else {
        res.status(404).send({ message: 'Dispositivo non trovato' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
