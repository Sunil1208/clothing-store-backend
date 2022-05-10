/**
 * @desc This file contain Success and Error response for sending to client /user
 */

/**
 * @desc Send any success response
 * 
 * @param {string} message
 * @param {object | array } data
 * @param {number} statusCode
 */

exports.success = (statusCode, message, data) => {
    return {
        status: {
            code: statusCode,
            message: message,
        },
        response: {
            ...data
        }
    }
};

/**
 * @desc Send any error response
 * 
 * @param {string} message
 * @param {number} statusCode
 */

exports.error = (statusCode, message, errors=null) => {
    // List of common HTTP request codes
    const codes = [200, 201, 202, 400, 401, 404, 403, 422, 500];

    // Get matched code
    const findCode = codes.find((code) => code === statusCode);

    if(!findCode) statusCode = 500;
    else statusCode = findCode;

    return {
        status: {
            code: statusCode,
            message,
            errors: errors
        },
        response: {}
    }
};

/**
 * @desc Send any validation response
 * 
 * @param {object | array} errors
 */

exports.validation = (errors) => {
    return {
        status: {
            code: 422,
            message: "Validation errors",
            errors: errors
        },
        response: {}
    }
}