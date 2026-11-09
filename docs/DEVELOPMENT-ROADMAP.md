# TintVerify-Gambia — Development Roadmap

**Version:** 1.0 Draft  
**Project:** TintVerify-Gambia  
**Status:** Proposed development plan  
**Estimated duration:** 12–16 weeks (part-time)  
**Start date:** 9 November 2026

---

## 1. Purpose

This roadmap divides development into manageable sprints. It coordinates the frontend and backend developers so that both work from the same requirements, architecture and API contract.

The project will be developed as an independent demonstration prototype using fictional data. It is not an official Gambia Police Force system and must not issue real government permits or imply official authorisation.

## 2. Development Team Responsibilities

### Frontend Developer
Responsible for:
- Public applicant website.
- Applicant registration, login and dashboard.
- Application forms and document-upload interfaces.
- Police web dashboard.
- Police mobile application for Android and iOS.
- QR scanning and verification interfaces.
- Connecting frontend applications to backend APIs.
- Frontend validation, usability and testing.

### Backend Developer
Responsible for:
- Backend architecture and API development.
- Database design and implementation.
- Authentication and authorization.
- Application and permit business logic.
- Document storage and access controls.
- Email notifications.
- QR token generation and verification.
- Audit logs and reporting APIs.
- Backend testing and security.

### Shared Responsibilities
Both developers must:
- Review and agree on requirements and technical decisions.
- Follow the API contract.
- Review each other's changes through pull requests.
- Test integrated features together.
- Keep documentation updated.
- Never commit passwords, API keys or other secrets.

## 3. Proposed Technology Stack

The following stack is proposed and must be agreed upon by both developers before implementation:

| Area | Proposed technology |
|---|---|
| Public website | Next.js + TypeScript |
| Police dashboard | Next.js + TypeScript |
| Mobile application | React Native + Expo |
| Backend | NestJS + TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| API | REST + OpenAPI/Swagger |
| Styling | Tailwind CSS |
| Shared contracts | TypeScript |
| Version control | GitHub |

## 4. Sprint Plan

### Sprint 0 — Project Setup and Agreement
**Estimated duration:** 1 week

**Both developers:**
- Review SRS, architecture, API contract and this roadmap.
- Agree on the technology stack.
- Agree on repository structure and development workflow.
- Set up development environments.
- Establish branch and pull-request rules.

**Deliverable:** Agreed technical foundation and ready-to-use repository.

### Sprint 1 — Application Foundations
**Estimated duration:** 1–2 weeks

**Frontend developer:**
- Create the public website structure.
- Create the police dashboard structure.
- Create the mobile application structure.
- Build reusable navigation, layouts and interface components.

**Backend developer:**
- Create the backend project.
- Configure PostgreSQL and Prisma.
- Establish the initial database schema.
- Set up API documentation and health-check endpoint.
- Configure development environment variables.

**Deliverable:** All applications start successfully and the backend is reachable.

### Sprint 2 — Authentication and User Management
**Estimated duration:** 1–2 weeks

**Frontend developer:**
- Build applicant registration and login pages.
- Build applicant account dashboard.
- Build police staff login interface.
- Build role-specific dashboard navigation.

**Backend developer:**
- Implement registration and login.
- Implement email verification.
- Implement password security and recovery.
- Implement role-based access control.
- Implement staff account management foundations.
- Add login protection and session security.

**Deliverable:** Applicants and authorised staff can securely access their respective areas.

### Sprint 3 — Applicant and Vehicle Applications
**Estimated duration:** 2 weeks

**Frontend developer:**
- Build individual application forms.
- Build company application forms.
- Build authorised representative application forms.
- Build vehicle information forms.
- Build document and vehicle-photo upload interfaces.
- Build application history and status tracking.

**Backend developer:**
- Implement application APIs.
- Implement applicant and vehicle records.
- Implement document-upload handling and validation.
- Implement application status management.
- Implement applicant access restrictions.

**Deliverable:** An applicant can submit and track a complete fictional application.

### Sprint 4 — Review and Approval Workflow
**Estimated duration:** 1–2 weeks

**Frontend developer:**
- Build application review screens.
- Build reviewer recommendation interfaces.
- Build additional-information request screens.
- Build approval and rejection screens.
- Build applicant correction and resubmission interfaces.

**Backend developer:**
- Implement review workflow.
- Implement reviewer recommendations.
- Implement additional-information requests.
- Implement separate approval authority.
- Implement rejection reasons and application history.
- Implement email notifications for status changes.

**Deliverable:** A complete application can move through review and approval.

### Sprint 5 — Fees, Payment Verification and Issuance
**Estimated duration:** 1–2 weeks

**Frontend developer:**
- Build fee information and payment-instruction screens.
- Build payment verification interface for authorised staff.
- Build permit issuance interface.
- Build payment-deadline and extension-request screens.

**Backend developer:**
- Implement configurable demonstration fees.
- Implement payment deadlines and extensions.
- Implement manual physical-payment verification records.
- Implement issuance workflow.
- Generate unique demonstration Permit IDs.
- Record issuance actions in audit logs.

**Deliverable:** An approved application can proceed through manual payment verification and permit issuance.

### Sprint 6 — QR Verification and Mobile Application
**Estimated duration:** 2 weeks

**Frontend developer:**
- Build mobile application home screen.
- Build QR scanner interface.
- Build permit verification result screen.
- Build manual vehicle-registration and Permit ID search.
- Build offline-status indicators.
- Build verification history and suspicious-permit reporting interfaces.

**Backend developer:**
- Implement secure, unique QR verification tokens.
- Implement online verification endpoints.
- Implement manual search endpoints.
- Implement revocation checks.
- Implement verification history and suspicious-permit reports.
- Support limited cached verification data.

**Deliverable:** A fictional issued permit can be scanned and verified using the mobile application.

### Sprint 7 — Administration, Reports and Permit Lifecycle
**Estimated duration:** 1–2 weeks

**Frontend developer:**
- Build senior administrator screens.
- Build staff management interfaces.
- Build management dashboard and reports.
- Build permit revocation and amendment interfaces.
- Build renewal and replacement request interfaces.

**Backend developer:**
- Implement staff management permissions.
- Implement reporting endpoints.
- Implement permit expiry and revocation.
- Implement renewal and replacement workflows.
- Implement controlled amendments.
- Complete audit-log functionality.

**Deliverable:** Administrators and management can oversee the system and its records.

### Sprint 8 — Integration, Security and Final Testing
**Estimated duration:** 1–2 weeks

**Both developers:**
- Integrate all three applications.
- Test complete application-to-verification workflows.
- Test role permissions and access restrictions.
- Test invalid, expired and revoked QR codes.
- Test application corrections and rejection scenarios.
- Test offline verification warnings.
- Fix defects and improve usability.
- Prepare demonstration data and documentation.

**Deliverable:** An integrated end-to-end demonstration prototype.

## 5. Proposed Repository Structure

```text
tintverify-gambia/
│
├── apps/
│   ├── api/
│   ├── public-web/
│   ├── police-dashboard/
│   └── police-mobile/
│
├── packages/
│   ├── contracts/
│   └── config/
│
├── docs/
│   ├── README.md
│   ├── SRS.md
│   ├── ARCHITECTURE.md
