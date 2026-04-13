#!/bin/bash

# ============================================================================
# Quick Diagnostic Script for Portfolio Sanity Integration
# ============================================================================
# Run: bash check-portfolio-setup.sh
# ============================================================================

echo "🔍 Portfolio Sanity Setup Diagnostic"
echo "===================================="
echo ""

# Check 1: .env file exists
echo "1️⃣  Checking .env file..."
if [ -f ".env" ]; then
    echo "   ✅ .env file exists"
    
    # Check env variables
    if grep -q "VITE_SANITY_PROJECT_ID" .env; then
        echo "   ✅ VITE_SANITY_PROJECT_ID found"
        PROJECT_ID=$(grep "VITE_SANITY_PROJECT_ID" .env | cut -d '=' -f 2)
        echo "      Value: $PROJECT_ID"
    else
        echo "   ❌ VITE_SANITY_PROJECT_ID NOT found"
    fi
    
    if grep -q "VITE_SANITY_DATASET" .env; then
        echo "   ✅ VITE_SANITY_DATASET found"
        DATASET=$(grep "VITE_SANITY_DATASET" .env | cut -d '=' -f 2)
        echo "      Value: $DATASET"
    else
        echo "   ❌ VITE_SANITY_DATASET NOT found"
    fi
    
    if grep -q "VITE_SANITY_TOKEN" .env; then
        echo "   ✅ VITE_SANITY_TOKEN found"
        TOKEN_LENGTH=$(grep "VITE_SANITY_TOKEN" .env | wc -c)
        echo "      Length: ~$TOKEN_LENGTH chars (looks good if > 50)"
    else
        echo "   ❌ VITE_SANITY_TOKEN NOT found"
    fi
else
    echo "   ❌ .env file NOT found!"
    echo "      Please create .env with Sanity variables"
fi

echo ""
echo "2️⃣  Checking project files..."

# Check portfolio hook exists
if [ -f "src/hooks/usePortfolio.js" ]; then
    echo "   ✅ usePortfolio.js exists"
else
    echo "   ❌ usePortfolio.js NOT found"
fi

# Check portfolio schema exists
if [ -f "portfolio-blog-cms/schemaTypes/portfolio.ts" ]; then
    echo "   ✅ portfolio.ts schema exists"
else
    echo "   ❌ portfolio.ts schema NOT found"
fi

# Check portfolio components
if [ -f "src/components/Portfolio.jsx" ]; then
    echo "   ✅ Portfolio.jsx exists"
else
    echo "   ❌ Portfolio.jsx NOT found"
fi

if [ -f "src/components/PortfolioPreviewModal.jsx" ]; then
    echo "   ✅ PortfolioPreviewModal.jsx exists"
else
    echo "   ❌ PortfolioPreviewModal.jsx NOT found"
fi

echo ""
echo "3️⃣  Checking node_modules..."

if [ -d "node_modules/@sanity" ]; then
    echo "   ✅ @sanity packages installed"
else
    echo "   ⚠️  @sanity packages might not be installed"
    echo "      Run: npm install"
fi

echo ""
echo "✅ Diagnostic complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Make sure all ✅ checks pass"
echo "   2. Run: npm run dev"
echo "   3. Open browser DevTools Console (F12)"
echo "   4. Look for [Portfolio] messages"
echo "   5. If error, check PORTFOLIO-TROUBLESHOOTING.md"
