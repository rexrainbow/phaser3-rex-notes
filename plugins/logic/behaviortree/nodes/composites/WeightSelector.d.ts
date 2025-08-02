import Composite from '../Composite';
import BaseNode from '../BaseNode';
import Tick from '../../tick/Tick';

export default WeightSelector;

declare namespace WeightSelector {
    interface IConfig extends Composite.IConfig {
        expression?: BaseNode.ExpressionValue;
        weights?: number[];
        conditionEvalBreak?: boolean;
    }
}

declare class WeightSelector extends Composite {
    constructor(
        config?: WeightSelector.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

    setSelectChildIndex(index: number): this;

    evalCondition(tick: Tick): number;
}