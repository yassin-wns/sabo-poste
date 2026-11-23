# API DOCUMENTATION — SABO POSTE 2.0
## RESTful Endpoints Reference (JSON Server)

Base URL: `http://localhost:3000`

---

## 1. Services Endpoints

- `GET /services` — List all postal services. Supports filters like `?categoryId=courrier-colis`, `?featured=true`, and full-text search `?q=...`.
- `GET /services/:id` — Retrieve a single service by ID or slug.
- `POST /services` — Create a new postal service (Admin).
- `PUT /services/:id` — Update an existing postal service (Admin).
- `DELETE /services/:id` — Delete a postal service (Admin).

## 2. Categories Endpoints

- `GET /categories` — List all service categories.
- `GET /categories/:id` — Retrieve category details.
- `POST /categories` — Create category (Admin).
- `PUT /categories/:id` — Update category (Admin).
- `DELETE /categories/:id` — Delete category (Admin).

## 3. Articles (News & Notices) Endpoints

- `GET /articles` — Retrieve list of announcements and news. Sort by date: `?_sort=date&_order=desc`.
- `GET /articles/:id` — Retrieve full article details.
- `POST /articles` — Publish new article (Admin).
- `PUT /articles/:id` — Edit article (Admin).
- `DELETE /articles/:id` — Delete article (Admin).

## 4. D17 Guides Endpoints

- `GET /guides` — Retrieve step-by-step digital payment guides.
- `GET /guides/:id` — Retrieve single guide with sequential steps.
- `POST /guides` — Create new guide (Admin).
- `PUT /guides/:id` — Update guide (Admin).
- `DELETE /guides/:id` — Delete guide (Admin).

## 5. FAQ Endpoints

- `GET /faqs` — Retrieve all frequently asked questions. Filter by category: `?category=D17`.
- `GET /faqs/:id` — Retrieve single FAQ.
- `POST /faqs` — Create new FAQ (Admin).
- `PUT /faqs/:id` — Update FAQ (Admin).
- `DELETE /faqs/:id` — Delete FAQ (Admin).

## 6. Agency Information Endpoints

- `GET /agencies` — Retrieve list of registered agencies (Sidi Ali Ben Aoun).
- `GET /agencies/:id` — Get specific agency details with schedule and features.
- `PUT /agencies/:id` — Update agency hours and active counters (Admin).

## 7. Contact Messages Endpoints

- `GET /messages` — Retrieve all user contact submissions.
- `POST /messages` — Submit a citizen inquiry from the contact form.
- `PATCH /messages/:id` — Update message status (`pending`, `reviewed`, `replied`) or add `adminNote`.
- `DELETE /messages/:id` — Remove message (Admin).

## 8. Platform Settings & Audit Logs Endpoints

- `GET /settings` — Read platform settings, announcement banner, contact info.
- `PATCH /settings` — Update site settings (Admin).
- `GET /activityLogs` — Read admin audit events.
- `POST /activityLogs` — Log new administrative action.
