window.addEventListener("DOMContentLoaded", () => {
  const translations = {
    en: {
      welcome: "Welcome to Rintis Arah",
      community: "Nature Lovers & Hikers Community",
      shareStory: "Share Your Hiking Story",
      info: "Mountain Info",
      gallery: "Mountain Gallery",
      video: "Video Documentation",
      notfound: "Mountain not found. Try 'merbabu' or 'rinjani'."
    },
    id: {
      welcome: "Selamat Datang di Rintis Arah",
      community: "Komunitas Pecinta Alam dan Pendaki Gunung",
      shareStory: "Bagikan Cerita Pendakianmu",
      info: "Informasi Gunung",
      gallery: "Galeri Gunung",
      video: "Video Dokumentasi",
      notfound: "Gunung tidak ditemukan. Coba ketik 'merbabu' atau 'rinjani'."
    }
  };

  let mountainData = {};
  fetch('mountains.json')
    .then(res => res.json())
    .then(data => mountainData = data)
    .catch(err => console.error('Failed to load JSON:', err));

  let currentLang = "id";

  function switchLanguage(lang) {
    currentLang = lang;
    document.querySelector("#beranda h2").textContent = translations[lang].welcome;
    document.querySelector("#beranda p").textContent = translations[lang].community;
    document.querySelector("#infoSection h2").textContent = translations[lang].info;
    document.querySelector("#galeri h2").textContent = translations[lang].gallery;
    document.querySelector("#video h2").textContent = translations[lang].video;
    document.querySelector("#form-cerita h2").textContent = translations[lang].shareStory;
    handleSearch();
  }

  function handleSearch(query = null) {
    const input = query || document.getElementById("unifiedSearch").value.trim().toLowerCase();
    const infoBox = document.getElementById("mountainInfo");
    const simaksiBox = document.getElementById("simaksiResult");
    const weatherBox = document.getElementById("weatherResult");
    const transportBox = document.getElementById("transportResult");
    const mapBox = document.getElementById("mapContainer");

    const result = mountainData[input];
    if (result) {
      const content = result[currentLang];
      infoBox.textContent = content.info;
      simaksiBox.textContent = content.simaksi;
      weatherBox.textContent = content.weather;
      transportBox.textContent = content.transport;
      mapBox.innerHTML = `<iframe width="100%" height="300" src="${content.map}&output=embed" allowfullscreen></iframe>`;
    } else {
      infoBox.textContent = translations[currentLang].notfound;
      simaksiBox.textContent = weatherBox.textContent = transportBox.textContent = "";
      mapBox.innerHTML = "";
    }
  }

  function searchFromGallery(gunung) {
    document.getElementById("unifiedSearch").value = gunung;
    handleSearch(gunung);
  }

  document.getElementById("unifiedSearch").addEventListener("keydown", e => {
    if (e.key === "Enter") handleSearch();
  });

  document.getElementById("toggleTheme").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    document.getElementById("toggleTheme").textContent =
      document.body.classList.contains("light-mode") ? "🌞" : "🌙";
  });

  document.getElementById("languageSelect").addEventListener("change", (e) => {
    switchLanguage(e.target.value);
  });

  document.getElementById("hamburger").addEventListener("click", () => {
    document.getElementById("navMenu").classList.toggle("show");
  });

  document.getElementById("storyForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Cerita kamu berhasil dikirim!");
    e.target.reset();
  });

  window.searchFromGallery = searchFromGallery;
  window.handleSearch = handleSearch;

  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.style.display = "none";
    });
  }
});
