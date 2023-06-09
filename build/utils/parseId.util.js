"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseId = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
const throwError_util_1 = require("./throwError.util");
/** Parse an id to ObjectId if valid. Return an ObjectId or throw an error if id is invalid */
const parseId = (id) => {
    return (0, mongoose_1.isValidObjectId)(id) ? new mongoose_1.Types.ObjectId(id) : (0, throwError_util_1.throwError)(constants_1.ERRORS.INVALID_ID);
};
exports.parseId = parseId;
