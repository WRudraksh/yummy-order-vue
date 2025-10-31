import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, X } from "lucide-react";

const WEBHOOK_URL = "http://localhost:5678/webhook-test/17602272-80dd-45e5-aeed-45ba086057bf";

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot', content: string }>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.response || data.message || 'Response received' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, I could not process your request.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg hover:scale-110 transition-transform"
          size="icon"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl border-2 border-primary flex flex-col">
          <CardHeader className="bg-secondary/30 flex flex-row items-center justify-between py-3">
            <CardTitle className="text-lg">Chat Assistant</CardTitle>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-4 gap-4">
            <div className="flex-1 overflow-y-auto space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground ml-8'
                      : 'bg-secondary/30 mr-8'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="bg-secondary/30 p-3 rounded-lg mr-8">
                  Typing...
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                disabled={isLoading}
              />
              <Button onClick={sendMessage} disabled={isLoading} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};
