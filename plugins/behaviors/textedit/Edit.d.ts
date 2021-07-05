import TextEdit from './TextEdit';
import { CanvasTextGameObjectType } from '../../utils/types/TextGameObjectType';
import { IConfigOpen as IConfig } from './TextEdit';

export { IConfig };

export default function Edit(
    textObject: CanvasTextGameObjectType,
    config?: IConfig,
    onCloseCallback?: (textObject: CanvasTextGameObjectType) => void
): TextEdit;