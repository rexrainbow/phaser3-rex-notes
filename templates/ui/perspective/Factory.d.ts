import Container from '../container/Container';
import Perspective from "./Perspective";
import { IConfig } from '../../../plugins/behaviors/containerperspective/ContainerPerspective';

declare type PerspectiveFactory = (
    parentContainer: Container,
    config?: IConfig
) => Perspective;

export default PerspectiveFactory;