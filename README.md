# Seven stream
Express middleware to encrypt communication b/w microservices

<br/>

### Usage

- Complete object under *cipher* is recieved as an encrypted string by the server.  
This is where all your sensitive data is present.

- This data will be available inside URI scope in decrypted format.

- Similar method for encryption is also available for response body. 

- All your microservices will need to be initialized with same secret key.

- Any tampered response will flag an error, since JSON schema will break.  
  In such cases, an empty string will be returned after descryption.

<br/>

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

  console.log(req.body);
  let data = await encrypt(req.body);

  return res.json(data);
});


let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`INFO: Listening in port ${8080}`);
});

```