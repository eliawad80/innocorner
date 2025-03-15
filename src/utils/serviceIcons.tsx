
import { Settings, Bot, Cloud, Database } from "lucide-react";

export const getServiceIcon = (name: string) => {
  switch (name) {
    case "Process Automation Suite":
      return <Settings className="h-6 w-6 text-primary" />;
    case "AI Chatbot Integration":
      return <Bot className="h-6 w-6 text-secondary" />;
    case "Data Analytics & ML Pipeline":
      return <Database className="h-6 w-6 text-primary" />;
    case "Cloud Infrastructure Automation":
      return <Cloud className="h-6 w-6 text-secondary" />;
    default:
      return <Settings className="h-6 w-6 text-primary" />;
  }
};
