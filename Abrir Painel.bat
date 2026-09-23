@echo off
chcp 65001 >nul
title Painel - Frutiferas Organicas
cd /d "%~dp0"
echo.
echo   Abrindo o painel do site... aguarde.
echo.
start "" cmd /c "timeout /t 4 >nul && start http://localhost:5050"
call npm run painel
pause
