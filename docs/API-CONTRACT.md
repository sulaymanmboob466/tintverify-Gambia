# TintVerify-Gambia
## API Contract — Frontend and Backend Integration

**Document Version:** 1.0  
**Status:** Draft — For Both Developers' Agreement  
**API Style:** REST  
**Data Format:** JSON  
**Initial API Prefix:** `/api/v1`

---

# 1. Purpose

This document defines how the TintVerify-Gambia frontend applications communicate with the backend.

It establishes shared API conventions, authentication requirements, application statuses, endpoint definitions, request formats and response formats.

Both developers must agree on this contract before implementing dependent features.

The contract applies to:

1. Public Applicant Website.
2. Police Administrative Dashboard.
3. Police Mobile Application.

All three applications shall communicate with the same backend API.

# 2. General API Rules

## 2.1 Base URL

Development:

```text
http://localhost:3000/api/v1
```

Production:

```text
https://your-approved-domain.example/api/v1
```

The production address is a placeholder and must be configured before deployment.

## 2.2 Request Format

Requests containing structured information shall use JSON.

```http
Content-Type: application/json
Accept: application/json
```

File uploads shall use:

```http
Content-Type: multipart/form-data
```

## 2.3 Response Format

Successful responses shall use a consistent structure.

Example:

```json
{
  "success": true,
  "message": "Application retrieved successfully",
  "data": {
    "id": "application-123",
    "status": "UNDER_REVIEW"
  }
}
```

Error responses shall use a consistent structure.

```json
{
  "success": false,
  "message": "You are not authorised to perform this action",
  "error": {
    "code": "FORBIDDEN",
    "details": []
  }
}
```

Sensitive internal details, stack traces and secrets must never be returned to clients.

# 3. Authentication

## 3.1 Applicant Authentication

Proposed endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/register` | Register applicant |
| POST | `/auth/verify-email` | Verify email |
| POST | `/auth/login` | Applicant login |
| POST | `/auth/logout` | Applicant logout |
| POST | `/auth/forgot-password` | Request password recovery |
| POST | `/auth/reset-password` | Reset password |
| GET | `/auth/me` | Get current account |

Example registration request:

```json
{
  "fullName": "Demo Applicant",
  "email": "applicant@example.test",
  "phone": "+2203000000",
  "password": "ExampleStrongPassword123!"
}
```

The example credentials are fictional and must not be used in production.

## 3.2 Staff Authentication

Proposed endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/staff/auth/login` | Staff login |
| POST | `/staff/auth/logout` | Staff logout |
| POST | `/staff/auth/2fa/verify` | Verify second factor |
| GET | `/staff/auth/me` | Get current staff account |

Staff accounts shall be created by authorised senior administrators.

Staff registration shall not be publicly available.

## 3.3 Authentication Requirements

The backend shall:

- Securely hash passwords.
- Verify account status.
- Enforce two-factor authentication for staff.
- Enforce role-based permissions.
- Protect against repeated failed login attempts.
- Support session expiry and logout.
- Avoid exposing authentication secrets.

The final session and token implementation must be agreed by both developers.

# 4. Shared Application Statuses

Both frontend and backend shall use the same status values.

```text
SUBMITTED
AWAITING_REVIEW
UNDER_REVIEW
ADDITIONAL_INFORMATION_REQUESTED
AWAITING_APPROVAL
REJECTED
APPROVED_AWAITING_PAYMENT
PAYMENT_DEADLINE_EXPIRED
PAYMENT_VERIFIED
READY_FOR_ISSUANCE
ISSUED
```

The backend shall be responsible for validating permitted status transitions.

The frontend must display readable labels rather than exposing technical status values directly to applicants.

# 5. Applicant Profile APIs

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/applicants/me` | Get applicant profile |
| PATCH | `/applicants/me` | Update applicant profile |
| GET | `/applicants/me/applications` | List own applications |
| GET | `/applicants/me/permits` | List own permits |

Applicants must never be able to retrieve another applicant's private information by changing an ID in the request.

# 6. Application APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/applications` | Create application |
| GET | `/applications` | List authorised applications |
| GET | `/applications/:id` | Retrieve application |
| PATCH | `/applications/:id` | Update permitted application fields |
| POST | `/applications/:id/submit` | Submit application |
| GET | `/applications/:id/timeline` | Retrieve application timeline |

Example application creation request:

