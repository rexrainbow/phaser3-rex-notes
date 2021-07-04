import Container from '../container/Container';
import Perspective from "./Perspective";
import { IConfig } from '../../../plugins/behaviors/containerperspective/ContainerPerspective';

export default function (
    parentContainer: Container,
    config?: IConfig
): Perspective;