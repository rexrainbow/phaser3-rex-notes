import Sizer from '../../sizer/Sizer.js';
import CreateLabel from '../../utils/build/CreateLabel.js';
import CreateInputText from '../../utils/build/CreateInputText.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateContent = function (scene, config, creators) {
    // Names-sizer as content
    var layoutMode = GetValue(config, 'layoutMode', 0);
    var isHorizontalLayout = layoutMode === 0;
    var nameSizer = new Sizer(scene, {
        orientation: layoutMode,
        space: {
            left: GetValue(config, 'space.namesLeft', 0),
            right: GetValue(config, 'space.namesRight', 0),
            top: GetValue(config, 'space.namesTop', 0),
            bottom: GetValue(config, 'space.namesBottom', 0),
            item: GetValue(config, 'space.names', 0)
        }
    });
    scene.add.existing(nameSizer);

    // First name
    var firstNameSizer = new Sizer(scene, { orientation: 'x' });
    scene.add.existing(firstNameSizer);
    nameSizer.add(firstNameSizer,
        {
            expand: (isHorizontalLayout) ? false : true,
            proportion: (isHorizontalLayout) ? 1 : 0,
        }
    )

    var firstNameTitleConfig = GetValue(config, 'firstNameTitle', config.nameTitle);
    var firstNameTitle = CreateLabel(scene, firstNameTitleConfig, creators.firstNameTitle || creators.nameTitle);
    firstNameSizer.add(firstNameTitle,
        {
            padding: {
                right: GetValue(config, 'space.firstNameTitle', 0)
            }
        }
    );

    var firstNameInputConfig = GetValue(config, 'firstNameInput', config.nameInput);
    var firstNameInput = CreateInputText(scene, firstNameInputConfig, creators.firstNameInput || creators.nameInput);
    firstNameSizer.add(firstNameInput,
        {
            expand: true,
            proportion: 1,
        }
    );

    // Last name
    var lastNameSizer = new Sizer(scene, { orientation: 'x' });
    scene.add.existing(lastNameSizer);
    nameSizer.add(lastNameSizer,
        {
            expand: (isHorizontalLayout) ? false : true,
            proportion: (isHorizontalLayout) ? 1 : 0,
        }
    )

    var lastNameTitleConfig = GetValue(config, 'lastNameTitle', config.nameTitle);
    var lastNameTitle = CreateLabel(scene, lastNameTitleConfig, creators.lastNameTitle || creators.nameTitle);
    lastNameSizer.add(
        lastNameTitle,
        {
            padding: {
                right: GetValue(config, 'space.lastNameTitle', 0)
            }
        }
    );

    var lastNameInputConfig = GetValue(config, 'firstNameInput', config.nameInput);
    var lastNameInput = CreateInputText(scene, lastNameInputConfig, creators.lastNameInput || creators.nameInput);
    lastNameSizer.add(lastNameInput,
        {
            expand: true,
            proportion: 1,
        }
    );

    nameSizer.addChildrenMap('firstNameTitle', firstNameTitle);
    nameSizer.addChildrenMap('firstNameInput', firstNameInput);
    nameSizer.addChildrenMap('lastNameTitle', lastNameTitle);
    nameSizer.addChildrenMap('lastNameInput', lastNameInput);

    return nameSizer;
}

export default CreateContent;