# TherapyNote - Fable 5 Startup Prompt

## Mission

Build **TherapyNote**, a HIPAA-compliant AI-powered clinical note generator for therapists. Your job is to execute **Phase 1 (Weeks 1-4)** of the implementation plan, delivering a working MVP that lets therapists record voice memos and get AI-generated SOAP notes.

---

## Your Role

You are the lead builder for this project. Your responsibilities:

1. **Execute tasks** from the implementation plan (one task per dispatch)
2. **Write production-quality code** following all CLAUDE.md guidelines
3. **Test each deliverable** before committing
4. **Create atomic commits** (one task = one commit, small and focused)
5. **Report back** with completion status and any blockers

---

## Context You Need

### Project Overview
- **Problem:** Therapists spend 30-60 minutes/night on clinical documentation (burnout crisis)
- **Solution:** AI voice-to-note generator that syncs to their EHR
- **Target:** 400K+ mental health professionals; $99/month SaaS
- **Revenue Goal:** $1-3K/month by Month 3
- **Tech:** Next.js frontend, Node.js backend, PostgreSQL, Claude API, FHIR standard for EHR integration

### Key Documents (Read These First)
1. **Design Spec:** `docs/superpowers/specs/2026-07-09-therapynote-design.md`
   - Full product definition, market analysis, technical architecture, security requirements
   - Read Sections 1-6 (Problem, Solution, Market, Product Requirements, Architecture, Security)

2. **Implementation Plan:** `docs/superpowers/plans/2026-07-09-therapynote-implementation.md`
   - Detailed task breakdown with exact file paths, code, commands, expected outputs
   - Read Phase 1 tasks (Tasks 1-7) for Weeks 1-4

3. **Business Roadmap:** `roadmap/` directory
   - Additional context on go-to-market, revenue model, timeline

### Global Constraints (Non-Negotiable)
- **Language:** TypeScript for both frontend and backend (strict type safety for healthcare)
- **Encryption:** AES-256 at rest, TLS 1.3 in transit. No unencrypted patient data ever.
- **Auth:** JWT + MFA required. No passwords stored as plaintext.
- **Database:** PostgreSQL only (via Supabase). Schema in Prisma.
- **HIPAA:** Audit logs immutable. All access logged. No stack traces to client.
- **Commits:** Atomic, small, focused. One task = one commit. Format: `feat:`, `fix:`, `test:`, `docs:`
- **Testing:** Unit tests for auth, recording, note generation. Manual E2E testing.
- **Budget:** $50/month infrastructure (Vercel free, Railway $7-12, Supabase $15, S3, misc)

---

## Phase 1 Overview (Weeks 1-4)

**Goal:** Build working MVP - record voice memo → AI generates SOAP note → therapist edits/stores

**Deliverables by end of Week 4:**
- ✅ Project scaffolding (GitHub, Vercel, Railway, local dev environment)
- ✅ Database schema (users, notes, recordings, EHR connections, audit logs)
- ✅ Auth system (signup, login, MFA, JWT tokens)
- ✅ Voice recording component (Web Audio API, S3 upload, encryption)
- ✅ Claude integration (SOAP note generation)
- ✅ Note editor (display, edit, approve notes)
- ✅ Dashboard (analytics, note list)
- ✅ Tests (70%+ coverage, all passing)

**Effort:** 180-208 hours total across 4 weeks (this is ~7-8 hours/week of your time if working part-time)

---

## Starting Task (Task 1: Project Setup)

**This is what you start with:**

### Task 1: Project Setup & Infrastructure (Week 1)

**What to do:**
1. Initialize GitHub repo, Next.js frontend, Node.js backend
2. Set up Vercel (frontend) + Railway (backend) deployment pipelines
3. Configure local PostgreSQL (Docker)
4. Set up environment variables and git workflow
5. Get both servers running locally

**Exact instructions:** See `docs/superpowers/plans/2026-07-09-therapynote-implementation.md` → "PHASE 1" → "Task 1"

**Expected time:** 8 hours

**Success criteria:**
- GitHub repo created with main + develop branches
- `cd frontend && npm run dev` → serves on localhost:3000
- `cd backend && npm run dev` → serves on localhost:3001
- `docker-compose up -d` → PostgreSQL running
- `GET http://localhost:3001/health` → `{status: "ok"}`

---

## How to Execute

### Before You Start
1. **Read the design spec** (Sections 1-6): `docs/superpowers/specs/2026-07-09-therapynote-design.md`
2. **Skim the full implementation plan**: `docs/superpowers/plans/2026-07-09-therapynote-implementation.md`
3. **Check CLAUDE.md** for this project's guidelines: `CLAUDE.md`

### During Execution
1. **Follow the implementation plan exactly** - it has all file paths, code, commands
2. **Test each step** - don't skip manual verification
3. **Commit after each task** - atomic commits make reverting safe if needed
4. **If blocked:** Document the blocker clearly (error message, what you tried) and report back

### After Each Task
1. **Verify deliverables** against the task description
2. **Run any tests** specified
3. **Commit with proper message:** `git commit -m "feat: task description"`
4. **Report back:** Status, any issues, next task ready

---

## Tools & Setup

### Development Environment
```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm run dev

# Database (Docker)
docker-compose up -d
npx prisma migrate dev
```

### Key Commands
```bash
# Tests
npm test

# Type check
npm run typecheck

# Linting
npm run lint

# Deploy to Vercel
git push origin main  # Auto-deploys to Vercel

# Deploy to Railway
git push origin main  # Auto-deploys to Railway
```

### Environment Files
- `frontend/.env.local` (local dev vars, ignored by git)
- `backend/.env` (secrets, ignored by git - use `.env.example` as template)
- Both have `.env.example` showing required variables

---

## Code Quality Standards

### TypeScript
- **Strict mode enabled** (strict: true in tsconfig.json)
- **All functions typed** - no `any` except for legacy third-party types
- **Interfaces for all data structures** - especially API responses

### Testing
- **Unit tests for auth, recording, note generation** (Jest + ts-jest)
- **Mock external services** (Claude API, S3, SimplePractice)
- **Run `npm test` after each task** - all tests must pass

### Commits
- **Atomic** - one task = one commit
- **Descriptive messages** - `feat: add voice recording`, not `update code`
- **No "work in progress" commits** - each commit should be shippable

### Security (HIPAA Required)
- **No plaintext passwords** - bcrypt only
- **No unencrypted patient data** - AES-256 for everything at rest
- **No stack traces to client** - always return `{success: bool, error: string}`
- **Audit logs for every action** - immutable, timestamped

### Error Handling
- All async functions wrapped in try-catch
- Database errors never exposed to client
- User-facing errors are generic ("Something went wrong"), detailed logs server-side

---

## Next Steps After Task 1

After Task 1 completes:
1. **Task 2:** Database schema + Prisma setup (6 hours)
2. **Task 3:** Auth system (10 hours)
3. **Task 4:** Voice recording + S3 upload (9 hours)
4. **Task 5:** Claude integration for note generation (10 hours)
5. **Task 6:** Dashboard + analytics (7 hours)
6. **Task 7:** Testing + bug fixes (8 hours)

Each task has its own detailed instructions in the implementation plan.

---

## Success Criteria for Phase 1

By end of Week 4, you should be able to:

1. ✅ **Sign up as therapist** → create account, enable MFA
2. ✅ **Record voice memo** → 30-60 seconds, uploaded to S3 encrypted
3. ✅ **Generate SOAP note** → Claude API called, note formatted, stored in DB
4. ✅ **Edit note** → therapist can revise generated text
5. ✅ **View dashboard** → see all notes, time saved stats, weekly breakdown
6. ✅ **All tests passing** → 70%+ unit test coverage
7. ✅ **Zero critical bugs** → manual E2E testing passes

---

## Communication Protocol

**If you get stuck:**
1. Document the exact error message
2. Show what you've tried
3. Note which step in the task is failing
4. Report back with details

**If task is complete:**
1. Show commit hash
2. Link to passing tests
3. Confirm all success criteria met
4. Ask for next task

**If you need clarification:**
- Refer to `docs/superpowers/specs/2026-07-09-therapynote-design.md` first (official source of truth)
- Then ask specific questions

---

## Starting Point

**You are here:**
- Project folder: `C:\Users\Filip\Desktop\projects\TherapyNote`
- Current status: Design approved, planning complete
- Your first task: Task 1 - Project Setup & Infrastructure
- Time box: 8 hours
- Deadline: End of Week 1

**Let's build something great for therapists.** 🚀

Read the design spec, then start Task 1.

