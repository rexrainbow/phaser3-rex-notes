var IsEmpty = function(source?: any) {
    for (var k in source) {
        return false;
    }
    return true;
};

export default IsEmpty;