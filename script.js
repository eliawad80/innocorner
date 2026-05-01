const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const chatToggle = document.querySelector(".chatbot-toggle");
const chatPanel = document.querySelector(".chatbot-panel");
const chatClose = document.querySelector(".chatbot-close");
const chatMessages = document.querySelector(".chatbot-messages");
const chatForm = document.querySelector(".chatbot-form");
const chatInput = chatForm?.querySelector("input");
const chatSuggestions = document.querySelector(".chatbot-suggestions");
const newsletterForms = document.querySelectorAll(".newsletter-form");
const contactForms = document.querySelectorAll(".contact-mail-form");
const cookieBanner = document.querySelector(".cookie-banner");
const cookieAccept = document.querySelector(".cookie-accept");
const cookieSettings = document.querySelectorAll(".cookie-settings");
const chatEndpoint = window.INNOCORNER_CHAT_ENDPOINT || "";
const freeChatEndpoint = "https://text.pollinations.ai/openai";
const siteContext =
  "You are the InnoCorner AI Guide on innocorner.com. InnoCorner is a Brussels-based futuristic specialist offering AI automation workflows, RAG for sensitive information, self-hosted n8n, Make automations, Zabbix monitoring, security training, AI RAG training, AI training, AI for Business training, Future Briefing newsletters, and 10- and 20-year future-readiness consultancy. Be concise, practical, warm, and invite visitors to contact info@innocorner.com when they want a tailored plan.";
const chatHistory = [{ role: "system", content: siteContext }];

menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open navigation");
  }
});

const openChat = () => {
  chatPanel?.classList.add("open");
  chatPanel?.setAttribute("aria-hidden", "false");
  chatToggle?.setAttribute("aria-expanded", "true");
  chatInput?.focus();
};

const closeChat = () => {
  chatPanel?.classList.remove("open");
  chatPanel?.setAttribute("aria-hidden", "true");
  chatToggle?.setAttribute("aria-expanded", "false");
};

const addMessage = (text, type = "bot") => {
  const message = document.createElement("div");
  message.className = `chat-message ${type}`;
  message.textContent = text;
  chatMessages?.append(message);
  chatMessages?.scrollTo({ top: chatMessages.scrollHeight, behavior: "smooth" });
  return message;
};

const localAnswer = (question) => {
  const text = question.toLowerCase();

  if (text.includes("rag") || text.includes("sensitive")) {
    return "For RAG, InnoCorner helps teams connect private knowledge to AI answers while keeping sensitive information controlled. We can design the knowledge structure, retrieval flow, permissions, and self-hosted automation around it.";
  }

  if (text.includes("training") || text.includes("course") || text.includes("buy")) {
    return "Current training offers include Security Foundations, AI RAG, AI, and AI for Business. The best next step is to tell us your team size and goal, then we can recommend the right course path.";
  }

  if (text.includes("n8n") || text.includes("make") || text.includes("automation") || text.includes("workflow")) {
    return "We help build AI automation workflows using self-hosted n8n for control, Make for fast business automation, and APIs where deeper integration is needed.";
  }

  if (text.includes("zabbix") || text.includes("monitor")) {
    return "We can connect automation with Zabbix monitoring, alerts, operational visibility, and incident workflows so systems are not just automated but observable.";
  }

  if (text.includes("10") || text.includes("20") || text.includes("future") || text.includes("consult")) {
    return "Our future-readiness consultancy helps companies plan for the next 10 and 20 years: AI adoption, skills, governance, automation, security, resilience, and operating model changes.";
  }

  if (text.includes("security")) {
    return "InnoCorner offers security-focused training and consultancy covering practical security habits, sensitive data handling, AI risk, and operational resilience.";
  }

  if (text.includes("newsletter") || text.includes("article") || text.includes("news") || text.includes("publish")) {
    return "The InnoCorner Future Briefing shares practical signals on AI, security, automation, RAG, monitoring, and business readiness. You can subscribe on the homepage or Insights page.";
  }

  return "InnoCorner helps with AI automation, RAG for sensitive information, self-hosted n8n, Make, Zabbix, security training, AI courses, Future Briefing newsletters, and future-readiness consultancy. For a tailored answer, share your company goal or the workflow you want to improve.";
};

const sendChat = async (question) => {
  addMessage(question, "user");
  chatHistory.push({ role: "user", content: question });

  if (chatEndpoint) {
    try {
      const response = await fetch(chatEndpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: question }),
      });
      if (response.ok) {
        const data = await response.json();
        addMessage(data.reply || localAnswer(question));
        return;
      }
    } catch {
      // Falls back to the local guide when the model endpoint is unavailable.
    }
  }

  if (freeChatEndpoint) {
    const thinking = addMessage("Thinking...", "bot");
    try {
      const response = await fetch(freeChatEndpoint, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "openai",
          messages: chatHistory.slice(-10),
          temperature: 0.4,
        }),
      });
      const data = response.ok ? await response.json() : null;
      const text = data?.choices?.[0]?.message?.content || "";

      if (text.trim()) {
        thinking.textContent = text.trim();
        chatHistory.push({ role: "assistant", content: text.trim() });
        return;
      }
    } catch {
      // Falls back to the local guide if the free AI provider is unavailable or asks the visitor to sign in.
    } finally {
      if (thinking.textContent === "Thinking...") {
        thinking.remove();
      }
    }
  }

  const fallback = localAnswer(question);
  addMessage(fallback);
  chatHistory.push({ role: "assistant", content: fallback });
};

chatToggle?.addEventListener("click", () => {
  if (chatPanel?.classList.contains("open")) {
    closeChat();
  } else {
    openChat();
  }
});

chatClose?.addEventListener("click", closeChat);

chatSuggestions?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLButtonElement) {
    openChat();
    sendChat(event.target.textContent || "");
  }
});

chatForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = chatInput?.value.trim();
  if (!question) return;
  chatInput.value = "";
  sendChat(question);
});

newsletterForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const note = form.querySelector(".form-note");
    const email = input?.value.trim();

    if (!email) return;

    if (note) {
      note.textContent = "Thank you. Your subscription request is ready to send to InnoCorner.";
    }

    const subject = encodeURIComponent("Newsletter subscription");
    const body = encodeURIComponent(`Please add ${email} to the InnoCorner newsletter list.`);
    window.location.href = `mailto:info@innocorner.com?subject=${subject}&body=${body}`;
    form.reset();
  });
});

contactForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.querySelector('input[name="name"]')?.value.trim() || "";
    const email = form.querySelector('input[name="email"]')?.value.trim() || "";
    const message = form.querySelector('textarea[name="message"]')?.value.trim() || "";
    const note = form.querySelector(".form-note");

    if (!name || !email || !message) return;

    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:info@innocorner.com?subject=${subject}&body=${body}`;

    if (note) {
      note.textContent = "Your email app is opening with the message ready to send.";
    }

    form.reset();
  });
});

const showCookieBanner = () => {
  cookieBanner?.removeAttribute("hidden");
};

const hideCookieBanner = () => {
  cookieBanner?.setAttribute("hidden", "");
};

try {
  if (localStorage.getItem("innocornerPrivacyNotice") !== "accepted") {
    showCookieBanner();
  }
} catch {
  showCookieBanner();
}

cookieAccept?.addEventListener("click", () => {
  try {
    localStorage.setItem("innocornerPrivacyNotice", "accepted");
  } catch {
    // If storage is blocked, the visitor can still continue using the site.
  }
  hideCookieBanner();
});

cookieSettings.forEach((button) => {
  button.addEventListener("click", showCookieBanner);
});
