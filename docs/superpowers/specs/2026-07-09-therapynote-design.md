# TherapyNote - Product Design Specification

**Document Version:** 1.0  
**Date:** July 9, 2026  
**Status:** Design Approved  
**Author:** Filip Gadzo  

---

## Executive Summary

**TherapyNote** is a HIPAA-compliant, AI-powered clinical note generation tool for mental health professionals (therapists, counselors, psychiatrists). It solves the documentation burden that causes therapist burnout by converting 30-second voice memos into professional SOAP-formatted clinical notes that automatically sync to the therapist's existing EHR system.

**Problem:** Therapists spend 30-60 minutes every night writing clinical session notes—non-billable time that contributes to burnout.  
**Solution:** AI-generated notes from voice memos + automatic EHR sync via FHIR standard.  
**Target Market:** 400K+ mental health professionals in US; $99-199/month SaaS pricing.  
**Revenue Goal:** $1-3K/month by Month 3; $50K-100K ARR by Year 1.  
**Timeline:** 12 weeks to launch (15-20 hours/week part-time).  
**Success Criteria:** 30-50 paying customers, $1-3K MRR, <5% churn, 4.5+ NPS.

---

## 1. Problem Statement

### The Therapist Burnout Crisis

**Problem Scope:**
- Therapists document **every session** after each patient appointment
- Documentation takes **30-60 minutes per night**
- At billable rates of $150-300/hour, this is **$75-150/day in lost revenue**
- Documentation is listed as the **#1 cause of therapist burnout** (behind compassion fatigue)
- **400K+ mental health professionals** in US affected; **800K+ globally**

**Current Solutions Fail:**
- **EHR native tools** (SimplePractice, TherapyNotes) - clunky, not AI-powered, generic note templates
- **Scribing services** (Rev, GoScribe) - human transcription, slow, $500-2K/month, high error rates
- **Dragon NaturallySpeaking** - $200+ one-time, not healthcare-specific, manual editing required
- **Generic AI tools** (Otter.ai, Descript) - not HIPAA-compliant, not EHR-integrated, not therapy-specific
- **Writing notes manually** - status quo, misery, burnout

**Why TherapyNote is Different:**
- AI + HIPAA compliance + EHR integration + therapy-specific (only product combining all four)
- Works with ANY EHR via FHIR standard (not locked into one system)
- Therapy-specific note format (SOAP optimized for mental health)
- $99/month price point (affordable, strong ROI)

---

## 2. Solution Overview

### Product Definition

**TherapyNote** is a web application that:
1. Records therapist's 30-60 second voice memo about patient session
2. Sends audio to Claude API for AI analysis
3. Generates professional SOAP-formatted clinical note in 2-3 seconds
4. Therapist reviews and edits note (takes 1-2 minutes)
5. Therapist clicks "Export to EHR"
6. Note automatically syncs to patient chart in their EHR system (SimplePractice, TherapyNotes, generic FHIR)
7. Everything encrypted, HIPAA-compliant, audit-logged

### Core Use Case (Happy Path)

**Time:** Monday 5:45 PM, therapist just finished final patient session

```
Therapist opens TherapyNote app
↓
Clicks "New Recording"
↓
Records 45-second voice memo: "Patient discussed childhood trauma, 
showed improved distress tolerance using DBT skills, agreed to 
practice coping strategies weekly, safety plan updated"
↓
Clicks "Generate Note"
↓
[2 seconds later] AI generates SOAP note:
  S: Patient reported processing childhood trauma
  O: Engaged with DBT skills, showed improved affect regulation
  A: Patient making progress on trauma processing goal
  P: Continue trauma-focused CBT, practice coping skills 5x/week
↓
Therapist reads note (30 seconds), clicks "Looks good"
↓
Clicks "Export to SimplePractice"
↓
[5 seconds later] Note appears in patient chart
↓
Audit log created: "Note exported by therapist at 5:47 PM"
↓
Done. What would have taken 30 minutes now takes 2 minutes.
```

### Key Value Metrics

| Metric | Value | Impact |
|--------|-------|--------|
| Time saved per session | 28 minutes | 4 hours/week per therapist |
| Dollar value (@ $150/hr) | $75/session | $1,500/week = $78K/year |
| ROI (at $99/month) | 760% | Pays for itself in <1 night |
| Therapist satisfaction | High (solves burnout) | Retention, referrals |

---

## 3. Market Analysis

### Addressable Market (TAM)

**Primary Market: Licensed Mental Health Professionals**
- US: 400K+ therapists, counselors, psychologists, psychiatrists
- Global: 800K+
- Annual addressable market at $99/month: $47M (US), $95M (global)

**Secondary Market: Therapy Practices**
- US: 50K+ therapy practices, clinics, group practices
- Market at $199/month (practice tier): $120M (US)

### Market Segmentation

**Segment 1: Solo Practitioners** (55% of market)
- Solo therapists, self-employed
- Price sensitivity: Medium (but high ROI tolerance)
- Adoption: Fast (personal pain point)
- Revenue model: $99/month individual

**Segment 2: Group Practices** (35% of market)
- Therapy practices with 2-10 therapists
- Price sensitivity: Low (ROI-driven buying)
- Adoption: Medium (organizational decision)
- Revenue model: $199/month + $29/therapist/month

**Segment 3: Health Systems** (10% of market)
- Hospital psychiatry departments, integrated health systems
- Price sensitivity: Very low (compliance-driven)
- Adoption: Slow (enterprise sales)
- Revenue model: Custom, $500-2K/month

### Competition Analysis

**Direct Competitors:** None. No HIPAA-compliant, EHR-integrated AI note generator exists specifically for therapists.

**Indirect Competitors:**
- **Scribing Services** (Rev, GoScribe): Human transcription, $500-2K/month, 24-hour turnaround, high error rates
- **EHR Native Tools** (SimplePractice, TherapyNotes): Clunky, not AI, generic templates, included in platform
- **Generic AI Tools** (Otter.ai, Descript): Not HIPAA, not EHR-integrated, not therapy-specific, $50-100/month
- **Dragon NaturallySpeaking**: $200+ one-time, not healthcare-specific, manual editing

**Why We Win:**
- Only product combining AI + HIPAA + EHR integration + therapy-specific
- Barriers to entry are high (HIPAA compliance expertise, EHR API knowledge, therapy domain knowledge)
- Network effects: Therapists tell 3-5 colleagues (tight professional community)
- Switching costs are high (integrated into daily documentation workflow)

### Market Timing

**Why Now?**
1. **LLM maturity** - Claude/GPT now accurate enough for clinical use (2024+)
2. **FHIR adoption** - Healthcare moving to standard APIs, making EHR integration feasible
3. **AI in healthcare acceptance** - Regulators + clinicians now accepting AI tools (FDA/HIPAA pathways clear)
4. **Therapist shortage + burnout** - Growing demand for therapy, burnout accelerating need for solutions
5. **Solo founder viability** - Claude API + modern infrastructure enables solo dev to build enterprise-grade product in 3 months

---

## 4. Product Requirements & Feature Set

### MVP Features (Weeks 1-4)

**Core Features:**
- [ ] User authentication (email/password + MFA)
- [ ] Voice recording UI (30-120 second limit)
- [ ] Audio encryption and S3 storage
- [ ] Claude API integration for note generation
- [ ] SOAP note display and editing
- [ ] Note version tracking (track edits)
- [ ] Note search and filtering
- [ ] Basic dashboard (list of notes, stats)
- [ ] Settings page (account, MFA)
- [ ] Mobile-responsive UI

**Note Format (SOAP):**
```
SUBJECTIVE:
- Patient's reported experience and symptoms
- Topics discussed in session
- Patient's perspective on progress

OBJECTIVE:
- Therapist observations (affect, behavior, engagement)
- Clinical observations and signs
- Session participation level

ASSESSMENT:
- Progress toward treatment goals
- Clinical impression/diagnosis relevance
- Overall functioning and risk

PLAN:
- Treatment recommendations for next session
- Homework or between-session assignments
- Any changes to treatment plan
```

**Claude Prompt (Therapy-Optimized):**
```
You are a clinical note generator for mental health professionals. 
Convert the following therapy session notes into a SOAP-formatted 
clinical note. Maintain clinical accuracy, use therapy terminology, 
focus on clinically relevant details. Do NOT include personal opinions 
or assumptions. Format as SOAP (Subjective, Objective, Assessment, Plan).

Session Notes: [AUDIO TRANSCRIPT]

Generate SOAP note:
```

### Phase 2 Features (Weeks 5-7) - FHIR Bridge

- [ ] FHIR DocumentReference generation
- [ ] SimplePractice OAuth2 integration
- [ ] Generic FHIR endpoint
- [ ] Note sync to EHR
- [ ] Sync status dashboard
- [ ] Retry logic for failed syncs
- [ ] EHR connection setup UI
- [ ] Patient ID mapping

### Phase 3 Features (Weeks 8-10) - Polish & Compliance

- [ ] HIPAA audit logging (immutable)
- [ ] Automatic session timeout (15 min)
- [ ] Data encryption at rest
- [ ] MFA enforcement
- [ ] Help documentation
- [ ] Video tutorials
- [ ] In-app onboarding
- [ ] Admin analytics dashboard

### Phase 4 Features (Weeks 11-12) - Launch & Growth

- [ ] Referral program
- [ ] Analytics for users
- [ ] Email notifications
- [ ] Support ticket system
- [ ] Testimonial collection
- [ ] Beta user interviews

### Future Features (Post-Launch)

**Month 2-3:**
- TherapyNotes integration (multi-EHR support)
- Practice admin dashboard (manage multiple therapists)
- Advanced analytics (practice-wide insights)

**Month 4-6:**
- Mobile app (iOS/Android, on-the-go recording)
- Session recording + AI evaluation (for research/training)
- Integration with billing systems

**Year 2:**
- Enterprise features (on-premise deployment, custom workflows)
- Advanced AI (predictive analytics, treatment recommendations)
- Marketplace (third-party integrations)

### Feature Priorities (MoSCoW)

| Priority | Features |
|----------|----------|
| **MUST Have** | Voice recording, AI generation, note editing, storage |
| **SHOULD Have** | FHIR bridge, SimplePractice sync, HIPAA logging |
| **COULD Have** | Multi-EHR support, analytics, admin dashboard |
| **WON'T Have (MVP)** | Mobile app, session recording, session evaluation |

---

## 5. Technical Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Therapist Web Browser                     │
│  (Next.js Frontend - Vercel Hosting)                        │
│  - Voice recording UI                                        │
│  - Note editor                                               │
│  - Dashboard                                                 │
│  - Settings                                                  │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS / TLS 1.3
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              Backend API (Node.js + Express)                │
│  (Railway / Render Hosting)                                 │
│  ├─ Authentication Service (NextAuth.js)                   │
│  ├─ Recording Handler (Audio upload, S3 storage)           │
│  ├─ Note Generation Service (Claude API integration)       │
│  ├─ Note Storage Service (Database queries)                │
│  ├─ FHIR Bridge Service (EHR integration)                  │
│  ├─ Encryption Service (AES-256)                           │
│  └─ Audit Logging Service (HIPAA compliance)               │
└──────────────┬──────────────────────────┬──────────────────┘
               │                          │
               ↓                          ↓
    ┌────────────────────┐      ┌─────────────────┐
    │  PostgreSQL        │      │  AWS S3         │
    │  (Supabase)        │      │  (Encrypted)    │
    │  - Users           │      │  - Audio files  │
    │  - Notes           │      │  - Recordings   │
    │  - EHR Connections │      │                 │
    │  - Audit Logs      │      │                 │
    └────────────────────┘      └─────────────────┘
               ↑
               │ (OAuth2)
               ↓
    ┌────────────────────────────────────────────┐
    │  External Services                         │
    │  ├─ Claude API (AI note generation)       │
    │  ├─ Anthropic (LLM provider)              │
    │  ├─ SimplePractice API (EHR)              │
    │  ├─ TherapyNotes API (EHR)                │
    │  ├─ Stripe (Payment processing)           │
    │  └─ SendGrid (Email notifications)        │
    └────────────────────────────────────────────┘
```

### Tech Stack

**Frontend:**
- **Framework:** Next.js 14 (React + TypeScript)
- **UI Components:** Shadcn/ui (Tailwind CSS)
- **State:** React Query + Zustand
- **Audio:** Web Audio API + MediaRecorder
- **Auth:** NextAuth.js
- **Hosting:** Vercel (free tier + pay-as-you-go)
- **Cost:** $0-50/month

**Backend:**
- **Runtime:** Node.js 20 + TypeScript
- **Framework:** Express.js
- **Auth:** NextAuth.js + JWT
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Encryption:** crypto (Node.js built-in) + bcrypt
- **Hosting:** Railway or Render
- **Cost:** $7-15/month

**Infrastructure:**
- **Database:** Supabase PostgreSQL ($15/month, HIPAA-eligible)
- **Storage:** AWS S3 ($0.023/GB/month)
- **Payments:** Stripe ($30 monthly + 2.9% transaction fee)
- **Email:** SendGrid ($10-20/month)
- **Error Tracking:** Sentry (free tier)
- **Monitoring:** Vercel built-in analytics

**AI:**
- **Model:** Claude 3.5 Sonnet (via Anthropic API)
- **Alternative (cost):** Claude 3 Haiku (10x cheaper, still accurate for clinical notes)
- **Estimated cost:** $0.40-4/month per therapist (based on note volume)

**EHR Integration:**
- **Standard:** FHIR R4
- **Libraries:** fhir.js or hl7-fhir-usdtl
- **SimplePractice:** REST API + OAuth2
- **TherapyNotes:** REST API + OAuth2

**Total Infrastructure Cost:** $50-70/month (fits within $50/month budget with optimization)

### Database Schema

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash BYTEA NOT NULL (bcrypt),
  first_name VARCHAR,
  last_name VARCHAR,
  therapy_license VARCHAR,
  mfa_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Recordings
CREATE TABLE recordings (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users,
  audio_s3_path VARCHAR,
  audio_encrypted BOOLEAN,
  duration_seconds INT,
  created_at TIMESTAMP
);

-- Notes
CREATE TABLE notes (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users,
  recording_id UUID REFERENCES recordings,
  patient_id VARCHAR (encrypted, links to EHR),
  note_content TEXT (SOAP formatted),
  note_version INT DEFAULT 1,
  status ENUM ('draft', 'approved', 'synced', 'archived'),
  synced_to_ehr BOOLEAN DEFAULT false,
  ehr_reference_id VARCHAR (external EHR note ID),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP (soft delete)
);

-- EHR Connections
CREATE TABLE ehr_connections (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users,
  ehr_system VARCHAR ('simplepractice', 'therapynotes', etc),
  oauth_access_token BYTEA (encrypted),
  oauth_refresh_token BYTEA (encrypted),
  connected_at TIMESTAMP,
  last_synced_at TIMESTAMP,
  status ENUM ('active', 'disconnected', 'error')
);

-- Audit Logs (HIPAA Required, Immutable)
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  user_id UUID,
  action VARCHAR ('viewed_note', 'edited_note', 'exported_ehr', etc),
  resource_type VARCHAR ('note', 'recording', 'ehr_connection'),
  resource_id UUID,
  timestamp TIMESTAMP NOT NULL (immutable),
  ip_address INET,
  user_agent VARCHAR
);
```

### API Endpoints

**Authentication:**
```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh-token
POST   /api/auth/enable-mfa
```

**Recordings & Notes:**
```
POST   /api/recordings/upload              (therapist records audio)
POST   /api/notes/generate                 (trigger Claude to generate SOAP)
GET    /api/notes                          (list all notes)
GET    /api/notes/:id                      (retrieve specific note)
PUT    /api/notes/:id                      (therapist edits note)
DELETE /api/notes/:id                      (soft delete)
```

**EHR Integration:**
```
POST   /api/ehr/connect                    (OAuth2 flow)
POST   /api/ehr/sync-note                  (export note to EHR)
GET    /api/ehr/status                     (check connection)
POST   /api/ehr/disconnect                 (revoke access)
```

**User & Settings:**
```
GET    /api/user/profile
PUT    /api/user/profile
GET    /api/billing/subscription
POST   /api/billing/upgrade
GET    /api/analytics/dashboard
```

### FHIR Bridge Architecture

**Philosophy:** Use FHIR standard as universal bridge instead of building separate integrations for each EHR.

**Data Flow:**
```
TherapyNote Note (internal format)
     ↓
FHIR Converter (transform to FHIR DocumentReference)
     ↓
FHIR DocumentReference (standard healthcare format)
     ↓
EHR OAuth2 Endpoint (SimplePractice, TherapyNotes, etc.)
     ↓
EHR Patient Chart
```

**FHIR Resources Used:**
- **DocumentReference:** Represents the clinical note
- **Patient:** Links note to patient in EHR
- **Practitioner:** Identifies therapist
- **Encounter:** Links to therapy session

**EHR Support:**
- **MVP:** SimplePractice (OAuth2) + Generic FHIR
- **Month 2:** TherapyNotes integration
- **Month 3:** Additional EHRs as demand dictates

---

## 6. Security & HIPAA Compliance

### Security Architecture

**Encryption:**
- **In Transit:** TLS 1.3 (all API calls)
- **At Rest:** AES-256 (audio files in S3, patient data in database)
- **Password:** bcrypt with salt (not plain text)
- **Tokens:** JWT with 24-hour expiration

**Authentication & Authorization:**
- **Multi-factor Auth (MFA):** TOTP (Google Authenticator) or SMS
- **Session Management:** JWT tokens, automatic expiration after 15 min inactivity
- **Role-Based Access:** Therapist vs. Practice Admin vs. Enterprise Admin
- **Data Isolation:** Therapist A cannot see Therapist B's notes (multi-tenancy)

**HIPAA Compliance Checklist:**
- [ ] Administrative Safeguards
  - [ ] Access controls (MFA required)
  - [ ] Audit controls (audit logs required, immutable)
  - [ ] Workforce security policies
  - [ ] Data integrity procedures

- [ ] Physical Safeguards
  - [ ] Data center security (Supabase/AWS managed)
  - [ ] Access to servers (no physical access needed)

- [ ] Technical Safeguards
  - [ ] Encryption (AES-256 at rest, TLS in transit)
  - [ ] Access controls (passwords hashed, MFA required)
  - [ ] Audit logs (every action logged)
  - [ ] Integrity controls (data cannot be modified undetected)

- [ ] Business Associate Agreement (BAA)
  - [ ] Signed with all practices and healthcare organizations
  - [ ] Covers data use and disclosure
  - [ ] Breach notification procedures
  - [ ] Data deletion policies

### Audit Logging (HIPAA Required)

Every access to patient data is logged:
```sql
INSERT INTO audit_logs VALUES (
  id: UUID,
  user_id: therapist_id,
  action: 'viewed_note' | 'edited_note' | 'exported_ehr' | 'downloaded_data',
  resource_type: 'note' | 'recording' | 'patient_data',
  resource_id: UUID,
  timestamp: NOW(), -- immutable
  ip_address: client_ip,
  user_agent: browser_version
);
```

**Audit Log Properties:**
- **Immutable:** Cannot be deleted or edited after creation
- **Retained:** 30 years (therapy note standard)
- **Accessible:** Only authorized staff can view (with authorization audit)
- **Reviewed:** Annual audit of access patterns for anomalies

### Breach Notification Plan

**If data breach occurs:**
1. Immediately notify affected users (email + phone)
2. File required report with HHS within 60 days
3. Provide free credit monitoring (if identity theft risk)
4. Document root cause and remediation
5. Enhance security measures to prevent recurrence

### Data Retention & Deletion

**Retention Policy:**
- **Clinical notes:** 30 years (therapy standard)
- **Audit logs:** 30 years (audit trail for compliance)
- **Audio recordings:** 7 days (delete after note generated and approved)
- **User account data:** 2 years after last login (then delete if requested)

**Deletion Procedure:**
- **User requests deletion:** Flag account for soft delete
- **30-day grace period:** User can recover during this time
- **Permanent deletion:** After 30 days, schedule hard delete
- **Audit trail:** Keep deletion logs for 30 years

---

## 7. Monetization Strategy

### Pricing Model: SaaS Subscription

**Tier 1: Individual Therapist**
- **Price:** $99/month
- **Target:** Solo practitioners, self-employed therapists
- **Includes:**
  - Unlimited voice recordings
  - 1 EHR connection
  - Note history + search
  - Basic analytics (notes/week, time saved)
  - Email support
- **Commitment:** Month-to-month, cancel anytime

**Tier 2: Practice (2-10 therapists)**
- **Price:** $199/month + $29/therapist/month
- **Target:** Therapy practices, clinics, group practices
- **Includes:**
  - Everything in Tier 1, PLUS
  - Multi-EHR integration (up to 3 EHRs)
  - Admin dashboard (manage therapists, licensing)
  - Practice-wide analytics
  - Priority support (4-hour response time)
- **Commitment:** Annual pricing (15% discount vs. monthly)

**Tier 3: Enterprise (Future, Year 2)**
- **Price:** Custom pricing, $500-2K/month
- **Target:** Hospital systems, large health networks, insurance companies
- **Includes:**
  - Everything in Practice tier, PLUS
  - Session recording + AI evaluation
  - Advanced analytics (population health insights)
  - Dedicated account manager
  - Custom integrations
  - On-premise deployment option
  - SLA guarantee (99.9% uptime)

### Pricing Rationale

**Individual Tier ($99/month):**
- Therapist saves 30 min/night × 5 days = 2.5 hours/week
- At $150/hour billable rate = $375/week = $1,500/month in value
- $99/month = 6.6% of value recovered
- **ROI:** 1,415% (pays for itself in <1 night)
- **Willingness to Pay:** High (pain point is severe, ROI is massive)

**Practice Tier ($199 + $29/therapist):**
- 5-therapist practice: $199 + (5 × $29) = $344/month
- Per therapist: $69/month (therapist gets benefit, practice pays for management features)
- Strong ROI makes purchasing decision easy
- **Upsell path:** Solo → Practice tier as they grow

### Revenue Projections

| Period | Users | Avg Price | MRR | ARR |
|--------|-------|-----------|-----|-----|
| Month 1 (Week 12) | 15 | $99 | $1,485 | $17,820 |
| Month 2 | 35 | $105 | $3,675 | $44,100 |
| Month 3 | 50 | $110 | $5,500 | $66,000 |
| Month 6 | 150 | $125 | $18,750 | $225,000 |
| Month 12 | 500+ | $130 | $65,000 | $780,000 |

**Assumptions:**
- Month 1: Product Hunt launch, early adopters from network
- Months 2-3: Word-of-mouth + community outreach
- Months 4-12: Content marketing + partnerships + referrals
- Mix: 70% individual, 25% practice, 5% enterprise (by Year 1)
- Churn: 5%/month (low due to integration switching costs)

### Customer Acquisition Cost (CAC)

**Blended CAC (Month 3):**
| Channel | % of Users | CAC per User | Blended |
|---------|-----------|-------------|---------|
| Product Hunt | 30% | $0 | $0 |
| Referrals | 30% | $20 | $6 |
| Email/organic | 25% | $0 | $0 |
| Community | 10% | $0 | $0 |
| Paid ads | 5% | $100 | $5 |
| **Total** | **100%** | | **$11** |

**Sustainable CAC:**
- Target: <$300 (LTV/6 rule)
- Actual blended CAC: $11
- Payback period: <3 months
- **Status:** Excellent CAC efficiency

### Unit Economics

| Metric | Value | Status |
|--------|-------|--------|
| Average Revenue Per User (ARPU) | $110 | ✅ Good |
| Monthly Churn Rate | 5% | ✅ Excellent (low) |
| Customer Lifetime Value (LTV) | $1,881 | ✅ Strong |
| Blended CAC | $11 | ✅ Excellent |
| LTV:CAC Ratio | 171:1 | ✅ Exceptional |
| Payback Period | <3 months | ✅ Very fast |
| Gross Margin | 85%+ | ✅ SaaS standard |

---

## 8. Go-to-Market Strategy

### Launch Approach: Product Hunt First

**Week 11-12: Launch Phase**

**Pre-Launch (Week 11):**
- Prepare Product Hunt page (screenshots, video demo, description)
- Email beta testers to ask for upvotes on launch day
- Prepare Twitter thread explaining problem + solution
- Create launch email campaign
- List 20-30 healthcare/tech journalists to contact

**Launch Day (Week 12, Tuesday 9 AM PT):**
- Post on Product Hunt
- Email to 100+ interested early users
- Twitter thread (8-10 tweets) explaining the value prop
- Respond to Product Hunt comments every 15 min for first 4 hours
- Share on LinkedIn (target therapy practice owners)
- Monitor signup dashboard

**Launch Week (Days 2-7):**
- Answer all Product Hunt comments daily
- Feature 1-2 customer testimonials in comments
- Share user success stories on Twitter
- Engage with therapy community (Reddit, forums)
- Respond to all email inquiries personally

**Expected Results:**
- 200-500 signups from Product Hunt
- 20-30 conversions to paid ($2-3K MRR)
- Press mentions (healthcare tech press)
- Social credibility for next phase

### Parallel Channels

**Therapy Community Forums (Week 11-12+):**
- Reddit: r/therapists, r/psychotherapy, r/mentalhealth
- Psychology Today forums
- AAMFT (American Association for Marriage & Family Therapy) groups
- State therapy licensing board Facebook groups
- **Approach:** Provide value, share case studies, offer free trial
- **Expected:** 20-50 users from communities

**Social Media & Content (Weeks 11-12+):**
- Twitter: Daily updates about therapy burnout, AI, productivity
- LinkedIn: Longer-form articles targeting practice owners
- Blog: 1-2 posts per week starting Month 2
- **Topics:** Therapy burnout, documentation, AI, HIPAA compliance
- **Expected:** 30-50 users from social

**Email Marketing:**
- **Campaign 1:** "Coming soon" to early interest list (Week 11)
- **Campaign 2:** Launch announcement + discount (Week 12)
- **Campaign 3:** Case study + testimonial (Week 13)
- **Expected:** 2-5% conversion rate

**Partnerships (Month 2+):**
- EHR systems (SimplePractice, TherapyNotes) - referral partnerships
- Therapy practice networks - bulk licensing
- Therapy associations (AAMFT, NASW) - endorsements
- Insurance companies - therapist efficiency partnerships
- **Expected:** 30-50% of Month 6+ users

### Referral Program (Month 2+)

- **Incentive:** Refer a therapist friend → both get $20 credit
- **Viral loop:** Shareable links, email templates
- **Expected:** 20-30% of new users by Month 3

### Press & PR (Month 2+)

- Target 20-30 healthcare tech journalists
- Pitch: "AI solves therapist burnout crisis"
- Timeline: Product Hunt launch, then media outreach
- **Expected:** 2-5 press mentions, $50K+ earned media value

### Content Marketing (Month 3+)

| Topic | Audience | Goal |
|-------|----------|------|
| "How AI reduces therapist burnout" | Therapists | 500+ organic views |
| "Therapist documentation: A crisis" | Administrators | Practice-level awareness |
| "HIPAA-compliant AI" | Compliance officers | Enterprise credibility |
| Case studies | All | Social proof |

---

## 9. Implementation Timeline

### Phase 1: Foundation (Weeks 1-4)
**Deliverable:** Working MVP (record → generate → store)

| Week | Task | Hours | Status |
|------|------|-------|--------|
| 1 | Project setup, auth, database, landing page | 16 | Planning |
| 2 | Voice recording, audio upload, Claude integration | 18 | Planning |
| 3 | Dashboard, note editor, note storage | 16 | Planning |
| 4 | Testing, bug fixes, optimization | 14 | Planning |

**Checkpoint (Week 4):**
- ✅ Therapist can record, generate, edit, save notes
- ✅ Dashboard shows notes and basic analytics
- ✅ Zero critical bugs
- **Status:** Ready for FHIR integration

### Phase 2: Integration (Weeks 5-7)
**Deliverable:** FHIR bridge working (notes sync to EHR)

| Week | Task | Hours | Status |
|------|------|-------|--------|
| 5 | FHIR architecture, SimplePractice OAuth2, FHIR DocumentReference | 18 | Planning |
| 6 | Note sync, error handling, retry logic, audit logging | 20 | Planning |
| 7 | Multi-EHR prep, generic FHIR, documentation | 16 | Planning |

**Checkpoint (Week 7):**
- ✅ Notes sync to SimplePractice within 5 seconds
- ✅ Audit logs track every export
- ✅ Failed syncs show clear errors + retry option
- **Status:** FHIR bridge working

### Phase 3: Polish & Compliance (Weeks 8-10)
**Deliverable:** HIPAA-compliant, beta-ready product

| Week | Task | Hours | Status |
|------|------|-------|--------|
| 8 | HIPAA hardening (encryption, MFA, audit logs, data residency) | 18 | Planning |
| 9 | UI polish, edge cases, help docs, tutorials | 18 | Planning |
| 10 | QA, security audit, beta recruitment, Product Hunt prep | 16 | Planning |

**Checkpoint (Week 10):**
- ✅ HIPAA compliance 95%+ complete
- ✅ Professional UI/UX
- ✅ 10-15 beta testers ready
- ✅ Product Hunt page drafted
- **Status:** Ready for public launch

### Phase 4: Launch & Growth (Weeks 11-12)
**Deliverable:** Public launch, first paying customers

| Week | Task | Hours | Status |
|------|------|-------|--------|
| 11 | Beta launch, user support, feedback collection, quick iterations | 14 | Planning |
| 12 | Product Hunt launch, user acquisition, onboarding | 12 | Planning |

**Checkpoint (Week 12):**
- ✅ Product Hunt launch completed
- ✅ 20-30 new users
- ✅ 10-15 paying customers
- ✅ $1-3K MRR achieved
- **Status:** Live product generating revenue

### Total Time Investment
- **Total hours:** 180-208 hours over 12 weeks
- **Average:** 15-17 hours/week (part-time)
- **Daily:** ~2-3 hours/day (fits with day job)

---

## 10. Risk Assessment & Mitigation

### Critical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Therapists skeptical of AI for clinical notes | Medium | High | Beta test with real therapists, iterate on prompt, collect testimonials |
| HIPAA compliance too complex | Low | High | Start HIPAA from day 1, hire compliance consultant if needed ($500-1K) |
| FHIR integration takes longer than planned | Medium | Medium | Use FHIR library (fhir.js), start with generic FHIR, SimplePractice specific later |
| Low beta user adoption | Medium | Medium | Recruit aggressively from network, offer free access, Reddit/communities |
| SimplePractice API breaks or changes | Low | Medium | Build generic FHIR first, SimplePractice optional later |
| Claude API quality issues | Low | Medium | Iterate on prompt, test with therapy samples, have fallback to human review |
| Not enough time for part-time work | Low | High | Adjust scope if behind (defer mobile app, multi-EHR), prioritize MVP |
| Competitor enters market (OpenAI, big tech) | Low | Medium | Move fast (3 months to revenue), build switching costs (EHR integration), focus on therapists |

### Mitigation Strategies

1. **Therapist Adoption:**
   - Beta test with 10-15 real therapists starting Week 6
   - Iterate on Claude prompt based on feedback
   - Collect video testimonials from satisfied users
   - Offer free access to first 20 users

2. **HIPAA Compliance:**
   - Build security in from day 1 (not as an afterthought)
   - Week 1-4: Encryption, auth, basic security
   - Week 8-10: HIPAA hardening and audit
   - Hire $500-1K compliance consultant for review if needed

3. **FHIR Integration:**
   - Use fhir.js library (open-source, well-maintained)
   - Start with generic FHIR endpoint (works with any EHR)
   - SimplePractice optimization comes later
   - Test in SimplePractice sandbox (free account)

4. **Time Management:**
   - Weekly time tracking (should be 15-20 hours/week)
   - Adjust scope if falling behind by Week 6
   - Prioritize MVP features over nice-to-have
   - Defer mobile app, advanced features to post-launch

---

## 11. Success Metrics & KPIs

### Acquisition Metrics

| Metric | Target (Month 3) | Method |
|--------|-----------------|--------|
| Product Hunt upvotes | 300+ | Launch tracking |
| Signups | 50-100 | Conversion funnel |
| Free trial conversions | 20-30 | Stripe + analytics |
| MRR | $1-3K | Stripe reports |
| Cost per acquisition | <$50 avg | Attribution tracking |

### Engagement Metrics

| Metric | Target | Definition |
|--------|--------|-----------|
| Weekly active users | 60%+ | Users who record >= 1 note/week |
| Avg notes per user | 4+ | Average notes generated per user weekly |
| Time in app | 5-10 min/day | Session duration tracking |
| Export to EHR rate | 80%+ | % of notes exported to EHR |
| Return rate (7-day) | 40%+ | % of users returning within 7 days |

### Retention Metrics

| Metric | Target | Definition |
|--------|--------|-----------|
| Churn rate | <5%/month | % of paying users canceling |
| Customer lifetime value | $1,800+ | Expected revenue per customer lifetime |
| Net revenue retention | 110%+ | Revenue growth from existing customers (upsells) |

### Satisfaction Metrics

| Metric | Target | Definition |
|--------|--------|-----------|
| NPS (Net Promoter Score) | 60+ | "How likely to recommend" survey |
| Customer satisfaction | 4.5/5 stars | In-app rating or review aggregation |
| Support response time | <4 hours | Time to first response on support tickets |

### Go/No-Go Decision Points

**Week 4 (End of Foundation Phase):**
- ✅ MVP feature-complete and bug-free
- ✅ At least 1 beta tester using daily
- 🚫 If: Scope creeping or major bugs → pause and fix before Week 5

**Week 7 (End of Integration Phase):**
- ✅ FHIR bridge successfully syncing to SimplePractice
- ✅ 5+ beta users actively using weekly
- 🚫 If: FHIR integration still broken → pivot to web-only MVP, defer EHR integration to v1.1

**Week 10 (End of Polish Phase):**
- ✅ 10-15 beta testers ready for Product Hunt
- ✅ HIPAA compliance 90%+ complete
- 🚫 If: Not ready → delay Product Hunt launch 1 week, use extra week for last-minute polish

**Week 12 (Launch):**
- ✅ 20-30 Product Hunt users
- ✅ 10-15 paying customers
- ✅ $1-3K MRR
- 🚫 If: <10 paying customers or <$1K MRR → analyze why, iterate on pricing/messaging

---

## 12. Future Roadmap (Post-Launch)

### Month 2-3 (Weeks 13-16)
- [ ] TherapyNotes integration (multi-EHR support)
- [ ] Practice admin dashboard (manage multiple therapists)
- [ ] Advanced analytics (practice-wide insights)
- [ ] Referral program optimization
- [ ] Press outreach and media features

### Month 4-6 (Weeks 17-26)
- [ ] Mobile app (iOS/Android for on-the-go recording)
- [ ] Session recording + AI evaluation
- [ ] Athena/other major EHR integrations
- [ ] Telehealth platform integrations (BetterHelp, Talkspace)
- [ ] Enterprise sales (hospital systems, insurance companies)

### Year 2
- [ ] AI-powered insights (predict patient outcomes, recommend interventions)
- [ ] Marketplace for third-party integrations
- [ ] Advanced reporting for billing/compliance
- [ ] Training & certification program
- [ ] International expansion (EU, Canada, Australia)

---

## 13. Appendices

### A. Detailed Tech Stack

**Frontend**
```
Framework:      Next.js 14 (React + TypeScript)
UI Library:     Shadcn/ui (Tailwind CSS)
State:          React Query (data fetching), Zustand (local state)
Forms:          React Hook Form + Zod validation
Auth:           NextAuth.js
Audio:          Web Audio API (recording), wavesurfer.js (visualization)
Hosting:        Vercel (free tier + pay-as-you-go)
Deployment:     GitHub → Vercel (auto-deploy on push)
```

**Backend**
```
Runtime:        Node.js 20 LTS
Language:       TypeScript
Framework:      Express.js (lightweight, flexible)
Database:       PostgreSQL (via Supabase)
ORM:            Prisma (type-safe database queries)
Auth:           NextAuth.js (OAuth, JWT)
Encryption:     crypto (Node.js built-in), bcrypt
File Storage:   AWS S3 (audio files)
AI:             Anthropic Claude API
FHIR:           fhir.js library (FHIR operations)
Email:          SendGrid
Payments:       Stripe
Hosting:        Railway or Render
Monitoring:     Sentry (errors), Vercel Analytics
```

**Infrastructure**
```
Database:       Supabase PostgreSQL (HIPAA-eligible, $15/month)
Storage:        AWS S3 (encrypted, $0.023/GB/month)
Payments:       Stripe ($30 monthly + 2.9% per transaction)
Email:          SendGrid ($10-20/month)
Monitoring:     Sentry ($29/month or free tier)
CI/CD:          GitHub Actions (free tier)
```

### B. HIPAA Compliance Checklist

- [ ] **Administrative Safeguards**
  - [ ] Security policies documented
  - [ ] Access controls implemented (MFA)
  - [ ] Audit controls (audit logs immutable)
  - [ ] Workforce security plan
  - [ ] Data integrity procedures
  - [ ] Incident response plan

- [ ] **Physical Safeguards**
  - [ ] Data center security (vendor-managed)
  - [ ] Facility access controls

- [ ] **Technical Safeguards**
  - [ ] Encryption (AES-256 at rest, TLS in transit)
  - [ ] Access controls (authentication, authorization)
  - [ ] Audit controls (immutable logs)
  - [ ] Integrity controls (data validation, checksums)

- [ ] **Business Associate Agreements**
  - [ ] BAA template drafted
  - [ ] BAA signed with practices
  - [ ] Vendor compliance verified (Supabase, AWS, Stripe, SendGrid)

### C. Sample Claude Prompt

```
You are an experienced clinical note generator specializing in mental health documentation. Your task is to convert the following therapy session notes into a professional SOAP-formatted clinical note.

Guidelines:
- Use clinical terminology appropriate for mental health professionals
- Focus on clinically relevant details only
- Include observations about patient affect, behavior, and engagement
- Reference specific therapeutic techniques or modalities if mentioned
- Maintain objectivity and professional tone
- Do NOT include personal opinions or assumptions
- Format strictly as SOAP (Subjective, Objective, Assessment, Plan)

Therapy Session Notes:
[AUDIO TRANSCRIPT or THERAPIST INPUT]

Clinical Context (optional):
- Patient diagnosis/presenting issue: [if provided]
- Treatment modality: [CBT, psychodynamic, etc., if specified]
- Treatment goals: [if provided]

Generate a professional SOAP note:

SUBJECTIVE:
[Patient's reported experience, symptoms, and session topics]

OBJECTIVE:
[Therapist observations: affect, behavior, engagement, clinical signs]

ASSESSMENT:
[Progress toward goals, clinical impression, overall functioning]

PLAN:
[Treatment recommendations, homework/assignments, plan adjustments]
```

### D. Sample FHIR DocumentReference

```json
{
  "resourceType": "DocumentReference",
  "id": "therapynote-12345",
  "status": "current",
  "docStatus": "final",
  "type": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "28619-5",
      "display": "Mental Health Note"
    }]
  },
  "date": "2026-07-09T14:30:00Z",
  "author": [{
    "reference": "Practitioner/therapist-id-123",
    "display": "Dr. Jane Smith, LCSW"
  }],
  "subject": {
    "reference": "Patient/patient-id-456"
  },
  "encounter": [{
    "reference": "Encounter/session-789"
  }],
  "description": "Therapy session note",
  "content": [{
    "attachment": {
      "contentType": "text/plain",
      "data": "U1VCSkVDVElWRTpQYXRpZW50IHJlcG9ydGVkIHByb2Nlc3NpbmcgY2hpbGRob29kIHRyYXVtYS4uLiA="
    }
  }],
  "context": {
    "related": [{
      "identifier": {
        "system": "https://therapynote.app",
        "value": "note-recording-xyz789"
      }
    }],
    "facilityType": {
      "coding": [{
        "system": "http://snomed.info/sct",
        "code": "288565001",
        "display": "Psychotherapy"
      }]
    }
  }
}
```

### E. Deployment Instructions

**Frontend (Vercel):**
```bash
# Connect GitHub repo to Vercel
# Auto-deploys on every push to main
# Environment variables configured in Vercel dashboard
```

**Backend (Railway):**
```bash
# Connect GitHub repo to Railway
# Auto-deploys on every push to main
# Database migrations run automatically
# Environment variables configured in Railway dashboard
```

**Database (Supabase):**
```bash
# Create Supabase project
# Run migrations: npx prisma migrate deploy
# Enable Row Level Security (RLS) for multi-tenancy
# Configure HIPAA settings in project settings
```

**Environment Variables:**
```
# Backend (.env)
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://therapynote.app
CLAUDE_API_KEY=...
SIMPLEPRACTICE_CLIENT_ID=...
SIMPLEPRACTICE_CLIENT_SECRET=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
STRIPE_SECRET_KEY=...
SENDGRID_API_KEY=...
SENTRY_DSN=...
```

---

## 14. Final Approval

**Design Status:** ✅ **APPROVED FOR IMPLEMENTATION**

**Approved By:** Filip Gadzo  
**Date:** July 9, 2026  
**Confidence Level:** 90%+ (realistic timeline, achievable goals, manageable risks)

**Next Step:** Invoke writing-plans skill to create detailed implementation plan with task breakdowns and dependencies.

---

**End of Design Specification**

