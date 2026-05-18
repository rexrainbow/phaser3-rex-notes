import SpliceOne from '../array/SpliceOne';

var RemoveItem = function(obj?: any, item?: any) {
    if (Array.isArray(obj)) {
        var index = obj.indexOf(item);
        if (index !== -1) {
            SpliceOne(obj, index);
        }
    } else {
        for (var key in obj) {
            if (obj[key] === item) {
                delete obj[key];
                return;
            }
        }
    }
}

export default RemoveItem;