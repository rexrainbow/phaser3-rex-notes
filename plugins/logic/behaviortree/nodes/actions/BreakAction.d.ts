import Action from '../Action';

export default BreakAction;

declare namespace BreakAction {
    interface IConfig extends Action.IConfig {
        breakDecoratorTitle?: string,
        tag?: string
    }
}

declare class BreakAction extends Action {
    constructor(config?: BreakAction.IConfig);
}