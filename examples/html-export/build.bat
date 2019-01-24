@echo off
set myprojname=html-export
set main=./examples/html-export/main.js
set assets=./examples/html-export/assets
cd ..
cd ..
webpack --config webpack.production.config.js