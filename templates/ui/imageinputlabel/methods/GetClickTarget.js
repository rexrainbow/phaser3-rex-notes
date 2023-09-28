const GetValue = Phaser.Utils.Objects.GetValue;

var GetClickTarget = function (parent, config) {
    var clickTarget = GetValue(config, 'clickTarget', 'icon');
    if (typeof (clickTarget) === 'string') {
        clickTarget = parent.getElement(clickTarget);
    }

    return clickTarget;
}

export default GetClickTarget;