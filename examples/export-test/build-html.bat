@echo off
set myprojname=export-test
set main=./examples/export-test/main.js
set assets=./examples/export-test/assets
cd ..
cd ..
webpack --config webpack.production.config.js