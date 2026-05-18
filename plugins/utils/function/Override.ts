var Override = function(newCallback?: any, newScope?: any, oldCallback?: any, oldScope?: any, insertBefore?: any) {
    if (insertBefore === undefined) {
        insertBefore = false;
    }
    if (oldCallback?: any) {
        if (insertBefore?: any) {
            return function() {
                newCallback.apply(newScope, arguments);
                oldCallback.apply(oldScope, arguments);                
            }
        } else {
            return function() {
                oldCallback.apply(oldScope, arguments);
                newCallback.apply(newScope, arguments);
            }
        }
    } else {
        return newCallback.bind(newScope)
    }
}

export default Override;