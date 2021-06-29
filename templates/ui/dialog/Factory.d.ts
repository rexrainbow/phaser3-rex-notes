import Dialog from './Dialog';
import { IConfig } from './Dialog';

declare type DialogFactory = (
    config?: IConfig
) => Dialog;

export default DialogFactory;