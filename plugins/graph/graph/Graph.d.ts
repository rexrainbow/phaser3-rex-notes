import LogicGraph from './LogicGraph';
import GetBoundsConfig from '../../utils/bounds/GetBoundsConfig';
import DrawBounds from '../../utils/bounds/DrawBounds';

export default Graph;

declare namespace Graph {
    type IDType = LogicGraph.IDType;

    interface RexContainerLite {
        isRexContainerLite: true;
    }

    type ContainerType = Phaser.GameObjects.Container | Phaser.GameObjects.Layer | RexContainerLite;

    interface IConfig extends LogicGraph.IConfig {
    }

    interface IDummyNode {
        $dummy: true,
        width: 0,
        height: 0,
    }

    interface IInvisibleEdge {
        $invisible: true
    }
}

declare class Graph extends LogicGraph {
    constructor(
        scene: Phaser.Scene,
        config: Graph.IConfig
    );

    forEachGameObject(
        callback: (gameObject: Phaser.GameObjects.GameObject) => void
    ): this;

    setGraphOffset(x: number, y: number): this;
    readonly graphOffsetX: number;
    readonly graphOffsetY: number;

    getBounds(out?: Phaser.Geom.Rectangle): Phaser.Geom.Rectangle;

    drawBounds(
        graphics: Phaser.GameObjects.Graphics,
        config?: number | DrawBounds.IConfig
    ): this;

    creatDummyNode(): Graph.IDummyNode;
    isDummyNode(object: Object): boolean;

    createInvisibleEdge(): Graph.IDummyNode;
    isInvisibleEdge(object: Object): boolean;

    addToContainer(container?: Graph.ContainerType): this;
    addToLayer(layer?: Graph.ContainerType): this;

    fitContainer(
        container?: Graph.ContainerType,
        padding?: GetBoundsConfig.PaddingConfigType
    ): this;

}