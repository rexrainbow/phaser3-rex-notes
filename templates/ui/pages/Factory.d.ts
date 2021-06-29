import Page from './Page';
import { IConfig } from './Page';

declare type PageFactory = (
    config?: IConfig
) => Page;

export default PageFactory;
export { Page, IConfig };