const DegToRad = Phaser.Math.DegToRad;
const RAD90 = DegToRad(90);

const CreateFaceConfig = [
    {
        name: 'front',
        translateX: 0, translateY: 0, translateZ: 0.5,
        rotateY: 0, rotateX: 0
    },
    {
        name: 'back',
        translateX: 0, translateY: 0, translateZ: -0.5,
        rotateY: (RAD90 * 2), rotateX: 0
    },
    {
        name: 'left',
        translateX: -0.5, translateY: 0, translateZ: 0,
        rotateY: RAD90, rotateX: 0
    },
    {
        name: 'right',
        translateX: 0.5, translateY: 0, translateZ: 0,
        rotateY: -RAD90, rotateX: 0
    },
    {
        name: 'top',
        translateX: 0, translateY: -0.5, translateZ: 0,
        rotateY: 0, rotateX: -RAD90
    },
    {
        name: 'bottom',
        translateX: 0, translateY: 0.5, translateZ: 0,
        rotateY: 0, rotateX: RAD90
    },
];

export default CreateFaceConfig;