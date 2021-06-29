import Menu from './Menu';
import { IConfig } from './Menu';

declare type MenuFactory = (
    config?: IConfig
) => Menu;

export default MenuFactory;
export { Menu, IConfig };