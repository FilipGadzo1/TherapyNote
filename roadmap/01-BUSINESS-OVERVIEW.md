# TherapyNote - Business Overview

## Executive Summary

**Product:** TherapyNote - HIPAA-compliant voice-to-clinical-note AI assistant
**Target Market:** Mental health therapists, counselors, psychiatrists, clinical psychologists
**Revenue Model:** Subscription SaaS ($99-199/month)
**Timeline:** 3 months to MVP + initial revenue
**Revenue Target:** $1-3K/month by end of Month 3

---

## The Problem

### Therapist Documentation Burden
- **Time waste:** Therapists spend 30-60 minutes EVERY NIGHT writing clinical session notes
- **Billable time lost:** At $150-300/hour, this is $75-150 per therapist per day in lost revenue
- **Burnout driver:** Documentation is listed as #1 cause of therapist burnout alongside compassion fatigue
- **Compliance risk:** Rushed notes = incomplete records = HIPAA/legal exposure
- **Market size:** 400K+ licensed mental health professionals in US alone

### Current "Solutions" Are Broken
- **EHR native tools:** Clunky, don't understand therapy-specific language
- **Generic AI note generators:** Not HIPAA-compliant, not integrated with EHR
- **Dictation software:** Dragon NaturallySpeaking costs $200+, still requires manual editing
- **No good option:** Therapists resign themselves to spending 10+ hours/week on notes

---

## TherapyNote Solution

### Core Value Proposition
"Record a 30-second voice memo after session. AI generates therapy-specific clinical note (SOAP format). Auto-syncs to your EHR. HIPAA-compliant. Done in 2 minutes instead of 30."

### How It Works (User Flow)
1. **Record** - Therapist speaks 30-60 seconds of clinical observations (patient mood, discussion topics, treatment plan)
2. **Generate** - Claude AI generates structured SOAP note in 2-3 seconds
3. **Review** - Therapist reads, edits if needed (takes 1-2 minutes)
4. **Export** - Click "Export to EHR" → note syncs to SimplePractice, TherapyNotes, Athena, etc. via FHIR
5. **Done** - Note locked in EHR with full audit trail (HIPAA-compliant)

### Key Differentiators
- **Deep EHR Integration:** FHIR standard API means it works with ANY EHR (future-proof)
- **HIPAA-First:** Encrypted end-to-end, hashed passwords, audit logs, BAA support from day 1
- **Therapy-Specific:** Not generic medical notes—optimized for mental health documentation
- **Fast:** 30 minutes of work becomes 2 minutes
- **Accurate:** AI trained on therapy-specific language, not generic medical AI
- **Tiered Product:** Web MVP → Mobile app → Enterprise desktop edition

---

## Market Opportunity

### Addressable Market (TAM)
- **US mental health professionals:** 400K+ (therapists, counselors, psychiatrists, psychologists)
- **Global:** 800K+ 
- **Therapy practices/clinics:** 50K+ in US

### Realistic Penetration (3 years)
- **Year 1:** 500-1K users (0.1-0.25% penetration) = $50-100K ARR
- **Year 2:** 5K users (1% penetration) = $500K-1M ARR
- **Year 3:** 20K users (5% penetration) = $2-4M ARR

### Why This Market Works
1. **High willingness to pay** - Therapist bills $150-300/hour; 30 min saved = $75-150 value per day
2. **Recurring revenue** - Therapists document every single day, every year
3. **Sticky product** - Integrated into daily workflow (hard to switch)
4. **Professional buyers** - Practices make purchasing decisions based on ROI, not price shopping
5. **Regulatory moat** - HIPAA compliance is barrier to competition

---

## Revenue Model

### Pricing Strategy (SaaS Subscription)

**Tier 1: Individual Therapist**
- Price: $99/month
- Includes: Unlimited voice recordings, 1 EHR integration, basic analytics
- Target: Solo practitioners, group therapists

**Tier 2: Practice/Clinic**
- Price: $199/month + $29/therapist/month (up to 10 therapists)
- Includes: Unlimited recording, multi-EHR integration, admin dashboard, usage analytics
- Target: Therapy practices, clinics, small mental health organizations

**Tier 3: Enterprise (Future)**
- Price: Custom pricing ($500-2K/month)
- Includes: Session recording + AI evaluation, advanced analytics, dedicated support, on-premise deployment
- Target: Large health systems, hospital groups, insurance companies

### Revenue Projections (Conservative)

**Month 1-2:** MVP Launch
- 10-20 early adopters (friends, network referrals)
- $990-1,980 MRR

**Month 3:** Growth
- 30-50 paying users (word-of-mouth + Product Hunt launch)
- $2,970-4,950 MRR

**Month 6:** Established
- 100+ users (targeted outreach to therapy networks)
- $9,900+/month MRR

**Year 1:** Scale
- 500-1K users (SaaS best practices + affiliate programs)
- $50-100K ARR

---

## Competitive Landscape

### Direct Competitors (Very Few)
- **None.** No existing HIPAA-compliant, EHR-integrated voice-to-note tool for therapists.

### Indirect Competitors
- **Scribing services** (Rev, GoScribe) - human transcription, $500-2K/month, slow, not integrated
- **EHR native tools** (SimplePractice, TherapyNotes built-in) - clunky, not AI, not optimized for therapy
- **Generic AI note generators** (Otter.ai, Descript) - not HIPAA, not therapy-specific, no EHR integration
- **Dragon NaturallySpeaking** - $200+ one-time, not healthcare-specific, not integrated

### Why We Win
- **Only solution** that combines: AI + HIPAA + EHR integration + therapy-specific + affordable
- **Barriers to entry:** HIPAA compliance complexity, EHR API knowledge, therapy domain expertise
- **Network effects:** Every therapist who uses it tells 3-5 colleagues (tight-knit community)

---

## Why Now? (Market Timing)

1. **Claude/GPT maturity** - LLMs finally good enough for clinical accuracy (2024+)
2. **FHIR adoption** - Healthcare moving to standard APIs (makes EHR integration feasible)
3. **AI in healthcare acceptance** - Regulators + clinicians now accepting AI tools (FDA/HIPAA pathways clear)
4. **Therapist shortage** - Growing demand for therapy services, therapist burnout accelerating need for automation
5. **Solo founder viability** - Claude API + no-code infrastructure lets solo dev build this in 2-3 months

---

## Success Metrics (KPIs)

### Build Phase (Month 1-2)
- MVP feature-complete by Week 4
- HIPAA compliance checklist 90% done
- Working SimplePractice integration

### Launch Phase (Month 2-3)
- 10+ beta users by Week 6
- Product-market fit signals (users actively using weekly)
- $1-3K MRR by Week 12

### Growth Phase (Month 4-6)
- 100+ paid users
- 40%+ month-over-month growth
- $10K+ MRR
- Product Hunt launch
- First industry press mentions

---

## Next Steps

1. **Design Phase** → Complete full technical/business design
2. **Build Phase** → MVP development (4-5 weeks)
3. **Launch Phase** → Beta with 10-20 users (1-2 weeks)
4. **Growth Phase** → Targeted outreach to therapy networks, Product Hunt
