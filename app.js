document.addEventListener("DOMContentLoaded", () => {
  // --- Language Switcher Configuration ---
  const defaultLang = "de";
  let currentLang = localStorage.getItem("preferred_lang") || defaultLang;

  const deBtn = document.getElementById("lang-de");
  const sqBtn = document.getElementById("lang-sq");
  const deBtnM = document.getElementById("lang-de-m");
  const sqBtnM = document.getElementById("lang-sq-m");

  function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("preferred_lang", lang);

    // Update active class on buttons
    if (deBtn && sqBtn) {
      if (lang === "de") {
        deBtn.classList.add("bg-orange-600", "text-white");
        deBtn.classList.remove("text-slate-300", "hover:text-white");
        sqBtn.classList.remove("bg-orange-600", "text-white");
        sqBtn.classList.add("text-slate-300", "hover:text-white");

        if (deBtnM && sqBtnM) {
          deBtnM.classList.add("bg-orange-600", "text-white");
          deBtnM.classList.remove("text-slate-300", "hover:text-white");
          sqBtnM.classList.remove("bg-orange-600", "text-white");
          sqBtnM.classList.add("text-slate-300", "hover:text-white");
        }
      } else {
        sqBtn.classList.add("bg-orange-600", "text-white");
        sqBtn.classList.remove("text-slate-300", "hover:text-white");
        deBtn.classList.remove("bg-orange-600", "text-white");
        deBtn.classList.add("text-slate-300", "hover:text-white");

        if (deBtnM && sqBtnM) {
          sqBtnM.classList.add("bg-orange-600", "text-white");
          sqBtnM.classList.remove("text-slate-300", "hover:text-white");
          deBtnM.classList.remove("bg-orange-600", "text-white");
          deBtnM.classList.add("text-slate-300", "hover:text-white");
        }
      }
    }

    // Translate static text contents
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Translate inputs/textareas placeholders
    const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
    placeholders.forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (translations[lang] && translations[lang][key]) {
        el.placeholder = translations[lang][key];
      }
    });

    // Translate inputs buttons value if needed
    const values = document.querySelectorAll("[data-i18n-val]");
    values.forEach((el) => {
      const key = el.getAttribute("data-i18n-val");
      if (translations[lang] && translations[lang][key]) {
        el.value = translations[lang][key];
      }
    });
  }

  // Bind Switcher Clicks
  if (deBtn) deBtn.addEventListener("click", () => { updateLanguage("de"); setTimeout(() => { renderFaq(); if (window.setServiceActive) window.setServiceActive(window.activeServiceIndex || 0); }, 50); });
  if (sqBtn) sqBtn.addEventListener("click", () => { updateLanguage("sq"); setTimeout(() => { renderFaq(); if (window.setServiceActive) window.setServiceActive(window.activeServiceIndex || 0); }, 50); });

  // Initial load of language switcher
  updateLanguage(currentLang);

  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIconOpen = document.getElementById("menu-icon-open");
  const menuIconClose = document.getElementById("menu-icon-close");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("translate-y-0");
      if (isOpen) {
        mobileMenu.classList.remove("translate-y-0", "opacity-100");
        mobileMenu.classList.add("-translate-y-full", "opacity-0", "pointer-events-none");
        if (menuIconOpen) menuIconOpen.classList.remove("hidden");
        if (menuIconClose) menuIconClose.classList.add("hidden");
      } else {
        mobileMenu.classList.add("translate-y-0", "opacity-100");
        mobileMenu.classList.remove("-translate-y-full", "opacity-0", "pointer-events-none");
        if (menuIconOpen) menuIconOpen.classList.add("hidden");
        if (menuIconClose) menuIconClose.classList.remove("hidden");
      }
    });

    const mobileNavLinks = mobileMenu.querySelectorAll("a");
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("translate-y-0", "opacity-100");
        mobileMenu.classList.add("-translate-y-full", "opacity-0", "pointer-events-none");
        if (menuIconOpen) menuIconOpen.classList.remove("hidden");
        if (menuIconClose) menuIconClose.classList.add("hidden");
      });
    });
  }

  // --- Smooth Scroll Padding Adjustment ---
  const header = document.querySelector("header");
  if (header) {
    const headerHeight = header.offsetHeight;
    document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);
  }

  // --- Slider Control ---
  const slider = document.getElementById("about-slider");
  const prevBtn = document.getElementById("slider-prev");
  const nextBtn = document.getElementById("slider-next");

  if (slider && prevBtn && nextBtn) {
    const getScrollAmount = () => {
      const firstCard = slider.querySelector(".snap-start");
      return firstCard ? firstCard.offsetWidth + 24 : 350;
    };

    prevBtn.addEventListener("click", () => {
      slider.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    });
    nextBtn.addEventListener("click", () => {
      slider.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    });
  }

  // --- Video Modal Player Control ---
  const playVideoBtn = document.getElementById("play-video-btn");
  const videoModal = document.getElementById("video-modal");
  const videoModalCard = document.getElementById("video-modal-card");
  const closeVideoBtn = document.getElementById("close-video-btn");
  const videoPlayer = document.getElementById("modal-video-player");

  if (playVideoBtn && videoModal && videoModalCard && closeVideoBtn && videoPlayer) {
    const openVideoModal = () => {
      videoModal.classList.remove("opacity-0", "pointer-events-none");
      videoModal.classList.add("opacity-100", "pointer-events-auto");
      videoModalCard.classList.remove("scale-95", "opacity-0");
      videoModalCard.classList.add("scale-100", "opacity-100");
      videoPlayer.load();
      videoPlayer.play().catch(err => console.log("Autoplay prevented:", err));
    };

    const closeVideoModal = () => {
      videoPlayer.pause();
      videoModalCard.classList.remove("scale-100", "opacity-100");
      videoModalCard.classList.add("scale-95", "opacity-0");
      videoModal.classList.remove("opacity-100", "pointer-events-auto");
      videoModal.classList.add("opacity-0", "pointer-events-none");
    };

    playVideoBtn.addEventListener("click", openVideoModal);
    closeVideoBtn.addEventListener("click", closeVideoModal);
    
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !videoModal.classList.contains("opacity-0")) {
        closeVideoModal();
      }
    });
  }

  // --- Interactive Multi-Step Inquiry Form ---
  let currentInquiryStep = 1;
  const inquiryData = {
    service: "Unterhaltsreinigung",
    object: "Privathaus",
    size: "80",
    rooms: "3",
    bathrooms: "1",
    windows: "8",
    date: "",
    location: "",
    name: "",
    phone: "",
    email: "",
    message: "",
    photos: []
  };

  const initFormState = () => {
    updateLiveOverview();
  };

  window.selectService = (name) => {
    inquiryData.service = name;
    
    // Manage active class on cards
    document.querySelectorAll("#step-content-1 .service-card").forEach((card) => {
      const textSpan = card.querySelector("span");
      if (textSpan && textSpan.innerText === name) {
        card.classList.add("border-blue-600", "bg-blue-50/20");
        card.classList.remove("border-slate-100", "bg-slate-50");
      } else {
        card.classList.remove("border-blue-600", "bg-blue-50/20");
        card.classList.add("border-slate-100", "bg-slate-50");
      }
    });

    updateLiveOverview();
  };

  window.selectObject = (name) => {
    inquiryData.object = name;
    
    document.querySelectorAll("#step-content-2 .object-card").forEach((card) => {
      const textSpan = card.querySelector("span");
      if (textSpan && textSpan.innerText === name) {
        card.classList.add("border-blue-600", "bg-blue-50/20");
        card.classList.remove("border-slate-100", "bg-slate-50");
      } else {
        card.classList.remove("border-blue-600", "bg-blue-50/20");
        card.classList.add("border-slate-100", "bg-slate-50");
      }
    });

    updateLiveOverview();
  };

  window.updateScopeSize = (val) => {
    inquiryData.size = val;
    updateLiveOverview();
  };

  window.updateScopeRooms = (val) => {
    inquiryData.rooms = val;
    updateLiveOverview();
  };

  window.updateScopeBathrooms = (val) => {
    inquiryData.bathrooms = val;
    updateLiveOverview();
  };

  window.updateScopeWindows = (val) => {
    inquiryData.windows = val;
    updateLiveOverview();
  };

  window.updateDate = (val) => {
    inquiryData.date = val;
    updateLiveOverview();
  };

  window.updateLocation = (val) => {
    inquiryData.location = val;
    updateLiveOverview();
  };

  window.updateName = (val) => {
    inquiryData.name = val;
    updateLiveOverview();
  };

  window.updatePhone = (val) => {
    inquiryData.phone = val;
  };

  window.updateEmail = (val) => {
    inquiryData.email = val;
  };

  window.updateMessage = (val) => {
    inquiryData.message = val;
  };

  window.handlePhotoUpload = (input) => {
    const container = document.getElementById("upload-preview-container");
    if (!container) return;
    container.innerHTML = "";
    inquiryData.photos = [];
    
    if (input.files) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Str = e.target.result;
          inquiryData.photos.push(base64Str);
          
          // Render preview thumbnail
          const thumb = document.createElement("div");
          thumb.className = "w-12 h-12 rounded-lg border border-slate-200 overflow-hidden relative";
          thumb.innerHTML = `<img src="${base64Str}" class="w-full h-full object-cover">`;
          container.appendChild(thumb);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const updateLiveOverview = () => {
    const s = document.getElementById("live-val-service");
    const o = document.getElementById("live-val-object");
    const sc = document.getElementById("live-val-scope");
    const d = document.getElementById("live-val-date");
    const l = document.getElementById("live-val-location");
    const n = document.getElementById("live-val-name");

    if (s) s.innerText = inquiryData.service || "-";
    if (o) o.innerText = inquiryData.object || "-";
    if (sc) {
      sc.innerText = `${inquiryData.size || '80'} m² | ${inquiryData.rooms || '3'} Zi | ${inquiryData.bathrooms || '1'} Bad | ${inquiryData.windows || '8'} Fen`;
    }
    if (d) {
      if (inquiryData.date) {
        const parts = inquiryData.date.split("-");
        d.innerText = parts.length === 3 ? `${parts[2]}.${parts[1]}.${parts[0]}` : inquiryData.date;
      } else {
        d.innerText = "-";
      }
    }
    if (l) l.innerText = inquiryData.location || "-";
    if (n) n.innerText = inquiryData.name || "-";
  };

  window.navigateStep = (direction) => {
    const nextBtn = document.getElementById("inquiry-next");
    const prevBtn = document.getElementById("inquiry-prev");

    if (direction === 1) {
      if (currentInquiryStep === 4) {
        if (!inquiryData.location.trim()) {
          alert(document.documentElement.lang === "sq" ? "Ju lutem shkruani adresën dhe qytetin!" : "Bitte geben Sie Adresse & Ort an!");
          return;
        }
      }
      if (currentInquiryStep === 5) {
        if (!inquiryData.name.trim() || !inquiryData.email.trim()) {
          alert(document.documentElement.lang === "sq" ? "Ju lutem plotësoni emrin dhe adresën e emailit!" : "Bitte füllen Sie Name und E-Mail-Adresse aus!");
          return;
        }
        submitInquiry();
        return;
      }
    }

    currentInquiryStep += direction;

    if (currentInquiryStep < 1) currentInquiryStep = 1;
    if (currentInquiryStep > 5) currentInquiryStep = 5;

    document.querySelectorAll(".step-panel").forEach((panel, idx) => {
      if (idx + 1 === currentInquiryStep) {
        panel.classList.remove("hidden");
      } else {
        panel.classList.add("hidden");
      }
    });

    for (let i = 1; i <= 5; i++) {
      const tab = document.getElementById(`step-tab-${i}`);
      if (!tab) continue;
      const numSpan = tab.querySelector("span");
      if (i < currentInquiryStep) {
        tab.className = "flex items-center space-x-2 text-slate-500 shrink-0";
        if (numSpan) {
          numSpan.className = "w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px]";
          numSpan.innerHTML = `
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
          `;
        }
      } else if (i === currentInquiryStep) {
        tab.className = "flex items-center space-x-2 text-blue-600 font-bold shrink-0";
        if (numSpan) {
          numSpan.className = "w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]";
          numSpan.innerHTML = `${i}`;
        }
      } else {
        tab.className = "flex items-center space-x-2 text-slate-400 shrink-0";
        if (numSpan) {
          numSpan.className = "w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px]";
          numSpan.innerHTML = `${i}`;
        }
      }
    }

    if (prevBtn) {
      if (currentInquiryStep === 1) {
        prevBtn.classList.add("opacity-50", "cursor-not-allowed");
        prevBtn.disabled = true;
      } else {
        prevBtn.classList.remove("opacity-50", "cursor-not-allowed");
        prevBtn.disabled = false;
      }
    }

    if (nextBtn) {
      if (currentInquiryStep === 5) {
        nextBtn.innerText = document.documentElement.lang === "sq" ? "Dërgo Kërkesën" : "Anfrage absenden";
      } else {
        nextBtn.innerText = document.documentElement.lang === "sq" ? "Vazhdo" : "Weiter";
      }
    }
  };

  const submitInquiry = async () => {
    const loader = document.getElementById("form-overlay-loader");
    const success = document.getElementById("form-overlay-success");

    if (loader) {
      loader.classList.remove("opacity-0", "pointer-events-none");
      loader.classList.add("opacity-100");
    }

    try {
      await InquiryService.addInquiry({
        name: inquiryData.name,
        phone: inquiryData.phone,
        email: inquiryData.email,
        service: inquiryData.service,
        size: inquiryData.size,
        rooms: inquiryData.rooms,
        bathrooms: inquiryData.bathrooms,
        windows: inquiryData.windows,
        address: inquiryData.location,
        date: inquiryData.date,
        photos: inquiryData.photos,
        message: inquiryData.message
      });

      setTimeout(() => {
        if (loader) {
          loader.classList.remove("opacity-100");
          loader.classList.add("opacity-0", "pointer-events-none");
        }
        if (success) {
          success.classList.remove("opacity-0", "pointer-events-none");
          success.classList.add("opacity-100");
        }

        const formContainer = document.getElementById("inquiry-form-container");
        if (formContainer) {
          formContainer.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 1000);
    } catch (err) {
      console.error(err);
      alert("Error submitting request.");
      if (loader) {
        loader.classList.remove("opacity-100");
        loader.classList.add("opacity-0", "pointer-events-none");
      }
    }
  };

  // --- Reviews Slider & Submission Form Control ---
  let approvedReviews = [];
  let activeReviewIndex = 0;
  let currentSubmitRating = 5;

  window.openReviewModal = () => {
    const modal = document.getElementById("review-modal");
    const modalCard = document.getElementById("review-modal-card");
    if (modal && modalCard) {
      modal.classList.remove("opacity-0", "pointer-events-none");
      modalCard.classList.remove("scale-95");
      modalCard.classList.add("scale-100");
    }
  };

  window.closeReviewModal = () => {
    const modal = document.getElementById("review-modal");
    const modalCard = document.getElementById("review-modal-card");
    if (modal && modalCard) {
      modal.classList.add("opacity-0", "pointer-events-none");
      modalCard.classList.remove("scale-100");
      modalCard.classList.add("scale-95");
    }
    const form = document.getElementById("add-review-form");
    if (form) form.reset();
    setStarRating(5);
  };

  window.setStarRating = (rating) => {
    currentSubmitRating = rating;
    const ratingValText = document.getElementById("star-rating-val");
    if (ratingValText) {
      ratingValText.innerText = `${rating.toFixed(1)} / 5.0`;
    }

    for (let i = 1; i <= 5; i++) {
      const star = document.getElementById(`star-${i}`);
      if (star) {
        if (i <= rating) {
          star.classList.add("text-amber-400");
          star.classList.remove("text-slate-300");
        } else {
          star.classList.remove("text-amber-400");
          star.classList.add("text-slate-300");
        }
      }
    }
  };

  window.submitReview = async (event) => {
    event.preventDefault();
    const name = document.getElementById("rev-name").value;
    const email = document.getElementById("rev-email").value;
    const service = document.getElementById("rev-service").value;
    const text = document.getElementById("rev-text").value;

    try {
      await ReviewService.addReview(name, email, service, currentSubmitRating, text);
      alert(document.documentElement.lang === "sq" 
        ? "Vlerësimi juaj u dërgua me sukses dhe do të shfaqet pasi të miratohet nga administratori!" 
        : "Ihre Bewertung wurde erfolgreich gesendet und wird angezeigt, sobald sie vom Administrator freigegeben wurde!");
      closeReviewModal();
    } catch (err) {
      console.error("Failed to submit review:", err);
      alert("Failed to submit review. Please try again.");
    }
  };

  const loadApprovedReviews = async () => {
    try {
      approvedReviews = await ReviewService.fetchApprovedReviews();
      renderReviewsSlider();
    } catch (err) {
      console.error("Failed to load approved reviews:", err);
    }
  };

  window.prevReview = () => {
    if (approvedReviews.length === 0) return;
    activeReviewIndex = (activeReviewIndex - 1 + approvedReviews.length) % approvedReviews.length;
    renderReviewsSlider();
  };

  window.nextReview = () => {
    if (approvedReviews.length === 0) return;
    activeReviewIndex = (activeReviewIndex + 1) % approvedReviews.length;
    renderReviewsSlider();
  };

  const renderReviewsSlider = () => {
    const list = document.getElementById("reviews-cards-list");
    if (!list) return;

    if (approvedReviews.length === 0) {
      list.innerHTML = `
        <div class="bg-blue-50/40 rounded-3xl p-10 max-w-2xl mx-auto border border-slate-100 text-center text-slate-400">
          <p class="font-bold">Keine Bewertungen vorhanden</p>
        </div>
      `;
      return;
    }

    const review = approvedReviews[activeReviewIndex];
    let starsHtml = "";
    for (let i = 1; i <= 5; i++) {
      starsHtml += `
        <svg class="w-5 h-5 ${i <= review.rating ? 'text-amber-400' : 'text-slate-200'}" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      `;
    }

    list.innerHTML = `
      <div class="bg-blue-50/40 rounded-3xl p-8 md:p-10 max-w-2xl mx-auto border border-slate-100/60 shadow-md relative text-left">
        <div class="flex items-center space-x-1.5 mb-6">${starsHtml}</div>
        <p class="text-slate-800 text-base md:text-lg italic font-medium leading-relaxed">"${review.text}"</p>
        <div class="flex items-center space-x-3 mt-8 border-t border-slate-100 pt-6">
          <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
            ${review.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 class="text-sm font-bold text-slate-900">${review.name}</h4>
            <span class="text-slate-400 text-xs font-semibold block">${review.service || 'Service'}</span>
          </div>
        </div>
      </div>
    `;
  };

  // --- Dynamic Projects/Gallery Controller ---
  window.projectsData = [];
  let activeProjectId = null;

  window.selectProject = (id) => {
    activeProjectId = id;
    const project = window.projectsData.find(p => p.id === id);
    if (!project) return;

    const beforeImg = document.getElementById("project-before-img");
    const afterImg = document.getElementById("project-after-img");
    const activeBadge = document.getElementById("project-active-badge");
    const activeTitle = document.getElementById("project-active-title");
    const activeMetadata = document.getElementById("project-active-metadata");

    if (beforeImg) beforeImg.style.backgroundImage = `url('${project.beforeImage || project.image}')`;
    if (afterImg) afterImg.style.backgroundImage = `url('${project.image}')`;

    if (activeBadge) activeBadge.innerText = project.category;
    if (activeTitle) activeTitle.innerText = project.title;
    if (activeMetadata) activeMetadata.innerText = project.metadata;

    // Highlight selected pill
    document.querySelectorAll(".project-pill-card").forEach(card => {
      card.classList.remove("border-blue-600", "ring-2", "ring-blue-600/10", "bg-blue-50/20");
      card.classList.add("border-slate-200/60");
    });
    const activePill = document.querySelector(`.project-pill-card[data-id="${id}"]`);
    if (activePill) {
      activePill.classList.remove("border-slate-200/60");
      activePill.classList.add("border-blue-600", "ring-2", "ring-blue-600/10", "bg-blue-50/20");
    }
  };

  window.renderProjectsList = () => {
    const listContainer = document.getElementById("project-pills-list");
    if (!listContainer) return;
    listContainer.innerHTML = "";

    window.projectsData.forEach(project => {
      const isActive = project.id === activeProjectId;
      const card = document.createElement("div");
      card.setAttribute("data-id", project.id);
      card.onclick = () => selectProject(project.id);
      card.className = `project-pill-card bg-white border rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:border-blue-300 hover:bg-blue-50/10 transition-all shadow-sm ${isActive ? 'border-blue-600 ring-2 ring-blue-600/10 bg-blue-50/20' : 'border-slate-200/60'}`;
      
      card.innerHTML = `
        <div class="flex items-center space-x-3 text-left">
          <div class="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
            <img src="${project.image}" class="w-full h-full object-cover">
          </div>
          <div>
            <span class="text-[10px] font-bold text-blue-600 uppercase tracking-widest block">${project.category}</span>
            <h4 class="text-sm font-bold text-slate-800 leading-tight mt-1">${project.title}</h4>
            <span class="text-[10px] text-slate-400 font-semibold block mt-0.5">${project.metadata}</span>
          </div>
        </div>
      `;
      listContainer.appendChild(card);
    });
  };

  window.openProjectDetailModal = () => {
    const project = window.projectsData.find(p => p.id === activeProjectId);
    if (!project) return;

    const modalBadge = document.getElementById("modal-project-badge");
    const modalTitle = document.getElementById("modal-project-title");
    const modalMetadata = document.getElementById("modal-project-metadata");
    const modalBeforeImg = document.getElementById("modal-project-before-img");
    const modalAfterImg = document.getElementById("modal-project-after-img");
    const modalText = document.getElementById("modal-project-text");

    if (modalBadge) modalBadge.innerText = project.category;
    if (modalTitle) modalTitle.innerText = project.title;
    if (modalMetadata) modalMetadata.innerText = project.metadata;
    if (modalBeforeImg) modalBeforeImg.style.backgroundImage = `url('${project.beforeImage || project.image}')`;
    if (modalAfterImg) modalAfterImg.style.backgroundImage = `url('${project.image}')`;
    if (modalText) modalText.innerText = project.text;

    const modal = document.getElementById("project-detail-modal");
    const card = document.getElementById("project-detail-card");
    if (modal && card) {
      modal.classList.remove("opacity-0", "pointer-events-none");
      card.classList.remove("scale-95");
      card.classList.add("scale-100");
    }
  };

  window.closeProjectDetailModal = () => {
    const modal = document.getElementById("project-detail-modal");
    const card = document.getElementById("project-detail-card");
    if (modal && card) {
      modal.classList.add("opacity-0", "pointer-events-none");
      card.classList.remove("scale-100");
      card.classList.add("scale-95");
    }
  };

  // FAQ implementation
  const faqData = [
    {
      id: "faq-1",
      q: "Welche Reinigungsleistungen bieten Sie an?",
      qSq: "Çfarë shërbimesh pastrimi ofroni?",
      a: "Wir bieten ein umfassendes Spektrum: Unterhaltsreinigung, Büroreinigung, Glas- & Fensterreinigung, Baureinigung, Sonderreinigung sowie Gartenpflege und Winterdienst für Ihr Gebäude.",
      aSq: "Ne ofrojmë një gamë të plotë: pastrim të rregullt, pastrim zyrash, pastrim xhamash & dritaresh, pastrim pas ndërtimit, pastrime speciale si dhe mirëmbajtje kopshtesh e shërbim dimëror për objektin tuaj."
    },
    {
      id: "faq-2",
      q: "Wie viel kostet eine professionelle Reinigung?",
      qSq: "Sa kushton një pastrim profesional?",
      a: "Die Kosten richten sich transparent nach der Gesamtfläche in m², der Anzahl der Zimmer und Fenster sowie der gewünschten Serviceart. Wir erstellen für Sie ein kostenloses Festpreis-Angebot.",
      aSq: "Kostot përcaktohen në mënyrë transparente sipas sipërfaqes në m², numrit të dhomave dhe dritareve, si dhe llojit të shërbimit. Ne krijojmë një ofertë falas me çmim fiks për ju."
    },
    {
      id: "faq-3",
      q: "Wie läuft der Angebotsprozess ab?",
      qSq: "Si funksionon procesi i ofertimit?",
      a: "Nach Ihrer Anfrage über unseren Online-Kalkulator prüfen wir die Details. Sie erhalten kurzfristig per E-Mail ein individuelles Festpreisangebot direkt über unser System.",
      aSq: "Pas kërkesës suaj përmes kalkulatorit tonë online, ne shqyrtojmë detajet. Ju do të pranoni shpejt me email një ofertë me çmim fiks direkt nga sistemi ynë."
    }
  ];

  let activeFaqId = "faq-1";

  window.toggleFaq = (id) => {
    activeFaqId = activeFaqId === id ? null : id;
    renderFaq();
  };

  const renderFaq = () => {
    const colLeft = document.getElementById("faq-col-left");
    const colRight = document.getElementById("faq-col-right");
    if (!colLeft || !colRight) return;

    const isSq = document.documentElement.lang === "sq";

    let leftHTML = "";
    let rightHTML = "";

    faqData.forEach((item, index) => {
      const isActive = item.id === activeFaqId;
      const questionText = isSq ? item.qSq : item.q;
      const answerText = isSq ? item.aSq : item.a;

      const faqItemHTML = `
        <div onclick="toggleFaq('${item.id}')" class="group transition-all duration-300 rounded-3xl p-6 cursor-pointer select-none text-left ${isActive ? 'bg-blue-600 border border-blue-600 text-white shadow-lg' : 'bg-blue-50/40 hover:bg-blue-50/80 border border-slate-100/60 text-slate-800' }">
          <div class="flex justify-between items-center gap-4">
            <h3 class="font-bold text-sm md:text-base leading-snug">${questionText}</h3>
            <span class="text-xl md:text-2xl font-normal shrink-0 ${isActive ? 'text-blue-100' : 'text-slate-400 group-hover:text-blue-600' }">
              ${isActive ? '—' : '+'}
            </span>
          </div>
          ${isActive ? `<p class="text-xs md:text-sm text-blue-50/90 mt-4 leading-relaxed font-semibold transition-all duration-300">${answerText}</p>` : ''}
        </div>
      `;

      if (index % 2 === 0) {
        leftHTML += faqItemHTML;
      } else {
        rightHTML += faqItemHTML;
      }
    });

    colLeft.innerHTML = leftHTML;
    colRight.innerHTML = rightHTML;
  };

  // --- Legal Modal Controller (Impressum, Datenschutz, AGB) ---
  window.openLegalModal = (type) => {
    const titleEl = document.getElementById("legal-title");
    const bodyEl = document.getElementById("legal-content-body");
    if (!titleEl || !bodyEl) return;

    if (type === "impressum") {
      titleEl.innerText = "Impressum";
      bodyEl.innerHTML = `
        <div class="space-y-4">
          <div>
            <h4 class="font-extrabold text-slate-900 text-xs uppercase mb-1">Angaben gemäß § 5 TMG</h4>
            <p class="text-slate-600">
              DuAri Hausmeister<br>
              Münchner Straße 12<br>
              80331 München<br>
              Deutschland
            </p>
          </div>
          <div>
            <h4 class="font-extrabold text-slate-900 text-xs uppercase mb-1">Kontakt</h4>
            <p class="text-slate-600">
              Telefon: ${websiteSettings.phone || "+49 (0) 172 913 7112"}<br>
              E-Mail: ${websiteSettings.email || "duariservice@gmail.com"}
            </p>
          </div>
        </div>
      `;
    } else if (type === "datenschutz") {
      titleEl.innerText = "Datenschutzerklärung";
      bodyEl.innerHTML = `
        <p class="text-slate-600">Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften (DSGVO) sowie dieser Datenschutzerklärung. Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.</p>
      `;
    } else if (type === "agb") {
      titleEl.innerText = "Allgemeine Geschäftsbedingungen (AGB)";
      bodyEl.innerHTML = `
        <p class="text-slate-600">Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge und Dienstleistungen zwischen DuAri Hausmeister und unseren Kunden.</p>
      `;
    }

    const modal = document.getElementById("legal-modal");
    const card = document.getElementById("legal-card");
    if (modal && card) {
      modal.classList.remove("opacity-0", "pointer-events-none");
      card.classList.remove("scale-95");
      card.classList.add("scale-100");
    }
  };

  window.closeLegalModal = () => {
    const modal = document.getElementById("legal-modal");
    const card = document.getElementById("legal-card");
    if (modal && card) {
      modal.classList.add("opacity-0", "pointer-events-none");
      card.classList.remove("scale-100");
      card.classList.add("scale-95");
    }
  };

  // --- Dynamic Content Initializer ---
  let websiteSettings = {};
  
  const initializeDynamicContent = async () => {
    try {
      // 1. Fetch & Apply Settings
      websiteSettings = await SettingsService.fetchSettings();
      if (websiteSettings) {
        document.querySelectorAll('a[href^="tel:"]').forEach(el => {
          el.href = `tel:${websiteSettings.phone.replace(/\s+/g, '')}`;
          el.innerHTML = el.innerHTML.replace(/\+49.*/g, websiteSettings.phone).replace(/\(\+49.*\)/g, `(${websiteSettings.phone})`);
        });
        document.querySelectorAll('a[href*="wa.me"]').forEach(el => {
          el.href = `https://wa.me/${websiteSettings.whatsapp.replace(/\s+/g, '')}`;
        });
        document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
          el.href = `mailto:${websiteSettings.email}`;
          el.innerHTML = el.innerHTML.replace(/duariservice@gmail.com/g, websiteSettings.email);
        });
        
        // Render Address & Working Hours where applicable
        const hoursEl = document.querySelector('[data-i18n="contactHoursVal"]');
        if (hoursEl) hoursEl.innerText = websiteSettings.working_hours;
        
        const contactAddressText = document.querySelector('a[href*="maps"] span.text-base');
        if (contactAddressText) contactAddressText.innerText = websiteSettings.address;
      }

      // 2. Fetch & Render Services
      const services = await ServiceManager.fetchServices();

        // Also update the calculator selection
        const calculatorServicesContainer = document.querySelector('#step-content-1 .grid');
        if (calculatorServicesContainer) {
          calculatorServicesContainer.innerHTML = "";
          services.forEach((srv, index) => {
            const srvCard = document.createElement("div");
            srvCard.setAttribute("onclick", `selectService('${srv.title}')`);
            srvCard.id = `service-opt-${index + 1}`;
            srvCard.className = `service-card bg-slate-50 border ${index === 0 ? 'border-blue-600 bg-blue-50/20' : 'border-slate-100'} rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-300 hover:bg-blue-50/20 transition-all text-center`;
            srvCard.innerHTML = `
              <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3 text-lg font-bold">
                ${srv.title.charAt(0)}
              </div>
              <span class="text-xs font-bold text-slate-700 leading-tight">${srv.title}</span>
            `;
            calculatorServicesContainer.appendChild(srvCard);
          });
          selectService(services[0].title);
        }

      // 3. Fetch & Render Gallery Projects
      const dbProjects = await ProjectService.fetchProjects();
      if (dbProjects && dbProjects.length > 0) {
        window.projectsData = dbProjects.map(proj => ({
          id: proj.id,
          category: proj.category,
          title: proj.title,
          metadata: proj.stats,
          image: proj.after_photo,
          beforeImage: proj.before_photo,
          text: `Vorher-/Nachher-Vergleich für das Projekt: ${proj.title}. Statistik: ${proj.stats}.`
        }));
        
        window.selectProject(window.projectsData[0].id);
        window.renderProjectsList();
      }

      // Vorteile removed as requested
    } catch (e) {
      console.error("Dynamic content loading failed:", e);
    }
  };

  // --- General Contact Form Listener ---
  const contactForm = document.getElementById("contact-form");
  const submitSpinner = document.getElementById("submit-spinner");
  const submitText = document.getElementById("submit-text");
  const successModal = document.getElementById("success-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      if (submitSpinner) submitSpinner.classList.remove("hidden");
      if (submitText) submitText.classList.add("hidden");

      const name = document.getElementById("contact-name").value;
      const email = document.getElementById("contact-email").value;
      const phone = document.getElementById("contact-phone") ? document.getElementById("contact-phone").value : "";
      const subject = document.getElementById("contact-subject") ? document.getElementById("contact-subject").value : "Allgemeine Anfrage";
      const message = document.getElementById("contact-message").value;

      try {
        await ContactService.addMessage({
          name,
          email,
          phone,
          message: `${subject}: ${message}`
        });

        submitBtn.disabled = false;
        if (submitSpinner) submitSpinner.classList.add("hidden");
        if (submitText) submitText.classList.remove("hidden");

        if (successModal) {
          successModal.classList.remove("hidden");
          successModal.classList.add("flex");
        }

        contactForm.reset();
      } catch (err) {
        console.error("Contact Message submission failed:", err);
        alert("Failed to submit message.");
        submitBtn.disabled = false;
        if (submitSpinner) submitSpinner.classList.add("hidden");
        if (submitText) submitText.classList.remove("hidden");
      }
    });
  }

  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener("click", () => {
      successModal.classList.add("hidden");
      successModal.classList.remove("flex");
    });
    successModal.addEventListener("click", (e) => {
      if (e.target === successModal) {
        successModal.classList.add("hidden");
        successModal.classList.remove("flex");
      }
    });
  }

  // General contact inquiry form (the static footer form)
  window.submitContactForm = async (event) => {
    event.preventDefault();
    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const phone = document.getElementById("contact-phone") ? document.getElementById("contact-phone").value : "";
    const service = document.getElementById("contact-service") ? document.getElementById("contact-service").value : "Büroreinigung";
    const message = document.getElementById("contact-message").value;

    try {
      await InquiryService.addInquiry({
        name,
        email,
        phone,
        service,
        size: "0",
        rooms: "0",
        bathrooms: "0",
        windows: "0",
        address: "Footer Form",
        date: "Sofort",
        photos: [],
        message: message
      });

      alert(document.documentElement.lang === "sq"
        ? "Kërkesa juaj u dërgua me sukses! Do t'ju kontaktojmë së shpejti."
        : "Ihre Anfrage wurde erfolgreich gesendet! Wir werden uns in Kürze bei Ihnen melden.");

      const form = document.getElementById("contact-inquiry-form");
      if (form) form.reset();
    } catch (e) {
      console.error(e);
      alert("Error submitting request.");
    }
  };

  // --- Interactive Services Section Controller ---
  const servicesInteractiveData = [
    {
      id: "srv-1",
      title: "Beste Ergebnisse",
      titleSq: "Rezultatet më të mira",
      icon: `<svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>`,
      text: "Präzise Dämmverfahren, hochwertige Materialien (z.B. Steinwolle, Kautschuk) und makellose Ausführung sorgen für dauerhafte Energieeffizienz und höchste Einsparung.",
      textSq: "Metoda precize të izolimit, materiale cilësore (p.sh. lesh guri, kautshuk) dhe ekzekutim i përsosur sigurojnë efikasitet të qëndrueshëm të energjisë dhe kursime maksimale.",
      image: "warmeschutz.jpg",
      badgeTitle: "Beste Ergebnisse & Qualität",
      badgeTitleSq: "Rezultatet më të mira & Cilësi",
      badgeLabel: "Qualitätsstandard",
      badgeLabelSq: "Standard Cilësie"
    },
    {
      id: "srv-2",
      title: "Geschultes Team",
      titleSq: "Staf i trajnuar",
      icon: `<svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`,
      text: "Unsere Fachkräfte sind zertifiziert, langjährig erfahren und arbeiten präzise nach den anerkannten WKSB-Regeln der Technik und aktuellen GEG-Vorgaben.",
      textSq: "Specialistët tanë janë të certifikuar, me përvojë shumëvjeçare dhe punojnë saktësisht sipas rregullave të pranuara teknike WKSB dhe direktivave të GEG.",
      image: "kaelteschutz.jpg",
      badgeTitle: "Erfahrenes Team",
      badgeTitleSq: "Staf me përvojë",
      badgeLabel: "Zertifiziert",
      badgeLabelSq: "I Certifikuar"
    },
    {
      id: "srv-3",
      title: "Schneller & flexibler Service",
      titleSq: "Shërbim i shpejtë & fleksibil",
      icon: `<svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
      text: "Flexible Zeiteinteilung, rasche Reaktionszeiten und unkomplizierte Terminabsprachen sichern eine reibungslose Projektdurchführung ohne Betriebsunterbrechungen.",
      textSq: "Planifikimi fleksibil i kohës, kohë e shpejtë e reagimit dhe koordinimi i thjeshtë sigurojnë zbatimin e qetë të projektit pa ndërprerje të punës.",
      image: "brandschutz.jpg",
      badgeTitle: "Flexibler Projekt-Ablauf",
      badgeTitleSq: "Proces Fleksibil i Projektit",
      badgeLabel: "Termintreue",
      badgeLabelSq: "Saktësi Afatesh"
    },
    {
      id: "srv-4",
      title: "100% Zufriedenheitsgarantie",
      titleSq: "Garanci e plotë e kënaqësisë",
      icon: `<svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>`,
      text: "Ihre Zufriedenheit ist unser oberstes Qualitätsversprechen. Sollte ein Detail nicht Ihren Wünschen entsprechen, bessern wir es unverzüglich kostenfrei nach.",
      textSq: "Kënaqësia juaj është premtimi ynë kryesor i cilësisë. Nëse një detaj nuk përputhet me dëshirat tuaja, ne e përmirësojmë menjëherë pa asnjë pagesë.",
      image: "worker.png",
      badgeTitle: "Zufriedenheitsversprechen",
      badgeTitleSq: "Prometim Kënaqësie",
      badgeLabel: "Kostenfreie Nachbesserung",
      badgeLabelSq: "Përmirësim Falas"
    }
  ];

  window.activeServiceIndex = 0;

  window.setServiceActive = (index) => {
    window.activeServiceIndex = index;
    const isSq = document.documentElement.lang === "sq";
    const data = servicesInteractiveData[index];
    if (!data) return;

    const sliderImg = document.getElementById("service-slider-img");
    const overlayBadgeTitle = document.getElementById("service-overlay-badge-title");
    const overlayBadgeLabel = document.getElementById("service-overlay-badge-label");
    const overlaySubtext = document.getElementById("service-overlay-subtext");

    if (sliderImg) sliderImg.src = data.image;
    if (overlayBadgeTitle) overlayBadgeTitle.innerText = isSq ? data.badgeTitleSq : data.badgeTitle;
    if (overlayBadgeLabel) overlayBadgeLabel.innerText = isSq ? data.badgeLabelSq : data.badgeLabel;
    if (overlaySubtext) overlaySubtext.innerText = isSq ? data.titleSq : data.title;

    for (let i = 0; i < 4; i++) {
      const dot = document.getElementById(`service-dot-${i}`);
      if (dot) {
        if (i === index) {
          dot.className = "w-2.5 h-2.5 rounded-full bg-blue-600 cursor-pointer transition-all duration-300";
        } else {
          dot.className = "w-2.5 h-2.5 rounded-full bg-slate-300 cursor-pointer transition-all duration-300";
        }
      }
    }

    renderInteractiveServices();
  };

  const renderInteractiveServices = () => {
    const leftCol = document.getElementById("services-left-col");
    const rightCol = document.getElementById("services-right-col");
    if (!leftCol || !rightCol) return;

    const isSq = document.documentElement.lang === "sq";

    leftCol.innerHTML = "";
    rightCol.innerHTML = "";

    servicesInteractiveData.forEach((srv, index) => {
      const isActive = index === window.activeServiceIndex;
      const card = document.createElement("div");
      card.onclick = () => setServiceActive(index);
      card.className = `transition-all duration-300 rounded-3xl p-6 md:p-8 cursor-pointer select-none text-center flex flex-col items-center justify-center relative ${
        isActive 
          ? 'bg-white border-2 border-blue-600 shadow-xl' 
          : 'bg-blue-50/20 hover:bg-blue-50/40 border border-slate-100/60 shadow-sm'
      }`;

      const titleText = isSq ? srv.titleSq : srv.title;
      const descText = isSq ? srv.textSq : srv.text;
      const clickText = isSq ? "Kliko këtu për foto & detaje" : "Hier klicken für Foto & Details";

      card.innerHTML = `
        ${isActive ? `
          <span class="absolute top-4 right-4 inline-flex items-center space-x-1 text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200/50 px-2 py-0.5 rounded-full select-none">
            <svg class="w-3 h-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Aktiv</span>
          </span>
        ` : ''}

        <div class="w-14 h-14 rounded-full bg-blue-50/50 border border-dashed border-blue-200 flex items-center justify-center text-blue-600 mb-5 relative shrink-0">
          ${srv.icon}
        </div>

        <h3 class="text-lg md:text-xl font-bold text-slate-900 leading-tight">${titleText}</h3>
        <p class="mt-3 text-slate-500 text-xs md:text-sm leading-relaxed max-w-[280px]">${descText}</p>
        
        <div class="mt-6 pt-4 border-t border-slate-100 w-full text-center text-blue-600 hover:text-blue-700 text-xs font-bold transition-all hover:underline">
          <span>${clickText} &rarr;</span>
        </div>
      `;

      if (index < 2) {
        leftCol.appendChild(card);
      } else {
        rightCol.appendChild(card);
      }
    });
  };

  // --- INITIALIZATION TRIGGERS ---
  initFormState();
  loadApprovedReviews();
  initializeDynamicContent();
  renderFaq();
  if (window.setServiceActive) {
    window.setServiceActive(0);
  }
});
