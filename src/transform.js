class Transform {

  stringify = async (obj, callback, password) => {
    return await callback(obj, password);
  }

  parse = async (obj, callback, password) => {
    let data = '';
    
    try {
      data = await JSON.parse(await callback(obj, password));
    }
    catch (err) {
      console.error(`Tampered: ${Date.now()}: ${obj}`);
    }

    return data;
  }

}

let transformObj = new Transform();
module.exports.stringify = transformObj.stringify;
module.exports.parse = transformObj.parse;