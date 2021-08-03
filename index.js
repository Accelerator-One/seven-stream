const crypt = require('./src/cryptService');
const { stringify, parse } = require('./src/transform');

class SevenStream {

  constructor() {
    this.password = '';
  }

  seven = (opts) => {
    return async (req, res, next) => {

      if (opts['secret'] === undefined)
        throw new Error('ERR: password parameter not supplied');
      this.password = opts.secret;

      switch (req.method) {

        case 'PUT':
        case 'POST':
        case 'PATCH':

          if ('cipher' in req.body)
            req.body['cipher'] = await parse(req.body['cipher'], crypt.decrypt, this.password);

      }

      next();
    }
  }

  encrypt = async (body) => {

    if (!('cipher' in body))
      return body;

    body['cipher'] = await stringify(body['cipher'], crypt.encrypt, this.password);
    return body;
  }

}

const streamObj = new SevenStream();
module.exports.encrypt = streamObj.encrypt;
module.exports.seven = streamObj.seven;
