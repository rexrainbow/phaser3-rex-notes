import EventEmitter from 'eventemitter3';

export default LogicGraph;

declare namespace LogicGraph {
    interface IConfig {

    }

    type IDType = string | number;

    type EdgeType = 1 | 2 | 3 | '->' | '<-' | '<->';
}

declare class LogicGraph extends EventEmitter {
    constructor(
        scene: Phaser.Scene,
        config: LogicGraph.IConfig
    );

    readonly nodeCount: number;
    readonly edgeCount: number;

    isNode(
        gameObject: Phaser.GameObjects.GameObject
    ): boolean;
    isEdge(
        gameObject: Phaser.GameObjects.GameObject
    ): boolean;
    exists(
        gameObject: Phaser.GameObjects.GameObject
    ): boolean;

    remove(gameObject: Phaser.GameObjects.GameObject): this;
    removeNode(gameObject: Phaser.GameObjects.GameObject): this;
    removeEdge(gameObject: Phaser.GameObjects.GameObject): this;

    setAttribute(
        gameObject: Phaser.GameObjects.GameObject,
        key: string, value: unknown
    ): this;
    setNodeAttribute(
        gameObject: Phaser.GameObjects.GameObject,
        key: string, value: unknown
    ): this;
    setEdgeAttribute(
        gameObject: Phaser.GameObjects.GameObject,
        key: string, value: unknown
    ): this;

    setNodesAttribute(
        gameObjects: Phaser.GameObjects.GameObject[],
        key: string, value: unknown
    ): this;
    setEdgeAttribute(
        gameObjects: Phaser.GameObjects.GameObject[],
        key: string, value: unknown
    ): this;


    getAttribute(
        gameObject: Phaser.GameObjects.GameObject,
        key: string
    ): unknown;

    getNodeAttribute(
        gameObject: Phaser.GameObjects.GameObject,
        key: string
    ): unknown;

    getEdgeAttribute(
        gameObject: Phaser.GameObjects.GameObject,
        key: string
    ): unknown;

    clear(destroy?: boolean): this;

    getEdgeLength(gameObject: Phaser.GameObjects.GameObject): number;

    addNode(
        gameObject: Phaser.GameObjects.GameObject,
        attributes?: Record<string, unknown>,
        nodeUID?: LogicGraph.IDType
    ): this;

    addNodes(
        gameObject: Phaser.GameObjects.GameObject[],
        attributes?: Record<string, unknown>
    ): this;

    addEdge(
        gameObject: Phaser.GameObjects.GameObject,
        nodeAGameObject: Phaser.GameObjects.GameObject,
        nodeBGameObject: Phaser.GameObjects.GameObject,
        dir?: LogicGraph.EdgeType,
        attributes?: Record<string, unknown>,
        edgeUID?: LogicGraph.IDType
    ): this;

    removeNode(
        gameObject: Phaser.GameObjects.GameObject,
        destroy?: boolean
    ): this;

    removeAllNodes(destroy?: boolean): this;

    removeEdge(
        gameObject: Phaser.GameObjects.GameObject,
        destroy?: boolean
    ): this;

    removeAllEdges(destroy?: boolean): this;

    getAllNodes(
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];


    getNodesOfEdge(
        edgeGameObject: Phaser.GameObjects.GameObject,
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    getOppositeNode(
        nodeGameObject: Phaser.GameObjects.GameObject,
        edgeGameObject: Phaser.GameObjects.GameObject
    ): Phaser.GameObjects.GameObject;


    getAllEdges(
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    getEdgesOfNode(
        nodeGameObject: Phaser.GameObjects.GameObject,
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];


    areNeighborNodes(
        nodeGameObjectA: Phaser.GameObjects.GameObject,
        nodeGameObjectB: Phaser.GameObjects.GameObject,
    ): boolean;

    getNeighborNodes(
        nodeGameObject: Phaser.GameObjects.GameObject,
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

}