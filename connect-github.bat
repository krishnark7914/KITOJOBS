@echo off
echo ========================================
echo      Connect GitHub Account
echo ========================================
echo.
echo We are about to connect your GitHub account.
echo.
echo INSTRUCTIONS:
echo 1. Select "GitHub.com" (Press Enter)
echo 2. Select "HTTPS" (Press Enter)
echo 3. Select "Yes" to authenticate with your web browser (Press Enter)
echo 4. Copy the one-time code shown
echo 5. Paste it in the browser window that opens
echo 6. Click "Authorize github"
echo.
echo Press any key to start...
pause >nul

gh auth login

echo.
echo ========================================
echo      SUCCESS! You are connected.
echo ========================================
echo.
pause
