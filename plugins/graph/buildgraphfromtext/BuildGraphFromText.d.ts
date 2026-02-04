import Graph from '../graph/Graph';

export default BuildGraphFromText;

declare namespace BuildGraphFromText {
    /**
     * Callback that creates a game object for a graph element.
     *
     * @param scene - Scene instance.
     * @param id - Node or edge id.
     * @param parameters - Parsed element parameters.
     * @returns Created game object or metadata.
     */
    type OnCreateGameObjectCallbackType = (
        scene: Phaser.Scene,
        id: Graph.IDType,
        parameters: Record<string, unknown>
    ) => Phaser.GameObjects.GameObject | unknown;

    /**
     * Configuration options for building a graph from text.
     */
    interface IConfig {
        /**
         * Callback to create node game objects.
         */
        onCreateNodeGameObject?: OnCreateGameObjectCallbackType,
        /**
         * Callback to create edge game objects.
         */
        onCreateEdgeGameObject?: OnCreateGameObjectCallbackType,

        /**
         * Source text content to parse.
         */
        text?: string,
    }
}

/**
 * Build graph nodes and edges from text.
 *
 * @param graph - Target graph instance.
 * @param config - Build configuration.
 */
declare function BuildGraphFromText(
    graph: Graph,
    config: BuildGraphFromText.IConfig
): void;
