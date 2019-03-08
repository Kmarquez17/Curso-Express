const fs = require("fs");

function getKeysFromOptions(options) {
  const { settings, _locals, ...objectKeys } = options;
  console.log(objectKeys);
  
  return Object.keys(objectKeys);
}

function getRenderedContent(content, options) {
  console.log(content.toString())
  const keys = getKeysFromOptions(options);
  let contentString = content.toString();

  for (let key of keys) {
        
    contentString = contentString.replace(
      new RegExp(`\{${key}\}`, "gi"),
      options[key]
    );
  }
  
  return contentString;
}

function expressJxs(filePath, options, callback) {
  fs.readFile(filePath, function(err, content) {
    if (err) {
      return callback(err);
    }

    const rendered = getRenderedContent(content, options);

    return callback(null, rendered);
  });
}

module.exports = expressJxs;