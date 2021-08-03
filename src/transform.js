class Transform {

  stringify = async (obj, callback, password) => {
    return await callback(obj, password);
  }

  parse = async (obj, callback, password) => {
    return await JSON.parse(await callback(obj, password));
  }

}

let transformObj = new Transform();
module.exports.stringify = transformObj.stringify;
module.exports.parse = transformObj.parse;
