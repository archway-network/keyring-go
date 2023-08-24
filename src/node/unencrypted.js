const fs = require("fs");
const path = require("path");

const { resolveTilde } = require("./utils");

function set(fileSaveDir, fileName, data, encoding = "utf-8") {
  const filePath = resolveTilde(path.join(fileSaveDir, fileName));

  fs.mkdirSync(fileSaveDir, { recursive: true });
  fs.writeFileSync(filePath, data, { encoding });

  return "success";
}

function get(fileSaveDir, fileName, encoding = "utf-8") {
  const filePath = resolveTilde(path.join(fileSaveDir, fileName));
  const data = fs.readFileSync(filePath, { encoding });

  return data;
}

function list(fileSaveDir) {
  return fs
    .readdirSync(resolveTilde(fileSaveDir), { withFileTypes: true })
    .filter((item) => !item.isDirectory())
    .map((item) => item.name);
}

function remove(fileSaveDir, fileName) {
  const filePath = resolveTilde(path.join(fileSaveDir, fileName));

  if (!fs.existsSync(filePath))
    throw new Error("The specified item could not be found in the keychain");

  fs.unlinkSync(filePath);
}

module.exports = {
  get,
  set,
  list,
  remove,
};
