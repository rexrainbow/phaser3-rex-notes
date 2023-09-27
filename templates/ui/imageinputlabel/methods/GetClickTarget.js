const GetValue = Phaser.Utils.Objects.GetValue;

var GetClickTarget = function (parent, config) {
    var clickTarget;
    var clickConfig = GetValue(config, 'click', true);
    if (clickConfig) {
        var clickTarget = GetValue(clickConfig, 'target', parent);
        if (typeof (clickTarget) === 'string') {
            clickTarget = parent.getElement(clickTarget);
        }
    }

    return clickTarget;
}

export default GetClickTarget;