# Node.js API Starter Package with Advanced Login and Specific Data

## 📌 Hakkında (About)
Bu proje, gelişmiş kimlik doğrulama yöntemleri ve kullanıcıya özgü veri yönetimi içeren bir **Node.js API Starter Package**’dır. Kullanıcı kimlik doğrulaması, JWT token yönetimi, OTP ile giriş ve e-posta doğrulama gibi güvenlik özelliklerini barındırır.

## 🚀 Özellikler (Features)
- **Gelişmiş Kimlik Doğrulama (Advanced Authentication)**
  - **JWT Token** ile kimlik doğrulama ve süreli oturum yönetimi
  - **OTP (Tek Kullanımlık Şifre)** ile e-posta üzerinden hızlı giriş
  - **Şifre sıfırlama ve doğrulama (Reset Password & Verification)**
  
- **Kullanıcı Yönetimi (User Management)**
  - Kullanıcı kaydı (Register)
  - Kullanıcı girişi (Login)
  - Kullanıcı profilini getirme ve güncelleme (Get & Update User Profile)
  
- **Dosya Yükleme (File Upload)**
  - Middleware kullanılarak dosya yükleme desteği (Upload Middleware)

- **Mail Servisi (Mail Service)**
  - OTP gönderimi ve şifre sıfırlama kodları için e-posta desteği

## 🔧 .env Değişkenleri (Environment Variables)
Projede kullanılan `.env` dosyasında aşağıdaki değişkenler yer almalıdır:

- **PORT:** API sunucusunun çalışacağı port numarası.
- **GMAIL_USER:** SMTP e-posta servisi için kullanılan hesap.
- **GMAIL_APP_PASSWORD:** SMTP bağlantısı için gerekli olan uygulama şifresi.
- **MONGO_URI:** MongoDB veritabanı bağlantı adresi.
- **JWT_SECRET_KEY:** Kullanıcı oturumları için kullanılan güvenlik anahtarı.
- **JWT_EXPIRES_IN:** JWT token süresinin ayarlanması.
- **JWT_TEMPORARY_KEY:** OTP giriş işlemlerinde kullanılan geçici JWT anahtarı.
- **JWT_TEMPORARY_EXPIRES_IN:** OTP token geçerlilik süresi.

## 📌 API Yolları (API Routes)

### **🔑 Kimlik Doğrulama (Authentication)**
| Yol | Metot | Açıklama |
|------|--------|-------------|
| `/auth/login` | POST | Kullanıcı girişi |
| `/auth/register` | POST | Kullanıcı kaydı |
| `/auth/forget-password` | POST | Şifre sıfırlama isteği |
| `/auth/reset-code-check` | POST | Şifre sıfırlama kodu doğrulama |
| `/auth/reset-password` | POST | Yeni şifre belirleme |
| `/auth/send-login-code` | POST | OTP giriş kodu gönderme |
| `/auth/verify-login-code` | POST | OTP giriş kodunu doğrulama |

### **👤 Kullanıcı İşlemleri (User Management)**
| Yol | Metot | Açıklama |
|------|--------|-------------|
| `/profile` | GET | Kullanıcı profil bilgilerini getir |
| `/profile-update` | PUT | Kullanıcı profilini güncelle |

### **📂 Dosya Yükleme (File Upload)**
| Yol | Metot | Açıklama |
|------|--------|-------------|
| `/upload` | POST | Dosya yükleme işlemi |

---

## 🌍 English Version

### About
This project is a **Node.js API Starter Package** that includes advanced authentication methods and user-specific data management. It features JWT authentication, OTP login via email, and various security enhancements.

### Features
- **Advanced Authentication**
  - JWT-based authentication and session management
  - OTP-based login via email
  - Password reset and verification
  
- **User Management**
  - User registration and login
  - Retrieve and update user profiles

- **File Upload Support**
  - Upload middleware for handling file uploads

- **Mail Service**
  - OTP verification and password reset emails

### `.env` Variables
The project requires an `.env` file with the following variables:

- **PORT:** API server port.
- **GMAIL_USER:** SMTP email account.
- **GMAIL_APP_PASSWORD:** SMTP application password.
- **MONGO_URI:** MongoDB connection string.
- **JWT_SECRET_KEY:** Security key for JWT authentication.
- **JWT_EXPIRES_IN:** JWT expiration time.
- **JWT_TEMPORARY_KEY:** Temporary JWT key for OTP login.
- **JWT_TEMPORARY_EXPIRES_IN:** Temporary JWT token expiration time.

### API Routes

#### **🔑 Authentication**
| Route | Method | Description |
|------|--------|-------------|
| `/auth/login` | POST | User login |
| `/auth/register` | POST | User registration |
| `/auth/forget-password` | POST | Request password reset |
| `/auth/reset-code-check` | POST | Verify reset code |
| `/auth/reset-password` | POST | Set a new password |
| `/auth/send-login-code` | POST | Send OTP login code |
| `/auth/verify-login-code` | POST | Verify OTP login code |

#### **👤 User Management**
| Route | Method | Description |
|------|--------|-------------|
| `/profile` | GET | Fetch user profile |
| `/profile-update` | PUT | Update user profile |

#### **📂 File Upload**
| Route | Method | Description |
|------|--------|-------------|
| `/upload` | POST | Upload files |

---

