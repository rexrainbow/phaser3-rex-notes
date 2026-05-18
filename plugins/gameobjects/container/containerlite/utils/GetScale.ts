var GetScale = function(a?: any, b?: any) {
    if (a === b) {
        return 1;
    } else {
        return a / b;
    }
}

export default GetScale;