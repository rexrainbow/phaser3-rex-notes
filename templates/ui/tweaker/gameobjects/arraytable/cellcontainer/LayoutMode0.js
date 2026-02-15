const GetValue = Phaser.Utils.Objects.GetValue;

var LayoutMode0 = function (config) {
    var indexLabel = config.indexLabel;
    var inputTweaker = config.inputTweaker;
    var deleteButton = config.deleteButton;
    var space = config.space || {};

    this.orientation = 0;

    this.add(
        indexLabel,
        {
            proportion: 0, expand: true,
            padding: {
                right: GetValue(space, 'index', 0)
            }
        }
    );

    this.add(
        inputTweaker,
        {
            proportion: 1, expand: false,
            padding: {
                right: GetValue(space, 'tweaker', 0)
            }
        }
    );

    this.add(
        deleteButton,
        { proportion: 0, expand: true }
    );
}

export default LayoutMode0;