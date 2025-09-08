# 🔒 CivicTrust Security Guidelines

## 📦 Supported Releases

We actively maintain and secure the latest version of **CivicTrust** available on the `main` branch. Older versions are no longer supported and will not receive security patches.

| Version    | Security Updates |
|------------|-----------------|
| main       | ✅ Actively maintained |
| previous   | ❌ No longer supported |

We strongly recommend using the latest version to ensure you benefit from all fixes and enhancements.

---

## 📢 How to Report a Security Issue

If you identify a potential security flaw or vulnerability within CivicTrust, **please do not open a public issue**.

Instead, share it privately by contacting the project maintainer through email.

When reporting, please provide:
- A clear explanation of the issue
- Steps or scenarios to reproduce it
- Any recommended patches or mitigation strategies

⏱ We strive to respond to reports within **3 business days** and address them within **14 days**, based on the severity and complexity of the issue.

---

## ⚙️ Areas Covered by This Policy

CivicTrust handles sensitive information and processes that require protection. The following components are considered in-scope:

- User authentication and session management
- Authorization and access control for different roles
- Upload, storage, and retrieval of user data, including personally identifiable information (PII)
- File uploads, such as images or documents
- Communication through WebSockets and APIs

### Common security concerns:
✔ Authentication bypass or token misuse  
✔ Cross-site scripting (XSS) vulnerabilities  
✔ Injection attacks (e.g., NoSQL or other forms)  
✔ Server-side request manipulations  
✔ Unintended data exposure in logs or API responses

Please ensure that your testing is ethical and responsible. Avoid:
❌ Denial of Service (DoS) attacks  
❌ Phishing, social engineering, or impersonation  
❌ Aggressive scanning on production environments

---

## 📦 Dependencies and Libraries

CivicTrust uses third-party tools and libraries to enhance its functionality. Examples include:

- **Express.js / Node.js** – Web server and API handling  
- **MongoDB** – Data storage  
- **Cloudinary / Multer** – File upload services  
- **Tailwind CSS, Framer Motion** – UI enhancements

We recommend regularly reviewing and updating these dependencies by running:
```bash
npm audit fix
