import GraphPlugin from '../../plugins/graph-plugin.js';
import RandomPlacePlugin from '../../plugins/randomplace-plugin.js';
import MoveToPlugin from '../../plugins/moveto-plugin.js';

const COLOR_PRIMARY = 0x7986cb;
const COLOR_LIGHT = 0xaab6fe;
const COLOR_DARK = 0x49599a;

const GetRandomItem = Phaser.Utils.Array.GetRandom;
const DistanceBetween = Phaser.Math.Distance.Between;
const RemoveItem = Phaser.Utils.Array.Remove;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var graph = this.rexGraph.add.graph();

        // Create some nodes
        var nodes = [], r = 12;
        for (var i = 0; i < 50; i++) {
            var node = this.add.circle(0, 0, r, COLOR_DARK);
            nodes.push(node);
            graph.addVertex(node);
        }
        // Random place nodes
        this.plugins.get('rexRandomPlace').randomPlace(nodes,
            {
                radius: (r + 10),
                area: new Phaser.Geom.Circle(400, 300, 250),
            }
        );

        // Create links
        var linkCnt = Phaser.Math.Between(30, 120);
        for (var i = 0; i < linkCnt; i++) {
            var nodeA = GetRandomItem(nodes);
            var nodeB = GetUnconnectedNode(nodeA, nodes);
            var link = this.add.line(
                nodeA.x, nodeA.y,  // x, y
                0, 0, // Related start position
                (nodeB.x - nodeA.x), (nodeB.y - nodeA.y), // Related end position
                COLOR_LIGHT // color
            )
                .setOrigin(0);
            graph.addEdge(link, nodeA, nodeB);
        }

        // Add a chess at a random node
        var nodeA = GetRandomItem(nodes);
        var chess = this.add.circle(nodeA.x, nodeA.y, 8, 0xe57373)
            .setData('node', nodeA)
            .setData('preNode', undefined);
        chess.moveTo = this.plugins.get('rexMoveTo').add(chess, {
            speed: 300,
            rotateToTarget: true
        });
        // Wander to a random neighbor node
        var wander = function () {
            var curNode = this.getData('node');
            var neighborNodes = graph.getNeighborVertices(curNode);
            switch (neighborNodes.length) {
                case 0: return;
                case 1: break;
                default:
                    RemoveItem(neighborNodes, this.getData('preNode'));
                    break;
            }

            var nextNode;
            if (neighborNodes.length === 1) {
                nextNode = neighborNodes[0];
            } else {
                nextNode = GetRandomItem(neighborNodes);
            }

            this
                .setData('preNode', curNode)
                .setData('node', nextNode);
            this.moveTo
                .once('complete', wander, this)
                .moveTo(nextNode.x, nextNode.y);
        }
        wander.call(chess);

        this.input.on('pointerdown', function () {
            this.scene.restart();
        }, this);
    }

    update() {
    }
}

var GetUnconnectedNode = function (nodeA, candidates) {
    var graph = nodeA.rexGraphItem.graph;
    var resultNode, distA = Infinity;
    for (var i = 0, cnt = candidates.length; i < cnt; i++) {
        var nodeB = candidates[i];
        if (
            (nodeA === nodeB) ||
            (graph.areNeighborVertices(nodeA, nodeB))
        ) {
            continue;
        }

        // Nearest node
        var distB = DistanceBetween(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
        if (distB < distA) {
            resultNode = nodeB;
            distA = distB;
        }
    }
    return resultNode;
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [
            {
                key: 'rexRandomPlace',
                plugin: RandomPlacePlugin,
                start: true
            },
            {
                key: 'rexMoveTo',
                plugin: MoveToPlugin,
                start: true
            }
        ],
        scene: [
            {
                key: 'rexGraph',
                plugin: GraphPlugin,
                mapping: 'rexGraph'
            }
        ]
    }
};

var game = new Phaser.Game(config);