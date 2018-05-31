"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
function isModelWithId(arg) {
    return utils_1.isObject(arg) && arg.id;
}
exports.isModelWithId = isModelWithId;
