import Composite from '../Composite';
import BaseNode from '../BaseNode';
import Tick from '../../tick/Tick';

export default SwitchSelector;

declare namespace SwitchSelector {
    interface IConfig extends Composite.IConfig {
        expression?: BaseNode.ExpressionValue;
        keys?: string[];
        conditionEvalBreak?: boolean;
    }
}

declare class SwitchSelector extends Composite {
    constructor(
        config?: SwitchSelector.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

    setSelectChildIndex(index: number | string): this;

    evalCondition(tick: Tick): number;

}