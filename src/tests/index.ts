import path = require("path");

const { exportDir } = require("../utils/exportDir");

export const tests = exportDir(path.resolve(__dirname));
