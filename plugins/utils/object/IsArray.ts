var IsArray = function(obj?: any) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
export default IsArray;