var IndexOf = function(obj?: any, child?: any) {
    if (Array.isArray(obj)) {
        return obj.indexOf(child);
    } else {
        for (var key in obj) {
            if (obj[key] === child) {
                return key;
            }
        }
        return null;
    }
}

export default IndexOf;