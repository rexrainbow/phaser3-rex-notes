var SetComponentsValue = function (components, value) {
    var componentValue;
    for (var i = 0, cnt = components.length; i < cnt; i++) {
        // RGB
        componentValue = (value >> (8 * (2 - i))) & 0xff;

        components[i].setValue(componentValue);
    }
}

export default SetComponentsValue;