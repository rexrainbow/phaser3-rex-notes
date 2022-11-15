const Clamp = Phaser.Math.Clamp;

var GetComponentsValue = function (components) {
    var value = 0,
        componentValue;
    for (var i = 0, cnt = components.length; i < cnt; i++) {
        componentValue = components[i].value;

        // RGB
        componentValue = Clamp(componentValue, 0, 255);
        value += componentValue << (8 * (2 - i));;
    }

    return value;
}

export default GetComponentsValue;