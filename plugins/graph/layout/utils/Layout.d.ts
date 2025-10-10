import Graph from '../../graph/Graph';
import GetBoundsConfig from '../../../utils/bounds/GetBoundsConfig';

export default Layout;

declare namespace Layout {
    type PointType = { x: number, y: number };

    type OnLayoutCallbackType = (graph?: Graph) => void;

    type OnLayoutNodeCallbackType = (
            gameObject?: Phaser.GameObjects.GameObject
        ) => void;

    type OnLayoutEdgeCallbackType = (
            gameObject?: Phaser.GameObjects.GameObject,
            path?: PointType[],
            sourceGameObject?: Phaser.GameObjects.GameObject,
            targetGameObject?: Phaser.GameObjects.GameObject
        ) => void;

    interface IConfig {
        container?: Graph.ContainerType,
        containerPadding?: GetBoundsConfig.PaddingConfigType,
        graphOffsetX?: number,
        graphOffsetY?: number,

        onLayoutStart?: OnLayoutCallbackType,
        onLayoutComplete?: OnLayoutCallbackType,

        onLayoutNode?: OnLayoutNodeCallbackType,

        onLayoutEdge?: OnLayoutEdgeCallbackType,

        layoutConfig?: Record<string, unknown>,
    }
}

declare function Layout(
    graph: Graph,
    config?: Layout.IConfig
): Promise<any>;