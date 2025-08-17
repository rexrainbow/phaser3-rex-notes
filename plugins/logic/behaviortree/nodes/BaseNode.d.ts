import Tick from '../tick/Tick';
import Blackboard from '../blackboard/Base';
import { Expression, BooleanExpression, StringTemplateExpression } from './expressions';

export default BaseNode;

declare namespace BaseNode {
    interface IConfig {
        id?: string;
        category?: string;
        name?: string;
        title?: string;
        description?: string;
        properties?: Record<string, unknown>;
    }

    type ExpressionValue =
        number |
        string |
        boolean |
        Record<string, unknown> |
        ((...args: unknown[]) => unknown);

    type NodePoolType = Record<string, BaseNode>;

    class GeneralNodeClass extends BaseNode {
        constructor(
            config?: Record<string, unknown>,
            nodePool?: NodePoolType
        )
    }
}

declare class BaseNode {
    constructor(
        config?: BaseNode.IConfig,
    );

    parent: BaseNode | null;
    id: string;
    category: string;
    name: string;
    title: string;
    description: string;
    properties: Record<string, unknown>;

    destroy(): void;

    setTitle(title: string): this;
    setName(name: string): this;
    setDescription(description: string): this;
    setProperty(name: string, value: any): this;
    getProperty(name: string): any;
    setParent(parent: BaseNode | null): this;

    getParent(
        isValidParent?: (parent: BaseNode) => boolean
    ): BaseNode | null;

    getTree(tick?: Tick): BaseNode | null;

    addExpression(expression: BaseNode.ExpressionValue): Expression;
    addBooleanExpression(expression: BaseNode.ExpressionValue): BooleanExpression;
    addStringTemplateExpression(expression: BaseNode.ExpressionValue): StringTemplateExpression;

    enter(tick: Tick): void;
    open(tick: Tick): void;
    tick(tick: Tick): number;
    close(tick: Tick): void;
    exit(tick: Tick): void;
    abortChildren(tick: Tick): void;
    abort(tick: Tick): void;

    getNodeMemory(tick: Tick): Blackboard.MemoryType;
    getOpenState(tick: Tick): boolean;
    setOpenState(tick: Tick, state?: boolean): this;

    readonly SUCCESS: number;
    readonly FAILURE: number;
    readonly RUNNING: number;
    readonly ERROR: number;
}