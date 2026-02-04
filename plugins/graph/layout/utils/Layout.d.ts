import Graph from '../../graph/Graph';
import GetBoundsConfig from '../../../utils/bounds/GetBoundsConfig';

export default Layout;

declare namespace Layout {
    /**
     * 2D point type.
     */
    type PointType = { x: number, y: number };

    /**
     * Layout lifecycle callback.
     *
     * @param graph - Graph instance.
     */
    type OnLayoutCallbackType = (graph?: Graph) => void;

    /**
     * Layout node callback.
     *
     * @param gameObject - Node game object.
     */
    type OnLayoutNodeCallbackType = (
        gameObject?: Phaser.GameObjects.GameObject
    ) => void;

    /**
     * Layout edge callback.
     *
     * @param gameObject - Edge game object.
     * @param path - Routed edge points.
     * @param sourceGameObject - Source node game object.
     * @param targetGameObject - Target node game object.
     */
    type OnLayoutEdgeCallbackType = (
        gameObject?: Phaser.GameObjects.GameObject,
        path?: PointType[],
        sourceGameObject?: Phaser.GameObjects.GameObject,
        targetGameObject?: Phaser.GameObjects.GameObject
    ) => void;

    /**
     * Configuration options for graph layout.
     */
    interface IConfig {
        /**
         * Target container for laid-out objects.
         */
        container?: Graph.ContainerType,
        /**
         * Container padding.
         */
        containerPadding?: GetBoundsConfig.PaddingConfigType,
        /**
         * Graph offset x after layout.
         */
        graphOffsetX?: number,
        /**
         * Graph offset y after layout.
         */
        graphOffsetY?: number,

        /**
         * Called when layout starts.
         */
        onLayoutStart?: OnLayoutCallbackType,
        /**
         * Called when layout completes.
         */
        onLayoutComplete?: OnLayoutCallbackType,

        /**
         * Called per node during layout apply.
         */
        onLayoutNode?: OnLayoutNodeCallbackType,

        /**
         * Called per edge during layout apply.
         */
        onLayoutEdge?: OnLayoutEdgeCallbackType,

        /**
         * Raw engine-specific layout config.
         */
        layoutConfig?: Record<string, unknown>,
    }
}

/**
 * Execute graph layout and apply node/edge positions.
 *
 * @param graph - Graph instance.
 * @param config - Layout configuration.
 * @returns Promise resolved when layout apply completes.
 */
declare function Layout(
    graph: Graph,
    config?: Layout.IConfig
): Promise<unknown>;
