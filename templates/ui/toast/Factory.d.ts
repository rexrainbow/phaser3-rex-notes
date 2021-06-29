import Toast from './Toast';
import { IConfig } from './Toast';

declare type ToastFactory = (
    config?: IConfig
) => Toast;

export default ToastFactory;
export { Toast, IConfig }