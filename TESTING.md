# TESTING & QUALITY ASSURANCE PLAN — SABO POSTE 2.0

---

## 1. Testing Strategy

SABO POSTE 2.0 undergoes comprehensive multi-level validation:
1. **Compilation & Build Testing**: Production build verification via `ng build`.
2. **REST API Connectivity**: Verification of endpoints and CRUD operations with JSON Server.
3. **Form Validation & Reactive State**: Mandatory field checks, email format validation, error notifications, submission state.
4. **Multilingual & RTL/LTR Tests**: Testing language toggles (`fr`, `ar`, `en`), document `dir="rtl"` vs `dir="ltr"` positioning, typography, text rendering.
5. **Real-Time Schedule Computation**: Testing the live "Ouvert / Fermé" logic against operating hours.
6. **Administrative CRUD Validation**: Create, Read, Update, Delete across all resource modules.
7. **Responsive UI/UX Testing**: Mobile viewport (375px), Tablet (768px), and Desktop (1200px+).

---

## 2. Test Cases Checklist

| ID | Module / Test | Expected Outcome | Status |
|---|---|---|---|
| TC-01 | JSON Server Startup | Serves `db.json` on port 3000 | PASS |
| TC-02 | Angular App Build | Compiles with 0 TypeScript/HTML errors | PASS |
| TC-03 | Homepage Render | Hero, stats, featured services, agency status | PASS |
| TC-04 | Services Filtering | Filters by category (Courrier, Mandats, e-DINAR, etc.) | PASS |
| TC-05 | Service Detail Modal | Displays requirements, steps, delivery time | PASS |
| TC-06 | D17 Interactive Hub | Step-by-step guides, compatible cards directory | PASS |
| TC-07 | Horaires & Agency Live Status | Live Open/Closed badge matches current office schedule | PASS |
| TC-08 | Contact Form Validation | Flags missing fields, invalid email; submits to `/messages` | PASS |
| TC-09 | Admin Authentication | Protects `/admin` routes, demonstration login | PASS |
| TC-10 | Admin Dashboard KPIs | Shows correct counts from `db.json` | PASS |
| TC-11 | Admin Messages Status | Updates status (`pending` -> `reviewed` -> `replied`) | PASS |
| TC-12 | Admin Services CRUD | Adds, edits, deletes services from JSON Server | PASS |
| TC-13 | Language Switcher | Toggles FR/AR/EN; sets `dir="rtl"` for Arabic | PASS |
| TC-14 | Mobile Navigation | Responsive toggle menu works on touch & narrow viewports | PASS |
