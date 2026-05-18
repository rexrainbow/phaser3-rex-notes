import Node from './Node';
import CreateGameObjectFromConfig from '../../builders/CreateGameObjectFromConfig';
import DefaultCreateToggleButtonCallback from '../../builders/DefaultCreateToggleButtonCallback';


import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateTitleSizer = function(scene?: any, config?: any) {
    var nodeSizer = new Node(scene, config, { isLeaf: false });
    scene.add.existing(nodeSizer);

    var toggleButton = CreateGameObjectFromConfig(
        scene,
        GetValue(config, 'toggleButton'),  // config
        { isLeaf: false },                 // callbackData
        DefaultCreateToggleButtonCallback, // defaultCallback
        true                               // isRequired
    );

    nodeSizer.insert(0, toggleButton,
        {
            padding: {
                right: GetValue(config, 'space.toggleButton', 0)
            },
            fitRatio: 1,
        }
    );

    nodeSizer.addChildrenMap('toggleButton', toggleButton);

    return nodeSizer;
}

export default CreateTitleSizer;