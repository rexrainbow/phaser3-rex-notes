import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default ContinueIf;

declare namespace ContinueIf {
    interface IConfig extends Decorator.IConfig {
        expression?: BaseNode.ExpressionValue;
        returnSuccess?: boolean;
    }
}

declare class ContinueIf extends Decorator {
    constructor(
        config?: ContinueIf.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}