# 🖼️ Diagnose Sanity Image URLs Issue

**Status**: Images from Sanity tidak tampil di frontend

## Step 1: Open Debug Panel

1. Make sure dev server is running: `npm run dev`
2. Open browser: **http://localhost:5173/?debug**
3. Check what the panel shows:
   - ✅ **Red highlight = NO Asset**
   - ✅ **Green highlight = Has Asset & URL**

## Step 2: Check Browser Console

1. Open DevTools: Press **F12**
2. Go to **Console** tab
3. Look for logs starting with `[Portfolio]`
4. You should see:
   ```
   [Portfolio] ✅ Generated URL for "Project Name": https://cdn.sanity.io/images/...
   ```
   OR
   ```
   [Portfolio] ⚠️ No asset ID for "Project Name": ...
   ```

## Step 3: Identify the Problem

| Issue | Signs | Fix |
|-------|-------|-----|
| **No Asset ID** | `⚠️ No asset ID` in console | Images not uploaded in Sanity Studio |
| **URL Generation Failed** | `Could not build image URL` | Builder error - check token/project ID |
| **Image Loads But Not Display** | URL in console but blank | CORS issue or CSS problem |
| **All Working** | ✅ URLs in console | Check CSS/HTML rendering |

## Step 4: Quick Fix Options

### Option A: Re-upload Images in Sanity
1. Go to **Sanity Studio** (http://localhost:3333 or your deployment)
2. Open a Portfolio item
3. Click on Thumbnail image
4. **Delete** the current image (if any)
5. **Upload** a new image
6. **Publish**
7. Refresh Portfolio page

### Option B: Check Environment Variables
```bash
# In .env file - verify these are set:
VITE_SANITY_PROJECT_ID=scenq4gg
VITE_SANITY_DATASET=production
VITE_SANITY_TOKEN=<should be set or blank if not needed>
```

### Option C: Force Rebuild Image URLs
1. Stop dev server (`Ctrl+C`)
2. Delete `.env` cache if any
3. Restart: `npm run dev`
4. Refresh browser
5. Check console logs again

## Step 5: Report Back

When sharing the issue, include:
- [ ] Screenshot of debug panel showing image status (green/red)
- [ ] Copy of `[Portfolio]` console logs
- [ ] Whether you see ✅ or ⚠️ or ❌
- [ ] Browser DevTools Network tab screenshot (show image requests)

## Common Solutions

### 🟢 Images show ✅ in debug but not on page
- **Problem**: CSS hiding images or layout issue
- **Fix**: Check `Portfolio.module.css` - look for `display: none`, `visibility: hidden`, or `opacity: 0`

### 🟡 Images show ⚠️ No asset ID
- **Problem**: Images never uploaded to Sanity
- **Fix**: Go to Sanity Studio → Portfolio items → Re-upload thumbnails

### 🔴 Images show ❌ Could not build
- **Problem**: Token/Project ID wrong
- **Fix**: Verify `.env` file has correct values

### ⚫ Debug panel shows "NO portfolio data found"
- **Problem**: No portfolio items in Sanity
- **Fix**: Create portfolio items in Sanity Studio first
