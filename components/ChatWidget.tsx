"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import * as webllm from "@mlc-ai/web-llm";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

const SYSTEM_PROMPT = `You are a helpful assistant embedded on a personal blog for an IT professional named Etienne Jacquot. Your name is Etienne's Bot. Users will ask you questions about Etienne, you should respond as a helpful assistant. Keep responses concise and friendly.`;

const MODEL_ID = "SmolLM2-360M-Instruct-q4f16_1-MLC";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [engine, setEngine] = useState<webllm.MLCEngine | null>(null);
  const [isEngineReady, setIsEngineReady] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const initEngine = useCallback(async () => {
    if (engine || isLoading) return;
    setIsLoading(true);
    setLoadingStatus("Initializing WebLLM engine...");

    try {
      const newEngine = new webllm.MLCEngine();

      newEngine.setInitProgressCallback((progress) => {
        setLoadingStatus(progress.text);
      });

      await newEngine.reload(MODEL_ID);
      setEngine(newEngine);
      setIsEngineReady(true);
      setLoadingStatus("");
    } catch (error) {
      console.error("Failed to initialize WebLLM:", error);
      setLoadingStatus(
        "Failed to load model. WebGPU may not be supported in your browser."
      );
    } finally {
      setIsLoading(false);
    }
  }, [engine, isLoading]);

  const handleOpen = () => {
    setIsOpen(true);
    if (!engine && !isLoading) {
      initEngine();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !engine || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const chatMessages: webllm.ChatCompletionMessageParam[] = [
        { role: "system", content: SYSTEM_PROMPT },
        ...updatedMessages.map((msg) => ({
          role: msg.role as "user" | "assistant" | "system",
          content: msg.content,
        })),
      ];

      const reply = await engine.chat.completions.create({
        messages: chatMessages,
        temperature: 0.7,
        max_tokens: 512,
      });

      const assistantContent =
        reply.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantContent },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "An error occurred. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
          aria-label="Open chat"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-4rem)] flex flex-col rounded-2xl border border-white/15 bg-slate-900/95 backdrop-blur-md shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isEngineReady ? "bg-green-400" : "bg-yellow-400 animate-pulse"
                }`}
              />
              <span className="text-sm font-medium text-white">
                Blog Chat
              </span>
              <span className="text-xs text-zinc-400">
                (WebLLM)
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
            {/* Loading status */}
            {loadingStatus && (
              <div className="text-xs text-zinc-400 text-center py-2 px-3 bg-white/5 rounded-lg">
                {loadingStatus}
              </div>
            )}

            {/* Welcome message */}
            {messages.length === 0 && isEngineReady && (
              <div className="text-sm text-zinc-400 text-center py-4">
                Ask me anything about this blog or Etienne&apos;s work!
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-white/10 text-zinc-200 rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && messages.length > 0 && !loadingStatus && (
              <div className="flex justify-start">
                <div className="bg-white/10 text-zinc-400 px-3 py-2 rounded-xl rounded-bl-sm text-sm">
                  <span className="inline-flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isEngineReady
                    ? "Type a message..."
                    : "Loading model..."
                }
                disabled={!isEngineReady || isLoading}
                className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!isEngineReady || isLoading || !input.trim()}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 disabled:opacity-50 text-white rounded-lg transition-colors text-sm font-medium"
                aria-label="Send message"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-zinc-500 mt-1.5 text-center">
              Powered by WebLLM &mdash; runs entirely in your browser
            </p>
          </div>
        </div>
      )}
    </>
  );
}
