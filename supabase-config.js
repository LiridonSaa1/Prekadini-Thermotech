// Supabase Connection Configuration
// Replace these placeholders with your actual Supabase project credentials
const SUPABASE_URL = ""; 
const SUPABASE_ANON_KEY = "";

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
    if (!data) {
      data = [
        {
          id: "srv-1",
          title: "Unterhaltsreinigung",
          price: "ab 25",
          photo: "kaelteschutz.jpg",
          checklist: ["Staubwischen & Saugen", "Nasswischen der Böden", "Müllentsorgung", "Oberflächenreinigung"],
          benefits: ["Regelmäßige Sauberkeit", "Individueller Turnus", "Werterhalt Ihrer Räume"],
          active: true
        },
        {
          id: "srv-2",
          title: "Büroreinigung",
          price: "ab 30",
          photo: "brandschutz.jpg",
          checklist: ["Schreibtischdesinfektion", "Tastatur- & Monitorreinigung", "Kaffeeküchen-Reinigung", "Sanitärbereich"],
          benefits: ["Gesteigertes Wohlbefinden", "Professioneller Eindruck", "Gesundes Arbeitsklima"],
          active: true
        },
        {
          id: "srv-3",
          title: "Glas- & Fensterreinigung",
          price: "ab 35",
          photo: "schallschutz.jpg",
          checklist: ["Fensterscheiben innen/außen", "Rahmen & Falzen wischen", "Schaufensterreinigung", "Glasfassadenpflege"],
          benefits: ["Kristallklare Sicht", "Streifenfreier Glanz", "Hochwertiges Erscheinungsbild"],
          active: true
        },
        {
          id: "srv-4",
          title: "Baureinigung",
          price: "ab 45",
          photo: "warmeschutz.jpg",
          checklist: ["Bauschuttentsorgung", "Zementschleierentfernung", "Feinstaubabsaugung", "Grundreinigung nach Bau"],
          benefits: ["Schnelle Bezugsfertigkeit", "Mängelerkennung erleichtert", "Fachgerechte Entsorgung"],
          active: true
        },
        {
          id: "srv-5",
          title: "Sonderreinigung",
          price: "ab 40",
          photo: "kaelteschutz.jpg",
          checklist: ["Teppich- & Polsterreinigung", "Hartbodenbeschichtung", "Fassaden-Spezialreinigung", "Desinfektion"],
          benefits: ["Spezialwerkzeuge im Einsatz", "Hartnäckiger Schmutz weg", "Langfristiger Schutz"],
          active: true
        },
        {
          id: "srv-6",
          title: "Gartenpflege & Winterdienst",
          price: "ab 29",
          photo: "brandschutz.jpg",
          checklist: ["Rasenmähen & Heckenschnitt", "Unkrautbeseitigung", "Schneeräumung nach StVO", "Streuen gegen Glätte"],
          benefits: ["Ganzjährig gepflegt", "Haftungssicherheit im Winter", "Werterhalt Außenanlagen"],
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
        admin_password: "admin123"
      };
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
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from("reviews")
          .select("*")
          .eq("approved", true)
          .order("created_at", { ascending: false });
        if (error) throw error;
        return data;
      } catch (err) {
        console.warn("Supabase fetch failed, falling back to LocalStorage:", err);
        const all = await mockDb.getReviews();
        return all.filter(r => r.approved);
      }
    } else {
      const all = await mockDb.getReviews();
      return all.filter(r => r.approved);
    }
  },
  fetchAllReviews: async () => {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from("reviews")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        return data;
      } catch (err) {
        console.warn("Supabase fetch failed, falling back to LocalStorage:", err);
        return await mockDb.getReviews();
      }
    } else {
      return await mockDb.getReviews();
    }
  },
  addReview: async (name, email, service, rating, text) => {
    const newRecord = { name, email, service, rating, text };
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from("reviews")
          .insert([newRecord])
          .select();
        if (error) throw error;
        return data[0];
      } catch (err) {
        console.warn("Supabase insert failed, falling back to LocalStorage:", err);
        return await mockDb.insertReview(newRecord);
      }
    } else {
      return await mockDb.insertReview(newRecord);
    }
  },
  approveReview: async (id) => {
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient
          .from("reviews")
          .update({ approved: true })
          .eq("id", id);
        if (error) throw error;
        return true;
      } catch (err) {
        console.warn("Supabase update failed, falling back to LocalStorage:", err);
        return await mockDb.updateReviewStatus(id, true);
      }
    } else {
      return await mockDb.updateReviewStatus(id, true);
    }
  },
  rejectReview: async (id) => {
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient
          .from("reviews")
          .update({ approved: false })
          .eq("id", id);
        if (error) throw error;
        return true;
      } catch (err) {
        console.warn("Supabase update failed, falling back to LocalStorage:", err);
        return await mockDb.updateReviewStatus(id, false);
      }
    } else {
      return await mockDb.updateReviewStatus(id, false);
    }
  },
  deleteReview: async (id) => {
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient
          .from("reviews")
          .delete()
          .eq("id", id);
        if (error) throw error;
        return true;
      } catch (err) {
        console.warn("Supabase delete failed, falling back to LocalStorage:", err);
        return await mockDb.deleteReview(id);
      }
    } else {
      return await mockDb.deleteReview(id);
    }
  }
};

// --- SERVICES LAYER FOR THE REST ---

const InquiryService = {
  fetchInquiries: async () => {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.from("inquiries").select("*").order("created_at", { ascending: false });
        if (error) throw error;
        return data;
      } catch (err) {
        return await mockDb.getInquiries();
      }
    }
    return await mockDb.getInquiries();
  },
  addInquiry: async (inq) => {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.from("inquiries").insert([inq]).select();
        if (error) throw error;
        return data[0];
      } catch (err) {
        return await mockDb.insertInquiry(inq);
      }
    }
    return await mockDb.insertInquiry(inq);
  },
  updateStatus: async (id, status) => {
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient.from("inquiries").update({ status }).eq("id", id);
        if (error) throw error;
        return true;
      } catch (err) {
        return await mockDb.updateInquiryStatus(id, status);
      }
    }
    return await mockDb.updateInquiryStatus(id, status);
  },
  deleteInquiry: async (id) => {
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient.from("inquiries").delete().eq("id", id);
        if (error) throw error;
        return true;
      } catch (err) {
        return await mockDb.deleteInquiry(id);
      }
    }
    return await mockDb.deleteInquiry(id);
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
            name: "DuAri Hausmeister",
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
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.from("contact_messages").select("*").order("created_at", { ascending: false });
        if (error) throw error;
        return data;
      } catch (err) {
        return await mockDb.getContactMessages();
      }
    }
    return await mockDb.getContactMessages();
  },
  addMessage: async (msg) => {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.from("contact_messages").insert([msg]).select();
        if (error) throw error;
        return data[0];
      } catch (err) {
        return await mockDb.insertContactMessage(msg);
      }
    }
    return await mockDb.insertContactMessage(msg);
  },
  markAsRead: async (id, read) => {
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient.from("contact_messages").update({ read }).eq("id", id);
        if (error) throw error;
        return true;
      } catch (err) {
        return await mockDb.markContactMessageRead(id, read);
      }
    }
    return await mockDb.markContactMessageRead(id, read);
  },
  deleteMessage: async (id) => {
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient.from("contact_messages").delete().eq("id", id);
        if (error) throw error;
        return true;
      } catch (err) {
        return await mockDb.deleteContactMessage(id);
      }
    }
    return await mockDb.deleteContactMessage(id);
  }
};

const ServiceManager = {
  fetchServices: async () => {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.from("services").select("*").order("title", { ascending: true });
        if (error) throw error;
        return data;
      } catch (err) {
        return await mockDb.getServices();
      }
    }
    return await mockDb.getServices();
  },
  saveService: async (srv) => {
    if (supabaseClient) {
      try {
        let error;
        if (srv.id) {
          const { error: err } = await supabaseClient.from("services").update(srv).eq("id", srv.id);
          error = err;
        } else {
          const { error: err } = await supabaseClient.from("services").insert([srv]);
          error = err;
        }
        if (error) throw error;
        return true;
      } catch (err) {
        return await mockDb.saveService(srv);
      }
    }
    return await mockDb.saveService(srv);
  },
  deleteService: async (id) => {
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient.from("services").delete().eq("id", id);
        if (error) throw error;
        return true;
      } catch (err) {
        return await mockDb.deleteService(id);
      }
    }
    return await mockDb.deleteService(id);
  }
};

const ProjectService = {
  fetchProjects: async () => {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.from("projects").select("*").order("created_at", { ascending: false });
        if (error) throw error;
        return data;
      } catch (err) {
        return await mockDb.getProjects();
      }
    }
    return await mockDb.getProjects();
  },
  saveProject: async (proj) => {
    if (supabaseClient) {
      try {
        let error;
        if (proj.id) {
          const { error: err } = await supabaseClient.from("projects").update(proj).eq("id", proj.id);
          error = err;
        } else {
          const { error: err } = await supabaseClient.from("projects").insert([proj]);
          error = err;
        }
        if (error) throw error;
        return true;
      } catch (err) {
        return await mockDb.saveProject(proj);
      }
    }
    return await mockDb.saveProject(proj);
  },
  deleteProject: async (id) => {
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient.from("projects").delete().eq("id", id);
        if (error) throw error;
        return true;
      } catch (err) {
        return await mockDb.deleteProject(id);
      }
    }
    return await mockDb.deleteProject(id);
  }
};

const VorteileService = {
  fetchVorteile: async () => {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.from("vorteile_about").select("*").order("sort_order", { ascending: true });
        if (error) throw error;
        return data;
      } catch (err) {
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
