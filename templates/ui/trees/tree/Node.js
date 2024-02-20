import Sizer from '../../sizer/Sizer.js';
import GetGameObjectFromConfig from './GetGameObjectFromConfig.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Node extends Sizer {
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

        // Optional
        var nodeBackground = GetGameObjectFromConfig(scene, config, 'nodeBackground', createCallbackData);

        // Required
        var nodeBody = GetGameObjectFromConfig(scene, config, 'nodeBody', createCallbackData);

        if (nodeBackground) {
            this.addBackground(nodeBackground);
        }

        this.add(
            nodeBody,
            { proportion: 1, key: 'node' }
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