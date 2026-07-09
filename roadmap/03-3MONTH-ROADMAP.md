# TherapyNote - 3 Month Roadmap

## Overview

This roadmap breaks down the next 12 weeks into 4 phases:
1. **Foundation Phase (Weeks 1-4)** - Core MVP development
2. **Integration Phase (Weeks 5-7)** - FHIR bridge + EHR connectivity
3. **Polish & Compliance Phase (Weeks 8-10)** - HIPAA hardening, UI/UX, testing
4. **Launch Phase (Weeks 11-12)** - Beta launch, early users, marketing prep

**Total Dev Time:** ~15-20 hours/week (part-time)

---

## PHASE 1: Foundation (Weeks 1-4)

### Week 1: Setup & Auth

**Goals:**
- Project scaffolding complete
- Database schema designed
- Authentication flow working
- Landing page + pricing mockup

**Tasks:**
- [ ] Initialize Next.js project (frontend)
- [ ] Initialize Node.js + Express backend
- [ ] Set up PostgreSQL/Supabase database
- [ ] Design database schema (users, notes, recordings, audit logs)
- [ ] Implement NextAuth.js (sign up, login, MFA)
- [ ] Create basic landing page (value prop + pricing tiers)
- [ ] Deploy to Vercel (frontend) + Railway (backend)
- [ ] Set up error tracking (Sentry)
- [ ] Create GitHub repo + basic CI/CD

**Deliverables:**
- Working sign up/login flow
- Database deployed and accessible
- Frontend + backend in production (skeleton)

**Time Estimate:** 15-18 hours

---

### Week 2: Core Recording & Note Generation

**Goals:**
- Voice recording works end-to-end
- Claude integration working
- Note generation pipeline complete
- Basic UI for recording

**Tasks:**
- [ ] Build voice recording component (Web Audio API)
- [ ] Implement audio file upload to AWS S3 (encrypted)
- [ ] Create encryption service (encrypt audio at rest)
- [ ] Integrate Claude API for SOAP note generation
- [ ] Design therapy-specific prompt for Claude
- [ ] Build note display UI (show generated SOAP note)
- [ ] Implement edit functionality for notes
- [ ] Database queries for note CRUD operations

**Deliverables:**
- Therapist can record 30-60 sec audio
- Audio encrypted and stored in S3
- Claude generates clinical note in 2-3 seconds
- Therapist can review and edit note
- Note saved to database

**Time Estimate:** 18-20 hours

---

### Week 3: Dashboard & User Experience

**Goals:**
- Dashboard showing all past notes
- Analytics (notes/week, time saved)
- Settings page for EHR connection setup
- UI polishing

**Tasks:**
- [ ] Build dashboard (list of notes, search, filter)
- [ ] Implement note status tracking (draft → approved → synced)
- [ ] Create analytics dashboard (time saved stats, notes/week)
- [ ] Build settings page layout
- [ ] Add logout functionality
- [ ] Implement soft delete (archive notes)
- [ ] Add keyboard shortcuts (power user features)
- [ ] Mobile responsiveness across all pages
- [ ] Add loading states and error messages

**Deliverables:**
- Clean, functional dashboard
- Analytics showing productivity metrics
- Settings page ready for EHR integration
- Mobile-responsive UI

**Time Estimate:** 16-18 hours

---

### Week 4: Testing & Hardening

**Goals:**
- Unit tests for critical functions
- Basic security hardening
- Performance optimization
- Bug fixes from manual testing

**Tasks:**
- [ ] Write unit tests for authentication
- [ ] Write tests for note generation pipeline
- [ ] Implement rate limiting (prevent abuse)
- [ ] Add CORS security headers
- [ ] Implement CSRF protection
- [ ] Test audio quality handling (large files, compression)
- [ ] Performance profiling and optimization
- [ ] Accessibility audit (WCAG A level)
- [ ] Manual end-to-end testing
- [ ] Create simple user documentation

**Deliverables:**
- MVP feature-complete
- 70%+ unit test coverage on core functions
- Security checklist 80% complete
- Performance baseline established
- Basic documentation for early users

**Time Estimate:** 14-16 hours

**END OF PHASE 1 CHECKPOINT:**
- ✅ Therapist can record, generate, edit, and store notes
- ✅ Dashboard shows notes and analytics
- ✅ Authentication and basic security implemented
- ✅ Database and infrastructure running smoothly

---

## PHASE 2: Integration (Weeks 5-7)

### Week 5: FHIR Bridge Foundation

**Goals:**
- FHIR bridge architecture designed
- SimplePractice OAuth2 flow working
- Note → FHIR DocumentReference conversion complete

**Tasks:**
- [ ] Research SimplePractice API + OAuth2 flow
- [ ] Design FHIR DocumentReference schema for therapy notes
- [ ] Implement OAuth2 flow for SimplePractice
- [ ] Build EHR connection setup UI (connect button, consent flow)
- [ ] Create FHIR resource builder (note → FHIR format)
- [ ] Test OAuth token storage (encrypted)
- [ ] Build connection status page (connected, disconnected, error)
- [ ] Implement token refresh logic (OAuth tokens expire)

**Deliverables:**
- Therapist can connect SimplePractice account securely
- Note can be converted to FHIR format
- OAuth tokens securely stored and refreshed
- Connection status displayed in settings

**Time Estimate:** 16-18 hours

---

### Week 6: Note Sync & EHR Export

**Goals:**
- Notes successfully sync to SimplePractice
- Error handling and retry logic
- Audit logging for HIPAA compliance

**Tasks:**
- [ ] Implement FHIR API call to SimplePractice
- [ ] Map patient ID from EHR to TherapyNote
- [ ] Handle sync errors (network, auth, validation)
- [ ] Implement retry logic for failed syncs
- [ ] Create audit log entries for every sync
- [ ] Build "Export to EHR" button in note editor
- [ ] Display sync status (syncing, synced, failed)
- [ ] Test with real SimplePractice sandbox
- [ ] Create webhook to listen for EHR confirmation

**Deliverables:**
- Therapist clicks "Export to EHR"
- Note appears in SimplePractice patient chart within 5 seconds
- Audit log shows export timestamp, therapist, note ID
- Failed syncs show clear error messages + retry option

**Time Estimate:** 18-20 hours

---

### Week 7: Multi-EHR Prep & Generic FHIR

**Goals:**
- Generic FHIR endpoint ready (any EHR can connect)
- TherapyNotes integration started
- EHR roadmap documented

**Tasks:**
- [ ] Build generic FHIR endpoint handler
- [ ] Document FHIR setup instructions for any EHR
- [ ] Start TherapyNotes OAuth2 integration
- [ ] Create EHR selector UI (choose EHR on connect)
- [ ] Build customer-facing integration guide
- [ ] Test generic FHIR with multiple EHR types
- [ ] Set up support for future EHR additions
- [ ] Document API contract for EHR partners

**Deliverables:**
- Therapists can connect SimplePractice or generic FHIR EHR
- TherapyNotes integration 50% complete
- Documentation for supporting new EHRs
- Customer integration guide ready

**Time Estimate:** 14-16 hours

**END OF PHASE 2 CHECKPOINT:**
- ✅ FHIR bridge working with SimplePractice
- ✅ Notes successfully sync to EHR
- ✅ Audit logs created for every action
- ✅ Multi-EHR foundation laid (TherapyNotes next)

---

## PHASE 3: Polish & Compliance (Weeks 8-10)

### Week 8: HIPAA Hardening

**Goals:**
- HIPAA compliance checklist 95%+ complete
- Encryption everywhere
- Audit logs production-ready
- Business Associate Agreement drafted

**Tasks:**
- [ ] Enable MFA (TOTP + SMS options)
- [ ] Implement automatic session timeout (15 min inactivity)
- [ ] Encrypt all patient identifiers in database
- [ ] Review and harden all API endpoints
- [ ] Implement database encryption at rest
- [ ] Set up data residency (US only)
- [ ] Create incident response playbook
- [ ] Audit logs immutable (cannot be deleted)
- [ ] Add data retention policies (30-year retention for therapy notes)
- [ ] Draft Business Associate Agreement (BAA)
- [ ] Create HIPAA compliance documentation

**Deliverables:**
- All data encrypted in transit + at rest
- MFA required for all users
- Audit logs comprehensive and immutable
- HIPAA compliance documentation
- BAA template ready for practices

**Time Estimate:** 16-18 hours

---

### Week 9: UI/UX Polish & Edge Cases

**Goals:**
- Professional UI/UX polish
- Edge cases handled
- Help documentation complete
- Performance optimized

**Tasks:**
- [ ] Design system refinement (colors, typography, spacing)
- [ ] Edge case testing (network fails mid-sync, audio too long, etc.)
- [ ] Build help documentation (FAQ, setup guides)
- [ ] Implement in-app tutorials (first-time user flow)
- [ ] Add notifications (note generated, sync complete, errors)
- [ ] Performance optimization (reduce API calls, lazy loading)
- [ ] Analytics integration (track feature usage, funnels)
- [ ] A/B test voice recording UX
- [ ] Accessibility audit (keyboard nav, screen readers)
- [ ] Create admin dashboard (usage stats, user management)

**Deliverables:**
- Professional, polished UI
- Smooth onboarding flow for new users
- Help documentation comprehensive
- Performance baseline: <2s page load, <500ms API responses

**Time Estimate:** 16-18 hours

---

### Week 10: QA & Documentation

**Goals:**
- Bug-free MVP
- Complete documentation
- Beta testers recruited
- Marketing materials prepared

**Tasks:**
- [ ] Full end-to-end QA (test all workflows)
- [ ] Test all error states + recovery flows
- [ ] Create video tutorials (record note, export to EHR, etc.)
- [ ] Write API documentation (for future third-party integrations)
- [ ] Create deployment documentation (for staff)
- [ ] Conduct security audit (internal checklist)
- [ ] Recruit 10-15 beta testers (via network)
- [ ] Create beta feedback form
- [ ] Prepare Product Hunt launch materials
- [ ] Create email campaign for early access

**Deliverables:**
- Zero critical bugs
- Complete documentation suite
- Beta testers ready to use
- Product Hunt launch page drafted

**Time Estimate:** 14-16 hours

**END OF PHASE 3 CHECKPOINT:**
- ✅ HIPAA-compliant production system
- ✅ Professional, polished UI
- ✅ Comprehensive documentation
- ✅ Beta testers recruited and ready
- ✅ Marketing materials prepared

---

## PHASE 4: Launch & Growth (Weeks 11-12)

### Week 11: Beta Launch & Early User Acquisition

**Goals:**
- 10-15 beta users actively using platform
- Feedback collected and logged
- Quick iteration based on feedback

**Tasks:**
- [ ] Launch beta (private link to beta testers)
- [ ] Daily user support (respond to questions, bugs)
- [ ] Collect feedback on voice recording experience
- [ ] Track bug reports and prioritize fixes
- [ ] Monitor system performance and errors
- [ ] Iterate on UX based on user feedback
- [ ] Build referral program (refer a friend = discount)
- [ ] Create case study with 1-2 early users
- [ ] Prepare public launch announcement

**Deliverables:**
- 10-15 active beta users
- Feedback database with 20-30 items
- Bugs fixed from beta feedback
- Referral program ready
- 1 case study published

**Time Estimate:** 12-14 hours

---

### Week 12: Public Launch & Growth Sprint

**Goals:**
- Product Hunt launch
- First paying customers
- $1-3K MRR target
- Growth engine activated

**Tasks:**
- [ ] Product Hunt launch (week 12 Tuesday or Wednesday)
- [ ] Outreach to therapy networks (LinkedIn, forums, groups)
- [ ] Send email campaign to beta testers (upgrade to paid)
- [ ] Monitor Product Hunt comments, respond to questions
- [ ] Track conversion funnel (signup → trial → paid)
- [ ] Onboard first paying customers personally
- [ ] Collect testimonials + video reviews from users
- [ ] Create content for growth (Twitter thread, blog post)
- [ ] Plan Week 13+ (feature roadmap, marketing strategy)
- [ ] Set up analytics dashboards (track MRR, churn, activation)

**Deliverables:**
- Product Hunt launch completed
- 20-30 new users from PH launch
- 10-15 paying customers ($1-3K MRR)
- Growth engine activated (referral, content, outreach)
- Clear roadmap for next 3 months

**Time Estimate:** 12-14 hours

**END OF PHASE 4 CHECKPOINT:**
- ✅ Product publicly launched
- ✅ First paying customers
- ✅ $1-3K/month MRR achieved
- ✅ Growth strategy in motion
- ✅ Clear roadmap for scaling

---

## Total Time Investment

| Phase | Hours/Week | Total Hours | Cumulative |
|-------|-----------|------------|-----------|
| Phase 1 (Weeks 1-4) | 15-18 | 60-72 | 60-72 |
| Phase 2 (Weeks 5-7) | 16-18 | 48-54 | 108-126 |
| Phase 3 (Weeks 8-10) | 16-18 | 48-54 | 156-180 |
| Phase 4 (Weeks 11-12) | 12-14 | 24-28 | 180-208 |

**Total: 180-208 hours over 12 weeks**
**Average: 15-17 hours/week (part-time)**

---

## Key Milestones & Checkpoints

| Week | Milestone | Status |
|------|-----------|--------|
| Week 4 | MVP feature-complete | ✅ |
| Week 7 | FHIR bridge working | ✅ |
| Week 10 | HIPAA-compliant + beta ready | ✅ |
| Week 12 | Public launch + revenue | ✅ |

---

## Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| SimplePractice API changes | Low | Medium | Start with generic FHIR, test frequently |
| HIPAA compliance too complex | Medium | High | Hire compliance consultant if needed ($500-1K) |
| Low beta user adoption | Medium | Medium | Recruit aggressively, offer free access to first 20 users |
| Therapists skeptical of AI | Medium | Medium | Start with case studies, ROI calculator |
| Not enough time for part-time | Low | High | Scope down features if needed, focus on MVP |

---

## Success Metrics

By end of Week 12:
- [ ] 30-50 total users (15-20 paying)
- [ ] $1-3K/month MRR
- [ ] 40%+ weekly active users
- [ ] < 5% churn rate
- [ ] 4.5+ star rating (if reviews available)
- [ ] 0 HIPAA violations or security incidents
- [ ] <2% uptime per month

---

## Post-Launch (Weeks 13-16, Next Phase)

Once MVP is live and revenue is flowing:

1. **Week 13-14:** Add TherapyNotes integration (double addressable market)
2. **Week 15-16:** Mobile app beta (record on-the-go)
3. **Week 17-20:** Practice management features (admin dashboard, billing per therapist)
4. **Month 6+:** Enterprise sales outreach to hospital systems

