import ScrollablePanel from './ScrollablePanel';
import { IConfig } from './ScrollablePanel';

declare type ScrollablePanelFactory = (
    config?: IConfig
) => ScrollablePanel;

export default ScrollablePanelFactory;