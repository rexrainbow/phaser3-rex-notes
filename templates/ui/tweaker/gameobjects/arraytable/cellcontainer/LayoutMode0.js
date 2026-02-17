import CreatExpandContainer from './CreatExpandContainer.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var LayoutMode0 = function (config) {
    var scene = this.scene;
    var indexLabel = config.indexLabel;
    var inputTweaker = config.inputTweaker;
    var deleteButton = config.deleteButton;
    var moveUpButton = config.moveUpButton;
    var moveDownButton = config.moveDownButton;
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
            proportion: 1, expand: true,
            padding: {
                right: GetValue(space, 'tweaker', 0)
            }
        }
    );

    var moveUpDownButtons = CreatExpandContainer(scene, 1);
    moveUpDownButtons
        .add(
            moveUpButton,
            { proportion: 1, expand: true }
        )
        .add(
            moveDownButton,
            { proportion: 1, expand: true }
        )

    this.add(
        moveUpDownButtons,
        { proportion: 0, expand: true }
    );

    this.add(
        deleteButton,
        { proportion: 0, expand: true }
    );
}

export default LayoutMode0;