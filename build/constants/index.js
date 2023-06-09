"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERRORS = exports.MESSAGES = void 0;
exports.MESSAGES = {
    CREATED: "Resource created successfully",
    UPDATED: "Resource updated successfully",
    DELETED: "Resource deleted successfully",
    LOGOUT: "Logout successful",
    UPLOAD_SUCCESS: "Resource uploaded successfully",
};
exports.ERRORS = {
    INVALID_ID: "invalid ObjectId",
    USER_EXIST: "user already exist",
    USER_NOT_FOUND: "user not found",
    INVALID_EMAIL_PWD: "Invalid email or password",
    UNAUTHENTICATED: "Access Denied. Unauthorized to access resource",
    INVALID_TOKEN: "Invalid Access Token",
};
