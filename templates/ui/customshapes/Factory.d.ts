import CustomShapes from "./CustomShapes";
import { IConfig } from '../../../plugins/gameobjects/shape/customshapes/CustomShapes';

declare type CustomShapesFactory = (
    config?: IConfig
) => CustomShapes;

export default CustomShapesFactory;