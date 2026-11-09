# Backend Foundation Assessment

**Project:** TintVerify-Gambia

**Prepared by:** Developer 2

**Date:** 9 November 2026

**Scope:** Sprint 0 assessment and Sprint 1 backend readiness

## Outcome

Backend implementation must not start yet. The documented NestJS, PostgreSQL, Prisma, REST, and OpenAPI/Swagger stack is consistently proposed, but every source that names it says it requires agreement by both developers before implementation. No record of that agreement exists in the repository.

This assessment records the work completed, the integration contract needed by the current frontend, and the decisions that require joint approval. It does not alter the frontend branch or implement authentication, permit workflows, payments, issuance, QR verification, or other later-sprint features.

## Repository and Git Assessment

- Current branch: `feature/backend-foundation`.
- Current tracked working tree: clean (`git status --porcelain=v1 -uno` produced no output).
- `main`, `develop`, `origin/main`, and `origin/develop` currently resolve to `e964f3e`.
- The local backend branch also currently resolves to `e964f3e`.
- The repository root currently contains documentation and no `apps/` or `packages/` directories on this branch.
- `.gitignore` excludes `.env` and `.env.*`, while retaining `.env.example`; this meets the environment-file baseline.
- `docs/DATABASE.md` is referenced by `docs/README.md` and the architecture document, but is missing.

The documented target structure is a monorepo with `apps/api`, `apps/public-web`, `apps/police-dashboard`, `apps/police-mobile`, `packages/contracts`, and `packages/config`. It has not yet been created on this branch.

## Developer 1 Frontend Assessment

`origin/feature/frontend-foundation` contains commit `d1f7454` and creates one application: `apps/public-web`. It does not create the police-dashboard or police-mobile applications.

The public website uses Next.js 16.4.5, React 19.3.0, TypeScript 5, Tailwind CSS 4, ESLint 9, and npm (`package-lock.json`). It is a standalone application rather than a configured workspace. There are no shared `packages/contracts` or `packages/config` packages, API utility, authentication client, environment variable, or network request in the branch.

The registration, login, password-reset, and application wizard screens are local demonstrations. They explicitly state that they do not save or send data. This is correct for the current frontend milestone, but it means no live backend contract is implemented yet.

### Responsibility Alignment

The Frontend Developer owns the public website, police dashboard, police mobile application, their interfaces, and frontend integration. The Backend Developer owns backend services and APIs, the database and Prisma implementation, authentication and authorisation, business logic, document storage, QR-verification services, audit logging, and reporting APIs. Architecture decisions, API contracts, testing, integration, and documentation remain shared responsibilities. The absence of the police dashboard and mobile applications from the current frontend branch is an implementation-status finding; it does not change ownership.

### Required Public-Web Contract

When Sprint 2 and Sprint 3 integration begins, the backend contract must cover at least:

- applicant account types: `individual`, `company`, and `representative`;
- applicant identity/contact fields shown by the frontend, including name, email, phone, address, date of birth where applicable, driving-licence number, company details, owner details, and representative details;
- the applicant and vehicle fields displayed by the current frontend, including registration number, make, model, and optional colour; the relationship between an application and multiple company vehicles requires joint agreement before it becomes an API or database contract;
- document uploads for licence, company registration, representative identification, authorisation letter, vehicle registration, and four vehicle photographs;
- `POST /api/v1/auth/register`, login/session endpoints, and account/profile retrieval once authentication begins;
- application creation, upload, update, submission, and timeline endpoints once Sprint 3 begins;
- the documented JSON success/error envelopes and shared application-status enum.

The frontend currently collects representative owner data that is more detailed than the SRS minimum (owner email in addition to required owner name and phone). Both developers should decide whether that is a required backend field, optional metadata, or removed from the form before integration.

## Documentation Alignment and Gaps

The documentation agrees on a shared backend, REST/JSON API, `/api/v1` prefix, PostgreSQL, Prisma, TypeScript, and OpenAPI/Swagger. It also consistently treats the product as an unofficial prototype using fictional data.

There are four material documentation conflicts or gaps:

1. `docs/API-CONTRACT.md` specifies `/api/v1`, while the architecture document's route examples use `/api/...`. The API contract is the more specific integration source, but the final prefix should be jointly confirmed and architecture examples updated.
2. `docs/DATABASE.md` is missing despite being listed in the documentation index and repository design. The architecture contains a database outline, but no standalone canonical database document exists.
3. `docs/API-CONTRACT.md` assigns the development API base URL to `http://localhost:3000/api/v1`, while the public-web package runs `next dev` on port 3000 by default. The two local development servers cannot both use that port. The team must agree the API port and environment-variable contract before integration.
4. `docs/ARCHITECTURE.md` models `Applications` with a singular `vehicle_id`, while the current public-web company flow collects multiple vehicles in one application wizard and the SRS says companies can submit applications for multiple vehicles. The documents do not establish whether this means one application per vehicle or one company application containing multiple vehicles.

The authentication/session mechanism, staff two-factor implementation, password-reset delivery service, document-storage provider, malware-scanning mechanism, and approved production domains are intentionally undecided. They must remain decisions rather than implementation assumptions.

## Sprint 0 Status

| Requirement | Status | Evidence |
|---|---|---|
| Review requirements, architecture, API contract, roadmap | Complete for Developer 2 | This assessment |
| Agree technology stack | Incomplete | Every stack document marks it proposed and subject to both developers' agreement |
| Agree repository structure and workflow | Incomplete | Target structure exists only in documentation; frontend is standalone |
| Set up development environments | Incomplete | No backend application or configuration is present |
| Establish branch and pull-request rules | Partially documented | Rules exist; no evidence of joint adoption beyond branches |

## Sprint 1 Backend Checklist

Complete these only after the approvals below are recorded:

- [ ] Initialise `apps/api` as a NestJS TypeScript project.
- [ ] Add backend development, build, lint, type-check, and automated-test scripts.
- [ ] Add `.env.example` with placeholders only; document `DATABASE_URL`, API port, and allowed client origins.
- [ ] Configure PostgreSQL connectivity.
- [ ] Initialise Prisma and create the initial migration through Prisma migrations.
- [ ] Add the shared `packages/contracts` package and agree how the existing public-web application consumes it.
- [ ] Configure `/api/v1` globally and implement the documented success/error response format.
- [ ] Configure Swagger/OpenAPI at an agreed documentation route.
- [ ] Implement a non-sensitive health endpoint that reports service availability.
- [ ] Add request validation and a global error handler.
- [ ] Add focused automated tests for health, validation, and the response/error envelope.
- [ ] Verify type checking, linting, tests, health endpoint, Swagger access, and Prisma configuration.

## Proposed Initial Database Documentation Outline

The missing `docs/DATABASE.md` should make the architecture outline actionable without selecting policy values that the SRS leaves open.

### Entities and relationships

- Users and applicant profiles: one applicant user to many applications.
- Staff users, roles, permissions, and staff-role assignments: many-to-many staff role assignment, with permissions attached to roles.
- Vehicles and applications: one vehicle can have historical applications. The application-to-vehicle cardinality is unresolved: the documented architecture uses a singular `vehicle_id`, while the current company frontend collects multiple vehicles in one application wizard. The agreed database document must state whether each vehicle creates a separate application or whether an application-to-vehicle relation is required.
- Application documents, reviews, additional-information requests, approval decisions, and payment verification records: each belongs to an application; applications retain their history.
- Permits: one successfully issued application produces one permit; a permit has one unique QR verification identity and can have revocation, renewal, or replacement history.
- Notifications, audit logs, and verification logs: retain event history and actor references.

### Keys, enums, constraints, and indexes

- Use generated primary keys and foreign keys for all relationships.
- Enforce unique applicant emails, staff emails, application references, permit IDs, and QR verification tokens.
- Define application-status values exactly as in `docs/API-CONTRACT.md`: `SUBMITTED`, `AWAITING_REVIEW`, `UNDER_REVIEW`, `ADDITIONAL_INFORMATION_REQUESTED`, `AWAITING_APPROVAL`, `REJECTED`, `APPROVED_AWAITING_PAYMENT`, `PAYMENT_DEADLINE_EXPIRED`, `PAYMENT_VERIFIED`, `READY_FOR_ISSUANCE`, and `ISSUED`.
- Add indexes for foreign keys and planned verification/search paths, especially permit ID, QR token, vehicle registration number, application reference, and event timestamps.
- Preserve issued permits, application history, and audit records; do not introduce destructive updates as a convenience.
- Exclude passwords and authentication secrets from audit details.

No official fee, permit-validity period, payment deadline, or data-retention period is proposed here because the project documentation leaves these to approved policy.

## Recommended Backend Folder Structure

```text
apps/api/
  prisma/
    schema.prisma
    migrations/
  src/
    main.ts
    app.module.ts
    common/
      filters/
      interceptors/
      validation/
    config/
    health/
    prisma/
  test/
  .env.example
  package.json
packages/contracts/
  src/
    api/
    enums/
    dto/
  package.json
packages/config/
  src/
  package.json
```

This supports the Sprint 1 foundation while leaving later domain modules for their assigned sprints.

## Decisions Requiring Both Developers' Approval

1. Confirm the proposed stack: NestJS, TypeScript, PostgreSQL, Prisma, REST, OpenAPI/Swagger, and the frontend's npm/Next.js setup.
2. Confirm the monorepo/package-manager structure and how `apps/public-web` consumes shared packages without modifying Developer 1's branch.
3. Confirm `/api/v1` as the canonical prefix and align the architecture examples.
4. Approve the initial database schema boundaries and the shared application-status enum.
5. Agree on session/token strategy, permitted client origins, and Swagger documentation route before authentication or deployment work.
6. Decide the handling of the frontend's representative-owner email field.
7. Agree the document-storage and malware-scanning approach before document uploads are implemented.
8. Decide the local API port and environment-variable contract for the public website and API.
9. Decide whether companies submit one application per vehicle or one application containing multiple vehicles, then align the frontend contract, architecture, and database design.

## Recommended Next Action

Complete the outstanding Sprint 0 shared task: both developers must record agreement on the proposed technology stack and repository structure. Once that is complete, Developer 2's first Sprint 1 task is to create the backend project and then configure PostgreSQL, Prisma, the initial database schema, API documentation, health check, and development environment variables on `feature/backend-foundation`.
