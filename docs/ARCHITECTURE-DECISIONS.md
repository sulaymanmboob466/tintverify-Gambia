# TintVerify-Gambia Architecture Decisions

**Status:** Draft for joint approval

**Prepared by:** Developer 2

**Date:** 9 November 2026

## Purpose

This document records the unresolved architecture decisions identified in `docs/BACKEND-FOUNDATION-ASSESSMENT.md`. It is a discussion and approval record for both developers.

Every recommendation below is **PENDING**. A recommendation does not authorise implementation, replace the SRS, or amend the API contract. Approved outcomes must be reflected in the relevant project documentation before dependent work starts.

## Decision 1: Technology Stack

**Existing documented requirement**

`README.md`, `AGENTS.md`, `docs/ARCHITECTURE.md`, and `docs/DEVELOPMENT-ROADMAP.md` propose Next.js and TypeScript for the web applications, React Native and Expo for the mobile application, NestJS and TypeScript for the backend, PostgreSQL, Prisma, REST, and OpenAPI/Swagger. `docs/ARCHITECTURE.md` also lists Jest for backend testing and shadcn/ui for web UI components. `AGENTS.md` requires both developers to agree on the final stack before implementation.

**Conflict or unresolved question**

The stack is proposed throughout the documentation, but no joint approval is recorded. The architecture document includes shadcn/ui, which the README and roadmap do not list. The public-web branch presently uses npm, Next.js, React, TypeScript, Tailwind CSS, and ESLint; it does not establish the backend stack.

**Recommended approach**

Approve the documented backend stack of NestJS, TypeScript, PostgreSQL, Prisma, REST, OpenAPI/Swagger, and Jest. Retain the current documented frontend technologies. Treat shadcn/ui as a separate frontend-only decision for Developer 1 because it is not required for the backend foundation.

This uses the stack already named in the project documents and avoids replacing technologies or adding backend infrastructure before agreement.

**Security and integration implications**

NestJS, Prisma, and PostgreSQL provide a documented route for server-side validation, migrations, database constraints, role enforcement, and audit records. OpenAPI makes the frontend/backend interface reviewable. The frontend and backend must still agree package versions, supported Node.js version, and shared contract compatibility before integration.

**Approval status:** PENDING

Developer 1 approval: ____________________________________  Date: ______________

Developer 2 approval: ____________________________________  Date: ______________

## Decision 2: Repository and Shared-Package Structure

**Existing documented requirement**

`README.md`, `AGENTS.md`, and `docs/ARCHITECTURE.md` describe a repository containing `apps/api`, `apps/public-web`, `apps/police-dashboard`, `apps/police-mobile`, `packages/contracts`, and `packages/config`. `AGENTS.md` assigns shared contracts and configuration to the two `packages/` directories. `docs/ARCHITECTURE.md` requires shared contracts in `packages/contracts`.

**Conflict or unresolved question**

The current backend branch contains documentation only. The frontend branch has a standalone `apps/public-web` npm project with its own lockfile. No root workspace manifest, package-manager decision, shared package, or migration plan exists.

**Recommended approach**

Adopt the documented monorepo structure and use npm workspaces, matching the current public-web package manager. Introduce the root workspace and shared packages only through a reviewed coordination change after Developer 1 confirms how `apps/public-web` will consume them. Do not modify or merge the frontend feature branch as part of this decision.

**Security and integration implications**

Shared contracts reduce divergent API types and status values. Shared configuration must contain schemas and non-secret defaults only; secrets remain per-application environment variables and must never be exported to frontend packages.

**Approval status:** PENDING

Developer 1 approval: ____________________________________  Date: ______________

Developer 2 approval: ____________________________________  Date: ______________

## Decision 3: Canonical API Prefix and Route Names

**Existing documented requirement**

`docs/API-CONTRACT.md` declares `/api/v1` as the initial prefix and defines the API request and response conventions. `docs/ARCHITECTURE.md` shows endpoint groups under `/api/...` and states that exact endpoints, request formats, and response structures belong in `docs/API-CONTRACT.md`.

**Conflict or unresolved question**

The route examples omit the version segment. The canonical prefix has not been jointly approved.

**Recommended approach**

Adopt `/api/v1` as the canonical public prefix and update the architecture endpoint examples after approval. Keep endpoint paths in `docs/API-CONTRACT.md` relative to that base URL, so the contract remains readable and versioning is consistent.

**Security and integration implications**

Versioned routes provide a controlled path for future compatibility changes. Frontend API utilities must source the base URL from configuration rather than hardcoding it. Authentication, error handling, rate limiting, and validation must apply consistently beneath the prefix.

**Approval status:** PENDING

Developer 1 approval: ____________________________________  Date: ______________

Developer 2 approval: ____________________________________  Date: ______________

## Decision 4: Initial Database Schema, Canonical Database Document, and Status Enum

**Existing documented requirement**

`docs/ARCHITECTURE.md` proposes entities, relationships, uniqueness constraints, audit requirements, and data-retention principles. `docs/API-CONTRACT.md` defines the shared application statuses. `docs/README.md` references `docs/DATABASE.md`, but that file is missing. The roadmap assigns initial database schema work to Developer 2 in Sprint 1.

**Conflict or unresolved question**

There is no canonical database document or approved Prisma schema. The entity outline is proposed, and no agreement records which entities belong in the Sprint 1 migration or how the status enum is shared with frontend code.

**Recommended approach**

After approval, create `docs/DATABASE.md` as the canonical database design and use it to approve the Sprint 1 schema boundary before generating a Prisma migration. Define the application-status enum exactly as listed in `docs/API-CONTRACT.md`; publish the same values through the shared contracts package. Keep later-sprint workflow entities documented but do not implement their business behaviour early.

**Security and integration implications**

Database constraints must enforce unique emails, application references, permit IDs, and QR tokens. Foreign keys, transaction boundaries, immutable issued-permit history, and audit-log protections are required design constraints. The schema must not introduce official fees, permit validity periods, payment deadlines, or retention periods that the project has not approved.

**Approval status:** PENDING

Developer 1 approval: ____________________________________  Date: ______________

Developer 2 approval: ____________________________________  Date: ______________

## Decision 5: Authentication, Client Origins, and Swagger Access

**Existing documented requirement**

`docs/API-CONTRACT.md` requires secure password hashing, account-status checks, staff two-factor authentication, role-based permissions, login protection, session expiry, and logout. It states that the final session and token implementation requires both developers' agreement. `docs/SRS.md` also requires inactivity logout, secure communication, and individual staff accounts. Sprint 2 is the authentication implementation sprint.

**Conflict or unresolved question**

The documents do not choose the session/token model, approved client origins, or Swagger documentation route and production access policy.

**Recommended approach**

Use a short-lived access-token and rotating refresh-token design, subject to final approval: web refresh tokens would use Secure, HttpOnly, appropriately scoped cookies, while the future mobile application would use platform secure storage. Require staff two-factor verification before issuing a staff session. Define an explicit origin allowlist and select a non-sensitive Swagger route, with production access restricted according to the agreed deployment policy.

**Security and integration implications**

This limits token exposure in web JavaScript, supports the planned mobile application, and makes session expiry and logout enforceable. It requires CSRF protections for cookie-based flows, strict CORS configuration, refresh-token revocation, rate limiting, and careful Swagger exposure so examples and schemas reveal no secrets.

**Approval status:** PENDING

Developer 1 approval: ____________________________________  Date: ______________

Developer 2 approval: ____________________________________  Date: ______________

## Decision 6: Representative Owner Email

**Existing documented requirement**

The SRS requires a representative application to collect vehicle-owner information plus the representative's contact information and supporting documents. The current public-web demonstration additionally makes the vehicle owner's email required. The SRS does not state that owner email is required.

**Conflict or unresolved question**

The current frontend collects more owner contact information than the written minimum. The API contract does not define the field or its purpose.

**Recommended approach**

Keep the representative's email as the required contact and treat owner email as optional only if an approved notification or consent requirement establishes a need for it. Otherwise, remove the required owner-email field when the frontend is integrated. Record the agreed choice in the API contract and shared types.

**Security and integration implications**

This follows data minimisation and avoids collecting personal contact data without a defined workflow. If retained, owner email requires the same access restrictions, validation, audit controls, and privacy treatment as other applicant information.

**Approval status:** PENDING

Developer 1 approval: ____________________________________  Date: ______________

Developer 2 approval: ____________________________________  Date: ______________

## Decision 7: Document Storage and Malware Scanning

**Existing documented requirement**

The SRS permits PDF, JPG/JPEG, and PNG uploads, with 10 MB document and 5 MB photo limits. It requires security and malware checks before files are available for review. `AGENTS.md` requires protected document access, server-side validation, and restrictions to authorised roles. `docs/ARCHITECTURE.md` requires upload validation and malware scanning.

**Conflict or unresolved question**

No storage provider, access model, scanning workflow, quarantine policy, or failure-handling rule is documented.

**Recommended approach**

Select a private, access-controlled document storage service and persist only document metadata plus an opaque storage reference in the database. Validate type, size, and file content server-side; quarantine uploads until malware scanning succeeds; issue access through authorised backend checks or short-lived, scoped download links. The provider and scanner must be approved before Sprint 3 upload implementation.

**Security and integration implications**

Private storage and quarantining prevent direct public access and reduce the chance that malicious files reach reviewers. The selected approach must prevent path traversal, content-type spoofing, unauthorised object access, and leakage of document URLs. Upload status must be represented consistently for frontend feedback.

**Approval status:** PENDING

Developer 1 approval: ____________________________________  Date: ______________

Developer 2 approval: ____________________________________  Date: ______________

## Decision 8: Local Development Ports and Environment Variables

**Existing documented requirement**

`docs/API-CONTRACT.md` sets the development API base URL to `http://localhost:3000/api/v1`. The public-web package's `next dev` command uses Next.js's default port 3000. `AGENTS.md` requires environment variables for secrets and connection strings, an `.env.example` with placeholders, and exclusion of `.env` from Git.

**Conflict or unresolved question**

The frontend and backend cannot both bind to port 3000. No environment-variable names or frontend/backend base-URL convention is documented.

**Recommended approach**

Reserve port 3000 for the public website and configure the backend to listen on port 3001 in local development. Define `PORT=3001`, `DATABASE_URL`, and a non-secret client-origin variable for the API; define `NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api/v1` for the public website. Document placeholders only in `.env.example` files.

**Security and integration implications**

Separating ports makes local integration possible and allows the API to enforce an explicit development origin. Frontend-visible variables must contain only public configuration. Database URLs, signing secrets, mail credentials, and storage credentials stay server-side and out of version control.

**Approval status:** PENDING

Developer 1 approval: ____________________________________  Date: ______________

Developer 2 approval: ____________________________________  Date: ______________

## Decision 9: Company Applications and Vehicle Cardinality

**Existing documented requirement**

The SRS says companies can submit applications for multiple vehicles. The current company application wizard collects multiple vehicles and their documents within one browser flow. `docs/ARCHITECTURE.md` defines a singular `vehicle_id` on `Applications`, describes valid application-to-vehicle relationships, and defines a permit for one vehicle.

**Conflict or unresolved question**

The documents do not establish whether a company creates one application per vehicle or one application containing multiple vehicles. This choice affects database constraints, document ownership, API payloads, review queues, payment verification, issuance, and permit history.

**Recommended approach**

Use one application per vehicle, preserving the architecture's singular application-to-vehicle relationship and the one-permit-per-vehicle model. Allow the company frontend to collect multiple vehicles in one assisted submission flow, but have the agreed API create and return a distinct application for each vehicle. Defer optional batch/grouping metadata until it is specifically approved.

**Security and integration implications**

Separate records keep documents, approvals, payments, permits, audit events, revocations, and QR tokens scoped to the correct vehicle. The frontend must show the individual application references and their independent statuses after submission. The backend must make the multi-vehicle creation atomic or return precise per-vehicle failures so the user cannot mistake a partial submission for a complete one.

**Approval status:** PENDING

Developer 1 approval: ____________________________________  Date: ______________

Developer 2 approval: ____________________________________  Date: ______________

## Next Step

Both developers must review and approve or revise these pending decisions. Only after agreement on the technology stack and repository structure may Developer 2 begin the Sprint 1 backend foundation. Later decisions remain pending until their assigned sprint, unless they are necessary to define an agreed shared contract earlier.
