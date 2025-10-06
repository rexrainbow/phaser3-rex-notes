import Graph from '../graph/Graph';

export default BuildGraphFromText;

declare namespace BuildGraphFromText {
    type OnCreateGameObjectCallbackType = (
        scene: Phaser.Scene,
        id: Graph.IDType,
        parameters: Record<string, unknown>
    ) => Object;

    interface IConfig {
        onCreateNodeGameObject?: OnCreateGameObjectCallbackType,
        onCreateEdgeGameObject?: OnCreateGameObjectCallbackType,

        text?: string,
    }
}

declare function BuildGraphFromText(
    graph: Graph,
    config: BuildGraphFromText.IConfig
): void;
