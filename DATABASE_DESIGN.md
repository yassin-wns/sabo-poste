# DATABASE DESIGN — SABO POSTE 2.0
## JSON Server Database Specification (`db.json`)

---

## 1. Overview

SABO POSTE 2.0 uses **JSON Server** as its RESTful mock backend and `db.json` as the persistent single-source-of-truth datastore. 

Every collection is structured with strict foreign-key relationships (such as `categoryId` linking `services` to `categories`) and multilingual JSON objects for content fields (`fr`, `ar`, `en`).

---

## 2. Entity-Relationship Overview

```
 +--------------------+       1:N       +---------------------+
 |     categories     | <-------------> |      services       |
 |  - id (PK)         |                 |  - id (PK)          |
 |  - name {fr,ar,en} |                 |  - categoryId (FK)  |
 |  - icon            |                 |  - title {fr,ar,en} |
 +--------------------+                 +---------------------+
                                                   |
 +--------------------+                            |
 |      messages      |                            v
 |  - id (PK)         |                 +---------------------+
 |  - fullName        |                 |        faqs         |
 |  - email           |                 |  - id (PK)          |
 |  - category        |                 |  - category         |
 |  - status          |                 |  - question {...}   |
 +--------------------+                 |  - answer {...}     |
                                        +---------------------+
 +--------------------+
 |       guides       |                 +---------------------+
 |  - id (PK)         |                 |      articles       |
 |  - title {...}     |                 |  - id (PK)          |
 |  - steps [...]     |                 |  - title {...}      |
 +--------------------+                 +---------------------+
```

---

## 3. Detailed Collections Schema

### 3.1 `categories`
| Field | Type | Description |
|---|---|---|
| `id` | string (PK) | Unique category slug (e.g. `"courrier-colis"`) |
| `name` | object | Multilingual name `{ fr, ar, en }` |
| `description` | object | Multilingual summary `{ fr, ar, en }` |
| `icon` | string | Postal icon identifier |
| `count` | number | Pre-calculated number of active services |

### 3.2 `services`
| Field | Type | Description |
|---|---|---|
| `id` | string (PK) | Unique service slug (e.g. `"carte-edinar-smart"`) |
| `categoryId` | string (FK) | Reference to category `id` |
| `title` | object | Multilingual title `{ fr, ar, en }` |
| `summary` | object | Multilingual short teaser `{ fr, ar, en }` |
| `description` | object | Multilingual in-depth details `{ fr, ar, en }` |
| `icon` | string | Visual icon identifier |
| `requirements` | object | Multilingual arrays of required documents |
| `steps` | object | Multilingual arrays of sequential instructions |
| `deliveryTime` | object | Multilingual delivery/processing timeframe |
| `featured` | boolean | Promoted on homepage |
| `isPopular` | boolean | Marked with popular badge |

### 3.3 `agencies`
| Field | Type | Description |
|---|---|---|
| `id` | string (PK) | e.g. `"bureau-sidi-ali-ben-aoun"` |
| `name` | object | Multilingual office name |
| `postalCode` | string | Official postal code (`"9120"`) |
| `governorate` | object | Governorate name (`"Sidi Bouzid"`) |
| `delegation` | object | Delegation name (`"Sidi Ali Ben Aoun"`) |
| `address` | object | Street address description |
| `phone` | string | Official contact number |
| `email` | string | Official email |
| `latitude` / `longitude` | number | GPS coordinates for geolocation |
| `schedule` | object | Weekday breakdown (morning, afternoon, status) |
| `features` | array | Available counter services |
| `activeCounters` | number | Total open service counters |

### 3.4 `messages`
| Field | Type | Description |
|---|---|---|
| `id` | string/number | Message auto-increment ID |
| `fullName` | string | Sender full name |
| `email` | string | Sender email address |
| `phone` | string | Optional sender contact phone |
| `category` | string | Selected inquiry domain |
| `subject` | string | Message subject header |
| `message` | string | Full message body |
| `status` | string | `'pending'` \| `'reviewed'` \| `'replied'` |
| `adminNote` | string | Internal counter/staff note |
| `createdAt` | string | ISO timestamp of submission |

### 3.5 `articles`
| Field | Type | Description |
|---|---|---|
| `id` | string | Article unique ID |
| `title` | object | Multilingual title |
| `category` | string | News classification |
| `author` | string | Publishing entity |
| `date` | string | Publication date (`YYYY-MM-DD`) |
| `summary` | object | Multilingual brief |
| `content` | object | Multilingual article content |
| `featured` | boolean | Hero display flag |

### 3.6 `guides`
| Field | Type | Description |
|---|---|---|
| `id` | string | Guide ID (e.g. `"guide-d17-activation"`) |
| `title` | object | Multilingual guide title |
| `category` | string | Topic (D17, e-DINAR, Factures) |
| `readTime` | string | Estimated reading duration |
| `steps` | array | Array of `{ stepNumber, title, description }` |

### 3.7 `faqs`
| Field | Type | Description |
|---|---|---|
| `id` | string | FAQ ID |
| `category` | string | Question category |
| `question` | object | Multilingual question |
| `answer` | object | Multilingual verified response |

### 3.8 `users` & `settings`
- `users`: Demonstration authentication accounts (`admin`, `agent_aoun`) with roles and contact information.
- `settings`: Platform metadata, emergency phone number, site names, and global alert banner.
- `activityLogs`: Audit logs tracking changes and user events.
