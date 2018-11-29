@echo off
set myprojname=move-from-high-to-low
set main=./examples/board-pathfinder/move-from-high-to-low.js
set assets=./examples/board-pathfinder/move-from-high-to-low/
cd ..
cd ..
webpack --config webpack.production.config.js