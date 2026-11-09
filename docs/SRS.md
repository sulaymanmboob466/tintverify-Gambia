# TintVerify-Gambia
## Software Requirements Specification (SRS)

**Document Version:** 1.0  
**Status:** Draft  
**Project Type:** Independent Academic/Development Prototype  
**Initial Scope:** Vehicle Tinted-Glass Permit Application and Verification  
**Country:** The Gambia

---

## 1. Introduction

### 1.1 Purpose

TintVerify-Gambia is a proposed digital system designed to demonstrate how vehicle tinted-glass permit applications, reviews, approvals, issuance records and permit verification could be managed electronically.

The prototype aims to reduce permit forgery, improve administrative efficiency, strengthen accountability and make permit verification easier for authorised officers.

This is an independent prototype and is not an officially authorised Gambia Police Force system. All demonstration records, applicants, fees and permits must be fictional.

### 1.2 Project Scope

The initial version will focus exclusively on vehicle tinted-glass permits.

The architecture should be extensible so that additional permit categories may be introduced in the future.

The system will consist of three connected applications:

1. Public applicant website.
2. Police administrative web dashboard.
3. Police mobile application for Android and iOS.

All applications will communicate with a shared backend and database.

### 1.3 Objectives

- Digitise the proposed permit application workflow.
- Provide structured application review and approval.
- Reduce opportunities for forged or duplicated permits.
- Generate unique permit identification numbers and QR codes.
- Enable authorised officers to verify permits.
- Maintain secure records and audit trails.
- Improve management reporting and accountability.

---

## 2. Users and Roles

The system shall support the following roles:

### 2.1 Applicant
- Register and log in.
- Submit permit applications.
- Upload required documents.
- Track application progress.
- Respond to requests for additional information.
- View previous applications and permits.
- Request permit replacement or renewal.

### 2.2 Application Reviewer
- View assigned applications.
- Examine applicant and vehicle information.
- Review uploaded documents.
- Recommend approval.
- Recommend rejection.
- Request additional information.
- Forward recommendations for final approval.

A reviewer cannot make the final approval decision.

### 2.3 Approving Officer
- Review recommendations.
- Approve or reject applications.
- Record reasons for decisions.
- Authorise permit revocation where permitted.

### 2.4 Payment Verification Officer
- Record the outcome of physical payment verification.
- Confirm that the applicant has presented an acceptable bank payment receipt through the established physical process.

### 2.5 Permit Issuing Officer
- Issue approved permits after payment verification.
- Record the permit ID and issuance date.
- Record the responsible issuing officer.

### 2.6 Traffic Police Officer
- Scan permit QR codes.
- View relevant verification information.
- Search by vehicle registration number or permit ID.
- Report suspected forged permits.
- View personal verification history.

### 2.7 Senior System Administrator
- Create staff accounts.
- Assign and change staff roles.
- Suspend or deactivate accounts.
- Initiate password recovery.
- Review staff activity.

### 2.8 Management/Auditor
- View authorised management reports.
- Monitor application and permit statistics.
- Review audit records and officer activity.

---

## 3. Applicant Registration and Accounts

The system shall:

- Allow individuals, companies and authorised representatives to register.
- Require a valid email address and phone number.
- Require email verification.
- Provide secure login and logout.
- Allow applicants to manage their profiles.
- Provide password recovery.
- Allow applicants to view only their own records.

An applicant account may manage multiple vehicle applications.

---

## 4. Applicant Information Requirements

### 4.1 Individual Applicants

The system shall collect:

- Full name.
- Date of birth.
- Phone number.
- Email address.
- Residential address.
- Driving licence number.
- Driving licence document.

National identification details are excluded from the initial requirements.

### 4.2 Company Applicants

The system shall collect:

- Company name.
- Business registration number.
- Company address.
- Contact person's name.
- Contact person's phone number.
- Contact person's email address.
- Company registration document.

Companies shall be able to submit applications for multiple vehicles.

Bulk application processing remains subject to further design review.

### 4.3 Authorised Representatives

Where a representative applies on behalf of a vehicle owner, the system shall collect:

- Vehicle owner's information.
- Representative's name and contact information.
- Representative's identification document.
- Authorisation letter or supporting document.

---

## 5. Vehicle Information Requirements

Each application shall contain:

- Vehicle registration number.
- Vehicle make.
- Vehicle model.
- Vehicle colour.
- Vehicle registration document.
- Front photograph.
- Rear photograph.
- Left-side photograph.
- Right-side photograph.

The initial system shall not require vehicle year or chassis/VIN information.

Vehicle interior photographs are not required.

---

## 6. Document Upload Requirements

The system shall support:

- PDF.
- JPG/JPEG.
- PNG.

Initial file size limits:

- PDF documents: maximum 10 MB per file.
- Vehicle photographs: maximum 5 MB per image.

The system shall provide upload validation, upload progress feedback and appropriate error messages.

Uploaded files must undergo appropriate security and malware checks before being made available for review.

---

## 7. Application Workflow

The application process shall follow these stages:

1. Submitted.
2. Awaiting Review.
3. Under Review.
4. Additional Information Requested, where necessary.
5. Awaiting Approval.
6. Approved — Awaiting Payment.
7. Payment Deadline Expired, where applicable.
8. Payment Verified.
9. Ready for Issuance/Collection.
10. Permit Issued.

Rejected applications shall retain their rejection status and reason.

### 7.1 Review Process

The reviewer shall be able to:

- Recommend approval.
- Recommend rejection.
- Request additional documents or information.

### 7.2 Additional Information

When additional information is requested:

- The applicant shall receive an email notification.
- The applicant shall log in.
- The applicant shall upload the missing information to the same application.
- The application shall continue through the workflow without requiring a new application.

### 7.3 Rejected Applications

Applicants shall receive the rejection reason.

They may submit a corrected new application using their existing account and vehicle information.

Previous rejected application records must remain available for audit purposes.

### 7.4 Applicant Editing

Applicants may edit their applications while awaiting review.

Once review has started, changes requiring correction shall follow the controlled additional-information process.

Applicants shall be able to see a progress timeline.

---

## 8. Approval and Payment Process

### 8.1 Approval

Final approval shall be performed by an authorised approving officer.

The reviewer and approving officer shall be separate roles.

### 8.2 Payment

The initial prototype shall not process payments online.

After approval:

- The applicant receives an email containing the applicable fee and payment instructions.
- The applicant pays at the designated bank through the proposed physical process.
- The applicant presents the payment receipt at the relevant office.
- An authorised payment verification officer manually records the verification outcome.

The initial prototype shall not include Wave integration, online banking integration or automated bank transaction verification.

It shall not implement a detailed financial ledger.

### 8.3 Payment Deadlines

The system shall support configurable payment deadlines.

When the deadline expires without verified payment, the application shall move to Payment Deadline Expired.

Applicants may request an extension and provide a reason.

An authorised officer shall approve or reject the request.

Approved extensions shall update the deadline, create an audit record and trigger an email notification.

### 8.4 Fee Management

Authorised administrators shall be able to configure permit fees.

The system shall preserve fee change history, including:

- Previous fee.
- New fee.
- Effective date.
- Staff member responsible.
- Date and time of change.

The prototype shall use clearly labelled fictional demonstration fees.

Official fees and permit validity periods remain subject to determination by the appropriate authority.

---

## 9. Permit Issuance and QR Verification

### 9.1 Permit Issuance

After payment verification, the issuing officer shall record the permit issuance.

Each issued permit shall have:

- Unique Permit ID.
- Unique QR verification code.
- Issue date.
- Expiry date.
- Associated applicant and vehicle records.
- Issuing officer record.

The prototype shall use demonstration permits clearly labelled as unofficial.

The existing physical government permit layout shall not be represented as an authorised document or replaced by a fabricated official design.

### 9.2 QR Code Security

Each QR code shall be linked to one permit record.

The verification token shall be unique, securely generated and difficult to guess.

A QR code must not expose private documents or unnecessary personal information.

### 9.3 QR Verification Results

A successful scan shall display:

- Permit ID.
- Vehicle registration number.
- Vehicle make and model.
- Vehicle colour.
- Permit status.
- Issue date.
- Expiry date.
- Revocation status.

Possible verification outcomes include:

- Valid.
- Expired.
- Revoked.
- Invalid or not found.
- Unable to confirm current status while offline.

### 9.4 Manual Search

Officers shall also be able to search using:

- Vehicle registration number.
- Permit ID.

QR scanning remains the primary verification method.

### 9.5 Offline Verification

The mobile application shall support limited offline verification using previously available cached information.

The application must clearly warn officers that the latest expiry or revocation status cannot be confirmed until the device reconnects.

Offline results must never be presented as fully current confirmation.

---

## 10. Permit Lifecycle Management

### 10.1 Expiry

Permits shall automatically become expired after their configured expiry date.

Manual officer action shall not be required.

### 10.2 Renewal

Renewal shall create a new permit record with a new Permit ID and QR code.

Previous permit records must be preserved.

### 10.3 Revocation

Only authorised senior approving officers shall be able to revoke a permit.

A revocation must include:

- Reason.
- Responsible officer.
- Date and time.
- Relevant audit record.

Permitted prototype reasons include fraudulently obtained and issued by mistake.

Online verification shall show the revoked status immediately after revocation is recorded.

### 10.4 Lost or Damaged Permits

Applicants shall be able to request replacement through their account without completing an entirely new application.

Replacement shall not automatically reset permit validity.

The final replacement procedure and ownership-transfer policy remain subject to the relevant authority's policy.

### 10.5 Amendments

Issued permit records shall not be directly edited.

Corrections shall follow a controlled amendment process with authorisation and audit history.

---

## 11. Police Web Dashboard

The police dashboard shall provide role-based access to:

- Application management.
- Document review.
- Approval and rejection.
- Additional-information requests.
- Payment verification records.
- Permit issuance.
- Permit lifecycle management.
- Staff management.
- Management reporting.
- Audit logs.

Users shall only access functions permitted by their assigned roles.

Sensitive applicant documents shall be restricted to authorised personnel.

---

## 12. Police Mobile Application

The mobile application shall support Android and iOS.

Its main functions shall include:

- Secure staff login.
- A home screen with a prominent Scan QR Code option.
- QR scanning.
- Permit verification results.
- Manual vehicle and Permit ID search.
- Suspected forged permit reporting.
- Personal verification history.
- Limited offline verification.

The camera shall not automatically open immediately after login.

GPS recording may be optional and shall depend on the applicable policy.

Scanning must remain available when GPS permission is disabled.

---

## 13. Notifications

Email shall be the initial notification channel.

Notifications shall include:

- Account verification.
- Application submission confirmation.
- Additional-information requests.
- Application approval.
- Application rejection.
- Payment instructions.
- Payment deadline reminders where configured.
- Payment extension decisions.
- Permit issuance and collection instructions.

SMS support may be introduced in a future version.

---

## 14. Reports and Management Dashboard

The system shall support the following reporting categories:

1. Applications received, approved and rejected.
2. Permits issued, expired and revoked.
3. Payment and issuance status records.
4. Suspected forged permit reports.
5. Police officer activity.
6. QR verification activity.

Reports shall support PDF export.

The management dashboard shall present relevant statistics and summaries.

All demonstration figures must be fictional.

---

## 15. Security Requirements

The system shall implement:

- Individual staff accounts; shared staff accounts are prohibited.
- Strong password requirements.
- Two-factor authentication.
- Automatic session logout after inactivity.
- Protection against repeated failed login attempts.
- Role-based access control.
- Secure communication using HTTPS.
- Encryption of sensitive information in transit and at rest.
- Secure document storage.
- Audit logging of important actions.
- Protection of audit records against unauthorised modification or deletion.

Important actions requiring audit records include:

- Staff account and permission changes.
- Application approval and rejection.
- Payment verification.
- Permit issuance.
- Permit revocation.
- Permit amendments.
- Sensitive record access.

Senior administrators shall create staff accounts and assign roles.

Police staff shall not be allowed to register themselves as administrators.

Technical administration and operational approval authority should remain appropriately separated.

---

## 16. Privacy and Data Protection

The system shall:

- Restrict applicants to their own application records.
- Restrict traffic officers to the minimum information needed for verification.
- Restrict sensitive documents to authorised staff.
- Log access to sensitive records.
- Encrypt sensitive information.
- Display a privacy notice before application submission.
- Record the accepted privacy notice version and acceptance timestamp.

The privacy notice shall explain:

- Information collected.
- Purpose of collection.
- Authorised access.
- Data protection measures.
- Retention arrangements.
- Correction procedures.

Official retention periods and deletion policies remain to be determined.

---

## 17. Non-Functional Requirements

### 17.1 Usability
The public website and police applications shall provide clear navigation, understandable instructions and useful error messages.

### 17.2 Performance
The system should respond efficiently to normal application, dashboard and verification requests.

### 17.3 Availability
The public website and police dashboard shall require internet connectivity.

The police mobile application shall support online operation with limited offline functionality.

### 17.4 Compatibility
The public website shall be responsive on desktop computers, tablets and mobile devices.

The police mobile application shall support Android and iOS.

### 17.5 Language
English shall be the initial language.

Additional Gambian languages may be considered in future versions.

### 17.6 Reliability
The system shall support daily backups, recovery procedures, monitoring and protection against unauthorised access.

### 17.7 Scalability
The architecture shall allow future expansion to additional permit categories and increased application volumes.

---

## 18. Deployment Requirements

The initial prototype is intended for secure cloud hosting.

A future government deployment may use infrastructure selected by the relevant authority.

The system shall be designed with:

- Secure environment configuration.
- Database backups.
- Recovery procedures.
- Monitoring.
- Security testing.
- Controlled access to production environments.

No real government or applicant data shall be used in the demonstration prototype.

---

## 19. Prototype Demonstration Requirements

The completed prototype shall demonstrate the following end-to-end scenarios:

1. A fictional applicant registers.
2. The applicant submits a fictional vehicle tint permit application.
3. The applicant uploads supporting documents.
4. A reviewer examines the application.
5. The reviewer requests missing information.
6. The applicant updates the same application.
7. The reviewer recommends a decision.
8. A separate approving officer approves or rejects the application.
9. A payment verification officer records physical payment verification.
10. An issuing officer issues a demonstration permit.
11. The system generates a unique Permit ID and QR code.
12. A traffic officer scans the QR code using the mobile application.
13. An officer performs manual vehicle or Permit ID searches.
14. An officer reports a suspected forged permit.
15. An authorised officer revokes a demonstration permit.
16. Verification displays the revoked status.
17. The system demonstrates expiry, renewal and replacement scenarios.
18. Management views reports and audit records.
19. Role restrictions and security controls are demonstrated.
20. Limited offline verification is demonstrated.

All scenarios shall use fictional data and clearly identified demonstration permits.

---

## 20. Items Requiring Future Policy Decisions

The following matters must not be hardcoded as official policy without confirmation:

- Official permit fees.
- Permit validity duration.
- Payment deadline duration.
- Document retention periods.
- Replacement procedures.
- Ownership-transfer procedures.
- Final document requirements.
- Official payment and collection procedures.
- Final hosting and government infrastructure decisions.
- GPS recording policy.
- Additional permit categories.

These values shall be configurable where appropriate.

---

## 21. Acceptance Criteria

The prototype shall be considered ready for demonstration when:

- Applicants can register and submit applications.
- Applicants can upload and manage required documents.
- Reviewers can examine applications and request additional information.
- Approving officers can independently approve or reject applications.
- Payment verification can be recorded manually.
- Issuing officers can issue demonstration permits.
- Every demonstration permit has a unique ID and QR code.
- Traffic officers can verify permits through the mobile application.
- Manual searches work.
- Expired and revoked statuses are correctly displayed.
- Role-based restrictions are enforced.
- Audit records are generated for important actions.
- Management reports can be generated and exported.
- The main workflow works across the public website, backend, dashboard and mobile application.

---

**End of Document**

**Document status:** Version 1.0 Draft — Subject to developer review and refinement.

**Important:** TintVerify-Gambia is an independent prototype, not an officially approved or operational Gambia Police Force system.
