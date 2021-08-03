# seven-stream
Express middleware to encrypt microservice communication

### Example
```javascript
// Initialization
const express = require('express');
const { seven, encrypt } = require('@accelerator_one/seven-stream');

let app = express();
app.use(express.json({
  type: 'application/json'
}));

// Encrypted data
app.use(seven({
  secret: /* SECRET KEY HERE */
}));


// Usage
app.post('/', async (req, res) => {

  /*
    - Data available in decrypted format in this scope
    - Cryptography applied only on 'cipher' key. Nest the sensitive data here 
    - Use `encrypt` method if you need to return data back in encrypted format
  */  

  let data = await encrypt(req.body);
  return res.json(data);
});


let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`INFO: Listening in port ${8080}`);
});

```