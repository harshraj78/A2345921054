const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const TIMEOUT = 500;

let primeWindow = [2,3,5,7,11];
let fibonacciWindow = [55,89,144,233,377,610,987,1597,2584,4181,6765];
let evenWindow = [8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56];
let randomWindow = [2,19,25,7,4,24,17,27,30,21,14,10,23];

async function fetchNumbers(url) {
    try {
        const source = axios.CancelToken.source();
        const timeout = setTimeout(() => {
            source.cancel();
        }, TIMEOUT);

        const response = await axios.get(url, { cancelToken: source.token });
        clearTimeout(timeout);
        return response.data.numbers;
    } catch (error) {
        return [];
    }
}

function updateWindow(window, newNumbers) {
    const uniqueNumbers = [...new Set([...window, ...newNumbers])];
    if (uniqueNumbers.length > WINDOW_SIZE) {
        return uniqueNumbers.slice(uniqueNumbers.length - WINDOW_SIZE);
    }
    return uniqueNumbers;
}

function calculateAverage(numbers) {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

app.get('/numbers/:type', async (req, res) => {
    const type = req.params.type;
    let apiUrl;
    let window;

    switch (type) {
        case 'p':
            apiUrl = 'http://20.244.56.144/test/primes';
            window = primeWindow;
            break;
        case 'f':
            apiUrl = 'http://20.244.56.144/test/fibo';
            window = fibonacciWindow;
            break;
        case 'e':
            apiUrl = 'http://20.244.56.144/test/even';
            window = evenWindow;
            break;
        case 'i':
            apiUrl = 'http://20.244.56.144/test/rand';
            window = randomWindow;
            break;
        default:
            return res.status(400).json({ error: 'Invalid type' });
    }

    const windowPrevState = [...window];
    const newNumbers = await fetchNumbers(apiUrl);
    window = updateWindow(window, newNumbers);
    
    const avg = calculateAverage(window);

    if (type === 'p') primeWindow = window;
    else if (type === 'f') fibonacciWindow = window;
    else if (type === 'e') evenWindow = window;
    else if (type === 'i') randomWindow = window;

    res.json({
        windowPrevState,
        windowCurrState: window,
        numbers: newNumbers,
        avg
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});