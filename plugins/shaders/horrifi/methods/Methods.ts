import SetEnable from './SetEnable';
import BloonConfigurationMethods from './BloonConfigurationMethods';
import ChromaticConfigurationMethods from './ChromaticConfigurationMethods';
import VignetteConfigurationMethod from './VignetteConfigurationMethod';
import NoiseConfigurationMethod from './NoiseConfigurationMethod';
import VHSConfigurationMethod from './VHSConfigurationMethod';
import ScanlinesConfigurationMethod from './ScanlinesConfigurationMethod';
import CRTConfigurationMethod from './CRTConfigurationMethod';

var Methods = {
    setEnable: SetEnable
};

Object.assign(
    Methods,
    BloonConfigurationMethods,
    ChromaticConfigurationMethods,
    VignetteConfigurationMethod,
    NoiseConfigurationMethod,
    VHSConfigurationMethod,
    ScanlinesConfigurationMethod,
    CRTConfigurationMethod,
)

export default Methods;