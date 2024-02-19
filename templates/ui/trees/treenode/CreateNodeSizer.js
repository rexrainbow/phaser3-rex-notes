import Sizer from '../../sizer/Sizer.js';
import GetGameObjectFromConfig from './GetGameObjectFromConfig.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateNodeSizer = function (scene, config, createCallbackConfig) {
    var spaceConfig = config.space;
    var nodeSizer = new Sizer(scene, {
        orientation: 'x',
        space: {
            left: GetValue(spaceConfig, 'nodeLeft', 0),
            right: GetValue(spaceConfig, 'nodeRight', 0),
            top: GetValue(spaceConfig, 'nodeTop', 0),
            bottom: GetValue(spaceConfig, 'nodeBottom', 0)
        }
    })

    // Optional
    var nodeBackground = GetGameObjectFromConfig(scene, config, 'nodeBackground', createCallbackConfig);

    // Required
    var node = GetGameObjectFromConfig(scene, config, 'node', createCallbackConfig);

    if (nodeBackground) {
        nodeSizer.addBackground(nodeBackground);
    }

    nodeSizer.add(
        node,
        { proportion: 1, key: 'node' }
    );

    return nodeSizer;
}

export default CreateNodeSizer;