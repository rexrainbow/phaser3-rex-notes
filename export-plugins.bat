@echo off
cd dist
del /S /Q *
cd ..
npm run build