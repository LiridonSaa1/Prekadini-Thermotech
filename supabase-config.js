// Supabase Connection Configuration
let SUPABASE_URL = localStorage.getItem("supabase_url") || "https://kwzqspmyslwprwtzupuu.supabase.co"; 
let SUPABASE_ANON_KEY = localStorage.getItem("supabase_anon_key") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3enFzcG15c2x3cHJ3dHp1cHV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0MjUyMTQsImV4cCI6MjEwMzAwMTIxNH0.QH9_k2T4vnf0b7saKRx9WzYyEpPYj_eQ1I6woWrp_Zo";

let supabaseClient = null;

// Initialize Supabase if credentials are provided
if (SUPABASE_URL && SUPABASE_ANON_KEY && typeof supabase !== 'undefined') {
  try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("Supabase Client initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Supabase:", error);
  }
}

// Fallback Mock database using localStorage
const mockDb = {
  // --- INQUIRIES ---
  getInquiries: async () => {
    let data = JSON.parse(localStorage.getItem("prekadini_inquiries"));
    if (!data) {
      data = [
        {
          id: "inq-1",
          name: "Anna Müller",
          phone: "+49 170 1122334",
          email: "anna.mueller@example.de",
          service: "Büroreinigung",
          size: "150",
          rooms: "4",
          bathrooms: "2",
          windows: "12",
          address: "Hauptstraße 45, 80331 München",
          date: "2026-09-01",
          photos: [],
          status: "Neu",
          created_at: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: "inq-2",
          name: "Hans Schmidt",
          phone: "+49 89 5556677",
          email: "hans.schmidt@weber.com",
          service: "Glas- & Fensterreinigung",
          size: "80",
          rooms: "3",
          bathrooms: "1",
          windows: "8",
          address: "Leopoldstraße 12, 80802 München",
          date: "2026-08-25",
          photos: [],
          status: "Kontaktiert",
          created_at: new Date(Date.now() - 86400000 * 2).toISOString()
        }
      ];
      localStorage.setItem("prekadini_inquiries", JSON.stringify(data));
    }
    return data;
  },
  insertInquiry: async (inq) => {
    const list = await mockDb.getInquiries();
    const item = {
      id: Math.random().toString(36).substring(2, 9),
      photos: inq.photos || [],
      status: "Neu",
      created_at: new Date().toISOString(),
      ...inq
    };
    list.unshift(item);
    localStorage.setItem("prekadini_inquiries", JSON.stringify(list));
    return item;
  },
  updateInquiryStatus: async (id, status) => {
    const list = await mockDb.getInquiries();
    const updated = list.map(item => item.id === id ? { ...item, status } : item);
    localStorage.setItem("prekadini_inquiries", JSON.stringify(updated));
    return true;
  },
  deleteInquiry: async (id) => {
    const list = await mockDb.getInquiries();
    const filtered = list.filter(item => item.id !== id);
    localStorage.setItem("prekadini_inquiries", JSON.stringify(filtered));
    return true;
  },

  // --- CONTACT MESSAGES ---
  getContactMessages: async () => {
    let data = JSON.parse(localStorage.getItem("prekadini_contact_messages"));
    if (!data) {
      data = [
        {
          id: "msg-1",
          name: "Jonas Becker",
          email: "jonas@becker-holding.de",
          phone: "+49 176 998877",
          message: "Hallo, wir benötigen ein Angebot für eine wöchentliche Büroreinigung ab Oktober. Bitte melden Sie sich bei uns.",
          read: false,
          created_at: new Date(Date.now() - 7200000).toISOString()
        }
      ];
      localStorage.setItem("prekadini_contact_messages", JSON.stringify(data));
    }
    return data;
  },
  insertContactMessage: async (msg) => {
    const list = await mockDb.getContactMessages();
    const item = {
      id: Math.random().toString(36).substring(2, 9),
      read: false,
      created_at: new Date().toISOString(),
      ...msg
    };
    list.unshift(item);
    localStorage.setItem("prekadini_contact_messages", JSON.stringify(list));
    return item;
  },
  markContactMessageRead: async (id, read) => {
    const list = await mockDb.getContactMessages();
    const updated = list.map(item => item.id === id ? { ...item, read } : item);
    localStorage.setItem("prekadini_contact_messages", JSON.stringify(updated));
    return true;
  },
  deleteContactMessage: async (id) => {
    const list = await mockDb.getContactMessages();
    const filtered = list.filter(item => item.id !== id);
    localStorage.setItem("prekadini_contact_messages", JSON.stringify(filtered));
    return true;
  },

  // --- SERVICES ---
  getServices: async () => {
    let data = JSON.parse(localStorage.getItem("prekadini_services"));
    // Auto-clear if the data contains cleaning services or lacks description
    if (data && (
      data.some(s => s.title.includes("reinigung") || s.title.includes("Reinigung") || s.title.includes("pflege")) ||
      !data[0] || !data[0].description
    )) {
      localStorage.removeItem("prekadini_services");
      data = null;
    }
    if (!data) {
      data = [
        {
          id: "srv-1",
          title: "Wärmeschutz",
          price: "auf Anfrage",
          photo: "warmeschutz.jpg",
          description: "Dämmung von Heizungs- und Warmwasserleitungen. Minimiert Energieverluste spürbar.",
          checklist: ["Heizungsrohrdämmung", "Warmwasserleitungen", "Armaturen- & Flanschendämmung", "GEG-Konformität"],
          benefits: ["Energieersparnis", "Heizkostenreduktion", "CO2-Minderung"],
          active: true
        },
        {
          id: "srv-2",
          title: "Kälteschutz",
          price: "auf Anfrage",
          photo: "kaelteschutz.jpg",
          description: "Isolierung von Kälte- und Klimaleitungen. Verhindert zuverlässig Tauwasserbildung.",
          checklist: ["Klimaleitungskühlung", "Kaltwasserleitungen", "Tauwasservermeidung", "Korrosionsschutz"],
          benefits: ["Kondensatvermeidung", "Temperaturerhalt", "Langlebiger Systemschutz"],
          active: true
        },
        {
          id: "srv-3",
          title: "Schallschutz",
          price: "auf Anfrage",
          photo: "schallschutz.jpg",
          description: "Schallisolierung von Rohrleitungen und Lüftungen zur Minderung von Fließgeräuschen.",
          checklist: ["Rohrleitungsschallschutz", "Lüftungskanalschallschutz", "Körperschallminderung", "Sanitärleitungsdämmung"],
          benefits: ["Geräuschminderung", "Ruhiges Wohnen", "Normgerechter Schutz"],
          active: true
        },
        {
          id: "srv-4",
          title: "Brandschutz",
          price: "auf Anfrage",
          photo: "brandschutz.jpg",
          description: "Zertifizierte Brandabschottungen zur Einhaltung gesetzlicher Sicherheitsstandards.",
          checklist: ["Brandabschottungen S90/S120", "Rohrdurchführungen", "Kabelabschottung", "Zertifizierte Systemmontage"],
          benefits: ["Hohe Gebäudesicherheit", "Gesetzliche Konformität", "Rauchschutz im Brandfall"],
          active: true
        }
      ];
      localStorage.setItem("prekadini_services", JSON.stringify(data));
    }
    return data;
  },
  saveService: async (srv) => {
    const list = await mockDb.getServices();
    let updated;
    if (srv.id) {
      updated = list.map(item => item.id === srv.id ? { ...item, ...srv } : item);
    } else {
      const newItem = {
        id: "srv-" + Math.random().toString(36).substring(2, 9),
        checklist: [],
        benefits: [],
        active: true,
        ...srv
      };
      list.push(newItem);
      updated = list;
    }
    localStorage.setItem("prekadini_services", JSON.stringify(updated));
    return true;
  },
  deleteService: async (id) => {
    const list = await mockDb.getServices();
    const filtered = list.filter(item => item.id !== id);
    localStorage.setItem("prekadini_services", JSON.stringify(filtered));
    return true;
  },

  // --- PROJECTS ---
  getProjects: async () => {
    let data = JSON.parse(localStorage.getItem("prekadini_projects"));
    if (!data) {
      data = [
        {
          id: "proj-1",
          title: "Büroreinigung Hauptbahnhof",
          category: "Büroreinigung",
          stats: "100% Sauberkeit",
          before_photo: "kaelteschutz.jpg",
          after_photo: "schallschutz.jpg",
          created_at: new Date().toISOString()
        },
        {
          id: "proj-2",
          title: "Fensterreinigung Penthouse",
          category: "Glasreinigung",
          stats: "Streifenfreier Glanz",
          before_photo: "brandschutz.jpg",
          after_photo: "warmeschutz.jpg",
          created_at: new Date(Date.now() - 86400000).toISOString()
        }
      ];
      localStorage.setItem("prekadini_projects", JSON.stringify(data));
    }
    return data;
  },
  saveProject: async (proj) => {
    const list = await mockDb.getProjects();
    let updated;
    if (proj.id) {
      updated = list.map(item => item.id === proj.id ? { ...item, ...proj } : item);
    } else {
      const newItem = {
        id: "proj-" + Math.random().toString(36).substring(2, 9),
        created_at: new Date().toISOString(),
        ...proj
      };
      list.unshift(newItem);
      updated = list;
    }
    localStorage.setItem("prekadini_projects", JSON.stringify(updated));
    return true;
  },
  deleteProject: async (id) => {
    const list = await mockDb.getProjects();
    const filtered = list.filter(item => item.id !== id);
    localStorage.setItem("prekadini_projects", JSON.stringify(filtered));
    return true;
  },

  // --- VORTEILE ---
  getVorteile: async () => {
    let data = JSON.parse(localStorage.getItem("prekadini_vorteile"));
    if (!data) {
      data = [
        {
          id: "vor-1",
          title: "Zuverlässigkeit",
          description: "Wir erscheinen pünktlich und erledigen alle Aufgaben gewissenhaft nach Ihrem Wunsch.",
          photo: "warmeschutz.jpg"
        },
        {
          id: "vor-2",
          title: "Faire Preise",
          description: "Transparente Angebote ohne versteckte Nebenkosten. Sie zahlen nur, was vereinbart wurde.",
          photo: "kaelteschutz.jpg"
        },
        {
          id: "vor-3",
          title: "Erfahrenes Personal",
          description: "Unsere Mitarbeiter sind geschult, freundlich und arbeiten effizient mit Profi-Ausrüstung.",
          photo: "schallschutz.jpg"
        },
        {
          id: "vor-4",
          title: "Umweltschonend",
          description: "Wir nutzen ökologische Reinigungsmittel zum Schutz von Gesundheit und Umwelt.",
          photo: "brandschutz.jpg"
        }
      ];
      localStorage.setItem("prekadini_vorteile", JSON.stringify(data));
    }
    return data;
  },
  saveVorteile: async (items) => {
    localStorage.setItem("prekadini_vorteile", JSON.stringify(items));
    return true;
  },

  // --- WEBSITE SETTINGS ---
  getSettings: async () => {
    let data = JSON.parse(localStorage.getItem("prekadini_settings"));
    if (!data) {
      data = {
        phone: "+49 (0) 172 913 7112",
        email: "duariservice@gmail.com",
        address: "Münchner Straße 12, 80331 München",
        working_hours: "Mo. - Fr.: 08:00 - 17:00 Uhr",
        whatsapp: "491729137112",
        brevo_api_key: "",
        admin_password: "admin123",
        about_video_url: "work.mp4",
        services_label: "WER WIR SIND",
        services_subtitle: "Engagiert für effiziente<br><span class=\"text-blue-600\">professionelle Dämmung</span>.",
        services_tagline: "UNSERE LEISTUNGEN & EXPERTISE",
        services_title: "Professionelle Dämmung für<br><span class=\"text-blue-600\">Gewerbe, Industrie &amp; Privat</span>"
      };
      localStorage.setItem("prekadini_settings", JSON.stringify(data));
    }
    // Auto-migrate if any headings or labels are missing
    let modified = false;
    if (!data.about_video_url) { data.about_video_url = "work.mp4"; modified = true; }
    if (!data.services_label) { data.services_label = "WER WIR SIND"; modified = true; }
    if (!data.services_subtitle) { data.services_subtitle = "Engagiert für effiziente<br><span class=\"text-blue-600\">professionelle Dämmung</span>."; modified = true; }
    if (!data.services_tagline) { data.services_tagline = "UNSERE LEISTUNGEN & EXPERTISE"; modified = true; }
    if (!data.services_title) { data.services_title = "Professionelle Dämmung für<br><span class=\"text-blue-600\">Gewerbe, Industrie &amp; Privat</span>"; modified = true; }
    if (modified) {
      localStorage.setItem("prekadini_settings", JSON.stringify(data));
    }
    return data;
  },
  saveSettings: async (settings) => {
    const current = await mockDb.getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem("prekadini_settings", JSON.stringify(updated));
    return updated;
  },

  // --- REVIEWS ---
  getReviews: async () => {
    let reviews = JSON.parse(localStorage.getItem("prekadini_reviews"));
    if (!reviews) {
      reviews = [
        {
          id: "seed-1",
          name: "Liridon Salihi",
          email: "liridon@example.com",
          service: "Büroreinigung",
          rating: 5.0,
          text: "Sehr geehrte Damen und Herren, vielen Dank für Ihre Anfrage. Gerne bieten wir Ihnen eine professionelle und gründliche Reinigung Ihrer Räumlichkeiten an.",
          approved: true,
          created_at: new Date().toISOString()
        },
        {
          id: "seed-2",
          name: "Michael Weber",
          email: "m.weber@weber-bau.de",
          service: "Unterhaltsreinigung",
          rating: 5.0,
          text: "Die Unterhaltsreinigung an unseren Büroräumen wurde extrem präzise ausgeführt. Absolut saubere Arbeit und pünktliche Lieferung!",
          approved: true,
          created_at: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: "seed-3",
          name: "Valon Gashi",
          email: "valon@gashi.ch",
          service: "Glas- & Fensterreinigung",
          rating: 4.8,
          text: "Schlierenfreie und extrem saubere Fenster an unserer Glasfassade. Sehr professioneller Service.",
          approved: true,
          created_at: new Date(Date.now() - 172800000).toISOString()
        }
      ];
      localStorage.setItem("prekadini_reviews", JSON.stringify(reviews));
    }
    return reviews;
  },
  insertReview: async (review) => {
    const reviews = await mockDb.getReviews();
    const newReview = {
      id: Math.random().toString(36).substring(2, 9),
      ...review,
      approved: false,
      created_at: new Date().toISOString()
    };
    reviews.unshift(newReview);
    localStorage.setItem("prekadini_reviews", JSON.stringify(reviews));
    return newReview;
  },
  updateReviewStatus: async (id, approved) => {
    const reviews = await mockDb.getReviews();
    const updated = reviews.map(r => r.id === id ? { ...r, approved } : r);
    localStorage.setItem("prekadini_reviews", JSON.stringify(updated));
    return true;
  },
  deleteReview: async (id) => {
    const reviews = await mockDb.getReviews();
    const filtered = reviews.filter(r => r.id !== id);
    localStorage.setItem("prekadini_reviews", JSON.stringify(filtered));
    return true;
  }
};

// Unified review service layer that automatically switches between Supabase and LocalStorage
const ReviewService = {
  fetchApprovedReviews: async () => {
    let supabaseData = null;
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from("reviews")
          .select("*")
          .eq("approved", true)
          .order("created_at", { ascending: false });
        if (!error && data && data.length > 0) {
          supabaseData = data;
        }
      } catch (err) {
        console.warn("Supabase fetch failed, falling back to LocalStorage:", err);
      }
    }
    const localAll = await mockDb.getReviews();
    const localApproved = localAll.filter(r => r.approved);

    if (supabaseData && supabaseData.length > 0) {
      const ids = new Set(supabaseData.map(r => r.id));
      const extraLocal = localApproved.filter(r => !ids.has(r.id));
      return [...supabaseData, ...extraLocal];
    }
    return localApproved;
  },
  fetchAllReviews: async () => {
    let supabaseData = null;
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from("reviews")
          .select("*")
          .order("created_at", { ascending: false });
        if (!error && data && data.length > 0) {
          supabaseData = data;
        }
      } catch (err) {
        console.warn("Supabase fetch failed, falling back to LocalStorage:", err);
      }
    }
    const localAll = await mockDb.getReviews();
    if (supabaseData && supabaseData.length > 0) {
      const ids = new Set(supabaseData.map(r => r.id));
      const extraLocal = localAll.filter(r => !ids.has(r.id));
      return [...supabaseData, ...extraLocal];
    }
    return localAll;
  },
  addReview: async (name, email, service, rating, text) => {
    const newRecord = { 
      id: "rev-" + Math.random().toString(36).substring(2, 11),
      name, 
      email, 
      service, 
      rating: parseFloat(rating), 
      text,
      approved: false,
      created_at: new Date().toISOString()
    };
    await mockDb.insertReview(newRecord);
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from("reviews")
          .insert([newRecord])
          .select();
        if (!error && data && data[0]) {
          return data[0];
        }
      } catch (err) {
        console.warn("Supabase insert failed, stored in LocalStorage:", err);
      }
    }
    return newRecord;
  },
  approveReview: async (id) => {
    await mockDb.updateReviewStatus(id, true);
    if (supabaseClient) {
      try {
        await supabaseClient
          .from("reviews")
          .update({ approved: true })
          .eq("id", id);
      } catch (err) {
        console.warn("Supabase update failed:", err);
      }
    }
    return true;
  },
  rejectReview: async (id) => {
    await mockDb.updateReviewStatus(id, false);
    if (supabaseClient) {
      try {
        await supabaseClient
          .from("reviews")
          .update({ approved: false })
          .eq("id", id);
      } catch (err) {
        console.warn("Supabase update failed:", err);
      }
    }
    return true;
  },
  deleteReview: async (id) => {
    await mockDb.deleteReview(id);
    if (supabaseClient) {
      try {
        await supabaseClient
          .from("reviews")
          .delete()
          .eq("id", id);
      } catch (err) {
        console.warn("Supabase delete failed:", err);
      }
    }
    return true;
  }
};

// --- SERVICES LAYER FOR THE REST ---

const InquiryService = {
  fetchInquiries: async () => {
    let supabaseData = null;
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.from("inquiries").select("*").order("created_at", { ascending: false });
        if (!error && data && data.length > 0) {
          supabaseData = data;
        }
      } catch (err) {}
    }
    const local = await mockDb.getInquiries();
    if (supabaseData && supabaseData.length > 0) {
      const ids = new Set(supabaseData.map(r => r.id));
      const extraLocal = local.filter(r => !ids.has(r.id));
      return [...supabaseData, ...extraLocal];
    }
    return local;
  },
  addInquiry: async (inq) => {
    const localRes = await mockDb.insertInquiry(inq);
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.from("inquiries").insert([inq]).select();
        if (!error && data && data[0]) return data[0];
      } catch (err) {}
    }
    return localRes;
  },
  updateStatus: async (id, status) => {
    await mockDb.updateInquiryStatus(id, status);
    if (supabaseClient) {
      try {
        await supabaseClient.from("inquiries").update({ status }).eq("id", id);
      } catch (err) {}
    }
    return true;
  },
  deleteInquiry: async (id) => {
    await mockDb.deleteInquiry(id);
    if (supabaseClient) {
      try {
        await supabaseClient.from("inquiries").delete().eq("id", id);
      } catch (err) {}
    }
    return true;
  },
  sendBrevoOffer: async (inquiry, subject, text, apiKey) => {
    if (!apiKey) {
      console.warn("Brevo API key not provided, mock sending.");
      return new Promise(resolve => setTimeout(() => resolve({ success: true, mock: true }), 1500));
    }
    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "api-key": apiKey,
          "content-type": "application/json"
        },
        body: JSON.stringify({
          sender: {
            name: "Prekadini ThermoTech",
            email: "duariservice@gmail.com"
          },
          to: [
            {
              email: inquiry.email,
              name: inquiry.name
            }
          ],
          subject: subject,
          htmlContent: text.replace(/\n/g, "<br>")
        })
      });
      if (!response.ok) {
        throw new Error(`SMTP Error: ${response.status} ${await response.text()}`);
      }
      return { success: true };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
};

const ContactService = {
  fetchMessages: async () => {
    let supabaseData = null;
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.from("contact_messages").select("*").order("created_at", { ascending: false });
        if (!error && data && data.length > 0) {
          supabaseData = data;
        }
      } catch (err) {}
    }
    const local = await mockDb.getContactMessages();
    if (supabaseData && supabaseData.length > 0) {
      const ids = new Set(supabaseData.map(r => r.id));
      const extraLocal = local.filter(r => !ids.has(r.id));
      return [...supabaseData, ...extraLocal];
    }
    return local;
  },
  addMessage: async (msg) => {
    const localRes = await mockDb.insertContactMessage(msg);
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.from("contact_messages").insert([msg]).select();
        if (!error && data && data[0]) return data[0];
      } catch (err) {}
    }
    return localRes;
  },
  markAsRead: async (id, read) => {
    await mockDb.markContactMessageRead(id, read);
    if (supabaseClient) {
      try {
        await supabaseClient.from("contact_messages").update({ read }).eq("id", id);
      } catch (err) {}
    }
    return true;
  },
  deleteMessage: async (id) => {
    await mockDb.deleteContactMessage(id);
    if (supabaseClient) {
      try {
        await supabaseClient.from("contact_messages").delete().eq("id", id);
      } catch (err) {}
    }
    return true;
  }
};
const ServiceManager = {
  fetchServices: async () => {
    if (supabaseClient) {
      try {
        let { data, error } = await supabaseClient.from("services").select("*").order("title", { ascending: true });
        if (error) throw error;

        // Auto-seed or clean up old cleaning services in Supabase table
        const hasCleaning = data && data.some(s => s.title.toLowerCase().includes("reinigung") || s.title.toLowerCase().includes("pflege"));
        if (!data || data.length === 0 || hasCleaning) {
          console.log("Seeding default insulation services to Supabase...");
          if (hasCleaning) {
            await supabaseClient.from("services").delete().neq("id", "keep-none");
          }
          const mockServices = await mockDb.getServices();
          for (let srv of mockServices) {
            await supabaseClient.from("services").insert(srv);
          }
          const refetched = await supabaseClient.from("services").select("*").order("title", { ascending: true });
          if (!refetched.error) {
            data = refetched.data;
          } else {
            data = mockServices;
          }
        }
        return data;
      } catch (err) {
        console.error("Supabase services fetch failed, falling back to mockDb:", err);
        return await mockDb.getServices();
      }
    }
    return await mockDb.getServices();
  },
  saveService: async (srv) => {
    await mockDb.saveService(srv);
    if (supabaseClient) {
      try {
        if (srv.id) {
          await supabaseClient.from("services").update(srv).eq("id", srv.id);
        } else {
          await supabaseClient.from("services").insert([srv]);
        }
      } catch (err) {}
    }
    return true;
  },
  deleteService: async (id) => {
    await mockDb.deleteService(id);
    if (supabaseClient) {
      try {
        await supabaseClient.from("services").delete().eq("id", id);
      } catch (err) {}
    }
    return true;
  }
};

const ProjectService = {
  fetchProjects: async () => {
    let supabaseData = null;
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.from("projects").select("*").order("created_at", { ascending: false });
        if (!error && data && data.length > 0) {
          supabaseData = data;
        }
      } catch (err) {}
    }
    const local = await mockDb.getProjects();
    if (supabaseData && supabaseData.length > 0) {
      const ids = new Set(supabaseData.map(r => r.id));
      const extraLocal = local.filter(r => !ids.has(r.id));
      return [...supabaseData, ...extraLocal];
    }
    return local;
  },
  saveProject: async (proj) => {
    await mockDb.saveProject(proj);
    if (supabaseClient) {
      try {
        if (proj.id) {
          await supabaseClient.from("projects").update(proj).eq("id", proj.id);
        } else {
          await supabaseClient.from("projects").insert([proj]);
        }
      } catch (err) {}
    }
    return true;
  },
  deleteProject: async (id) => {
    await mockDb.deleteProject(id);
    if (supabaseClient) {
      try {
        await supabaseClient.from("projects").delete().eq("id", id);
      } catch (err) {}
    }
    return true;
  }
};

const VorteileService = {
  fetchVorteile: async () => {
    if (supabaseClient) {
      try {
        let { data, error } = await supabaseClient.from("vorteile_about").select("*").order("sort_order", { ascending: true });
        if (error) throw error;
        if (!data || data.length === 0) {
          console.log("Seeding default advantages to Supabase...");
          const mockVorteile = await mockDb.getVorteile();
          for (let vt of mockVorteile) {
            await supabaseClient.from("vorteile_about").insert(vt);
          }
          const refetched = await supabaseClient.from("vorteile_about").select("*").order("sort_order", { ascending: true });
          if (!refetched.error) {
            data = refetched.data;
          } else {
            data = mockVorteile;
          }
        }
        return data;
      } catch (err) {
        console.error("Supabase advantages fetch failed, falling back to mockDb:", err);
        return await mockDb.getVorteile();
      }
    }
    return await mockDb.getVorteile();
  },
  saveVorteile: async (items) => {
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient.from("vorteile_about").upsert(items);
        if (error) throw error;
        return true;
      } catch (err) {
        return await mockDb.saveVorteile(items);
      }
    }
    return await mockDb.saveVorteile(items);
  }
};

const SettingsService = {
  fetchSettings: async () => {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.from("website_settings").select("*").eq("id", "default").maybeSingle();
        if (error) throw error;
        if (!data) {
          const mockSettings = await mockDb.getSettings();
          await supabaseClient.from("website_settings").insert([{ id: "default", ...mockSettings }]);
          return mockSettings;
        }
        return data;
      } catch (err) {
        return await mockDb.getSettings();
      }
    }
    return await mockDb.getSettings();
  },
  saveSettings: async (settings) => {
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient.from("website_settings").upsert({ id: "default", ...settings });
        if (error) throw error;
        return settings;
      } catch (err) {
        return await mockDb.saveSettings(settings);
      }
    }
    return await mockDb.saveSettings(settings);
  }
};
