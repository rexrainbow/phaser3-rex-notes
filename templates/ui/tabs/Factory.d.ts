import Tabs from './Tabs';
import { IConfig } from './Tabs';

declare type TabsFactory = (
    config?: IConfig
) => Tabs;

export default TabsFactory;