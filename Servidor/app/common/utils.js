var jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");

exports.handleError = (err, result) => {
    let error;

    /**
    ----------- ValidationError -----------
  }
*/

    if (err instanceof Sequelize.UniqueConstraintError) {
        let values = "";
        let message = "";

        if (err.errors.length > 1) {
            err.errors.forEach((element) => {
                values = values + element.value + " ";
            });
            message = "Los siguientes valores ingresados deben ser unicos: " + values;
        } else {
            values = err.errors[0].value;
            message = "El siguiente valor ingresado debe ser unico: " + values;
        }
        error = {
            errorType: "UniqueConstraintError",
            message: message,
        };
    } else if (err instanceof Sequelize.ValidationError) {
        /** Array of ValidationErrorItem objects describing the validation errors
          public readonly  errors: ValidationErrorItem[];
        */
        let messages = "";
        err.errors.forEach((element) => {
            messages = messages + element.message + " ";
        });

        error = {
            errorType: "ValidationError",
            message: messages,
        };
    }

    /**
    ----------- ConnectionErrors -----------

  export class ConnectionError extends BaseError {
    public parent: Error;
    public original: Error;
    constructor(parent: Error);
  }
*/
    if (err instanceof Sequelize.ConnectionRefusedError) {
        //Thrown when a connection to a database is refused
        error = {
            errorType: "ConnectionRefusedError",
            message: "Error de conexion con la base de datos",
        };
    } else if (err instanceof Sequelize.ConnectionTimedOutError) {
        //Thrown when a connection to a database times out
        error = {
            errorType: "ConnectionTimedOutError",
            message: "Error de conexion con la base de datos",
        };
    }

    /**
    ----------- Base Error -----------

  export class BaseError extends Error {
    public name: string;
  }
 **/
    if (err instanceof Sequelize.SequelizeScopeError) {
        //Scope Error. Thrown when the sequelize cannot query the specified scope.
        error = {
            errorType: "SequelizeScopeError",
            message: "Error no esperado, porfavor intente mas tarde nuevamente",
        };
    } else if (err instanceof Sequelize.EmptyResultError) {
        // Thrown when a record was not found, Usually used with rejectOnEmpty mode (see message for details)
        error = {
            errorType: "EmptyResultError",
            message: "No se han encontrado registros",
        };
    } else if (err instanceof Sequelize.OptimisticLockError) {
        //Thrown when attempting to update a stale model instance
        error = {
            errorType: "OptimisticLockError",
            message: "Error no esperado, porfavor intente mas tarde nuevamente",
        };
    }

    /**
    ----------- Data Base Error -----------

  export class DatabaseError extends BaseError implements CommonErrorProperties {
    public readonly parent: Error;
    public readonly original: Error;
    public readonly sql: string;
    public readonly parameters: Array<any>;
    constructor(parent: Error);
  }
 **/
    if (err instanceof Sequelize.TimeoutError) {
        //Thrown when a database query times out because of a deadlock
        error = {
            errorType: "TimeoutError",
            message: "Error de conexion con la base de datos",
        };
    } else if (err instanceof Sequelize.ForeignKeyConstraintError) {
        // Thrown when a foreign key constraint is violated in the database

        error = {
            errorType: "ForeignKeyConstraintError",
            message: err.parent.sqlMessage,
        };
    } else if (err instanceof Sequelize.ExclusionConstraintError) {
        //Thrown when an exclusion constraint is violated in the database
        error = {
            errorType: "ExclusionConstraintError",
            message: "Se esta violando una constraint",
        };
    }
    /**
    ----------- Connection Error -----------

  export class ConnectionError extends BaseError {
    public parent: Error;
    public original: Error;
    constructor(parent: Error);
  }
 **/
    if (err instanceof Sequelize.ConnectionRefusedError) {
        //Thrown when a connection to a database is refused
        error = {
            errorType: "ConnectionRefusedError",
            message: "Error de conexion con la base de datos",
        };
    } else if (err instanceof Sequelize.AccessDeniedError) {
        //Thrown when a connection to a database is refused due to insufficient privileges
        error = {
            errorType: "AccessDeniedError",
            message: "Error de conexion con la base de datos",
        };
    } else if (err instanceof Sequelize.HostNotFoundError) {
        //Thrown when a connection to a database has a hostname that was not found
        error = {
            errorType: "HostNotFoundError",
            message: "Error de conexion con la base de datos",
        };
    } else if (err instanceof Sequelize.HostNotReachableError) {
        //Thrown when a connection to a database has a hostname that was not found
        error = {
            errorType: "HostNotReachableError",
            message: "Error de conexion con la base de datos",
        };
    } else if (err instanceof Sequelize.InvalidConnectionError) {
        //Thrown when a connection to a database has invalid values for any of the connection parameters
        error = {
            errorType: "InvalidConnectionError",
            message: "Error de conexion con la base de datos",
        };
    } else if (err instanceof Sequelize.ConnectionTimedOutError) {
        //Thrown when a connection to a database times out
        error = {
            errorType: "ConnectionTimedOutError",
            message: "Error de conexion con la base de datos",
        };
    }

    console.log("error: ", error);
    result(error, null);
};

exports.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorize Request");
    }
    const token = req.headers.authorization.split(" ")[1];
    console.log("emtrr ", req.headers.authorization);

    if (token === "null") {
        return res.status(401).send("Unauthorize Request");
    }
    const payload = jwt.verify(token, "secretKey");
    req.userId = payload._id;
    next();
};