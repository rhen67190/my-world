// Scroll logic & To-Top
let lastScrollTop = 0;
const header = document.querySelector("header");
const toTop = document.querySelector(".to-top");
const heroSection = document.querySelector(".hero");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const heroSectionOffsetTop = heroSection.offsetTop;

  if (scrollTop > heroSectionOffsetTop) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }

  if (scrollTop > lastScrollTop) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }
  lastScrollTop = scrollTop;
});

// Modal Logic
function openModal(title, desc) {
  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-desc").innerText = desc;
  document.getElementById("planet-modal").style.display = "block";
}

function closeModal() {
  document.getElementById("planet-modal").style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById("planet-modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// --- NASA LIVE EARTH FETCHER ---
async function loadNasaImage() {
  const imgElement = document.getElementById("nasa-image");
  const dateElement = document.getElementById("nasa-date");

  try {
    const response = await fetch("https://epic.gsfc.nasa.gov/api/natural");
    const data = await response.json();
    const latest = data[0];
    
    const dateParts = latest.date.split(" ")[0].split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    
    const imgUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${latest.image}.png`;
    
    imgElement.src = imgUrl;
    dateElement.innerText = `Diambil pada: ${latest.date} (Waktu UTC) - Kamera: DSCOVR EPIC`;
    
  } catch (error) {
    console.error("Gagal ambil gambar NASA:", error);
    dateElement.innerText = "Gagal memuat data satelit NASA saat ini.";
  }
}

// --- LIVE ISS TRACKER FETCHER ---
async function fetchISS() {
  const latElement = document.getElementById("iss-lat");
  const lonElement = document.getElementById("iss-lon");
  
  latElement.innerText = "Memuat...";
  lonElement.innerText = "Memuat...";

  try {
    const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
    const data = await response.json();
    
    latElement.innerText = `${data.latitude.toFixed(4)}°`;
    lonElement.innerText = `${data.longitude.toFixed(4)}°`;
    
  } catch (error) {
    console.error("Gagal melacak ISS:", error);
    latElement.innerText = "Gagal memuat.";
    lonElement.innerText = "Gagal memuat.";
  }
}

// Panggil fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  loadNasaImage();
  fetchISS();
});