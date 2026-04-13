@echo off
REM ============================================================================
REM Quick Diagnostic Script for Portfolio Sanity Integration (Windows)
REM ============================================================================
REM Run: check-portfolio-setup.bat
REM ============================================================================

echo.
echo 🔍 Portfolio Sanity Setup Diagnostic
echo ====================================
echo.

REM Check 1: .env file exists
echo 1️⃣  Checking .env file...
if exist ".env" (
    echo    ✅ .env file exists
    
    findstr /M "VITE_SANITY_PROJECT_ID" .env >nul
    if !errorlevel! equ 0 (
        echo    ✅ VITE_SANITY_PROJECT_ID found
        for /f "tokens=2 delims==" %%i in ('findstr "VITE_SANITY_PROJECT_ID" .env') do echo       Value: %%i
    ) else (
        echo    ❌ VITE_SANITY_PROJECT_ID NOT found
    )
    
    findstr /M "VITE_SANITY_DATASET" .env >nul
    if !errorlevel! equ 0 (
        echo    ✅ VITE_SANITY_DATASET found
        for /f "tokens=2 delims==" %%i in ('findstr "VITE_SANITY_DATASET" .env') do echo       Value: %%i
    ) else (
        echo    ❌ VITE_SANITY_DATASET NOT found
    )
    
    findstr /M "VITE_SANITY_TOKEN" .env >nul
    if !errorlevel! equ 0 (
        echo    ✅ VITE_SANITY_TOKEN found
        echo       (Token length looks good if > 50 chars)
    ) else (
        echo    ❌ VITE_SANITY_TOKEN NOT found
    )
) else (
    echo    ❌ .env file NOT found!
    echo       Please create .env with Sanity variables
)

echo.
echo 2️⃣  Checking project files...

REM Check portfolio hook exists
if exist "src\hooks\usePortfolio.js" (
    echo    ✅ usePortfolio.js exists
) else (
    echo    ❌ usePortfolio.js NOT found
)

REM Check portfolio schema exists
if exist "portfolio-blog-cms\schemaTypes\portfolio.ts" (
    echo    ✅ portfolio.ts schema exists
) else (
    echo    ❌ portfolio.ts schema NOT found
)

REM Check portfolio components
if exist "src\components\Portfolio.jsx" (
    echo    ✅ Portfolio.jsx exists
) else (
    echo    ❌ Portfolio.jsx NOT found
)

if exist "src\components\PortfolioPreviewModal.jsx" (
    echo    ✅ PortfolioPreviewModal.jsx exists
) else (
    echo    ❌ PortfolioPreviewModal.jsx NOT found
)

echo.
echo 3️⃣  Checking node_modules...

if exist "node_modules\@sanity" (
    echo    ✅ @sanity packages installed
) else (
    echo    ⚠️  @sanity packages might not be installed
    echo       Run: npm install
)

echo.
echo ✅ Diagnostic complete!
echo.
echo 📝 Next steps:
echo    1. Make sure all ✅ checks pass
echo    2. Run: npm run dev
echo    3. Open browser DevTools Console (F12)
echo    4. Look for [Portfolio] messages
echo    5. If error, check PORTFOLIO-TROUBLESHOOTING.md
echo.
pause
