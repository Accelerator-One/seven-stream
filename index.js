const crypt = require('./src/cryptService');
const { stringify, parse } = require('./src/transform');

class SevenStream {

  constructor() {
    this.password = '';
  }

  encrypt = (opts) => {
    return async (req, res, next) => {

      if (opts['password'] === undefined)
        throw new Error('ERR: password parameter not supplied');
      this.password = opts.password;

      switch (req.method) {

        case 'PUT':
        case 'POST':
        case 'PATCH':

          if ('cipher' in req.body)
            req.body['cipher'] = await parse(req.body['cipher'], crypt.encrypt, opts.password);

      }

      next();
    }
  }

  decrypt = async (body) => {

    if (!('cipher' in body))
      return body;

    body['cipher'] = await stringify(body['cipher'], crypt.decrypt, this.password);
    return body;
  }

}

const streamObj = new SevenStream();
module.exports.encrypt = streamObj.encrypt;
module.exports.decrypt = streamObj.decrypt;
