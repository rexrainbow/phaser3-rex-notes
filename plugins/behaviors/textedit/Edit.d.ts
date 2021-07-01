import TextEdit from './TextEdit';
import { TextGameObjectType } from '../../utils/types/TextGameObjectType';
import { IConfigOpen as IConfig } from './TextEdit';

export { IConfig };

type Edit = (
    textObject: TextGameObjectType,
    config?: IConfig,
    onCloseCallback?: (textObject: TextGameObjectType) => void
) => TextEdit;

export default Edit;