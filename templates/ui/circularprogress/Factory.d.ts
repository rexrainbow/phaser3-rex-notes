import CircularProgress from './CircularProgress';
import { IConfig } from '../../../plugins/circularprogress';

declare type CircularProgressFactory = (
    config?: IConfig
) => CircularProgress;

export default CircularProgressFactory;
export { CircularProgress, IConfig };