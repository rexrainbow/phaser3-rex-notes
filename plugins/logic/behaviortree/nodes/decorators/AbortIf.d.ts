import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default AbortIf;

declare namespace AbortIf {
    interface IConfig extends Decorator.IConfig {
        expression?: BaseNode.ExpressionValue;
        returnSuccess?: boolean;
    }
}

declare class AbortIf extends Decorator {
    constructor(
        config?: AbortIf.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}