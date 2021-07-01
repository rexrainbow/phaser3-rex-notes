import { TextGameObjectType } from '../../../../plugins/utils/types/TextGameObjectType'

type WrapExpandText = (
    textObject: TextGameObjectType,
    minWidth?: number
) => TextGameObjectType;

export default WrapExpandText;