import Node from './Node.js';
import GetGameObjectFromConfig from './GetGameObjectFromConfig.js';
import Triangle from '../../triangle/Triangle.js';


const GetValue = Phaser.Utils.Objects.GetValue;

var CreateTitleSizer = function (scene, config) {
    var nodeSizer = new Node(scene, config, { isLeaf: false });
    scene.add.existing(nodeSizer);

    // Required
    var toggleButton = GetGameObjectFromConfig(
        scene,
        config, 'toggleButton',
        { isLeaf: false },
        DefaultCreateToggleButtonCallback
    );

    nodeSizer.insert(0, toggleButton,
        {
            padding: {
                right: GetValue(config, 'space.toggleButton', 0)
            },
            fitRatio: 1,
            key: 'toggleButton'
        }
    );

    return nodeSizer;
}

var DefaultCreateToggleButtonCallback = function (scene, config, createCallbackData) {
    var gameObject = new Triangle(scene, config);

    gameObject
        .on('expand.start', function (gameObject) {
            gameObject.setDirection('down');
        })
        .on('collapse.complete', function (gameObject) {
            gameObject.setDirection('right');
        });

    return gameObject;
}

export default CreateTitleSizer;