# 📮 Email OTP API - Postman Testing Guide

## 🔧 Base Configuration

**Base URL:** `http://localhost:3000`

**Server Status:** MongoDB-connected OTP service

---

## 📋 API Endpoints

### 1️⃣ Health Check

**Purpose:** Verify server is running

**Method:** `GET`

**URL:** `http://localhost:3000/`

**Headers:** None required

**Body:** None

**Expected Response:**
```
OTP api running
```

---

### 2️⃣ Send OTP

**Purpose:** Send OTP to user's email

**Method:** `POST`

**URL:** `http://localhost:3000/api/auth/send-otp`

**Headers:**
```json
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

**Error Response (400):**
```json
{
  "message": "Email required"
}
```

**Error Response (500):**
```json
{
  "message": "Server error"
}
```

---

### 3️⃣ Verify OTP

**Purpose:** Verify the OTP code sent to email

**Method:** `POST`

**URL:** `http://localhost:3000/api/auth/verify-otp`

**Headers:**
```json
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "OTP verified successfully"
}
```

**Error Response (400) - Missing Fields:**
```json
{
  "message": "Email & OTP required"
}
```

**Error Response (400) - Invalid/Expired OTP:**
```json
{
  "success": false,
  "message": "Invalid or expired OTP"
}
```

**Error Response (500):**
```json
{
  "message": "Server error"
}
```

---

### 3️⃣ Verify OTP

**Purpose:** Verify the OTP code sent to email

**Method:** `POST`

**URL:** `http://localhost:3000/api/auth/verify-otp`

**Headers:**
```json
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "OTP verified successfully"
}
```

**Error Response (400) - Missing Fields:**
```json
{
  "message": "Email & OTP required"
}
```

**Error Response (400) - Invalid/Expired OTP:**
```json
{
  "success": false,
  "message": "Invalid or expired OTP"
}
```

**Error Response (500):**
```json
{
  "message": "Server error"
}
```

---

### 4️⃣ Send Bill PDF via Email 🆕

**Purpose:** Send garage service bill PDF to customer via email with thank you message

**Method:** `POST`

**URL:** `http://localhost:3000/api/bills/send-bill`

**Content-Type:** `multipart/form-data`

**Form Fields:**
- `pdfFile` (File, Required): The bill PDF file
- `customerEmail` (String, Required): Customer's email address
- `customerName` (String, Required): Customer's name
- `billNumber` (String, Optional): Bill/Invoice number (e.g., "GRG-001")
- `totalAmount` (Number, Optional): Total bill amount in dollars

**Success Response (200):**
```json
{
  "success": true,
  "message": "Bill sent successfully to customer@example.com"
}
```

**Error Response (400) - No File:**
```json
{
  "success": false,
  "message": "PDF file is required"
}
```

**Error Response (400) - Missing Fields:**
```json
{
  "success": false,
  "message": "customerEmail and customerName are required"
}
```

**Error Response (400) - Invalid File Type:**
```json
{
  "success": false,
  "message": "Only PDF files are allowed"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "message": "Failed to send bill email",
  "error": "Error details"
}
```

**Email Features:**
- ✅ Professional HTML email template
- ✅ Personalized thank you message
- ✅ Service completion notification
- ✅ PDF bill attached
- ✅ Bill number and total amount displayed (if provided)



## 🧪 Postman Testing Steps

### Method 1: Manual Testing

#### Step 1: Test Health Check
1. Create a new request in Postman
2. Set method to `GET`
3. Enter URL: `http://localhost:3000/`
4. Click **Send**
5. You should see: `OTP api running`

#### Step 2: Test Send OTP
1. Create a new request
2. Set method to `POST`
3. Enter URL: `http://localhost:3000/api/auth/send-otp`
4. Go to **Headers** tab
5. Add: `Content-Type: application/json`
6. Go to **Body** tab
7. Select **raw** and **JSON**
8. Enter:
   ```json
   {
     "email": "your-email@gmail.com"
   }
   ```
9. Click **Send**
10. Check your email for the OTP code

#### Step 3: Test Verify OTP
1. Create a new request
2. Set method to `POST`
3. Enter URL: `http://localhost:3000/api/auth/verify-otp`
4. Go to **Headers** tab
5. Add: `Content-Type: application/json`
6. Go to **Body** tab
7. Select **raw** and **JSON**
8. Enter (use the OTP you received):
   ```json
   {
     "email": "your-email@gmail.com",
     "otp": "123456"
   }
   ```
9. Click **Send**
10. You should see success message

#### Step 4: Test Send Bill PDF 🆕
1. Create a new request
2. Set method to `POST`
3. Enter URL: `http://localhost:3000/api/bills/send-bill`
4. Go to **Body** tab
5. Select **form-data** (NOT raw or JSON)
6. Add the following fields:
   - Key: `pdfFile`, Type: **File**, Value: [Select your PDF file]
   - Key: `customerEmail`, Type: **Text**, Value: `customer@example.com`
   - Key: `customerName`, Type: **Text**, Value: `John Doe`
   - Key: `billNumber`, Type: **Text**, Value: `GRG-001` (optional)
   - Key: `totalAmount`, Type: **Text**, Value: `220` (optional)
7. Click **Send**
8. Check the customer's email for the bill with thank you message

---

## 🔗 Quick Copy URLs

```
Health Check:
http://localhost:3000/

Send OTP:
http://localhost:3000/api/auth/send-otp

Verify OTP:
http://localhost:3000/api/auth/verify-otp

Send Bill PDF:
http://localhost:3000/api/bills/send-bill
```

---

## 📝 Sample Test Cases

### Test Case 1: Valid OTP Flow
```
1. POST /api/auth/send-otp
   Body: { "email": "test@example.com" }
   Expected: 200 OK, email sent

2. Check email inbox for OTP

3. POST /api/auth/verify-otp
   Body: { "email": "test@example.com", "otp": "received_otp" }
   Expected: 200 OK, verification success
```

### Test Case 2: Missing Email
```
POST /api/auth/send-otp
Body: {}
Expected: 400 Bad Request, "Email required"
```

### Test Case 3: Missing OTP
```
POST /api/auth/verify-otp
Body: { "email": "test@example.com" }
Expected: 400 Bad Request, "Email & OTP required"
```

### Test Case 4: Wrong OTP
```
POST /api/auth/verify-otp
Body: { "email": "test@example.com", "otp": "000000" }
Expected: 400 Bad Request, "Invalid or expired OTP"
```

### Test Case 5: Expired OTP
```
1. Send OTP
2. Wait for expiration time (default: 5 minutes)
3. Try to verify
Expected: 400 Bad Request, "Invalid or expired OTP"
```

---

## ⚙️ Environment Variables

Make sure your `.env` file has:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
OTP_EXPIRE_MIN=5
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

---

## 🐛 Common Issues

### Issue: Routes not working (404)
**Problem:** The auth routes are not imported in `server.js`

**Solution:** Add this to `server.js`:
```javascript
import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);
```

### Issue: Email not sending
**Problem:** Invalid email credentials or app password

**Solution:** 
- Use Gmail app password (not regular password)
- Enable 2FA on Gmail account
- Generate app-specific password

### Issue: MongoDB connection error
**Problem:** Invalid MONGO_URI or network issue

**Solution:**
- Check `.env` file has correct MongoDB URI
- Ensure MongoDB Atlas allows your IP
- Test connection string separately

---

## 📦 Postman Collection (Import This)

```json
{
  "info": {
    "name": "Email OTP API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/"
      }
    },
    {
      "name": "Send OTP",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"user@example.com\"\n}"
        },
        "url": "http://localhost:3000/api/auth/send-otp"
      }
    },
    {
      "name": "Verify OTP",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"user@example.com\",\n  \"otp\": \"123456\"\n}"
        },
        "url": "http://localhost:3000/api/auth/verify-otp"
      }
    }
  ]
}
```

---

## 🎯 Pro Tips

1. **Save as Collection:** Save these requests as a Postman collection for easy reuse
2. **Use Variables:** Set `{{baseUrl}}` environment variable to `http://localhost:3000`
3. **Test Scripts:** Add Postman test scripts to automate validation
4. **Pre-request Scripts:** Generate random emails for testing
5. **Monitor:** Use Postman monitoring for continuous testing

---

**✅ Server Running:** Make sure `npm run dev` is running before testing!
