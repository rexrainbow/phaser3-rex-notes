import Base from '../base/Base';
import { IConfig as IConfigBase } from '../base/Base';


export interface IConfig extends IConfigBase {
    type?: string,

    create?: (
        Record<('arc' | 'circle' | 'ellipse' | 'line' | 'lines' | 'rectangle' | 'triangle'), (number | string | string[])> |
        (() => void)
    );

    update?: () => void;
}

export default class Custom extends Base {
}