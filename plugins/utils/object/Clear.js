var Clear = function (obj) {
    if (Array.isArray(obj)) {
        obj.length = 0;
    } else {
        for (var key in obj) {
            delete obj[key];
        }
    }
}
export default Clear;