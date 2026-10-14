@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 22.12 or newer is required. Install Node.js and run this file again.
  pause
  exit /b 1
)
if not exist node_modules (
  call npm.cmd ci
  if errorlevel 1 (
    echo Installation failed. Please send the error shown above.
    pause
    exit /b 1
  )
)
call npm.cmd run dev -- --open
pause
