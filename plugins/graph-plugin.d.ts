import GraphFactory from './graph/graph/Factory';
import LineFactory from './graph/line/Factory';

import BuildGraphFromText from './graph/buildgraphfromtext/BuildGraphFromText';
import ELKLayout from './graph/layout/ELKLayout';
import DagreLayout from './graph/layout/DagreLayout';

export default GraphPlugin;

declare class Factories {
    graph: typeof GraphFactory;
    line: typeof LineFactory;
}

declare class GraphPlugin extends Phaser.Plugins.ScenePlugin {
    add: Factories;

    buildGraphFromText: typeof BuildGraphFromText;
    ELKLayout: typeof ELKLayout;
    DagreLayout: typeof DagreLayout;
}

import GraphClass from './graph/graph/Graph';
import LineClass from './graph/line/Line';

declare namespace GraphPlugin {
    type Graph = GraphClass;
    type Line = LineClass;
}
