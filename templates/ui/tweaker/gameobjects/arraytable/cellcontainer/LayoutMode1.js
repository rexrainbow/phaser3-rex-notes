import CreatExpandContainer from './CreatExpandContainer.js';

var LayoutMode1 = function (config) {
    var indexLabel = config.indexLabel;
    var inputTweaker = config.inputTweaker;
    var deleteButton = config.deleteButton;

    this.orientation = 1;

    var header = CreatExpandContainer(scene, 0);
    this.add(
        header,
        { proportion: 0, expand: true }
    )

    header
        .add(
            indexLabel,
            { proportion: 0, expand: true }
        )
        .addSpace()
        .add(
            deleteButton,
            { proportion: 0, expand: true }
        )

    this.add(
        inputTweaker,
        { proportion: 1, expand: true }
    );
}

export default LayoutMode1;