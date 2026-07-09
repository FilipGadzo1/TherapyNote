# TherapyNote Development Guide

## Architecture
- Frontend: Next.js (Vercel)
- Backend: Node.js + Express (Railway)
- Database: PostgreSQL (Supabase)
- AI: Claude API

## Key Commands
- Frontend dev: `cd frontend && npm run dev`
- Backend dev: `cd backend && npm run dev`
- Database: `docker-compose up` (local Postgres)

## Commits
- One task = one atomic commit
- Format: `feat:`, `fix:`, `refactor:`, `docs:`
- Example: `git commit -m "feat: add voice recording component"`

## HIPAA Requirements
- All data encrypted at rest + in transit
- MFA required for all users
- Audit logs immutable
- No stack traces exposed to client
