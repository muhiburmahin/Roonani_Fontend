# Vercel Environment Variables Setup Guide

## Frontend (Roonani_Fontend) - Environment Variables to Add in Vercel Dashboard

Go to: https://vercel.com/md-mahin-projects/roonani-fontend/settings/environment-variables

Add these environment variables:

### Production Environment
```
BACKEND_URL=https://roohanibackend.onrender.com
FRONTEND_URL=https://roonani-fontend.vercel.app
API_URL=https://roohanibackend.onrender.com/api
AUTH_URL=https://roohanibackend.onrender.com/api/auth
NEXT_PUBLIC_TEST=test-value
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dlluwpytv
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=roohani
NEXT_PUBLIC_API_URL=https://roohanibackend.onrender.com/api
NEXT_PUBLIC_AUTH_URL=https://roohanibackend.onrender.com/api/auth
```

### Preview Environment (Optional - for PR previews)
Same as Production or customize as needed

### Development Environment (Local)
Already configured in `.env.local` with localhost values

---

## Backend (Roohani_Backend) - CORS Configuration

Make sure your backend has the following CORS origins configured:

### Required Origins:
- `https://roonani-fontend.vercel.app` (Production Frontend)
- `http://localhost:3000` (Local Development)

Update your backend `.env` or `auth.ts` to include these origins.

---

## Troubleshooting

If you still see `localhost:5000` errors after deployment:
1. Clear the Vercel deployment cache: Redeploy without cache
2. Verify all environment variables are set correctly in Vercel dashboard
3. Check that the backend CORS allows the frontend URL
4. Restart the backend (if using Render.com, redeploy it)

---

## Files Changed
- `src/env.ts` - Added NEXT_PUBLIC_API_URL and NEXT_PUBLIC_AUTH_URL
- `src/lib/auth-client.ts` - Updated to use environment variables
- `src/actions/product.action.ts` - Updated fallback URLs
- `.env` - Updated with production URLs
- `.env.local` - Created for local development (use localhost)
- `.npmrc` - Already created to handle peer dependencies
