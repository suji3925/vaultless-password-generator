# 🔐 Vaultless: Deterministic Password Generator

A privacy-focused password generator that eliminates the need for storing passwords.  
Instead of saving passwords in a database, this system generates strong, unique passwords every time using a master key and contextual inputs.

---

## 🚀 Problem & Approach

Most password managers (like browser storage or vault-based tools) store passwords in a central location.

**Problem:**
If that storage is compromised, all user accounts are at risk.

**My Approach:**
This project avoids storage completely.  
It uses a deterministic method to generate passwords on demand.

👉 No storage  
👉 No database  
👉 Nothing to leak  

---

## 🛠️ Core Features

### 🔹 1. SHA-256 Based Generation
The system uses SHA-256 hashing to convert user inputs into a secure and unique password.

- One-way transformation  
- Cannot be reversed  
- Produces consistent results for the same input  

---

### 🔹 2. Key Stretching (1000 Iterations)
To improve security against brute-force attacks:

- The hashing process runs 1000 times  
- Increases computational effort for attackers  
- Keeps generation fast for normal users  

---

### 🔹 3. Unique Password per Platform
Passwords are generated using:

- Master Password  
- Website/App Name  
- Secret Hint  

Example:
Master + Gmail → Password A
Master + Instagram → Password BThis ensures:
- No password reuse  
- Better protection against credential stuffing  

---

### 🔹 4. Strength & Crack-Time Indicator
The system evaluates password strength using pattern checks and randomness.

It provides:
- Strength level (Weak / Medium / Strong)  
- Estimated crack time  

---

## 💻 Tech Stack

- **Language:** JavaScript (ES6)
- **Cryptography:** Web Crypto API (`crypto.subtle`)
- **UI:** HTML + CSS (Flexbox, Dark Theme)
- **Architecture:** Fully client-side (no backend)

---

## 📖 How to Use

1. Enter your **Master Password**  
2. Enter the **Website/App Name**  
3. Add a **Secret Hint** (optional but recommended)  
4. Click **Generate Password**  
5. Copy and use it during account registration  

> ⚠️ Important:  
> If you forget your master password, the generated passwords cannot be recovered.

---

## 🎓 Key Concepts Demonstrated

- **Stateless System:** No data is stored anywhere  
- **Deterministic Logic:** Same input always produces the same output  
- **Avalanche Effect:** Small input changes produce completely different passwords  
- **Client-Side Processing:** Data never leaves the user's device  

---

## 🛡️ Note

This is an educational cybersecurity project designed to demonstrate how password generation can be handled without storing sensitive data.

---

## 💡 Why this project?

I built this to explore a different approach to password management — one that focuses on privacy, simplicity, and eliminating single points of failure.

---