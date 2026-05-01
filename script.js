const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const chatToggle = document.querySelector(".chatbot-toggle");
const chatPanel = document.querySelector(".chatbot-panel");
const chatClose = document.querySelector(".chatbot-close");
const chatMessages = document.querySelector(".chatbot-messages");
const chatForm = document.querySelector(".chatbot-form");
const chatInput = chatForm?.querySelector("input");
const chatSuggestions = document.querySelector(".chatbot-suggestions");
const chatEndpoint = window.INNOCORNER_CHAT_ENDPOINT || "";
const siteContext =
  "You are the InnoCorner AI Guide on innocorner.com. InnoCorner is a Brussels-based futuristic specialist offering AI automation workflows, RAG for sensitive information, self-hosted n8n, Make automations, Zabbix monitoring, security training, AI RAG training, AI training, AI for Business training, and 10- and 20-year future-readiness consultancy. Be concise, practical, warm, and invite visitors to contact info@innocorner.com when they want a tailored plan.";
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

const getPuterText = (reply) => {
  if (typeof reply === "string") return reply;
  if (typeof reply?.message?.content === "string") return reply.message.content;
  if (Array.isArray(reply?.message?.content)) {
    return reply.message.content.map((part) => part?.text || part?.content || "").join("");
  }
  if (typeof reply?.content === "string") return reply.content;
  if (typeof reply?.text === "string") return reply.text;
  return "";
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

  return "InnoCorner helps with AI automation, RAG for sensitive information, self-hosted n8n, Make, Zabbix, security training, AI courses, and future-readiness consultancy. For a tailored answer, share your company goal or the workflow you want to improve.";
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

  if (window.puter?.ai?.chat) {
    const thinking = addMessage("Thinking...", "bot");
    try {
      const reply = await window.puter.ai.chat(chatHistory.slice(-10), false, {
        model: "gpt-5-nano",
        temperature: 0.4,
        max_tokens: 220,
      });
      const text = getPuterText(reply);

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
