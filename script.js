const toggleBtn = document.querySelector('#togglePass');
const masterInput = document.querySelector('#masterPwd');

toggleBtn.addEventListener('click', () => {
    const isPass = masterInput.getAttribute('type') === 'password';
    masterInput.setAttribute('type', isPass ? 'text' : 'password');
    toggleBtn.classList.toggle('fa-eye-slash');
});

const langData = {
    en: { title: "Deterministic Password Generator", master: "Master Password", site: "Website/App Name", hint: "Secret Hint", btn: "Generate Password" },
    hi: { title: "निश्चित पासवर्ड जेनरेटर", master: "मास्टर पासवर्ड", site: "वेबसाइट का नाम", hint: "गुप्त संकेत", btn: "पासवर्ड बनाएं" },
    es: { title: "Generador Determinista", master: "Contraseña Maestra", site: "Nombre del Sitio", hint: "Pista Secreta", btn: "Generar Contraseña" }
};

document.getElementById('langSelector').addEventListener('change', (e) => {
    const lang = e.target.value;
    document.getElementById('ui-title').innerText = langData[lang].title;
    document.getElementById('ui-master').innerText = langData[lang].master;
    document.getElementById('ui-site').innerText = langData[lang].site;
    document.getElementById('ui-hint').innerText = langData[lang].hint;
    document.getElementById('generateBtn').innerText = langData[lang].btn;
});

async function generateSecureHash(master, site, hint) {
    const INTERNAL_SALT = "XyZ@123!internal_cyber_salt"; 
    const encoder = new TextEncoder();
    let data = encoder.encode(master + site + hint + INTERNAL_SALT);

    for (let i = 0; i < 1000; i++) {
        data = await crypto.subtle.digest('SHA-256', data);
    }

    const hashArray = Array.from(new Uint8Array(data));
    const base64String = btoa(String.fromCharCode(...hashArray));
    
    const finalKey = base64String.substring(0, 15) + (hint.length % 2 === 0 ? "!" : "#");
    return finalKey;
}

function updateStrengthUI(masterPass) {
    const bar = document.getElementById('strengthBar');
    const text = document.getElementById('strengthText');
    const sim = document.getElementById('attackSim');
    
    let score = 0;
    if (masterPass.length > 8) score++;
    if (masterPass.length > 12) score++;
    if (/[A-Z]/.test(masterPass)) score++; // Has Uppercase
    if (/[0-9]/.test(masterPass)) score++; // Has Number
    if (/[^A-Za-z0-9]/.test(masterPass)) score++; // Has Symbol

    if (masterPass.length === 0) {
        bar.style.width = "0%";
        text.innerText = "";
        sim.innerText = "Crack Time Estimation: --";
    } else if (score < 3) {
        bar.style.width = "30%";
        bar.style.backgroundColor = "#ef4444";
        text.innerText = "Weak";
        text.style.color = "#ef4444";
        sim.innerText = "Crack Time Estimation: Seconds/Minutes";
    } else if (score < 5) {
        bar.style.width = "60%";
        bar.style.backgroundColor = "#f59e0b";
        text.innerText = "Medium";
        text.style.color = "#f59e0b";
        sim.innerText = "Crack Time Estimation: ~2 to 10 Years";
    } else {
        bar.style.width = "100%";
        bar.style.backgroundColor = "#10b981";
        text.innerText = "Strong";
        text.style.color = "#10b981";
        sim.innerText = "Crack Time Estimation: Centuries";
    }
}


document.getElementById('generateBtn').addEventListener('click', async () => {
    const m = masterInput.value;
    const s = document.getElementById('siteName').value;
    const h = document.getElementById('hint').value;

    if (!m || !s) {
        alert("Cyber-Security Rule: Master Password and Website Name cannot be empty.");
        return;
    }

    const result = await generateSecureHash(m, s, h);
    document.getElementById('passwordOutput').innerText = result;
    updateStrengthUI(m);
});

function validateInput() {
    const warn = document.getElementById('warningText');
    const val = masterInput.value.toLowerCase();
    const common = ["123456", "password", "admin", "qwerty"];
    warn.style.display = (common.includes(val)) ? "block" : "none";
    updateStrengthUI(val);
}

document.getElementById('copyBtn').addEventListener('click', () => {
    const pwd = document.getElementById('passwordOutput').innerText;
    if (pwd.includes("*")) return;
    navigator.clipboard.writeText(pwd);
    
    const originalBtnText = document.getElementById('copyBtn').innerText;
    document.getElementById('copyBtn').innerText = "Copied!";
    setTimeout(() => {
        document.getElementById('copyBtn').innerText = originalBtnText;
    }, 1500);
});