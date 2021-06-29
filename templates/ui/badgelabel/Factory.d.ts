import BadgeLabel from './BadgeLabel';
import { IConfig } from './BadgeLabel';

declare type BadgeLabelFactory = (
    config?: IConfig
) => BadgeLabel;

export default BadgeLabelFactory;