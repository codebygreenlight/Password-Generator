function generatePassword() {
    const length = document.getElementById('lengthInput').value;
    const includeUppercase = document.getElementById('uppercaseCheck').checked;
    const includeNumbers = document.getElementById('numbersCheck').checked;
    const includeSymbols = document.getElementById('symbolsCheck').checked;

    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = lowercase;
    if (includeUppercase) chars += uppercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    const outputElement = document.getElementById('passwordOutput');
    outputElement.value = password;
    
    // Add fade-in animation
    outputElement.classList.remove('fade-in');
    void outputElement.offsetWidth; // Trigger reflow
    outputElement.classList.add('fade-in');
}

function copyToClipboard() {
    const passwordOutput = document.getElementById('passwordOutput');
    passwordOutput.select();
    document.execCommand('copy');
    
    // Show a brief "Copied!" message with animation
    const originalValue = passwordOutput.value;
    passwordOutput.classList.remove('fade-in');
    void passwordOutput.offsetWidth; // Trigger reflow
    passwordOutput.value = '✓ Copied!';
    passwordOutput.classList.add('fade-in');
    
    setTimeout(() => {
        passwordOutput.classList.remove('fade-in');
        void passwordOutput.offsetWidth; // Trigger reflow
        passwordOutput.value = originalValue;
        passwordOutput.classList.add('fade-in');
    }, 1000);
}

function savePassword() {
    const website = document.getElementById('websiteInput').value.trim();
    const password = document.getElementById('passwordOutput').value;
    
    if (!website || !password) {
        alert('Please enter both website and generate a password');
        return;
    }

    // Get existing passwords or initialize empty array
    const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords') || '[]');
    
    // Add new password with timestamp
    const newPassword = {
        id: Date.now(),
        website,
        password,
        date: new Date().toLocaleDateString()
    };
    
    savedPasswords.push(newPassword);
    localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));
    
    // Show success message
    const websiteInput = document.getElementById('websiteInput');
    const originalValue = websiteInput.value;
    websiteInput.value = '✓ Saved!';
    websiteInput.classList.add('text-green-600');
    
    setTimeout(() => {
        websiteInput.value = originalValue;
        websiteInput.classList.remove('text-green-600');
    }, 1000);

    // Refresh the displayed passwords
    displaySavedPasswords();
}

function displaySavedPasswords() {
    const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords') || '[]');
    const container = document.getElementById('savedPasswords');
    
    if (savedPasswords.length === 0) {
        container.innerHTML = `
            <div class="text-gray-500 text-center py-4">
                No saved passwords yet
            </div>
        `;
        return;
    }

    container.innerHTML = savedPasswords
        .sort((a, b) => b.id - a.id)
        .map(entry => `
            <div class="bg-gray-900/30 p-4 rounded-lg transition-all hover:bg-gray-900/50 group">
                <div class="flex items-center justify-between mb-2">
                    <span class="font-medium text-gray-300">${escapeHtml(entry.website)}</span>
                    <span class="text-sm text-gray-500">${entry.date}</span>
                </div>
                <div class="flex items-center justify-between">
                    <input type="password" value="${escapeHtml(entry.password)}" 
                        class="bg-transparent border-none outline-none text-gray-300 font-mono" 
                        readonly>
                    <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onclick="togglePasswordVisibility(this)" 
                            class="p-1 text-gray-400 hover:text-purple-400 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                        <button onclick="copyPasswordFromList(this)" 
                            class="p-1 text-gray-400 hover:text-purple-400 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                        </button>
                        <button onclick="deletePassword(${entry.id})" 
                            class="p-1 text-gray-400 hover:text-red-400 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `)
        .join('');
}

function togglePasswordVisibility(button) {
    const input = button.parentElement.parentElement.querySelector('input');
    input.type = input.type === 'password' ? 'text' : 'password';
}

function copyPasswordFromList(button) {
    const input = button.parentElement.parentElement.querySelector('input');
    input.type = 'text';
    input.select();
    document.execCommand('copy');
    input.type = 'password';

    // Show feedback
    const originalHTML = button.innerHTML;
    button.innerHTML = `
        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
    `;
    setTimeout(() => {
        button.innerHTML = originalHTML;
    }, 1000);
}

function deletePassword(id) {
    if (!confirm('Are you sure you want to delete this password?')) return;
    
    const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords') || '[]');
    const updatedPasswords = savedPasswords.filter(entry => entry.id !== id);
    localStorage.setItem('savedPasswords', JSON.stringify(updatedPasswords));
    
    displaySavedPasswords();
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Generate an initial password when the page loads
window.addEventListener('load', () => {
    generatePassword();
    displaySavedPasswords();
    setupExportDropdown();
});

// Encryption key management
let encryptionEnabled = false;
let encryptionKey = localStorage.getItem('encryptionKey');

function toggleEncryption() {
    if (!encryptionEnabled && !encryptionKey) {
        // Generate a new encryption key if none exists
        encryptionKey = CryptoJS.lib.WordArray.random(256/8).toString();
        localStorage.setItem('encryptionKey', encryptionKey);
    }
    
    encryptionEnabled = !encryptionEnabled;
    const statusElement = document.getElementById('encryptionText');
    statusElement.textContent = encryptionEnabled ? 'Encryption On' : 'Encryption Off';
    
    // Re-save all passwords with/without encryption
    const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords') || '[]');
    savePasswordsToStorage(savedPasswords);
}

function encryptData(data) {
    if (!encryptionEnabled) return data;
    return CryptoJS.AES.encrypt(data, encryptionKey).toString();
}

function decryptData(data) {
    if (!encryptionEnabled) return data;
    try {
        const bytes = CryptoJS.AES.decrypt(data, encryptionKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (e) {
        console.error('Decryption failed:', e);
        return data;
    }
}

// Export/Import functionality
function exportPasswords(format = 'json') {
    const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords') || '[]');
    const date = new Date().toISOString().split('T')[0];
    
    switch (format) {
        case 'xlsx':
            exportToExcel(savedPasswords, date);
            break;
        case 'pdf':
            exportToPDF(savedPasswords, date);
            break;
        case 'json':
            exportToJSON(savedPasswords, date);
            break;
    }
}

function exportToExcel(passwords, date) {
    // Prepare data for Excel
    const data = passwords.map(entry => ({
        Website: entry.website,
        Password: entry.password,
        'Date Added': entry.date
    }));
    
    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Passwords");
    
    // Save file
    XLSX.writeFile(wb, `passwords_${date}.xlsx`);
}

function exportToPDF(passwords, date) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text("Saved Passwords", 14, 15);
    doc.setFontSize(10);
    doc.text(`Exported on ${date}`, 14, 25);
    
    // Prepare data for table
    const tableData = passwords.map(entry => [
        entry.website,
        entry.password,
        entry.date
    ]);
    
    // Add table
    doc.autoTable({
        startY: 30,
        head: [['Website', 'Password', 'Date Added']],
        body: tableData,
        theme: 'grid',
        styles: {
            fontSize: 8,
            cellPadding: 2,
        },
        headStyles: {
            fillColor: [102, 16, 242], // Purple color
            textColor: 255,
            fontSize: 9,
            fontStyle: 'bold',
        },
        alternateRowStyles: {
            fillColor: [245, 245, 245],
        },
    });
    
    // Save file
    doc.save(`passwords_${date}.pdf`);
}

function exportToJSON(passwords, date) {
    const dataStr = JSON.stringify(passwords, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `passwords_${date}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function importPasswords(input) {
    const file = input.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedPasswords = JSON.parse(e.target.result);
            const existingPasswords = JSON.parse(localStorage.getItem('savedPasswords') || '[]');
            
            // Merge passwords, avoiding duplicates
            const mergedPasswords = [...existingPasswords];
            importedPasswords.forEach(imported => {
                if (!mergedPasswords.some(existing => existing.id === imported.id)) {
                    mergedPasswords.push(imported);
                }
            });
            
            localStorage.setItem('savedPasswords', JSON.stringify(mergedPasswords));
            displaySavedPasswords();
            alert('Passwords imported successfully!');
        } catch (error) {
            alert('Error importing passwords. Please check the file format.');
        }
    };
    reader.readAsText(file);
}

// Update the existing savePassword function to use encryption
function savePasswordsToStorage(passwords) {
    if (encryptionEnabled) {
        passwords = passwords.map(entry => ({
            ...entry,
            password: encryptData(entry.password)
        }));
    }
    localStorage.setItem('savedPasswords', JSON.stringify(passwords));
}

// Update the existing displaySavedPasswords function to handle decryption
function displaySavedPasswords() {
    let savedPasswords = JSON.parse(localStorage.getItem('savedPasswords') || '[]');
    
    if (encryptionEnabled) {
        savedPasswords = savedPasswords.map(entry => ({
            ...entry,
            password: decryptData(entry.password)
        }));
    }
    
    const container = document.getElementById('savedPasswords');
    
    if (savedPasswords.length === 0) {
        container.innerHTML = `
            <div class="text-gray-500 text-center py-4">
                No saved passwords yet
            </div>
        `;
        return;
    }

    container.innerHTML = savedPasswords
        .sort((a, b) => b.id - a.id)
        .map(entry => `
            <div class="bg-gray-900/30 p-4 rounded-lg transition-all hover:bg-gray-900/50 group">
                <div class="flex items-center justify-between mb-2">
                    <span class="font-medium text-gray-300">${escapeHtml(entry.website)}</span>
                    <span class="text-sm text-gray-500">${entry.date}</span>
                </div>
                <div class="flex items-center justify-between">
                    <input type="password" value="${escapeHtml(entry.password)}" 
                        class="bg-transparent border-none outline-none text-gray-300 font-mono" 
                        readonly>
                    <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onclick="togglePasswordVisibility(this)" 
                            class="p-1 text-gray-400 hover:text-purple-400 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                        <button onclick="copyPasswordFromList(this)" 
                            class="p-1 text-gray-400 hover:text-purple-400 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                        </button>
                        <button onclick="deletePassword(${entry.id})" 
                            class="p-1 text-gray-400 hover:text-red-400 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `)
        .join('');
}

function setupExportDropdown() {
    const button = document.querySelector('[data-export-button]');
    const dropdown = document.querySelector('[data-export-dropdown]');
    
    button.addEventListener('click', () => {
        const isOpen = dropdown.classList.contains('hidden');
        dropdown.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!button.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
}

// Add these at the start of the file
let passcodeAttempts = 0;
const MAX_ATTEMPTS = 3;

// Initialize passcode handling
function initPasscode() {
    const hasPasscode = localStorage.getItem('passitPasscode');
    const setupScreen = document.getElementById('setupPasscode');
    const enterScreen = document.getElementById('enterPasscode');
    
    if (hasPasscode) {
        setupScreen.classList.add('hidden');
        enterScreen.classList.remove('hidden');
    } else {
        setupScreen.classList.remove('hidden');
        enterScreen.classList.add('hidden');
    }

    // Set up input handling
    setupPasscodeInputs();
}

function setupPasscodeInputs() {
    const inputs = document.querySelectorAll('.passcode-input');
    
    inputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1) {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                inputs[index - 1].focus();
            }
        });
    });
}

function setupPasscode() {
    const inputs = document.querySelector('#setupPasscode').querySelectorAll('.passcode-input');
    const passcode = Array.from(inputs).map(input => input.value).join('');
    
    if (passcode.length !== 4 || !/^\d+$/.test(passcode)) {
        alert('Please enter a valid 4-digit passcode');
        return;
    }

    // Hash the passcode before storing
    const hashedPasscode = CryptoJS.SHA256(passcode).toString();
    localStorage.setItem('passitPasscode', hashedPasscode);
    
    // Show success and switch to enter screen
    const setupScreen = document.getElementById('setupPasscode');
    const enterScreen = document.getElementById('enterPasscode');
    
    setupScreen.classList.add('hidden');
    enterScreen.classList.remove('hidden');
    
    // Clear inputs
    inputs.forEach(input => input.value = '');
}

function verifyPasscode() {
    const inputs = document.querySelector('#enterPasscode').querySelectorAll('.passcode-input');
    const passcode = Array.from(inputs).map(input => input.value).join('');
    const storedPasscode = localStorage.getItem('passitPasscode');
    
    if (CryptoJS.SHA256(passcode).toString() === storedPasscode) {
        document.getElementById('passcodeScreen').classList.add('hidden');
        passcodeAttempts = 0;
    } else {
        passcodeAttempts++;
        if (passcodeAttempts >= MAX_ATTEMPTS) {
            alert('Too many failed attempts. Please reset your passcode.');
            resetPasscode();
        } else {
            alert(`Invalid passcode. ${MAX_ATTEMPTS - passcodeAttempts} attempts remaining.`);
        }
        inputs.forEach(input => input.value = '');
        inputs[0].focus();
    }
}

function resetPasscode() {
    if (confirm('Are you sure you want to reset your passcode? This will clear all saved passwords.')) {
        localStorage.clear();
        location.reload();
    }
}

// Add this to your window load event listener
window.addEventListener('load', () => {
    initPasscode();
    generatePassword();
    displaySavedPasswords();
    setupExportDropdown();
}); 