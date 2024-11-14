const words = [
    "jalan", "berjalan", "mobil", "sepeda", "motor", "bus", "kereta", "pesawat", "kapal", "taksi",
"peta", "rute", "tujuan", "perjalanan", "liburan", "tempat", "taman", "rumah", "kamar", "meja",
"kursi", "sofa", "lemari", "pintu", "jendela", "dapur", "kulkas", "kompor", "wajan", "panci",
"piring", "sendok", "garpu", "mangkuk", "gelas", "air", "teh", "kopi", "minuman", "makanan",
"roti", "nasi", "mie", "soto", "rendang", "pizza", "burger", "ayam", "ikan", "sayur",
"buah", "apel", "jeruk", "mangga", "pisang", "nanas", "semangka", "anggur", "melon", "kelapa",
"kacang", "kedelai", "tempe", "tahu", "sambal", "kecap", "garam", "gula", "teh", "kopi",
"cokelat", "es", "kuliner", "restoran", "warung", "kafe", "makanan cepat saji", "toko", "pasar",
"supermarket", "belanja", "shopping", "harga", "diskon", "promo", "voucher", "uang", "kartu",
"dompet", "ATM", "bank", "rekening", "tabungan", "investasi", "saham", "obligasi", "pajak",
"pinjaman", "hutang", "kredit", "pembayaran", "transaksi", "tagihan", "saldo", "rekening",
"nominal", "profit", "keuntungan", "kerugian", "karyawan", "bos", "pegawai", "perusahaan",
"usaha", "bisnis", "wirausaha", "startup", "produk", "layanan", "jasa", "customer", "klien",
"pemasaran", "iklan", "promosi", "kampanye", "marketing", "media", "website", "e-commerce",
"toko", "social media", "digital", "teknologi", "internet", "website", "domain", "hosting",
"server", "cloud", "web", "aplikasi", "software", "hardware", "komputer", "laptop", "tablet",
"smartphone", "handphone", "kamera", "printer", "scanner", "keyboard", "mouse", "monitor", "tv",
"audio", "sound", "speaker", "mikrofon", "kamera", "kamera digital", "videocam", "projector", "lensa",
"film", "video", "vlog", "youtuber", "streaming", "musik", "lagu", "album", "band", "penyanyi",
"penulis", "pembuat", "pencipta", "artis", "singer", "pemain", "aktor", "aktris", "film", "teater",
"seram", "drama", "komedi", "aksi", "animasi", "kartun", "adventure", "romantis", "horor",
"fantasi", "perjalanan", "petualangan", "suasana", "pemandangan", "gunung", "laut", "pantai",
"sungai", "hutan", "danau", "bukit", "padang", "padang pasir", "gurun", "taman", "cagar",
"ekosistem", "flora", "fauna", "hewan", "binatang", "mamalia", "burung", "ikan", "amfibi",
"reptil", "insect", "serangga", "tanaman", "bunga", "pohon", "rumput", "tanah", "air", "udara",
"iklim", "cuaca", "musim", "panas", "dingin", "hujan", "salju", "angin", "embun", "meteorologi",
"lingkungan", "kelestarian", "konservasi", "daur ulang", "sampah", "polusi", "emisi", "karbon",
"ozon", "global", "pemanasan", "global", "perubahan iklim", "bencana", "gempa", "tsunami", "letusan",
"gunung", "badai", "topan", "beliung", "banjir", "longsor", "kebakaran", "kerusakan",
"pertanian", "perkebunan", "peternakan", "perikanan", "hutan", "ladang", "sawah", "garam", "gula",
"bubuk", "madu", "bubur", "kue", "puding", "cookies", "camilan", "snack", "makanan ringan", "nasi",
"mee", "spaghetti", "pasta", "burger", "hotdog", "pizza", "pancake", "waffle", "fried", "roast",
"boil", "steam", "grill", "saute", "fry", "bake", "cook", "prepare", "menu", "chef", "masak",
"proses", "hasil", "sajian", "hidangan", "lezat", "gurih", "pedas", "manis", "asin", "asam", "segar",
"perasa", "rasa", "kesukaan", "kegemaran", "makanan", "minuman", "restaurant", "food",
"cooking", "recipe", "baking", "cooking utensils", "tools", "kitchen", "cooking pot", "spoon", "pan"


];

let currentWordIndex = 0;
let timer = 60;
let timerInterval;
let totalCharacters = 0;
let correctCharacters = 0;
let correctWordsCount = 0;
let incorrectWordsCount = 0;
let isTestActive = false;
let currentWords = [];

const wordDisplay = document.getElementById('wordDisplay');
const typingInput = document.getElementById('typingInput');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const correctWordsDisplay = document.getElementById('correctWords');
const incorrectWordsDisplay = document.getElementById('incorrectWords');
const timerDisplay = document.getElementById('timer');
const resetBtn = document.getElementById('resetBtn');
const statsDisplay = document.getElementById('statsDisplay');

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function createWordSpan(word, index) {
    const span = document.createElement('span');
    span.className = `word ${index === currentWordIndex ? 'current-word' : ''}`;
    span.textContent = word;
    return span;
}

function displayWords() {
    currentWords = shuffleArray(words).slice(0, 20);
    wordDisplay.innerHTML = '';

    currentWords.forEach((word, index) => {
        const wordSpan = createWordSpan(word, index);
        wordDisplay.appendChild(wordSpan);
    });
}

function updateCurrentWord() {
    const wordElements = wordDisplay.getElementsByClassName('word');
    Array.from(wordElements).forEach((element, index) => {
        element.className = `word ${index === currentWordIndex ? 'current-word' : ''}`;
    });
}

function startTimer() {
    if (!isTestActive) {
        isTestActive = true;
        timerInterval = setInterval(() => {
            timer--;
            timerDisplay.textContent = timer;
            if (timer <= 0) {
                endTest();
            }
        }, 1000);
    }
}

function endTest() {
    clearInterval(timerInterval);
    typingInput.disabled = true;
    isTestActive = false;
    statsDisplay.style.display = 'block'; // Show stats after timer ends

    const minutes = (60 - timer) / 60;
    const wpm = Math.round((totalCharacters / 5) / minutes);
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = Math.round((correctCharacters / totalCharacters) * 100);
    correctWordsDisplay.textContent = correctWordsCount;
    incorrectWordsDisplay.textContent = incorrectWordsCount;
}

function checkWord(typedValue, currentWord) {
    let displayHTML = '';
    for (let i = 0; i < currentWord.length; i++) {
        if (i < typedValue.length) {
            if (typedValue[i] === currentWord[i]) {
                displayHTML += `<span class="correct">${currentWord[i]}</span>`;
            } else {
                displayHTML += `<span class="incorrect">${currentWord[i]}</span>`;
            }
        } else {
            displayHTML += currentWord[i];
        }
    }
    return displayHTML;
}

displayWords();

typingInput.addEventListener('input', (e) => {
    if (!isTestActive && e.target.value.length > 0) {
        startTimer();
    }

    const currentWord = currentWords[currentWordIndex];
    const typedValue = e.target.value;

    const wordElements = wordDisplay.getElementsByClassName('word');
    wordElements[currentWordIndex].innerHTML = checkWord(typedValue, currentWord);
});

typingInput.addEventListener('keydown', (e) => {
    if ((e.code === 'Space' || e.code === 'Enter') && typingInput.value.length > 0) {
        e.preventDefault();

        const typedValue = typingInput.value.trim();
        const currentWord = currentWords[currentWordIndex];

        // Update statistics
        totalCharacters += currentWord.length;
        if (typedValue === currentWord) {
            correctWordsCount++;
            correctCharacters += currentWord.length;
        } else {
            incorrectWordsCount++;
        }

        // Update accuracy and stats
        updateStats();

        // Move to next word
        currentWordIndex++;
        if (currentWordIndex >= currentWords.length) {
            currentWordIndex = 0;
            displayWords();
        } else {
            updateCurrentWord();
        }

        typingInput.value = '';
    }
});

function updateStats() {
    const accuracy = totalCharacters === 0 ? 0 : Math.round((correctCharacters / totalCharacters) * 100);
    accuracyDisplay.textContent = accuracy;
}

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timer = 60;
    currentWordIndex = 0;
    correctCharacters = 0;
    correctWordsCount = 0;
    incorrectWordsCount = 0;
    totalCharacters = 0;
    typingInput.disabled = false;
    typingInput.value = '';
    statsDisplay.style.display = 'none';
    displayWords();
    startTimer();
});