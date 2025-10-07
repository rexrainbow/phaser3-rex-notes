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

    interface INullNode {
        $dummy: true,
        width: 0,
        height: 0,
    }

    interface INullEdge {
        $invisible: true
    }
}

declare class Graph extends LogicGraph {
    constructor(
        scene: Phaser.Scene,
        config: Graph.IConfig
    );

    buildFromText(context: string): this;

    elkLayout(
        config?: Record<string, unknown>
    ): this;

    elkLayoutPromise(
        config?: Record<string, unknown>
    ): Promise<any>;

    dagreLayout(
        config?: Record<string, unknown>
    ): this;

    forEachGameObject(
        callback: (gameObject: Phaser.GameObjects.GameObject) => void
    ): this;

    setGraphOffset(x: number, y: number): this;

    getBounds(out?: Phaser.Geom.Rectangle): Phaser.Geom.Rectangle;

    drawBounds(
        graphics: Phaser.GameObjects.Graphics,
        config?: number | DrawBounds.IConfig
    ): this;

    creatNullNode(): Graph.INullNode;
    isNullNode(object: Object): boolean;

    createNullEdge(): Graph.INullNode;
    isNullEdge(object: Object): boolean;

    addToContainer(container?: Graph.ContainerType): this;

    fitContainer(
        container?: Graph.ContainerType,
        padding?: GetBoundsConfig.PaddingConfigType
    ): this;

}