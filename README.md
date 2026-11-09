# TintVerify-Gambia

**Digital Vehicle Tint Permit Application and Verification Prototype**

> **Project status:** Independent demonstration prototype — not an official Gambia Police Force system.

## 1. About the Project

TintVerify-Gambia is an independent software prototype designed to demonstrate how vehicle tinted-glass permit applications, administrative processing and permit verification could be managed digitally in The Gambia.

The proposed system aims to demonstrate how digital records and QR-code verification could help reduce permit forgery, improve administrative efficiency and strengthen accountability.

## 2. Project Objectives

- Digitise the vehicle tint permit application process.
- Provide applicants with an online application portal.
- Enable authorised staff to review and process applications.
- Support controlled permit approval and issuance workflows.
- Generate unique Permit IDs and QR verification codes.
- Allow traffic officers to verify permits using a mobile application.
- Maintain application history and audit records.
- Provide management reports and administrative oversight.

## 3. Main Applications

The prototype consists of three connected applications:

### Public Applicant Website
- Applicant registration and login.
- Individual, company and representative applications.
- Vehicle information and document uploads.
- Application status tracking.
- Email notifications.
- Application history and renewal requests.

### Police Web Dashboard
- Application review and recommendations.
- Separate approval workflow.
- Manual physical-payment verification records.
- Permit issuance management.
- Staff and role management.
- Permit revocation and amendment controls.
- Management reports and audit logs.

### Police Mobile Application
- QR-code scanning.
- Online permit verification.
- Manual search by vehicle registration or Permit ID.
- Expired, revoked and invalid permit detection.
- Verification history.
- Suspicious permit reporting.
- Limited offline verification with clear status warnings.

## 4. Proposed Technology Stack

The following technologies are proposed and subject to agreement by the development team.

| Component | Proposed technology |
|---|---|
| Public website | Next.js and TypeScript |
| Police dashboard | Next.js and TypeScript |
| Mobile application | React Native and Expo |
| Backend | NestJS and TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| API | REST API |
| Styling | Tailwind CSS |
| Version control | Git and GitHub |

## 5. Development Team

The project is being developed collaboratively by two developers.

**Frontend Developer**
- Public website.
- Police dashboard.
- Police mobile application.
- User interfaces and API integration.

**Backend Developer**
- Backend services and APIs.
- Database and authentication.
- Application and permit workflows.
- QR verification, security and audit logging.

Both developers collaborate on architecture, API contracts, testing and integration.

## 6. Project Documentation

Technical documentation is maintained in the `docs/` directory.

| Document | Description |
|---|---|
| [Software Requirements Specification](docs/SRS.md) | Functional and non-functional requirements |
| [System Architecture](docs/ARCHITECTURE.md) | Architecture and database design |
| [API Contract](docs/API-CONTRACT.md) | Proposed backend API definitions |
| [Development Roadmap](docs/DEVELOPMENT-ROADMAP.md) | Sprint plan and development responsibilities |

Shared instructions for AI coding assistants are available in [AGENTS.md](AGENTS.md).

## 7. Repository Structure

```text
tintverify-Gambia/
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
│   ├── API-CONTRACT.md
│   └── DEVELOPMENT-ROADMAP.md
│
├── AGENTS.md
├── README.md
└── .gitignore
```

The structure represents the proposed architecture and will be populated as development progresses.

## 8. Important Notice

TintVerify-Gambia is an independent academic and technical demonstration project.

It is not an official government platform, does not represent the Gambia Police Force and has not been authorised to issue real permits.

All demonstration accounts, applicant details, vehicles, documents and permit records must be fictional.

**Demo permits must be clearly marked: DEMO — NOT AN OFFICIAL PERMIT.**

## 9. Development Approach

Development will follow the sprint-based roadmap documented in this repository.

The team will prioritise:
- Security and privacy.
- Clear separation of staff responsibilities.
- Reliable application workflows.
- Consistent frontend and backend integration.
- Maintainable and extensible architecture.
- Complete end-to-end demonstration functionality.

---

**Project:** TintVerify-Gambia  
**Version:** 1.0 — Initial Prototype  
**Repository:** tintverify-Gambia
