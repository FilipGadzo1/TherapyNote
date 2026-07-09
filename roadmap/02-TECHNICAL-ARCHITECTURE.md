# TherapyNote - Technical Architecture

## System Overview

TherapyNote is built as a modern full-stack web application with three core components:

1. **Frontend** - React web app (therapist-facing UI)
2. **Backend** - Node.js API (business logic, AI orchestration, FHIR bridge)
3. **FHIR Bridge** - EHR integration layer (bi-directional sync with any EHR)

---

## High-Level Data Flow

```
Therapist Voice Recording (Browser)
           ↓
    [Encrypted Upload]
           ↓
    Backend API (Node.js)
           ↓
    Claude API (Generate Clinical Note)
           ↓
    [Generate SOAP Note]
           ↓
    Store in Encrypted Database
           ↓
    Therapist Reviews & Approves
           ↓
    FHIR Bridge (Export)
           ↓
    EHR System (SimplePractice, TherapyNotes, etc.)
           ↓
    Note Stored + Audit Log Created
```

---

## Frontend Architecture

### Tech Stack
- **Framework:** Next.js 14 (React + TypeScript)
- **State Management:** React Query + Zustand (lightweight)
- **UI Components:** Shadcn/ui (Tailwind CSS)
- **Audio Recording:** Web Audio API + MediaRecorder
- **Deployment:** Vercel (free tier, production-grade)

### Core Pages/Features
1. **Dashboard** - List of past notes, quick stats (notes/week, time saved)
2. **New Recording** - Voice memo recorder (30-60 sec)
3. **Note Editor** - Review AI-generated SOAP note, edit if needed
4. **Export** - Select EHR, sync to system
5. **Settings** - EHR connection setup, account settings, billing
6. **Analytics** - Time saved, notes generated, productivity metrics

### Key UX Principles
- **Mobile-responsive** from day 1 (therapists use on desktop/tablet)
- **Keyboard shortcuts** for power users (therapists like efficiency)
- **Offline support** for recording (internet may be spotty)
- **WCAG accessible** (therapists may have disabilities)

---

## Backend Architecture

### Tech Stack
- **Runtime:** Node.js 20 + Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL (via Supabase for HIPAA compliance)
- **Authentication:** NextAuth.js (OAuth2) + JWT tokens
- **AI Integration:** Anthropic Claude API
- **Storage:** AWS S3 (encrypted) for audio files
- **Deployment:** Railway or Render (production-grade, HIPAA-ready)

### Core API Endpoints

#### Authentication
```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh-token
```

#### Recording & Note Generation
```
POST /api/recordings/upload              (therapist records audio)
POST /api/notes/generate                 (trigger Claude to generate SOAP)
GET /api/notes/:id                       (retrieve specific note)
PUT /api/notes/:id                       (therapist edits note)
DELETE /api/notes/:id                    (soft delete with audit log)
```

#### EHR Integration (FHIR Bridge)
```
POST /api/ehr/connect                    (therapist connects their EHR)
POST /api/ehr/sync-note                  (export note to EHR)
GET /api/ehr/status                      (check EHR connection health)
POST /api/ehr/disconnect                 (revoke EHR access)
```

#### Settings & Admin
```
GET /api/user/profile
PUT /api/user/profile
GET /api/billing/subscription
POST /api/billing/upgrade
GET /api/analytics/dashboard
```

### Key Services

**AudioProcessingService**
- Receives encrypted audio file
- Validates audio quality
- Extracts transcript (optional, for debugging)
- Prepares for Claude processing

**NoteGenerationService**
- Takes transcript/audio + patient context
- Calls Claude API with therapy-specific prompt
- Generates SOAP-formatted clinical note
- Stores in database with audit trail

**FHIRBridgeService**
- Handles OAuth2 flows with each EHR system
- Converts TherapyNote format → FHIR DocumentReference
- Posts to EHR via FHIR API endpoint
- Receives confirmation + handles errors
- Maintains connection status

**EncryptionService**
- End-to-end encryption for all audio files
- Hashes passwords (bcrypt, not plain storage)
- Encrypts PII in notes at rest
- Provides decryption only to authorized therapist

**AuditLoggingService**
- Logs every access to patient data (WHO, WHEN, WHAT)
- HIPAA audit trail per regulation
- Immutable logs (cannot be deleted/edited)

---

## FHIR Bridge (EHR Integration)

### Design Philosophy
Instead of building separate integrations for SimplePractice, TherapyNotes, Athena, etc., we use **FHIR standard** as a universal bridge.

### How It Works

**Step 1: EHR Connection**
- Therapist clicks "Connect EHR" in settings
- Selects their EHR system (SimplePractice, TherapyNotes, etc.)
- Redirected to EHR's OAuth2 consent screen
- Grants TherapyNote access to create documents

**Step 2: Note Export**
- Therapist clicks "Export to EHR"
- TherapyNote creates FHIR DocumentReference resource
- Posts to EHR's FHIR API endpoint
- EHR confirms receipt, stores in patient chart
- Audit log created on both sides

**Step 3: Sync Status**
- Dashboard shows "Synced to [EHR] at 5:23 PM"
- If sync fails, user sees error + retry button
- Audit trail maintained for compliance

### FHIR Resources Used
- **DocumentReference** - Represents the clinical note
- **Patient** - Links note to specific patient in EHR
- **Practitioner** - Identifies therapist who created note
- **Encounter** - Links to therapy session metadata

### EHR Support Matrix (MVP → Growth)

**MVP (Month 2-3):** 
- SimplePractice (OAuth2 ready)
- Generic FHIR endpoint (for tech-savvy EHRs)

**Growth Phase (Month 4-6):**
- TherapyNotes (most common for solo therapists)
- Athena (larger practices)
- BetterHelp integration (teletherapy platform)

---

## Data Model (Database Schema)

### Users Table
```sql
users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE,
  password_hash BYTEA (hashed),
  first_name VARCHAR,
  last_name VARCHAR,
  therapy_license VARCHAR (state + license number),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### Recordings Table
```sql
recordings (
  id UUID PRIMARY KEY,
  user_id UUID (FK users),
  audio_file_path VARCHAR (S3 path),
  audio_encrypted BOOLEAN,
  duration_seconds INT,
  transcript TEXT (optional, for debugging),
  created_at TIMESTAMP
)
```

### Notes Table
```sql
notes (
  id UUID PRIMARY KEY,
  user_id UUID (FK users),
  recording_id UUID (FK recordings),
  patient_id VARCHAR (encrypted, matches EHR patient ID),
  note_content TEXT (SOAP formatted),
  note_version INT (track edits),
  status ENUM ('draft', 'approved', 'synced', 'archived'),
  synced_to_ehr BOOLEAN,
  ehr_reference_id VARCHAR (EHR's note ID),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP (soft delete)
)
```

### EHR Connections Table
```sql
ehr_connections (
  id UUID PRIMARY KEY,
  user_id UUID (FK users),
  ehr_system VARCHAR ('simplepractice', 'therapynotes', 'athena', etc),
  oauth_access_token BYTEA (encrypted),
  oauth_refresh_token BYTEA (encrypted),
  connected_at TIMESTAMP,
  last_synced_at TIMESTAMP,
  status ENUM ('active', 'disconnected', 'error')
)
```

### Audit Logs Table (HIPAA Required)
```sql
audit_logs (
  id UUID PRIMARY KEY,
  user_id UUID,
  action VARCHAR ('viewed_note', 'edited_note', 'exported_to_ehr', 'deleted_note'),
  resource_type VARCHAR ('note', 'recording', 'patient_data'),
  resource_id UUID,
  timestamp TIMESTAMP (immutable),
  ip_address INET,
  user_agent VARCHAR
)
```

---

## Security & HIPAA Architecture

### Encryption Strategy
- **In Transit:** TLS 1.3 for all API calls
- **At Rest:** AES-256 for audio files, encrypted patient identifiers
- **Database:** Supabase provides encrypted storage at rest

### Authentication & Authorization
- **Multi-factor auth (MFA):** TOTP or SMS (required for HIPAA)
- **Session management:** JWT tokens with 24-hour expiration
- **Role-based access control (RBAC):** Therapist vs. practice admin vs. enterprise admin

### Data Isolation
- **Therapist A cannot see Therapist B's notes** (multi-tenancy)
- **Notes only show to authorized therapist + their staff**
- **Patient data encrypted with per-patient key**

### Compliance Features (HIPAA)
- **Audit logs:** Every access logged, immutable
- **Data residency:** All data stays in US (Supabase regional)
- **Breach notification:** Automated logging if unauthorized access detected
- **Right to delete:** Therapist can delete notes, full audit trail kept
- **Business Associate Agreement (BAA):** Provided to practices

---

## Deployment & Infrastructure

### Production Environment
- **Frontend:** Vercel (Next.js hosting, free tier + pay-as-you-go)
- **Backend:** Railway or Render ($7-12/month starting, scales as needed)
- **Database:** Supabase PostgreSQL ($15/month, HIPAA-eligible)
- **Storage:** AWS S3 ($0.023/GB, encryption included)
- **Email:** SendGrid ($10-20/month for transactional emails)

### Total MVP Infrastructure Cost: ~$50-70/month
(Fits comfortably within $50/month budget with some optimization)

### Monitoring & Observability
- **Error tracking:** Sentry (free tier)
- **Logging:** Supabase built-in logs
- **Uptime monitoring:** Uptimerobot (free tier)
- **Performance:** Vercel built-in analytics

---

## Technology Decisions & Trade-offs

| Decision | Choice | Why | Trade-off |
|----------|--------|-----|-----------|
| EHR Integration | FHIR Standard | Future-proof, works with any EHR | Need FHIR expertise, slower initial adoption |
| Database | PostgreSQL/Supabase | HIPAA-ready, relational fits data model | Cost scales with data size (not free tier friendly) |
| Frontend | Next.js | Full-stack TypeScript, great for healthcare | More overhead than simple React |
| AI | Claude API | Best for clinical language, accurate | Not free (pay-per-token), but worth it |
| Auth | NextAuth.js | Simple + secure, OIDC ready | Slightly more setup than Firebase |
| Hosting | Vercel + Railway | Production-grade, affordable | More services to manage than all-in-one |

---

## Scalability Roadmap

**MVP (Month 1-3):** Single-tenant, manual EHR connections
**Growth (Month 4-6):** Multi-EHR support, analytics dashboards
**Scale (Month 7-12):** Practice/clinic features, admin dashboards, API for EHRs
**Enterprise (Year 2):** On-premise deployment, custom workflows, advanced AI features

