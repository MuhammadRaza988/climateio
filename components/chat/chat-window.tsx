"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  citations?: Array<{
    title: string
    url: string
    snippet: string
  }>
  timestamp: Date
}

interface ChatWindowProps {
  initialPrompts?: string[]
  language?: "en" | "ur" // Added language prop
}

export function ChatWindow({ initialPrompts = [], language = "en" }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const defaultPromptsEn = [
    "Is water in Hyderabad safe after recent floods?",
    "What to do if water looks brownish?",
    "How to test water quality at home?",
    "Emergency water purification methods",
  ]

  const defaultPromptsUr = [
    "حیدرآباد میں حالیہ سیلاب کے بعد پانی محفوظ ہے؟",
    "اگر پانی بھورا نظر آئے تو کیا کریں؟",
    "گھر میں پانی کی کوالٹی کیسے چیک کریں؟",
    "ہنگامی صورتحال میں پانی صاف کرنے کے طریقے",
  ]

  const prompts = initialPrompts.length > 0 ? initialPrompts : language === "ur" ? defaultPromptsUr : defaultPromptsEn

  const uiText = {
    en: {
      title: "Water Quality Assistant",
      placeholder: "Ask about water quality...",
      askAnything: "Ask me anything about water quality, safety, or testing methods.",
      sources: "Sources:",
    },
    ur: {
      title: "پانی کی کوالٹی اسسٹنٹ",
      placeholder: "پانی کی کوالٹی کے بارے میں پوچھیں...",
      askAnything: "پانی کی کوالٹی، حفاظت، یا ٹیسٹنگ کے طریقوں کے بارے میں کچھ بھی پوچھیں۔",
      sources: "ذرائع:",
    },
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, language }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
        citations: data.citations,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <Card className="flex flex-col h-[600px]" dir={language === "ur" ? "rtl" : "ltr"}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          {uiText[language].title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        {messages.length === 0 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{uiText[language].askAnything}</p>
            <div className="grid gap-2">
              {prompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto p-3 bg-transparent"
                  onClick={() => sendMessage(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        )}

        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.citations && message.citations.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs font-medium">{uiText[language].sources}</p>
                      {message.citations.map((citation, index) => (
                        <div key={index} className="text-xs space-y-1">
                          <a
                            href={citation.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary hover:underline"
                          >
                            {citation.title}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                          <p className="text-muted-foreground">{citation.snippet}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={uiText[language].placeholder}
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
