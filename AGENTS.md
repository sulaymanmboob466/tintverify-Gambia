# AGENTS.md — TintVerify-Gambia

## 1. Project Overview

TintVerify-Gambia is an independent software demonstration prototype for a proposed vehicle tinted-glass permit application, administration and verification system in The Gambia.

The prototype is intended to demonstrate how digital applications, staff workflows, permit records and QR verification could work together.

**Important:** This is an unofficial, independent prototype. It is not owned, operated, approved or authorised by the Gambia Police Force (GPF).

Never present the prototype as an official government system. Use fictional people, vehicles, documents and permit records. Clearly label demonstration permits and screens as **DEMO — NOT AN OFFICIAL PERMIT**.

## 2. Read the Documentation First

Before implementing any feature, read the relevant project documents:

- `docs/README.md`
- `docs/SRS.md`
- `docs/ARCHITECTURE.md`
- `docs/API-CONTRACT.md`
- `docs/DEVELOPMENT-ROADMAP.md`

These documents are drafts. If implementation details conflict, do not silently invent a decision. Explain the conflict and ask the developers to agree on the change before proceeding.

## 3. Project Applications

The project contains three connected applications:

1. `apps/public-web` — public applicant website.
2. `apps/police-dashboard` — police administration and management dashboard.
3. `apps/police-mobile` — Android and iOS police verification application.

The backend is located in:

- `apps/api`

Shared contracts and configuration belong in:

- `packages/contracts`
- `packages/config`

All applications must communicate through the agreed backend APIs. Do not create separate, disconnected data sources.

## 4. Team Responsibilities

### Frontend Developer

The frontend developer is responsible for:

- Public applicant website.
- Applicant registration and login interfaces.
- Applicant dashboard and application forms.
- Document-upload interfaces.
- Police web dashboard interfaces.
- Police mobile application interfaces.
- QR scanning and verification screens.
- Frontend validation and user experience.
- Integration with backend APIs.

### Backend Developer

The backend developer is responsible for:

- Backend services and APIs.
- Database and Prisma implementation.
- Authentication and authorization.
- Application and permit business logic.
- Document storage and access restrictions.
- Email notifications.
- QR token generation and verification.
- Audit logging and reporting APIs.
- Backend testing and security.

### Shared Responsibilities

Both developers must:

- Follow the same requirements and API contract.
- Communicate before changing shared contracts.
- Keep documentation updated.
- Review pull requests.
- Test integrated functionality.
- Avoid committing secrets or credentials.

Do not modify another developer's area without communicating first.

## 5. Technology Stack

The proposed technology stack is:

- TypeScript.
- Next.js for web applications.
- React Native and Expo for mobile.
- NestJS for the backend.
- PostgreSQL for the database.
- Prisma as the ORM.
- REST APIs.
- OpenAPI/Swagger documentation.
- Tailwind CSS for web styling.

The developers must agree on the final stack before implementation. Do not introduce a different framework or major dependency without agreement.

## 6. General Coding Rules

- Write clean, readable and maintainable code.
- Use TypeScript wherever applicable.
- Prefer small, reusable components and services.
- Use meaningful variable, function and file names.
- Avoid unnecessary duplication.
- Keep business logic separate from presentation code.
- Validate user input on both frontend and backend.
- Handle loading, success, empty and error states.
- Do not leave unfinished placeholder functionality presented as complete.
- Add tests for important functionality.
- Explain significant implementation decisions.

Do not rewrite large parts of the project unnecessarily.

## 7. Security Rules

Security is a core project requirement.

- Never hardcode passwords, tokens, API keys or secrets.
- Use environment variables for sensitive configuration.
- Never commit `.env` files containing real secrets.
- Maintain a `.env.example` containing placeholder values only.
- Enforce role-based access control on the backend.
- Never rely only on frontend restrictions for security.
- Protect applicant information and uploaded documents.
- Restrict sensitive document access to authorised roles.
- Use secure password hashing.
- Protect authentication and sessions.
- Validate file types and file sizes.
- Protect against unauthorised access and common web vulnerabilities.
- Record important actions in audit logs.
- Do not expose private information in QR codes.

Never bypass authentication or authorization to make a demonstration easier.

## 8. Application Workflow Rules

The application workflow must respect the separation of responsibilities:

- Reviewers examine applications and make recommendations.
- Approving officers make final approval decisions.
- Payment verification officers record physical payment verification.
- Issuing officers record permit issuance.
- Traffic officers perform verification and reporting.
- Senior system administrators manage staff accounts and roles.

A reviewer must not perform final approval simply because it is easier to implement.

An issued permit must not be directly edited. Corrections must use a controlled amendment process with authorisation and audit records.

## 9. QR and Permit Verification Rules

- Each demonstration permit must have a unique Permit ID.
- Each permit must have its own unique, non-guessable verification token.
- A token must never be reused for another permit.
- QR codes must not contain sensitive personal information.
- Verification must distinguish valid, expired, revoked and invalid permits.
- Revocation must require appropriate authorisation and a recorded reason.
- Expired permits must be identified automatically.
- Offline verification must clearly indicate that the latest status cannot be confirmed until reconnection.

## 10. User Interface Rules

For all frontend applications:

- Create clean, professional and consistent interfaces.
- Make web applications responsive on desktop, tablet and mobile.
- Use accessible labels, readable typography and clear navigation.
- Display useful validation and error messages.
- Avoid unnecessary complexity.
- Keep applicant forms easy to understand.
- Use English initially.
- Use fictional demonstration information.
- Clearly identify unofficial demonstration screens and permits.

The police mobile application's main screen should provide an obvious QR scanning action, but must not automatically open the camera immediately after login.

## 11. Database and API Rules

- Follow the agreed architecture and API contract.
- Use clear relationships and appropriate database constraints.
- Do not duplicate records unnecessarily.
- Preserve application and permit history.
- Do not delete important records simply to simplify development.
- Use database migrations for schema changes.
- Document API changes.
- Coordinate changes to shared contracts before implementation.
- Keep API responses consistent and handle errors clearly.

## 12. Git and Collaboration Rules

- `main` is the stable branch.
- Create feature branches for new work.
- Use pull requests for changes.
- Do not normally commit directly to `main`.
- Pull the latest agreed changes before starting work.
- Use descriptive commit messages.
- Review changes before merging.
- Never overwrite another developer's work without discussion.

Example branches:

- `feature/applicant-registration`
- `feature/application-api`
- `feature/police-dashboard`
- `feature/qr-verification`

## 13. Testing Rules

Before considering a feature complete:

- Test normal successful behaviour.
- Test invalid input.
- Test unauthorised access.
- Test error handling.
- Test relevant role restrictions.
- Test frontend and backend integration.
- Add automated tests where appropriate.

The final prototype must support an end-to-end demonstration using fictional data.

## 14. Instructions to Codex

When working on this repository:

1. Inspect the existing project structure before changing anything.
2. Read relevant documentation before implementing a feature.
3. Identify whether the task belongs to frontend, backend or shared work.
4. Do not assume missing requirements.
5. Ask for clarification when a decision affects architecture, security, API contracts or business rules.
6. Explain the files you intend to create or modify.
7. Implement only the requested scope.
8. Run relevant tests and checks.
9. Report what changed, what was tested and any remaining issues.
10. Update documentation when implementation changes agreed behaviour.

**Do not generate the entire application in one step.** Follow the development roadmap incrementally, sprint by sprint.

## 15. Final Project Principle

Build TintVerify-Gambia as a secure, maintainable, professional and realistic demonstration prototype.

Correctness, security, clear responsibilities and consistency between all three applications are more important than rushing development.
