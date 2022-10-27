var BindObject = function (inputField, object, key) {
    // Set initial value
    inputField.setValue(object[key]);

    // Set text value to object when closing editor
    inputField.on('close', function () {
        object[key] = inputField.getValue();
    })


}

export default BindObject;