// GİZLİ ŞİFRENİZİ BURAYA YAZIN
const SECRET_KEY = "rialo5534"; // Örn: "RialoBoss2025"

const addImageBtn = document.getElementById('addImageBtn');
const authModal = document.getElementById('authModal');
const addModal = document.getElementById('addModal');
const galleryContainer = document.getElementById('galleryContainer');

// Modal açma/kapama
addImageBtn.onclick = () => {
    authModal.style.display = 'block';
};

document.querySelectorAll('.close-btn').forEach(btn => {
    btn.onclick = (event) => {
        event.target.closest('.modal').style.display = 'none';
    };
});

window.onclick = (event) => {
    if (event.target == authModal) {
        authModal.style.display = 'none';
    } else if (event.target == addModal) {
        addModal.style.display = 'none';
    }
};

// Şifre Kontrolü
function checkPassword() {
    const enteredPass = document.getElementById('secretPassword').value;
    document.getElementById('secretPassword').value = ''; // Şifreyi temizle

    if (enteredPass === SECRET_KEY) {
        authModal.style.display = 'none';
        addModal.style.display = 'block'; // Şifre doğruysa ekleme modalını aç
    } else {
        alert("Hatalı şifre. Yönetici girişi reddedildi.");
    }
}

// Yeni Görsel Ekleme Fonksiyonu
function addMemeCard() {
    const url = document.getElementById('imgURL').value;
    const title = document.getElementById('imgTitle').value;
    const desc = document.getElementById('imgDesc').value;

    if (!url || !title) {
        alert("Görsel URL'si ve Başlık zorunludur.");
        return;
    }

    const newCard = document.createElement('div');
    newCard.classList.add('meme-card');
    newCard.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <img src="${url}" alt="${title}">
    `;

    // Yeni kartı listenin başına ekle
    galleryContainer.prepend(newCard);

    // Modal'ı kapat ve inputları temizle
    addModal.style.display = 'none';
    document.getElementById('imgURL').value = '';
    document.getElementById('imgTitle').value = '';
    document.getElementById('imgDesc').value = '';

    alert("Görsel başarıyla galeriye eklendi!");
}