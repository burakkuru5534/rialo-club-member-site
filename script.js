// GİZLİ ŞİFRENİZİ BURAYA YAZIN
const SECRET_KEY = "sifrenizburaya"; // Lütfen bunu kendi şifrenizle değiştirin!

const addImageBtn = document.getElementById('addImageBtn');
const authModal = document.getElementById('authModal');
const addModal = document.getElementById('addModal');
const galleryContainer = document.getElementById('galleryContainer');

let memeData = []; // Tüm kart verilerini tutacak ana dizi

// --- 1. FONKSİYON: SAYFA YÜKLENİNCE VERİYİ YÜKLE ---
function loadMemes() {
    // Local Storage'dan veriyi çek
    const savedData = localStorage.getItem('rialoMemeGallery');
    
    if (savedData) {
        // Veri varsa, JSON formatından JavaScript dizisine dönüştür
        memeData = JSON.parse(savedData);
    } 
    // Local Storage boşsa, memeData boş bir dizi olarak kalır ve boş galeri çizilir.

    // Tüm kartları DOM'a (web sayfasına) ekle
    renderMemes();
}

// --- 2. FONKSİYON: VERİYİ LOCAL STORAGE'A KAYDET ---
function saveMemes() {
    // Güncel diziyi JSON formatına dönüştür ve Local Storage'a kaydet
    localStorage.setItem('rialoMemeGallery', JSON.stringify(memeData));
}

// --- 3. FONKSİYON: GÖRSEL KARTLARINI OLUŞTUR VE GÖSTER ---
function renderMemes() {
    // Galeriyi temizle
    galleryContainer.innerHTML = ''; 

    // Her bir veri objesi için kart oluştur
    // (memeData boşsa, döngü çalışmaz ve galeri boş kalır)
    memeData.forEach(item => {
        const newCard = document.createElement('div');
        newCard.classList.add('meme-card');
        newCard.innerHTML = `
            <h2>${item.title}</h2>
            <p>${item.desc}</p>
            <img src="${item.url}" alt="${item.title}">
        `;
        // Yeni kartı listenin başına ekle (en yeni en üstte)
        galleryContainer.prepend(newCard); 
    });
}


// --- 4. GİRİŞ VE EKLEME MANTIĞI ---

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
    document.getElementById('secretPassword').value = ''; 

    if (enteredPass === SECRET_KEY) {
        authModal.style.display = 'none';
        addModal.style.display = 'block';
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

    // Yeni kart objesini oluştur
    const newMeme = {
        url: url,
        title: title,
        desc: desc
    };
    
    // Veri dizisine yeni kartı ekle
    memeData.push(newMeme);

    // Veriyi Local Storage'a kaydet
    saveMemes();

    // Görseli hemen sayfada göster (tüm listeyi yeniden çizerek)
    renderMemes();

    // Modal'ı kapat ve inputları temizle
    addModal.style.display = 'none';
    document.getElementById('imgURL').value = '';
    document.getElementById('imgTitle').value = '';
    document.getElementById('imgDesc').value = '';

    alert("Görsel başarıyla galeriye eklendi ve kaydedildi!");
}

// Sayfa yüklendiğinde (başlangıçta) tüm veriyi yükle ve göster
window.onload = loadMemes;

// Fonksiyonları HTML'den erişilebilir yapmak için dışarı aktar
window.checkPassword = checkPassword;
window.addMemeCard = addMemeCard;
