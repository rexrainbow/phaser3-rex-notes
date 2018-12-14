import Node from './Node/Node.js';

const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;

class Scenario extends EE {
    constructor(scene, config) {
        super();
        this.scene = scene;
        this.nodes = {};
        this.currentKey = undefined;
        this.nextKey = undefined;
    }

    start(key, offset) {
        if (key === undefined) {
            key = '_';
        }
        if (offset === undefined) {
            offset = 0;
        }

        this.stop();
        if (this.isDebugMode) {
            this.log('Start at Node: ' + key);
        }
        var node = this.getNode(key, false);
        if (node === undefined) {
            return this;
        }
        this.currentKey = key;

    }

    stop() {
        return this;
    }

    getNode(key, createIfNotExisted) {
        if (createIfNotExisted === undefined) {
            createIfNotExisted = true;
        }
        if (!this.nodes.hasOwnProperty(key) && createIfNotExisted) {
            this.nodes[key] = new Node(this, key);
        }
        return this.node[key];
    }

}
export default Scenario;