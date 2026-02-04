import EventEmitter from 'eventemitter3';

export default LogicGraph;

declare namespace LogicGraph {
    /**
     * Configuration options for creating a LogicGraph.
     */
    interface IConfig {

    }

    /**
     * Node or edge id type.
     */
    type IDType = string | number;

    /**
     * Edge direction type.
     */
    type EdgeType = 1 | 2 | 3 | '->' | '<-' | '<->';
}

/**
 * Logical graph with node and edge attributes.
 */
declare class LogicGraph extends EventEmitter {
    /**
     * Create a LogicGraph instance.
     *
     * @param scene - Scene instance.
     * @param config - Graph configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config: LogicGraph.IConfig
    );

    /**
     * Total number of nodes.
     */
    readonly nodeCount: number;
    /**
     * Total number of edges.
     */
    readonly edgeCount: number;

    /**
     * Check if a game object is a node.
     *
     * @param gameObject - Target game object.
     * @returns True if node exists.
     */
    isNode(gameObject: Phaser.GameObjects.GameObject): boolean;
    /**
     * Check if a game object is an edge.
     *
     * @param gameObject - Target game object.
     * @returns True if edge exists.
     */
    isEdge(gameObject: Phaser.GameObjects.GameObject): boolean;
    /**
     * Check if a game object exists in graph.
     *
     * @param gameObject - Target game object.
     * @returns True if present.
     */
    exists(gameObject: Phaser.GameObjects.GameObject): boolean;

    /**
     * Remove a node or edge.
     *
     * @param gameObject - Target game object.
     * @param destroy - Destroy game object on remove.
     * @returns This LogicGraph instance.
     */
    remove(
        gameObject: Phaser.GameObjects.GameObject,
        destroy?: boolean
    ): this;

    /**
     * Set attribute on a node or edge.
     *
     * @param gameObject - Target game object.
     * @param key - Attribute key.
     * @param value - Attribute value.
     * @returns This LogicGraph instance.
     */
    setAttribute(
        gameObject: Phaser.GameObjects.GameObject,
        key: string,
        value: unknown
    ): this;
    /**
     * Set attribute on a node.
     *
     * @param gameObject - Node game object.
     * @param key - Attribute key.
     * @param value - Attribute value.
     * @returns This LogicGraph instance.
     */
    setNodeAttribute(
        gameObject: Phaser.GameObjects.GameObject,
        key: string,
        value: unknown
    ): this;
    /**
     * Set attribute on an edge.
     *
     * @param gameObject - Edge game object.
     * @param key - Attribute key.
     * @param value - Attribute value.
     * @returns This LogicGraph instance.
     */
    setEdgeAttribute(
        gameObject: Phaser.GameObjects.GameObject,
        key: string,
        value: unknown
    ): this;

    /**
     * Set same attribute on multiple nodes.
     *
     * @param gameObjects - Node game objects.
     * @param key - Attribute key.
     * @param value - Attribute value.
     * @returns This LogicGraph instance.
     */
    setNodesAttribute(
        gameObjects: Phaser.GameObjects.GameObject[],
        key: string,
        value: unknown
    ): this;
    /**
     * Set same attribute on multiple edges.
     *
     * @param gameObjects - Edge game objects.
     * @param key - Attribute key.
     * @param value - Attribute value.
     * @returns This LogicGraph instance.
     */
    setEdgesAttribute(
        gameObjects: Phaser.GameObjects.GameObject[],
        key: string,
        value: unknown
    ): this;


    /**
     * Get attribute from node or edge.
     *
     * @param gameObject - Target game object.
     * @param key - Attribute key.
     * @returns Attribute value.
     */
    getAttribute(
        gameObject: Phaser.GameObjects.GameObject,
        key: string
    ): unknown;

    /**
     * Get attribute from node.
     *
     * @param gameObject - Node game object.
     * @param key - Attribute key.
     * @returns Attribute value.
     */
    getNodeAttribute(
        gameObject: Phaser.GameObjects.GameObject,
        key: string
    ): unknown;

    /**
     * Get attribute from edge.
     *
     * @param gameObject - Edge game object.
     * @param key - Attribute key.
     * @returns Attribute value.
     */
    getEdgeAttribute(
        gameObject: Phaser.GameObjects.GameObject,
        key: string
    ): unknown;

    /**
     * Clear all nodes and edges.
     *
     * @param destroy - Destroy game objects when clearing.
     * @returns This LogicGraph instance.
     */
    clear(destroy?: boolean): this;

    /**
     * Get visual length of an edge.
     *
     * @param gameObject - Edge game object.
     * @returns Edge length.
     */
    getEdgeLength(gameObject: Phaser.GameObjects.GameObject): number;

    /**
     * Add a node.
     *
     * @param gameObject - Node game object.
     * @param attributes - Node attributes.
     * @param nodeUID - Node id.
     * @returns This LogicGraph instance.
     */
    addNode(
        gameObject: Phaser.GameObjects.GameObject,
        attributes?: Record<string, unknown>,
        nodeUID?: LogicGraph.IDType
    ): this;

    /**
     * Add multiple nodes.
     *
     * @param gameObject - Node game objects.
     * @param attributes - Shared attributes.
     * @returns This LogicGraph instance.
     */
    addNodes(
        gameObject: Phaser.GameObjects.GameObject[],
        attributes?: Record<string, unknown>
    ): this;

    /**
     * Add an edge between two nodes.
     *
     * @param gameObject - Edge game object.
     * @param nodeAGameObject - Source node game object.
     * @param nodeBGameObject - Target node game object.
     * @param dir - Edge direction.
     * @param attributes - Edge attributes.
     * @param edgeUID - Edge id.
     * @returns This LogicGraph instance.
     */
    addEdge(
        gameObject: Phaser.GameObjects.GameObject,
        nodeAGameObject: Phaser.GameObjects.GameObject,
        nodeBGameObject: Phaser.GameObjects.GameObject,
        dir?: LogicGraph.EdgeType,
        attributes?: Record<string, unknown>,
        edgeUID?: LogicGraph.IDType
    ): this;

    /**
     * Remove a node.
     *
     * @param gameObject - Node game object.
     * @param destroy - Destroy game object on remove.
     * @returns This LogicGraph instance.
     */
    removeNode(
        gameObject: Phaser.GameObjects.GameObject,
        destroy?: boolean
    ): this;

    /**
     * Remove all nodes.
     *
     * @param destroy - Destroy game objects on remove.
     * @returns This LogicGraph instance.
     */
    removeAllNodes(destroy?: boolean): this;

    /**
     * Remove an edge.
     *
     * @param gameObject - Edge game object.
     * @param destroy - Destroy game object on remove.
     * @returns This LogicGraph instance.
     */
    removeEdge(
        gameObject: Phaser.GameObjects.GameObject,
        destroy?: boolean
    ): this;

    /**
     * Remove all edges.
     *
     * @param destroy - Destroy game objects on remove.
     * @returns This LogicGraph instance.
     */
    removeAllEdges(destroy?: boolean): this;

    /**
     * Get all node game objects.
     *
     * @param out - Output array.
     * @returns Node game objects.
     */
    getAllNodes(
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];


    /**
     * Get both nodes connected by an edge.
     *
     * @param edgeGameObject - Edge game object.
     * @param out - Output array.
     * @returns Connected node game objects.
     */
    getNodesOfEdge(
        edgeGameObject: Phaser.GameObjects.GameObject,
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    /**
     * Get the opposite node of an edge.
     *
     * @param nodeGameObject - Reference node game object.
     * @param edgeGameObject - Edge game object.
     * @returns Opposite node game object.
     */
    getOppositeNode(
        nodeGameObject: Phaser.GameObjects.GameObject,
        edgeGameObject: Phaser.GameObjects.GameObject
    ): Phaser.GameObjects.GameObject;


    /**
     * Get all edge game objects.
     *
     * @param out - Output array.
     * @returns Edge game objects.
     */
    getAllEdges(
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    /**
     * Get edges connected to a node.
     *
     * @param nodeGameObject - Node game object.
     * @param out - Output array.
     * @returns Edge game objects.
     */
    getEdgesOfNode(
        nodeGameObject: Phaser.GameObjects.GameObject,
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];


    /**
     * Check if two nodes are neighbors.
     *
     * @param nodeGameObjectA - First node game object.
     * @param nodeGameObjectB - Second node game object.
     * @returns True if connected by an edge.
     */
    areNeighborNodes(
        nodeGameObjectA: Phaser.GameObjects.GameObject,
        nodeGameObjectB: Phaser.GameObjects.GameObject
    ): boolean;

    /**
     * Get neighbor nodes of a node.
     *
     * @param nodeGameObject - Node game object.
     * @param out - Output array.
     * @returns Neighbor node game objects.
     */
    getNeighborNodes(
        nodeGameObject: Phaser.GameObjects.GameObject,
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

}
