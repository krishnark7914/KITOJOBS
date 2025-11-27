@echo off
echo ========================================
echo      KITO Job Portal - Update Code
echo ========================================
echo.
echo 1. Scanning for changes...
git add .

echo.
echo 2. Saving changes...
set /p commit_msg="Enter a short description of what you changed: "
git commit -m "%commit_msg%"

echo.
echo 3. Uploading to GitHub...
git push origin main

echo.
echo ========================================
echo      SUCCESS! Changes are live.
echo ========================================
echo.
pause
