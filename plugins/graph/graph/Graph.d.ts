import LogicGraph from './LogicGraph';
import GetBoundsConfig from '../../utils/bounds/GetBoundsConfig';
import DrawBounds from '../../utils/bounds/DrawBounds';

export default Graph;

declare namespace Graph {
    /**
     * Node or edge id type.
     */
    type IDType = LogicGraph.IDType;

    /**
     * RexContainerLite compatibility type.
     */
    interface RexContainerLite {
        isRexContainerLite: true;
    }

    /**
     * Supported container type.
     */
    type ContainerType = Phaser.GameObjects.Container | Phaser.GameObjects.Layer | RexContainerLite;

    /**
     * Configuration options for creating a Graph.
     */
    interface IConfig extends LogicGraph.IConfig {
    }

    /**
     * Dummy node marker object.
     */
    interface IDummyNode {
        $dummy: true,
        width: 0,
        height: 0,
    }

    /**
     * Invisible edge marker object.
     */
    interface IInvisibleEdge {
        $invisible: true
    }
}

/**
 * Graph extension with layout and bounds helpers.
 */
declare class Graph extends LogicGraph {
    /**
     * Create a Graph instance.
     *
     * @param scene - Scene instance.
     * @param config - Graph configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config: Graph.IConfig
    );

    /**
     * Iterate all game objects in this graph.
     *
     * @param callback - Callback invoked for each game object.
     * @returns This Graph instance.
     */
    forEachGameObject(
        callback: (gameObject: Phaser.GameObjects.GameObject) => void
    ): this;

    /**
     * Set graph render offset.
     *
     * @param x - Offset x.
     * @param y - Offset y.
     * @returns This Graph instance.
     */
    setGraphOffset(x: number, y: number): this;
    /**
     * Graph offset x.
     */
    readonly graphOffsetX: number;
    /**
     * Graph offset y.
     */
    readonly graphOffsetY: number;

    /**
     * Get bounds of all graph game objects.
     *
     * @param out - Output rectangle.
     * @returns Bounds rectangle.
     */
    getBounds(out?: Phaser.Geom.Rectangle): Phaser.Geom.Rectangle;

    /**
     * Draw graph bounds.
     *
     * @param graphics - Graphics object.
     * @param config - Draw config or stroke color.
     * @returns This Graph instance.
     */
    drawBounds(
        graphics: Phaser.GameObjects.Graphics,
        config?: number | DrawBounds.IConfig
    ): this;

    /**
     * Create a dummy node marker.
     *
     * @returns Dummy node marker.
     */
    createDummyNode(): Graph.IDummyNode;
    /**
     * @deprecated Use `createDummyNode` instead.
     */
    creatDummyNode(): Graph.IDummyNode;
    /**
     * Check if object is a dummy node marker.
     *
     * @param object - Target object.
     * @returns True if dummy marker.
     */
    isDummyNode(object: unknown): boolean;

    /**
     * Create an invisible edge marker.
     *
     * @returns Invisible edge marker.
     */
    createInvisibleEdge(): Graph.IInvisibleEdge;
    /**
     * Check if object is an invisible edge marker.
     *
     * @param object - Target object.
     * @returns True if invisible marker.
     */
    isInvisibleEdge(object: unknown): boolean;

    /**
     * Add all graph objects to a container.
     *
     * @param container - Target container.
     * @returns This Graph instance.
     */
    addToContainer(container?: Graph.ContainerType): this;
    /**
     * Add all graph objects to a layer.
     *
     * @param layer - Target layer.
     * @returns This Graph instance.
     */
    addToLayer(layer?: Graph.ContainerType): this;

    /**
     * Fit container size to graph bounds.
     *
     * @param container - Target container.
     * @param padding - Bounds padding config.
     * @returns This Graph instance.
     */
    fitContainer(
        container?: Graph.ContainerType,
        padding?: GetBoundsConfig.PaddingConfigType
    ): this;

}
