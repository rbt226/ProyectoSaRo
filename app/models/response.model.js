function Response(code, message, data, stack) {
    this.code = code;
    this.message = message;
    if (data) {
        this.data = data;
    }
    if (stack) {
        this.stack = stack;
    }
}

Response.prototype.getCode = function() {
    return this.code;
};

Response.prototype.settCode = function(code) {
    this.code = code;
};

Response.prototype.getMessage = function() {
    return this.message;
};

Response.prototype.setMessage = function(message) {
    this.message = message;
};

Response.prototype.getData = function() {
    return this.data;
};

Response.prototype.setData = function(data) {
    this.data = data;
};

module.exports = Response;