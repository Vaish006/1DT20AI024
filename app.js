const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let numbers = [1, 2, 3, 4, 5];

app.get('/numbers', (req, res) => {
    res.json(numbers);
});

app.post('/numbers', (req, res) => {
    const newNumber = req.body.number;
    numbers.push(newNumber);
    res.json({ message: 'Number added successfully' });
});

app.put('/numbers/:index', (req, res) => {
    const index = req.params.index;
    const updatedNumber = req.body.number;
    numbers[index] = updatedNumber;
    res.json({ message: 'Number updated successfully' });
});

app.delete('/numbers/:index', (req, res) => {
    const index = req.params.index;
    numbers.splice(index, 1);
    res.json({ message: 'Number deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});