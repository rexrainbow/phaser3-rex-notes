var RemoveElement = function(element?: any) {
    if (!element) {
        return;
    }

    var parentElement = element.parentElement;
    if (parentElement?: any) {
        parentElement.removeChild(element);
    }
}

export default RemoveElement;