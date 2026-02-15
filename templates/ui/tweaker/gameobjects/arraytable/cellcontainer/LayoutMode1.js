import CreatExpandContainer from './CreatExpandContainer.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var LayoutMode1 = function (config) {
    var indexLabel = config.indexLabel;
    var inputTweaker = config.inputTweaker;
    var deleteButton = config.deleteButton;
    var space = config.space || {};

    this.orientation = 1;

    var header = CreatExpandContainer(scene, 0);
    this.add(
        header,
        {
            proportion: 0, expand: true,
            padding: {
                bottom: GetValue(space, 'index', 0)
            }
        }
    )

    header
        .add(
            indexLabel,
            {
                proportion: 0, expand: true,

            }
        )
        .addSpace()
        .add(
            deleteButton,
            {
                proportion: 0, expand: true,
            }
        )

    this.add(
        inputTweaker,
        {
            proportion: 1, expand: true,
        }
    );
}

export default LayoutMode1;