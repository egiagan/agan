// module.js content START (PERBAIKAN FINAL)

// Konfigurasi ini diekspos ke window untuk diakses oleh skrip lain
const moduleConfig = { // Mengubah nama variabel dari `config` menjadi `moduleConfig` agar tidak ada konflik nama
    GEMINI_API_KEYS: [
     "AIzaSyCyUWKHOj0UZohe0f03UYqwYKmdTHyEK3o",// Kunci API Anda
     "AIzaSyC5hbODZv2dhTW5DCQZ9kKBD-7SoePFu0E", // Kunci API cadangan 1
        "AIzaSyDbhaB4GuyqkdTyK4LNM-QD-5AhQ30xK1U", // Kunci API cadangan 2
        "AIzaSyA3GnD0nmKNIZdw9MRUGNJzQqNzu8GTZ54", // Kunci API cadangan 3
        "AIzaSyCqpYPGQyXPU0OLiFKNCwh7tL8rsuWNNb4", // Kunci API cadangan 4
    ],
    jenjangData: {
        'SD': { menit: 35, fase: { 'A': ['I', 'II'], 'B': ['III', 'IV'], 'C': ['V', 'VI'] } },
        'SMP': { menit: 40, fase: { 'D': ['VII', 'VIII', 'IX'] } },
        'SMA/SMK': { menit: 45, fase: { 'E': ['X'], 'F': ['XI', 'XII'] } }
    },
    toastIcons: {
        success: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>',
        error: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>',
        warning: '<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>',
        info: '<path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>',
        coin: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2.09 9.91c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09L7.91 5.84C6.43 7.32 6 9.08 6 12s.43 4.68 1.91 6.16l2.85-2.22-.81-.62zM12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53zM12 18.62c-1.62 0-3.06-.56-4.21-1.64l-3.15 3.15C6.55 21.91 9.03 23 12 23c4.3 0 8.01-2.47 9.82-6.07l-3.66-2.84c-.87 2.6-3.3 4.53-6.16 4.53z"/>'
    },
    toastColors: {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-orange-500',
        info: 'bg-blue-700',   // ⭐ Notifikasi info lebih gelap
        coinTransaction: 'bg-gradient-to-r from-yellow-600 to-amber-700' // ⭐ Notifikasi khusus koin
    },
    loadingMessages: [
        'Menganalisis data input...', 'Menghubungi server AI...', 'Merumuskan kompetensi & tujuan...', 'Merancang kegiatan pembelajaran...', 'Menyusun asesmen & rubrik...', 'Menyelesaikan lampiran...', 'Hampir selesai...'
    ]
};
// ⭐ PERBAIKAN: Mengekspos moduleConfig ke window agar global.js bisa mengakses toastColors dan toastIcons
window.moduleConfig = moduleConfig; 


// `elements` sekarang akan dideklarasikan di dalam `initModuleFeatures`
// untuk memastikan DOM sudah siap saat elemen diakses.
let elements; // Deklarasikan sebagai `let` di sini agar scope-nya luas

let appState = {
    generatedContentData: null,
    loadingInterval: null
};

// --- 2. UTILITY & HELPER FUNCTIONS ---
const decodeHtmlEntities = (text) => {
    if (typeof text !== 'string') return '';
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
};

// --- 3. CORE MODULES (UI, Renderer, Exporter, API, FormManager) ---

// ⭐ PERBAIKAN: Mengekspos UI ke window
window.UI = { // Mengubah const menjadi window.UI
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        document.getElementById('toast-message').textContent = message;
        // ⭐ PERBAIKAN: Gunakan ikon dan warna dari objek moduleConfig yang diekspos
        const iconHTML = window.moduleConfig.toastIcons[type] || window.moduleConfig.toastIcons['info']; // Fallback
        const colorClass = window.moduleConfig.toastColors[type] || window.moduleConfig.toastColors['info']; // Fallback

        document.getElementById('toast-icon').innerHTML = iconHTML;
        // Hapus semua kelas warna lama sebelum menambahkan yang baru
        toast.className = toast.className.replace(/bg-\w+-\d+/g, '').replace(/from-\w+-\d+/g, '').replace(/to-\w+-\d+/g, '');
        toast.classList.add(colorClass, 'opacity-100', 'translate-y-0');
        setTimeout(() => {
            toast.classList.remove('opacity-100', 'translate-y-0');
        }, 4000);
    },
    setLoadingState(isLoading) {
        // Elements harus sudah tersedia di sini karena akan dipanggil setelah DOMContentLoaded
        if (!elements) {
            console.error("Elements not initialized in UI.setLoadingState");
            return;
        }
        elements.loader.classList.toggle('hidden', !isLoading);
        elements.generateBtn.disabled = isLoading;
        elements.resetBtn.disabled = isLoading;
        elements.btnText.textContent = isLoading ? 'Memproses...' : 'Buat Modul Ajar dengan AI';
        
        if (isLoading) {
            elements.placeholder.classList.add('hidden');
            elements.outputContent.innerHTML = '';
            elements.actionButtons.classList.add('hidden');
            let messageIndex = 0;
            elements.loaderText.textContent = moduleConfig.loadingMessages[messageIndex];
            appState.loadingInterval = setInterval(() => {
                messageIndex = (messageIndex + 1) % moduleConfig.loadingMessages.length;
                elements.loaderText.textContent = moduleConfig.loadingMessages[messageIndex];
            }, 2500);
        } else {
            if (appState.loadingInterval) {
                clearInterval(appState.loadingInterval);
                appState.loadingInterval = null;
            }
        }
    },
    updateFaseOptions() {
        const selectedJenjang = elements.jenjangSelect.value;
        const data = moduleConfig.jenjangData[selectedJenjang];
        elements.faseSelect.innerHTML = '';
        if (data) {
            Object.keys(data.fase).forEach(faseKey => {
                elements.faseSelect.add(new Option(`Fase ${faseKey}`, faseKey));
            });
            elements.menitPerJpInput.value = data.menit;
        }
        this.updateKelasOptions();
    },
    updateKelasOptions() {
        const selectedJenjang = elements.jenjangSelect.value;
        const selectedFase = elements.faseSelect.value;
        const kelasOptions = moduleConfig.jenjangData[selectedJenjang]?.fase[selectedFase] || [];
        elements.kelasSelect.innerHTML = '';
        kelasOptions.forEach(k => {
            elements.kelasSelect.add(new Option(`Kelas ${k}`, k));
        });
    },
    showResetModal() {
        elements.resetModal.classList.remove('hidden');
        setTimeout(() => {
            elements.resetModalContent.classList.remove('opacity-0', 'scale-95');
            elements.resetModalContent.classList.add('opacity-100', 'scale-100');
        }, 10);
    },
    hideResetModal() {
        elements.resetModalContent.classList.remove('opacity-100', 'scale-100');
        elements.resetModalContent.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            elements.resetModal.classList.add('hidden');
        }, 200);
    },
    // Fungsi initialize ini sekarang akan dipanggil dari global.js
    initialize() {
        // Re-assign elements here to ensure they are properly linked after DOM is ready
        elements = {
            form: document.getElementById('modul-form'),
            generateBtn: document.getElementById('generate-btn'),
            resetBtn: document.getElementById('reset-btn'),
            btnText: document.getElementById('btn-text'),
            loader: document.getElementById('loader'),
            loaderText: document.getElementById('loader-text'),
            outputContent: document.getElementById('output-content'),
            placeholder: document.getElementById('placeholder'),
            actionButtons: document.getElementById('action-buttons'),
            jenjangSelect: document.getElementById('jenjang'),
            faseSelect: document.getElementById('fase'),
            kelasSelect: document.getElementById('kelas'),
            menitPerJpInput: document.getElementById('menitPerJp'),
            copyBtn: document.getElementById('copy-btn'),
            printBtn: document.getElementById('print-btn'),
            docBtn: document.getElementById('doc-btn'),
            pdfBtn: document.getElementById('pdf-btn'),
            dropdownBtn: document.getElementById('dropdown-btn'),
            dropdownMenu: document.getElementById('dropdown-menu'),
            dropdownArrow: document.getElementById('dropdown-arrow'),
            tanggalInput: document.getElementById('tanggal'),
            resetModal: document.getElementById('reset-modal'),
            resetModalContent: document.getElementById('reset-modal-content'),
            confirmResetBtn: document.getElementById('confirm-reset-btn'),
            cancelResetBtn: document.getElementById('cancel-reset-btn'),
        };

        Object.keys(moduleConfig.jenjangData).forEach(jenjang => {
            elements.jenjangSelect.add(new Option(jenjang, jenjang));
        });
        elements.jenjangSelect.value = 'SD';
        this.updateFaseOptions();
        elements.tanggalInput.valueAsDate = new Date();
    }
};

const Renderer = {
    formatInline(text) { /* ... (fungsi ini tidak berubah) ... */ return ''; },
    renderContent(content) { /* ... (fungsi ini tidak berubah) ... */ return ''; },
    renderKegiatan(content) { /* ... (fungsi ini tidak berubah) ... */ return ''; },
    createFinalHtml(data) { /* ... (fungsi ini tidak berubah) ... */ return ''; }
};

const Exporter = {
    downloadDoc() { 
        if (!appState.generatedContentData) { window.UI.showToast("Tidak ada konten untuk diunduh.", "warning"); return; }
        /* ... (fungsi ini tidak berubah) ... */ 
    },
    downloadPdf() {
        if (!appState.generatedContentData) { window.UI.showToast("Tidak ada konten untuk diunduh.", "warning"); return; }
        const pdfBtn = elements.pdfBtn;
        const originalBtnHTML = pdfBtn.innerHTML;
        pdfBtn.disabled = true;
        pdfBtn.innerHTML = `<svg class="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>Membuat...</span>`;
        window.UI.showToast("Mempersiapkan PDF, mohon tunggu...", "warning");
        try { /* ... (fungsi ini tidak berubah) ... */ }
        catch (error) { console.error("Gagal membuat PDF:", error); window.UI.showToast("Terjadi kesalahan saat membuat PDF.", "error"); }
        finally { pdfBtn.disabled = false; pdfBtn.innerHTML = originalBtnHTML; }
    }
};

const API = {
    createPromptFromForm() { /* ... (fungsi ini tidak berubah) ... */ return ''; },
    async generateWithGemini(prompt) { /* ... (fungsi ini tidak berubah) ... */ return null; }
};

const FormManager = {
    saveState() { /* ... (fungsi ini tidak berubah) ... */ },
    loadState() { /* ... (fungsi ini tidak berubah) ... */ },
    reset() { /* ... (fungsi ini tidak berubah) ... */ },
    setupDynamicFields() { /* ... (fungsi ini tidak berubah) ... */ }
};

// ⭐ PERBAIKAN: Pindahkan logika inti handleFormSubmit ke fungsi global
window.originalHandleFormSubmitLogic = async function() {
    // Validasi ini dipertahankan di sini sebagai fallback,
    // tapi new_module_cost_logic.js seharusnya sudah melakukan validasi ini.
    const dimensiCheckboxes = document.querySelectorAll('input[name="dimensi"]:checked');
    if (dimensiCheckboxes.length < 2 || dimensiCheckboxes.length > 4) {
        window.UI.showToast("Pilih 2 hingga 4 Dimensi Profil Lulusan.", "warning");
        throw new Error("Invalid Dimensi Profil Lulusan selection.");
    }
    // Menggunakan moduleConfig.GEMINI_API_KEYS yang sudah diekspos
    const validGeminiKeys = moduleConfig.GEMINI_API_KEYS.filter(key => !key.startsWith("GANTI_DENGAN_API_KEY_GEMINI"));
    if (validGeminiKeys.length === 0) {
        window.UI.showToast("Tidak ada API Key Gemini yang valid.", "error");
        elements.outputContent.innerHTML = `<div class="flex flex-col items-center justify-center min-h-[300px] text-center text-red-500 p-8 border-2 border-dashed border-red-300 rounded-2xl"><strong>API Key Error:</strong><p class="mt-2">Silakan masukkan setidaknya satu API Key Gemini yang valid di dalam kode JavaScript.</p></div>`;
        elements.placeholder.classList.add('hidden');
        throw new Error("No valid Gemini API keys.");
    }
    
    // `setLoadingState` akan dipanggil oleh `new_module_cost_logic.js`
    // window.UI.setLoadingState(true); 

    try {
        const prompt = API.createPromptFromForm();
        const generatedContent = await API.generateWithGemini(prompt);
        const formData = new FormData(elements.form);
        const userInput = Object.fromEntries(formData.entries());
        appState.generatedContentData = { ...userInput, ...generatedContent };
        elements.outputContent.innerHTML = Renderer.createFinalHtml(appState.generatedContentData);
        elements.actionButtons.classList.remove('hidden');
        // window.UI.showToast("Modul ajar berhasil dibuat!", "success"); // Notifikasi ditangani oleh new_module_cost_logic.js
    } catch (error) {
        console.error(`Error during generation (original logic):`, error);
        let finalErrorMessage;
        let errorTitle = "Terjadi Kesalahan";

        if (error.message.includes("overloaded") || error.message.includes("503") || error.message.includes("429")) {
            finalErrorMessage = "Layanan AI sedang sibuk atau kelebihan beban. Mohon coba lagi dalam beberapa saat.";
            errorTitle = "Layanan Sibuk";
        } else if (error.message.includes("API key not valid")) {
            finalErrorMessage = "Kunci API yang digunakan tidak valid. Pastikan kunci API Anda benar dan memiliki izin yang cukup.";
            errorTitle = "Kunci API Tidak Valid";
        } else if (error.message.includes("Invalid JSON format")) {
            finalErrorMessage = "AI memberikan respons dengan format yang tidak terduga. Silakan coba lagi. Jika masalah berlanjut, ubah sedikit input Anda.";
            errorTitle = "Format Respons Tidak Sesuai";
        } else if (error.message.includes("All API keys and retries failed")) {
            finalErrorMessage = "Semua percobaan koneksi ke layanan AI gagal. Periksa koneksi internet Anda dan validitas semua kunci API.";
            errorTitle = "Koneksi Gagal";
        } else {
            finalErrorMessage = "Terjadi kesalahan yang tidak diketahui. Silakan periksa konsol browser untuk detail teknis.";
        }
        elements.outputContent.innerHTML = `<div class="flex flex-col items-center justify-center min-h-[300px] text-center text-red-500 p-8 border-2 border-dashed border-red-300 rounded-2xl"><strong>${errorTitle}:</strong><p class="mt-2">${finalErrorMessage}</p></div>`;
        elements.placeholder.classList.add('hidden');
        elements.outputContent.classList.remove('hidden');
        window.UI.showToast(finalErrorMessage, "error"); // Notifikasi ditangani di sini
        throw error; // Lempar error agar new_module_cost_logic.js bisa menangkap dan mengembalikan koin
    } finally {
        // window.UI.setLoadingState(false); // Notifikasi ditangani oleh new_module_cost_logic.js
    }
};

// ⭐ PERBAIKAN: Fungsi setupEventListeners yang di panggil di global.js
// akan mengatur event listener yang TIDAK terkait langsung dengan proses generate.
// Hapus listener 'submit' dari sini!
window.setupEventListenersForModuleJS = function() { // Nama fungsi diubah agar jelas
    // elements.form.addEventListener('submit', handleFormSubmit); // ⭐ HAPUS BARIS INI!
    elements.form.addEventListener('input', FormManager.saveState);
    
    elements.resetBtn.addEventListener('click', UI.showResetModal);
    elements.confirmResetBtn.addEventListener('click', FormManager.reset);
    elements.cancelResetBtn.addEventListener('click', UI.hideResetModal);
    
    elements.copyBtn.addEventListener('click', () => {
        const contentArea = document.getElementById('module-render-area');
        if(!contentArea) return;
        navigator.clipboard.writeText(contentArea.innerText)
            .then(() => window.UI.showToast('Teks berhasil disalin!', 'success')) // Gunakan window.UI
            .catch(() => window.UI.showToast('Gagal menyalin teks.', 'error')); // Gunakan window.UI
    });
    elements.printBtn.addEventListener('click', () => {
         if (!appState.generatedContentData) { window.UI.showToast("Tidak ada konten untuk dicetak.", "warning"); return; } // Gunakan window.UI
        window.print();
    });
    elements.docBtn.addEventListener('click', () => Exporter.downloadDoc());
    elements.pdfBtn.addEventListener('click', () => Exporter.downloadPdf());

    // Dropdown logic
    elements.dropdownBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        const isHidden = elements.dropdownMenu.classList.contains('hidden');
        if (isHidden) {
            elements.dropdownMenu.classList.remove('hidden');
            setTimeout(() => {
                elements.dropdownMenu.classList.remove('opacity-0', 'scale-95');
                elements.dropdownMenu.classList.add('opacity-100', 'scale-100');
                elements.dropdownArrow.classList.add('rotate-180');
            }, 10);
        } else {
            elements.dropdownMenu.classList.remove('opacity-100', 'scale-100');
            elements.dropdownMenu.classList.add('opacity-0', 'scale-95');
            elements.dropdownArrow.classList.remove('rotate-180');
            setTimeout(() => elements.dropdownMenu.classList.add('hidden'), 200);
        }
    });
    window.addEventListener('click', (e) => {
        if (!elements.dropdownMenu.classList.contains('hidden') && !elements.dropdownBtn.contains(e.target)) {
            elements.dropdownMenu.classList.remove('opacity-100', 'scale-100');
            elements.dropdownMenu.classList.add('opacity-0', 'scale-95');
            elements.dropdownArrow.classList.remove('rotate-180');
            setTimeout(() => elements.dropdownMenu.classList.add('hidden'), 200);
        }
    });

    // Dependent dropdown listeners
    elements.jenjangSelect.addEventListener('change', () => UI.updateFaseOptions());
    elements.faseSelect.addEventListener('change', () => UI.updateKelasOptions());
    
    // Setup dynamic fields
    FormManager.setupDynamicFields();
    // Load state
    FormManager.loadState();
};

// ⭐ PERBAIKAN: Eksponensial objek-objek utama ke window agar bisa diakses oleh skrip lain
window.API = API;
window.Renderer = Renderer;
window.Exporter = Exporter; 
window.FormManager = FormManager; 
window.appState = appState; 

// module.js content END
