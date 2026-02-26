# Authentication Quick Reference

## Key Changes at a Glance

### Login Flow
```typescript
// OLD (Broken)
const { error } = await authClient.signIn.email({ email, password });
if (!error) {
    router.push("/admin-dashboard"); // ❌ Wrong - hardcoded for admin
}

// NEW (Fixed)
const { error } = await authClient.signIn.email({ email, password });
if (!error) {
    const session = await authClient.getSession(); // ✅ Get session
    const role = session?.data?.user?.role; // ✅ Check role
    router.push(role === "ADMIN" ? "/admin-dashboard" : "/dashboard"); // ✅ Redirect correctly
}
```

### Registration Flow
```typescript
// OLD (Broken)
const { error } = await authClient.signUp.email({ ... });
if (!error) {
    router.push("/"); // ❌ Wrong - goes to home page
}

// NEW (Fixed)
const { error, data } = await authClient.signUp.email({ ... });
if (data?.user) {
    router.push("/dashboard"); // ✅ Goes to customer dashboard
    router.refresh(); // ✅ Refresh to get session
}
```

## Environment Variables

**Frontend (.env):**
```env
NEXT_PUBLIC_API_URL=https://roohanibackend.onrender.com/api
NEXT_PUBLIC_AUTH_URL=https://roohanibackend.onrender.com/api/auth
```

**Backend (.env):**
```env
FRONTEND_URL=https://roonani-fontend.vercel.app
BETTER_AUTH_URL=https://roohanibackend.onrender.com
```

## Common Issues & Quick Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| "Failed to establish session" | Session not set | Wait for auth to complete before redirect |
| Redirects to admin dashboard | Role checking failed | Use `as any` cast for type safety |
| CORS errors | Frontend domain not whitelisted | Add domain to backend trusted origins |
| Registration data lost | Fields not transmitted | Check phone validation (10+ digits) |
| Login fails silently | Wrong shadow email format | Verify phone format: `[phone]@roohani.local` |

## Using the Custom Hook

```typescript
import { useAuth } from '@/src/hooks/useAuth';

export function ProtectedComponent() {
    const { user, loading, isAuthenticated, logout, redirectByRole } = useAuth();
    
    if (loading) return <div>Loading...</div>;
    
    if (!isAuthenticated) {
        return <div>Not authenticated</div>;
    }
    
    return (
        <div>
            <h1>Hello, {user?.name}</h1>
            <button onClick={() => redirectByRole()}>Go to Dashboard</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
```

## Database Queries

**Check user exists:**
```sql
SELECT id, name, email, phone, role FROM "User" WHERE phone = '17000000000';
```

**Update user role:**
```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = '17000000000@roohani.local';
```

**Check session:**
```sql
SELECT id, sessionToken, userId FROM "Session" ORDER BY createdAt DESC LIMIT 5;
```

## Testing Commands

```bash
# Build
npm run build

# Check for TypeScript errors
npm run build

# Test locally (with .env.local)
npm run dev

# Deploy
vercel --prod
```

## File Locations

```
Frontend:
├── src/components/modules/authentication/
│   ├── login-form.tsx ✅ UPDATED
│   └── register-form.tsx ✅ UPDATED
├── src/hooks/
│   └── useAuth.ts ✨ NEW
├── src/env.ts ✅ UPDATED
└── src/lib/auth-client.ts ✅ UPDATED

Backend:
├── src/lib/auth.ts ✅ UPDATED
└── src/app.ts ✅ UPDATED
```

## Checklist Before Going Live

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render
- [ ] Environment variables set in both services
- [ ] CORS origins updated on backend
- [ ] Tested registration flow
- [ ] Tested login flow
- [ ] Tested admin login (different redirect)
- [ ] Cleared browser cache/cookies and retested
- [ ] Checked backend logs for errors
- [ ] Verified users in database have correct role

## Key Concepts

1. **Shadow Email**: Phone number converted to email format
   - `17000000000` → `17000000000@roohani.local`

2. **User Roles**: 
   - `CUSTOMER`: Default role, access to `/dashboard`
   - `ADMIN`: Admin role, access to `/admin-dashboard`

3. **Session Management**:
   - Stored in HTTP-only cookies
   - Persists across page refreshes
   - Expires after inactivity

4. **CORS & Trusted Origins**:
   - Backend only accepts requests from whitelisted domains
   - Must update when frontend domain changes
