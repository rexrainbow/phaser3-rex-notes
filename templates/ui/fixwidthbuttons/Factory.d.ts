import FixWidthButtons from './FixWidthButtons';
import { IConfig } from './FixWidthButtons';

declare type FixWidthButtonsFactory = (
    config?: IConfig
) => FixWidthButtons;

export default FixWidthButtonsFactory;
export { FixWidthButtons, IConfig };