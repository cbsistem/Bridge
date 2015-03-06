﻿
// @source resources/Task.js

Bridge.Class.extend('Bridge.Exception', {
    $ctor: function (message, innerException) {
        this.message = message;
        this.innerException = innerException;
        this.errorStack = new Error();
        this.data = new Bridge.Dictionary$2(Object, Object)();
    },

    getMessage: function () {
        return this.message;
    },

    getInnerException: function () {
        return this.innerException;
    },

    getStackTrace: function () {
        return this.errorStack.stack;
    },

    getData: function () {
        return this.data;
    },

    toString: function () {
        return this.getMessage();
    },

    $statics: {
        create: function (error) {
            if (Bridge.is(error, Bridge.Exception)) {
                return error;
            }

            if (error instanceof TypeError) {                
                return new Bridge.NullReferenceException(error.message, new Bridge.ErrorException(error));
            }
            else if (error instanceof RangeError) {
                return new Bridge.ArgumentOutOfRangeException(null, error.message, new Bridge.ErrorException(error));
            }
            else if (error instanceof Error) {
                return new Bridge.ErrorException(o);
            }
            else {
                return new Bridge.Exception(error ? error.toString() : null);
            }
        }
    }
});

Bridge.Class.extend('Bridge.ErrorException', {
    $extend: [Bridge.Exception],

    $ctor: function (error) {
        Bridge.Exception.prototype.$ctor.call(this, error.message);
        this.errorStack = error;
        this.error = error;
    },

    getError: function () {
        return this.error;
    }
});

Bridge.Class.extend('Bridge.ArgumentException', {
    $extend: [Bridge.Exception],

    $ctor: function (message, paramName, innerException) {
        Bridge.Exception.prototype.$ctor.call(this, message || "Value does not fall within the expected range.", innerException);
        this.paramName = paramName;
    },

    getParamName: function () {
        return this.paramName;
    }
});

Bridge.Class.extend('Bridge.ArgumentNullException', {
    $extend: [Bridge.ArgumentException],

    $ctor: function (paramName, message, innerException) {
        if (!message) {
            message = 'Value cannot be null.';
            if (paramName) {
                message += '\nParameter name: ' + paramName;
            }
        }

        Bridge.ArgumentException.prototype.$ctor.call(this, message, paramName, innerException);
    }
});

Bridge.Class.extend('Bridge.ArgumentOutOfRangeException', {
    $extend: [Bridge.ArgumentException],

    $ctor: function (paramName, message, innerException, actualValue) {
        if (!message) {
            message = 'Value is out of range.';
            if (paramName) {
                message += '\nParameter name: ' + paramName;
            }
        }

        Bridge.ArgumentException.prototype.$ctor.call(this, message, paramName, innerException);

        this.actualValue = actualValue;
    },

    getActualValue: function () {
        return this.actualValue;
    }
});

Bridge.Class.extend('Bridge.CultureNotFoundException', {
    $extend: [Bridge.ArgumentException],

    $ctor: function (paramName, invalidCultureName, message, innerException) {
        if (!message) {
            message = 'Culture is not supported.';
            if (paramName) {
                message += '\nParameter name: ' + paramName;
            }
            if (invalidCultureName) {
                message += '\n' + invalidCultureName + ' is an invalid culture identifier.';
            }            
        }

        Bridge.ArgumentException.prototype.$ctor.call(this, message, paramName, innerException);

        this.invalidCultureName = invalidCultureName;
    },

    getInvalidCultureName: function () {
        return this.invalidCultureName;
    }
});

Bridge.Class.extend('Bridge.KeyNotFoundException', {
    $extend: [Bridge.Exception],

    $ctor: function (message, innerException) {
        Bridge.Exception.prototype.$ctor.call(this, message || "Key not found.", innerException);
    }
});

Bridge.Class.extend('Bridge.ArithmeticException', {
    $extend: [Bridge.Exception],

    $ctor: function (message, innerException) {
        Bridge.Exception.prototype.$ctor.call(this, message || "Overflow or underflow in the arithmetic operation.", innerException);
    }
});

Bridge.Class.extend('Bridge.DivideByZeroException', {
    $extend: [Bridge.ArithmeticException],

    $ctor: function (message, innerException) {
        Bridge.ArithmeticException.prototype.$ctor.call(this, message || "Division by 0.", innerException);
    }
});

Bridge.Class.extend('Bridge.OverflowException', {
    $extend: [Bridge.ArithmeticException],

    $ctor: function (message, innerException) {
        Bridge.ArithmeticException.prototype.$ctor.call(this, message || "Arithmetic operation resulted in an overflow.", innerException);
    }
});

Bridge.Class.extend('Bridge.FormatException', {
    $extend: [Bridge.Exception],

    $ctor: function (message, innerException) {
        Bridge.Exception.prototype.$ctor.call(this, message || "Invalid format.", innerException);
    }
});

Bridge.Class.extend('Bridge.InvalidCastException', {
    $extend: [Bridge.Exception],

    $ctor: function (message, innerException) {
        Bridge.Exception.prototype.$ctor.call(this, message || "The cast is not valid.", innerException);
    }
});

Bridge.Class.extend('Bridge.InvalidOperationException', {
    $extend: [Bridge.Exception],

    $ctor: function (message, innerException) {
        Bridge.Exception.prototype.$ctor.call(this, message || "Operation is not valid due to the current state of the object.", innerException);
    }
});

Bridge.Class.extend('Bridge.NotImplementedException', {
    $extend: [Bridge.Exception],

    $ctor: function (message, innerException) {
        Bridge.Exception.prototype.$ctor.call(this, message || "The method or operation is not implemented.", innerException);
    }
});

Bridge.Class.extend('Bridge.NotSupportedException', {
    $extend: [Bridge.Exception],

    $ctor: function (message, innerException) {
        Bridge.Exception.prototype.$ctor.call(this, message || "Specified method is not supported.", innerException);
    }
});

Bridge.Class.extend('Bridge.NullReferenceException', {
    $extend: [Bridge.Exception],

    $ctor: function (message, innerException) {
        Bridge.Exception.prototype.$ctor.call(this, message || "Object is null.", innerException);
    }
});