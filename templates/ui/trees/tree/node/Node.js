import ExtendNodeClass from './NodeBase.js';
import Sizer from '../../../sizer/Sizer.js';
import CreateGameObjectFromConfig from '../../builders/CreateGameObjectFromConfig.js';
import DefaultCreateBackgroundCallback from '../../builders/DefaultCreateBackgroundCallback.js';
import DefaultCreateNodeBodyCallback from '../../builders/DefaultCreateNodeBodyCallback.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Node extends ExtendNodeClass(Sizer) {
    constructor(scene, config, createCallbackData) {
        var spaceConfig = config.space;

        super(scene, {
            orientation: 'x',
            space: {
                left: GetValue(spaceConfig, 'nodeLeft', 0),
                right: GetValue(spaceConfig, 'nodeRight', 0),
                top: GetValue(spaceConfig, 'nodeTop', 0),
                bottom: GetValue(spaceConfig, 'nodeBottom', 0)
            }
        })
        this.type = 'rexTreeNode';

        var nodeBackground = CreateGameObjectFromConfig(
            scene,
            GetValue(config, 'nodeBackground'),  // config
            createCallbackData,                  // callbackData
            DefaultCreateBackgroundCallback,     // defaultCallback
            false                                // isRequired
        );

        var nodeBody = CreateGameObjectFromConfig(
            scene,
            GetValue(config, 'nodeBody'),  // config
            createCallbackData,            // callbackData
            DefaultCreateNodeBodyCallback, // defaultCallback
            true                           // isRequired
        );

        if (nodeBackground) {
            this.addBackground(nodeBackground);
        }

        this.add(
            nodeBody,
            { proportion: 1, key: 'nodeBody' }
        );

    }

    getTreePatent() {
        return this.rexSizer.treeParent;
    }

    getTreeRoot() {
        var treeParent = this.rexSizer.treeParent;
        if (!treeParent) {
            return null;
        }
        return treeParent.getTreeRoot();
    }

}

export default Node;