@echo off
cd dist
del /S /Q *.js
cd ..
npm run build
