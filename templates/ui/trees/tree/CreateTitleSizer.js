import Node from './Node.js';
import GetGameObjectFromConfig from './GetGameObjectFromConfig.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateTitleSizer = function (scene, config) {
    var nodeSizer = new Node(scene, config, { isLeaf: false });

    // Required
    var toggleButton = GetGameObjectFromConfig(scene, config, 'toggleButton', { isLeaf: false });

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

export default CreateTitleSizer;