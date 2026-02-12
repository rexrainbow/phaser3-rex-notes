var LayoutMode0 = function (config) {
    var indexLabel = config.indexLabel;
    var inputTweaker = config.inputTweaker;
    var deleteButton = config.deleteButton;

    this.orientation = 0;

    this.add(
        indexLabel,
        { proportion: 0, expand: true }
    );

    this.add(
        inputTweaker,
        { proportion: 1, expand: false }
    );

    this.add(
        deleteButton,
        { proportion: 0, expand: true }
    );
}

export default LayoutMode0;