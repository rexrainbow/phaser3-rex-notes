const GetValue = Phaser.Utils.Objects.GetValue;

var Make = function (name, config, style) {
    var gameObject;
    var builder = this.builders[name];
    if (builder) {
        if (style === undefined) {
            style = this.styles;
        } else if (typeof (style) === 'string') {
            style = GetValue(this.styles, style) || {};
        }
        gameObject = builder(this.scene, config, style);
    } else {

    }

    return gameObject;
}

export default Make;