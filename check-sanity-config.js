#!/usr/bin/env node

/**
 * Quick Sanity Configuration Checker
 * Run: node check-sanity-config.js
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 SANITY CONFIGURATION CHECKER\n');
console.log('=' .repeat(50));

// Check 1: .env.local exists
console.log('\n✓ Check 1: .env.local file');
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log('  ✅ .env.local exists');
  
  const envContent = fs.readFileSync(envPath, 'utf-8');
  
  // Check for required variables
  const checks = [
    { key: 'VITE_SANITY_PROJECT_ID', required: true },
    { key: 'VITE_SANITY_DATASET', required: true },
    { key: 'VITE_SANITY_TOKEN', required: false },
  ];
  
  checks.forEach(({ key, required }) => {
    const regex = new RegExp(`^${key}=(.+)$`, 'm');
    const match = envContent.match(regex);
    
    if (match && match[1] && match[1].trim()) {
      const value = match[1].substring(0, 20) + '...';
      console.log(`  ✅ ${key} = ${value}`);
    } else {
      const status = required ? '❌' : '⚠️';
      console.log(`  ${status} ${key} = NOT SET ${required ? '(REQUIRED)' : '(optional)'}`);
    }
  });
} else {
  console.log('  ❌ .env.local NOT FOUND');
  console.log('     → Run: cp .env.example .env.local');
}

// Check 2: sanity.js library
console.log('\n✓ Check 2: Sanity library');
try {
  require.resolve('@sanity/client');
  console.log('  ✅ @sanity/client installed');
} catch {
  console.log('  ❌ @sanity/client NOT installed');
  console.log('     → Run: npm install @sanity/client');
}

// Check 3: useBlog hook
console.log('\n✓ Check 3: Blog hook');
const hookPath = path.join(process.cwd(), 'src/hooks/useBlog.js');
if (fs.existsSync(hookPath)) {
  console.log('  ✅ useBlog.js exists');
} else {
  console.log('  ❌ useBlog.js NOT FOUND');
}

// Check 4: Blog component updated
console.log('\n✓ Check 4: Blog component');
const blogPath = path.join(process.cwd(), 'src/components/Blog.jsx');
if (fs.existsSync(blogPath)) {
  const blogContent = fs.readFileSync(blogPath, 'utf-8');
  if (blogContent.includes('useAllBlogPosts')) {
    console.log('  ✅ Blog.jsx uses Sanity integration');
  } else {
    console.log('  ⚠️ Blog.jsx might not be updated');
  }
}

console.log('\n' + '='.repeat(50));
console.log('\n📋 NEXT STEPS:\n');
console.log('1. Ensure all REQUIRED fields in .env.local are filled');
console.log('2. Restart dev server: npm run dev');
console.log('3. Open Sanity Studio (https://your-project.sanity.site)');
console.log('4. Create & PUBLISH blog post');
console.log('5. Refresh portfolio website');
console.log('6. Check Blog section for posts\n');

