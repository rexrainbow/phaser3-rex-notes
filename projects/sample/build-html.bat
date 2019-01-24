@echo off
set myprojname=export-html-test
set main=./projects/sample/main.js
set assets=./projects/sample/assets
cd ..
cd ..
webpack --config webpack.production.config.js