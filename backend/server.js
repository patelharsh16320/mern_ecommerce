const express = require('express')
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const cors = require('cors');
const logRequests = require('./middleware/loggerMiddleware');
const router = require('./route/api');

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: false
}));
app.use(logRequests);

app.use(express.json());
app.use(router);


app.listen(port, () => {
  console.log(`Server working on port http://localhost:${port}`)
})