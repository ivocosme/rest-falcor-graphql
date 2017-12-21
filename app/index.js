const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.CLIENT_PORT;
app.listen(port, () => console.log(`App listening on port ${port}`));