# TikTok Ads Creative Flow – Frontend Assignment

## Project Overview

This project is a **single-page React application** that simulates a **TikTok Ads creative setup flow**.

The purpose of this assignment is **not UI design or backend completeness**, but to demonstrate how a frontend engineer handles:

- OAuth-style authentication
- Conditional business logic
- Form validation
- API integration
- Real-world error handling
- Clear and user-friendly error communication

The application allows a user to:

1. Connect a TikTok Ads account (using a mocked OAuth flow)
2. Create a minimal ad with creative details
3. Submit the ad and handle realistic API errors gracefully

---

## High-Level Project Flow

1. App loads and checks for an access token
2. If no token exists → show **Connect TikTok Ads Account**
3. After authentication → show **Ad Creation Form**
4. User fills ad details and selects a music option
5. Frontend validation runs
6. If validation passes → API is called
7. API responds with success or error
8. UI shows success or a clear, actionable error message

---

## Project Folder Structure

```bash
├── README.md
├── src/
│   ├── api/
│   │   └── tiktokAds.js
│   ├── components/
│   │   ├── AdForm.jsx
│   │   ├── MusicSelector.jsx
│   │   ├── OAuthConnect.jsx
│   │   └── GlobalErrorBanner.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── utils/
│   │   └── errorMapper.js
├── App.jsx
├── main.jsx
├── index.css
```

## How to Run the Project

### Prerequisites

- Node.js (v16 or above recommended)
- npm

### Steps

```bash
npm install
npm run dev
```

---

## OAuth Setup Steps (Mocked)

> Note: TikTok Ads OAuth is geo-restricted and backend services are out of scope for this assignment.  
> To handle this, a **mock OAuth flow** is implemented while preserving real-world behavior.

### Step 1: Initial State (Unauthenticated)

- On app load, the application checks `localStorage` for an access token
- If no token is found, the user is considered unauthenticated
- The UI shows a **“Connect TikTok Ads Account”** button

---

### Step 2: User Initiates OAuth

- The user clicks **“Connect TikTok Ads Account”**
- Instead of redirecting to TikTok OAuth (blocked by geo restrictions), the app simulates a successful OAuth login

---

### Step 3: Token Generation

- A mock access token is generated in the frontend
- This simulates the result of a successful OAuth authorization code exchange

Example:

```text
mock_access_token_1712345678
```

### Step 4: Token Storage

- The generated token is stored in localStorage.
- Authentication state is updated globally using AuthContext.

This mirrors how a real OAuth access token would be stored and shared across the app.

### Step 5: Authenticated State

- Once the token is stored -> The app re-renders.
- The Ad Creation Form becomes accessible.
- All ad submission requests require a valid token

---

## Mock OAuth Flow

1. On app load, the application checks localStorage for an access token
2. If no token exists, the user sees a “Connect TikTok Ads Account” button
3. Clicking the button:

- Simulates a successful OAuth login
- Generates a mock access token
- Stores the token in localStorage

4. Authentication state updates globally
5. The UI transitions to the Ad Creation Form
6. All API calls require this token
7. If the token is invalid or expired, the user is logged out and asked to reconnect

---

## Final Notes

It demonstrates how a frontend engineer would:

- Gate functionality behind authentication
- Enforce business rules consistently
- Handle API failures gracefully
- Communicate errors clearly to users

---
