const UnsafePropertyNames = {
    __proto__: true,
    prototype: true,
    constructor: true
};

var IsUnsafePropertyName = function (key) {
    return (typeof (key) === 'string') && UnsafePropertyNames[key];
}

export default IsUnsafePropertyName;
