import Composite from '../Composite';
import BaseNode from '../BaseNode';
import Tick from '../../tick/Tick';

export default IfSelector;

declare namespace IfSelector {
    interface IConfig extends Composite.IConfig {
        expression?: BaseNode.ExpressionValue;
        conditionEvalBreak?: boolean;
    }
}

declare class IfSelector extends Composite {
    constructor(
        config?: IfSelector.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

    setSelectChildIndex(index: number): this;

    evalCondition(tick: Tick): number;
}