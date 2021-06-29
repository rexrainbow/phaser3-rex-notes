import NinePatch from "./NinePatch";
import { IConfig } from '../../../plugins/ninepatch';

declare type NinePatchFactory = (
    config?: IConfig
) => NinePatch;

export default NinePatchFactory;
export { NinePatch, IConfig };