# ARCHITECTURE DESIGN — SABO POSTE 2.0
## Angular 19 Standalone Architecture & JSON Server REST Integration

---

## 1. High-Level Architectural Diagram

```
+-----------------------------------------------------------------------------------+
|                                  USER BROWSER                                     |
|  [Desktop / Tablet / Smartphone]                                                  |
|  - Bidirectional UI: LTR (Français, English) & RTL (العربية)                     |
+-----------------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------------+
|                             ANGULAR 19 APPLICATION                                |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  |                            ROUTER (app.routes.ts)                           |  |
|  |  - Public Routes: /, /services, /services/:id, /horaires, /d17, /faq,        |  |
|  |                   /contact, /articles, /articles/:id, /login                |  |
|  |  - Admin Routes:  /admin, /admin/services, /admin/categories,               |  |
|  |                   /admin/articles, /admin/guides, /admin/faqs,               |  |
|  |                   /admin/messages, /admin/users, /admin/settings             |  |
|  +-----------------------------------------------------------------------------+  |
|                                       |                                           |
|  +-----------------------+ +-------------------------+ +-----------------------+  |
|  |     CORE LAYER        | |      SHARED LAYER       | |     FEATURE LAYER     |  |
|  | - ApiService          | | - HeaderComponent       | | - HomeComponent       |  |
|  | - LanguageService     | | - FooterComponent       | | - ServicesComponent   |  |
|  | - AuthService         | | - NavbarComponent       | | - HorairesComponent   |  |
|  | - NotificationService | | - StatusBadgeComponent  | | - D17Component        |  |
|  | - AuthGuard           | | - SearchBarComponent    | | - ContactComponent    |  |
|  | - Typed Interfaces    | | - ConfirmModalComponent | | - FaqComponent        |  |
|  | - ErrorInterceptor    | | - TruncatePipe          | | - AdminModule / Pages |  |
|  +-----------------------+ +-------------------------+ +-----------------------+  |
+-----------------------------------------------------------------------------------+
                                       |
                                       v  HTTP / REST (HttpClient)
+-----------------------------------------------------------------------------------+
|                              JSON SERVER BACKEND                                  |
|  URL: http://localhost:3000                                                       |
|                                                                                   |
|  Endpoints:                                                                       |
|  - GET/POST/PUT/DELETE /services                                                  |
|  - GET/POST/PUT/DELETE /categories                                                |
|  - GET/POST/PUT/DELETE /articles                                                  |
|  - GET/POST/PUT/DELETE /guides                                                    |
|  - GET/POST/PUT/DELETE /faqs                                                      |
|  - GET/POST/PUT/DELETE /agencies                                                  |
|  - GET/POST/PATCH/DELETE /messages                                                |
|  - GET/POST/PUT/DELETE /users                                                     |
|  - GET/PATCH /settings                                                            |
|  - GET/POST /activityLogs                                                         |
|                                                                                   |
|  Persistent Storage Engine: db.json                                               |
+-----------------------------------------------------------------------------------+
```

---

## 2. Directory Structure

```
src/
  app/
    core/
      guards/
        auth.guard.ts
      interceptors/
        api-error.interceptor.ts
      models/
        service.model.ts
        category.model.ts
        article.model.ts
        guide.model.ts
        faq.model.ts
        agency.model.ts
        message.model.ts
        user.model.ts
        settings.model.ts
      services/
        api.service.ts
        language.service.ts
        auth.service.ts
        notification.service.ts

    shared/
      components/
        header/
        footer/
        navbar/
        search-bar/
        badge/
        confirm-modal/
        toast/
      pipes/
        localized.pipe.ts
        truncate.pipe.ts

    features/
      home/
      services/
        services-list/
        service-detail/
      horaires/
      d17/
      contact/
      faq/
      articles/
      auth/
        login/
      admin/
        admin-layout/
        dashboard/
        services-mgmt/
        categories-mgmt/
        articles-mgmt/
        guides-mgmt/
        faqs-mgmt/
        messages-mgmt/
        users-mgmt/
        settings-mgmt/

    layout/
      public-layout/
      admin-layout/

    app.routes.ts
    app.config.ts
    app.component.ts
    app.component.html
    app.component.css

  assets/
    i18n/
      fr.json
      ar.json
      en.json
```

---

## 3. Core Architectural Decisions

### 3.1 Angular 19 Standalone Components
All components, pipes, and directives are standalone, providing modularity, lazy-loading performance, tree-shakable dependencies, and zero unnecessary NgModules.

### 3.2 State Management and Language Strategy
- Reactive `LanguageService` with `BehaviorSubject<LangCode>` ('fr' | 'ar' | 'en').
- Synchronizes with document attributes:
  - When Arabic is active: `<html lang="ar" dir="rtl">`
  - When French or English is active: `<html lang="fr" dir="ltr">`
- Custom `LocalizedPipe` seamlessly extracts the localized field from `{ fr: string, ar: string, en: string }` objects with fallback support.

### 3.3 HTTP Communications
- Dedicated `ApiService` wrapping Angular `HttpClient`.
- Strong TypeScript typing across all CRUD requests and responses.
- Reactive `Observable` streams with RxJS operators (`map`, `catchError`, `tap`).
- Automatic request logging and activity auditing.

### 3.4 Security & Admin Access
- Client-side `AuthGuard` protecting `/admin` and sub-routes.
- Demonstration authentication system with token and active user state in `AuthService`.
- Clean logout and login redirection.
