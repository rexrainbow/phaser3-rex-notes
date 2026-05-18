var IsUID = function(object?: any) {
    var type = typeof (object);
    return (type === 'number') || (type === 'string');
}
export default IsUID;