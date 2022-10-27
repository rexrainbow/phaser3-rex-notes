var BindObject = function (inputField, object, key) {
    // Set initial value
    inputField.setText(object[key]);

}

export default BindObject;