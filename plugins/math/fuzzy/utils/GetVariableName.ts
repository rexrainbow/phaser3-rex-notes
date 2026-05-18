var GetVariableName = function(setName?: any) {
    if (setName.indexOf('.') !== -1) {
        return setName.split('.')[0];
    } else {
        return setName.replace(/[+-]*/g, '')
    }
}

export default GetVariableName;