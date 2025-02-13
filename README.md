# PassIT - Secure Password Manager

<div align="center">
  <img src="assets/passit-logo.png" alt="PassIT Logo" width="200"/>
  <p>A modern, secure, and user-friendly password manager built with web technologies.</p>
</div>

## 🔐 Features

- **Passcode Protection**:
  - 4-digit PIN security
  - Secure hashing with SHA-256
  - Maximum attempt limits
  - Auto-focus input fields
  - Reset functionality

- **Password Generation**: Create strong, customizable passwords
  - Adjustable length (4-50 characters)
  - Include/exclude uppercase letters
  - Include/exclude numbers
  - Include/exclude special symbols

- **Local Storage**: 
  - Securely store passwords in browser's local storage
  - View and manage saved passwords
  - Quick copy functionality
  - Password visibility toggle

- **Data Security**:
  - PIN protection for app access
  - Optional AES encryption for stored passwords
  - No server-side storage (complete privacy)
  - Secure password handling

- **Export/Import**:
  - Export passwords in multiple formats:
    - Excel (.xlsx)
    - PDF
    - JSON
  - Import passwords from JSON backups

## 🛠️ Technologies Used

- **Frontend**:
  - HTML5
  - Tailwind CSS (for styling)
  - JavaScript (Vanilla)

- **Libraries**:
  - CryptoJS (for encryption and hashing)
  - SheetJS (for Excel export)
  - jsPDF (for PDF export)
  - Alpine.js (for UI interactions)

## 💻 Usage

1. **First Time Setup**:
   - Create a 4-digit PIN for app access
   - PIN will be required for future access
   - Maximum 3 attempts before reset required

2. **Generate Password**:
   - Set desired password length
   - Toggle character types (uppercase, numbers, symbols)
   - Click "Generate Password"

3. **Save Password**:
   - Enter the website/service name
   - Generate or enter password
   - Click save button

4. **Manage Passwords**:
   - View all saved passwords
   - Copy passwords with one click
   - Show/hide password content
   - Delete unwanted entries

5. **Backup Data**:
   - Export passwords in preferred format
   - Import previously exported passwords
   - Enable encryption for additional security

## ⚠️ Important Notes

- Passwords are stored locally in your browser
- Clearing browser data will delete saved passwords and PIN
- Regular backups are recommended (use export feature)
- Passwords are not synced between devices
- Forgetting your PIN requires a complete reset

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/codebygreenlight/passit.git
   ```

2. Open `index.html` in your browser

3. Set up your access PIN and start managing your passwords securely!

## 🔒 Privacy

PassIT prioritizes your privacy:
- No data leaves your device
- No analytics or tracking
- No external servers
- Complete offline functionality
- PIN-protected access

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developed By

Created with ❤️ by [DevOlawale](https://x.com/devolawale)

---

<div align="center">
  <sub>Built with security and simplicity in mind.</sub>
</div> 