import Pages from './Pages';
import { IConfig } from './Pages';

declare type PagesFactory = (
    config?: IConfig
) => Pages;

export default PagesFactory;