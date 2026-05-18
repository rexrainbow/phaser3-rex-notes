var IsFunction = function(obj?: any) {    
    return obj && (typeof(obj) === 'function');
};

export default IsFunction;