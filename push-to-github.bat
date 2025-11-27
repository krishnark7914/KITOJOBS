@echo off
echo ========================================
echo KITO Job Portal - GitHub Setup
echo ========================================
echo.

REM Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Git is not installed!
    echo.
    echo Please install Git first:
    echo 1. Download from: https://git-scm.com/download/win
    echo 2. Run the installer with default settings
    echo 3. Restart this script
    echo.
    pause
    exit /b 1
)

echo Git found! Proceeding with setup...
echo.

REM Configure Git user
echo Configuring Git user...
git config --global user.name "krishnark7914"
git config --global user.email "ramkit02@gmail.com"
echo Done!
echo.

REM Initialize repository if not already initialized
if not exist .git (
    echo Initializing Git repository...
    git init
    echo Done!
    echo.
)

REM Add all files
echo Adding all files...
git add .
echo Done!
echo.

REM Create initial commit
echo Creating commit...
git commit -m "Initial commit: KITO Healthcare Job Portal - Full-featured job portal with Next.js, TypeScript, and shadcn/ui"
echo Done!
echo.

REM Check if remote exists
git remote get-url origin >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Adding remote repository...
    git remote add origin https://github.com/krishnark7914/KITOJOBS.git
    echo Done!
    echo.
)

REM Set main branch
echo Setting main branch...
git branch -M main
echo Done!
echo.

echo ========================================
echo READY TO PUSH!
echo ========================================
echo.
echo IMPORTANT: You need to authenticate with GitHub
echo.
echo Option 1 - GitHub Personal Access Token (Recommended):
echo   1. Go to: https://github.com/settings/tokens
echo   2. Click "Generate new token (classic)"
echo   3. Give it a name: "KITO Upload"
echo   4. Select scope: "repo" (full control of private repositories)
echo   5. Click "Generate token"
echo   6. Copy the token
echo   7. When prompted for password, paste the token
echo.
echo Option 2 - GitHub CLI:
echo   1. Install GitHub CLI from: https://cli.github.com/
echo   2. Run: gh auth login
echo.
echo Press any key to push to GitHub...
pause >nul

echo.
echo Pushing to GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS! 🎉
    echo ========================================
    echo.
    echo Your KITO Job Portal is now on GitHub!
    echo Repository: https://github.com/krishnark7914/KITOJOBS
    echo.
    echo Next steps:
    echo 1. Visit your repository on GitHub
    echo 2. Add a description and topics
    echo 3. Share with others!
    echo.
) else (
    echo.
    echo ========================================
    echo PUSH FAILED
    echo ========================================
    echo.
    echo Common issues:
    echo 1. Repository doesn't exist - Create it first on GitHub
    echo 2. Authentication failed - Use Personal Access Token
    echo 3. Permission denied - Check repository access
    echo.
    echo To create the repository:
    echo 1. Go to: https://github.com/new
    echo 2. Repository name: KITOJOBS
    echo 3. Keep it Public or Private
    echo 4. DO NOT initialize with README
    echo 5. Click "Create repository"
    echo 6. Run this script again
    echo.
)

pause
