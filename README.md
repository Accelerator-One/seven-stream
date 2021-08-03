# seven-stream
Express middleware to encrypt microservice communication

### Example
```javascript
const express = require('express');
const { encrypt, decrypt } = require('@accelerator_one/seven-stream');

let app = express();
app.use(express.json({
  type: 'application/json'
}));

app.use(encrypt({
  password: 'ASDFJKLI'
}));

app.post('/', async (req, res) => {
  let data = await decrypt(req.body);
  console.log("C", data);
  res.json(data);
});

app.listen(8080, () => {
  console.log('Listening on port 8080!');
});
```