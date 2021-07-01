import TextEdit from './TextEdit';
import { CanvasTextGameObjectType } from '../../utils/types/CanvasTextGameObjectType';
import { IConfigOpen as IConfig } from './TextEdit';

export { IConfig };

type Edit = (
    textObject: CanvasTextGameObjectType,
    config?: IConfig,
    onCloseCallback?: (textObject: CanvasTextGameObjectType) => void
) => TextEdit;

export default Edit;