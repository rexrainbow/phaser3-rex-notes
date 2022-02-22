# Notes of Phaser3 engine

## Links

### Phaser3

- [FAQ](https://github.com/phaser-discord/community/blob/master/FAQ.md)
- [Official discord channel](https://discord.gg/phaser)
- [API document](https://photonstorm.github.io/phaser3-docs/)
- [Examples](https://labs.phaser.io/)
- [Bug report](https://github.com/photonstorm/phaser/issues)

### Rex plugins

- [Plugin list](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/plugin-list/)
    - [Demos](https://codepen.io/rexrainbow/pens/public)
- [Discord channel](https://discord.gg/kWkuFZK)
- [Bug report](https://github.com/rexrainbow/phaser3-rex-notes/issues)
- [Feature suggestion & discussion](https://github.com/rexrainbow/phaser3-rex-notes/discussions)

## Demo

### Prepare

1. Install [node.js](https://nodejs.org/en/) (ver 10+, for rollup)
2. Click `install.bat`
    - `npm install`

### Run examples

1. Click `*.bat` in folder `examples`, it will open application on browser

### Export minify file of plugins

1. Click `export-plugins.bat`
    - `npm run build`

## File structure

- Folder `dist` : Plugin minify files
- Folder `plugins`, `templates` : Source code of plugins and templates
- Folder `examples` : Test code of plugins
- Folder `docs` : Some notes of phaser3, and my plugins.
    - `site\index.html` : Entry point.
