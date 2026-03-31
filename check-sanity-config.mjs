#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('\n🔍 SANITY CONFIGURATION CHECKER\n');
console.log('='.repeat(50));

// Check 1: .env.local exists
console.log('\n✓ Check 1: .env.local file');
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  console.log('  ✅ .env.local exists');
  
  const envContent = fs.readFileSync(envPath, 'utf-8');
  
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

// Check 2: useBlog hook
console.log('\n✓ Check 2: Blog hook');
const hookPath = path.join(__dirname, 'src/hooks/useBlog.js');
if (fs.existsSync(hookPath)) {
  console.log('  ✅ useBlog.js exists');
}

// Check 3: Blog component updated
console.log('\n✓ Check 3: Blog component');
const blogPath = path.join(__dirname, 'src/components/Blog.jsx');
if (fs.existsSync(blogPath)) {
  const blogContent = fs.readFileSync(blogPath, 'utf-8');
  if (blogContent.includes('useAllBlogPosts')) {
    console.log('  ✅ Blog.jsx uses Sanity integration');
  }
}

console.log('\n' + '='.repeat(50));
console.log('\n📋 NEXT STEPS:\n');
console.log('1. ✅ Update .env.local with VITE_SANITY_PROJECT_ID');
console.log('2. ✅ Update .env.local with VITE_SANITY_DATASET');
console.log('3. Restart dev server: npm run dev');
console.log('4. Open Sanity Studio (https://your-project.sanity.site)');
console.log('5. Create & PUBLISH blog posts');
console.log('6. Refresh portfolio site');
console.log('7. Check Blog section - should show "✅ Displaying X posts from Sanity CMS\n');

