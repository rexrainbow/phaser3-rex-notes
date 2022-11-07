import CheckboxBase from '../../../plugins/checkbox.js';
import Click from '../click/Click';

export default Checkbox;

declare namespace Checkbox {
    interface IConfig extends CheckboxBase.IConfig {
        input?: Click.IConfig,
    }
}

declare class Checkbox extends CheckboxBase {
    setReadOnly(enable?: boolean): this;
    readOnly: boolean;
}

