# LAVÉRA — OWASP Top 10 hardening notes

| OWASP | What was done |
|---|---|
| A01 Broken Access Control | Firestore rules tightened: `customers` readable only by owner/admin, field/size limits, `createdAt == request.time` on orders/reviews, customer stock updates restricted to `variants`/`updatedAt`/`lastStockOrderId` with size cap. Admin access still enforced server-side by `admins/{uid}.active`. |
| A02 Cryptographic Failures | HSTS (preload) + `upgrade-insecure-requests`. Firebase web API key is public by design: restrict it by HTTP referrer in Google Cloud Console. |
| A03 Injection (XSS) | `escapeHtml()` applied to all user/DB data in `innerHTML` templates (stored XSS into admin panel fixed); new `js/security.js` sanitises every `innerHTML`/`insertAdjacentHTML` (strips script/iframe/on*/javascript: URLs); strict CSP without `unsafe-inline` for scripts (inline scripts and inline handlers removed). |
| A04 Insecure Design | Prices/names are taken from Firestore inside the order transaction (not from the client cart). Cart read from localStorage is now validated (qty 1–20 integer, price ≥ 0, safe image URL). |
| A05 Security Misconfiguration | Security headers in `firebase.json` and `_headers` (CSP, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, COOP). Internal files (rules, tests, notes) excluded from hosting. |
| A06 Vulnerable Components | Firebase SDK pinned to an exact version; no other third-party scripts. Re-check versions periodically. |
| A07 Auth Failures | Customer passwords: ≥10 chars with letters+digits. Admin login: client-side exponential lockout after 5 failures and generic error message. Enable Firebase **App Check**, **email enumeration protection** and **MFA** for the admin account in the console. |
| A08 Integrity Failures | Success-page order id validated; redirects only to fixed internal pages. |
| A09 Logging/Monitoring | Login error details no longer logged to console. Enable Firebase/Cloud audit logs + alerts. |
| A10 SSRF | Not applicable (no server-side fetching). |

## Known limits (need a server / Cloud Functions to fully fix)
- Firestore rules cannot recompute order totals from product prices, nor enforce true rate-limiting. Consider a Cloud Function for order creation and Firebase App Check.
- The customer stock-decrement rule still lets a signed-in buyer with a pending order edit `variants` of that product. Move stock decrement to a Cloud Function.

## Deploy
`firebase deploy --only firestore:rules,hosting` — test rules in the Emulator first (see SECURITY_REVIEW_AR.txt).
