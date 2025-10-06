import LogicGraph from './LogicGraph';
import GetBoundsConfig from '../../utils/bounds/GetBoundsConfig';
import DrawBounds from '../../utils/bounds/DrawBounds';

export default Graph;

declare namespace Graph {
    type OnCreateGameObjectCallbackType = (
        scene: Phaser.Scene,
        id: LogicGraph.IDType,
        parameters: Record<string, unknown>
    ) => Object;

    interface RexContainerLite {
        isRexContainerLite: true;
    }

    type ContainerType = Phaser.GameObjects.Container | Phaser.GameObjects.Layer | RexContainerLite;

    interface IConfig extends LogicGraph.IConfig {
        onCreateNodeGameObject?: OnCreateGameObjectCallbackType,
        onCreateEdgeGameObject?: OnCreateGameObjectCallbackType,

        container?: ContainerType,
        containerPadding?: GetBoundsConfig.PaddingConfigType,

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

    setOnCreateNodeGameObjectCallback(
        callback?: Graph.OnCreateGameObjectCallbackType
    ): this;

    setOnCreateEdgeGameObjectCallback(
        callback?: Graph.OnCreateGameObjectCallbackType
    ): this;

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

    setContainer(container?: Graph.ContainerType): this;

    addToContainer(): this;

    setContainerPadding(padding?: GetBoundsConfig.PaddingConfigType): this;

    fitContainer(): this;


}