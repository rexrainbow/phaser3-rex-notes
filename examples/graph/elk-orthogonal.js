import phaser from 'phaser/src/phaser.js';
import GraphPlugin from '../../plugins/graph-plugin.js';
import LineShapePlugin from '../../plugins/lineshape-plugin.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var nodeA = CreateNode(this, 'A', 0xFFFF00);
        var nodeB = CreateNode(this, 'B');
        var nodeC = CreateNode(this, 'C');
        var nodeD = CreateNode(this, 'D');
        var nodeE = CreateNode(this, 'E');
        var nodeF = CreateNode(this, 'F');
        var dummyNodeFG = CreateDummyNode(this);
        var nodeG = CreateNode(this, 'G');
        var nodeH = CreateNode(this, 'H');
        var nodeI = CreateNode(this, 'I');

        // A -> B -> C
        var edgeAB = CreateEdge(this);
        var edgeBC = CreateEdge(this);
        // A -> D -> E
        var edgeAD = CreateEdge(this);
        var edgeDE = CreateEdge(this);
        // A -> F -> dummyNodeFG -> G
        var edgeAF = CreateEdge(this);
        var edgeFDummyFG = CreateEdge(this);
        var edgeDummyFGG = CreateEdge(this);
        // C -> H, E -> H
        var edgeCH = CreateEdge(this);
        var edgeEH = CreateEdge(this);
        // G -> I, H -> I
        var edgeGI = CreateEdge(this);
        var edgeHI = CreateEdge(this);

        // Alignment edge
        // var dummyEdgeEG = CreateDummyEdge(this);

        var graph = this.rexGraph.add.graph()
            .on('layout.edge', function (edgeGameObject, points) {
                if (edgeGameObject.setLine) {
                    edgeGameObject.setLine(points);
                }
            })
            .on('layout.complete', function () {
                console.log('layout.complete')
            })

        graph
            .addNodes([nodeA, nodeB, nodeC, nodeD, nodeE, nodeF, nodeG, nodeH, nodeI], { padding: 3 })

            // A -> B -> C
            .addEdge(edgeAB, nodeA, nodeB)
            .addEdge(edgeBC, nodeB, nodeC)

            // A -> D -> E
            .addEdge(edgeAD, nodeA, nodeD)
            .addEdge(edgeDE, nodeD, nodeE)

            // A -> F -> edgeFDummyFG -> G
            .addEdge(edgeAF, nodeA, nodeF)
            .addEdge(edgeFDummyFG, nodeF, dummyNodeFG)
            .addEdge(edgeDummyFGG, dummyNodeFG, nodeG)

            // C -> H, E -> H
            .addEdge(edgeCH, nodeC, nodeH)
            .addEdge(edgeEH, nodeE, nodeH)
            // G -> I, H -> I
            .addEdge(edgeGI, nodeG, nodeI)
            .addEdge(edgeHI, nodeH, nodeI)           

        this.rexGraph.ELKLayout(graph, {
            layoutOptions: {
                'elk.algorithm': 'layered',
                'elk.direction': 'DOWN',
                'elk.edgeRouting': 'ORTHOGONAL',
                //'elk.layered.spacing.nodeNodeBetweenLayers': '60',
                //'elk.spacing.nodeNode': '40'
            },
        })

        console.log('done')

    }

    update() {
    }
}

var CreateNode = function (scene, label, color) {
    if (label === undefined) {
        label = ''
    }
    if (color === undefined) {
        color = 0x888888;
    }

    return scene.rexUI.add.label({
        width: 40, height: 40,
        background: scene.add.rectangle().setStrokeStyle(3, color),
        text: scene.add.text(0, 0, label),
        align: 'center',
    }).layout();
}

var CreateDummyNode = function (scene) {
    return scene.add.zone(0, 0, 0, 0);
}

var CreateEdge = function (scene) {
    return scene.add.rexLineShape({
        color: 0x008800,
        lineWidth: 2,
        lineType: 'poly'
    });
}

var CreateDummyEdge = function (scene) {
    return {};
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
        scene: [
            {
                key: 'rexGraph',
                plugin: GraphPlugin,
                mapping: 'rexGraph'
            },
            {
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            }
        ],
        global: [
            {
                key: 'rexLineShape',
                plugin: LineShapePlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);