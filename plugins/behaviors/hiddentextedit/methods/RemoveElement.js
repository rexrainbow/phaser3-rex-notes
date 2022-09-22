var RemoveElement = function (element) {
    if (!element) {
        return;
    }

    document.body.removeChild(element);
}

export default RemoveElement;