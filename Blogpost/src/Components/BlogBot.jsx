import { useState, useRef, useEffect, useCallback } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600&family=DM+Mono:wght@300;400&display=swap');

  /* ── FAB ── */
  .bb-fab {
    position: fixed; bottom: 28px; right: 28px;
    width: 58px; height: 58px; border-radius: 50%;
    border: 1px solid rgba(99,102,241,0.4); cursor: pointer;
    z-index: 9999; background: #0f0f1a;
    box-shadow: 0 0 0 1px rgba(99,102,241,0.15), 0 8px 32px rgba(0,0,0,0.5);
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; font-size: 22px;
  }
  .bb-fab:hover {
    transform: scale(1.08); border-color: rgba(99,102,241,0.7);
    box-shadow: 0 0 0 1px rgba(99,102,241,0.3), 0 12px 40px rgba(99,102,241,0.25);
  }
  .bb-fab-pulse {
    position: absolute; width: 100%; height: 100%;
    border-radius: 50%; border: 1px solid rgba(99,102,241,0.4);
    animation: bb-pulse 2s ease-out infinite;
  }
  @keyframes bb-pulse {
    0%   { transform: scale(1);   opacity: 0.6; }
    100% { transform: scale(1.6); opacity: 0;   }
  }

  /* ── Window ── */
  .bb-window {
    position: fixed; bottom: 100px; right: 28px;
    width: 370px; height: 560px; z-index: 9998;
    border-radius: 16px; overflow: hidden;
    display: flex; flex-direction: column;
    background: #0a0a14; border: 1px solid rgba(99,102,241,0.2);
    box-shadow: 0 0 0 1px rgba(99,102,241,0.05), 0 32px 80px rgba(0,0,0,0.8);
    font-family: 'DM Mono', monospace;
    animation: bb-appear 0.25s cubic-bezier(0.16,1,0.3,1);
  }
  @keyframes bb-appear {
    from { opacity: 0; transform: translateY(16px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }

  /* ── Header ── */
  .bb-header {
    padding: 14px 16px; background: #0d0d1f;
    border-bottom: 1px solid rgba(99,102,241,0.12);
    display: flex; align-items: center; gap: 10px; flex-shrink: 0;
  }
  .bb-avatar {
    width: 34px; height: 34px; border-radius: 10px;
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; flex-shrink: 0; box-shadow: 0 0 12px rgba(99,102,241,0.4);
  }
  .bb-header-text { flex: 1; }
  .bb-header-name {
    font-family: 'Syne', sans-serif; font-size: 13px;
    font-weight: 600; color: #e0e0ff; margin: 0; letter-spacing: 0.02em;
  }
  .bb-header-status {
    font-size: 9.5px; color: rgba(99,102,241,0.7); margin: 2px 0 0;
    letter-spacing: 0.08em; text-transform: uppercase;
    display: flex; align-items: center; gap: 4px;
  }
  .bb-status-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #4ade80; box-shadow: 0 0 6px #4ade80;
  }
  .bb-header-actions { display: flex; gap: 5px; }
  .bb-icon-btn {
    background: rgba(255,255,255,0.05); border: none;
    color: rgba(180,180,255,0.5); width: 26px; height: 26px;
    border-radius: 8px; cursor: pointer; font-size: 12px;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, color 0.15s;
  }
  .bb-icon-btn:hover { background: rgba(255,255,255,0.1); color: #e0e0ff; }
  .bb-icon-btn.active { background: rgba(99,102,241,0.2); color: #a5b4fc; }

  /* ── Mode toggle bar ── */
  .bb-mode-bar {
    display: flex; border-bottom: 1px solid rgba(99,102,241,0.1);
    flex-shrink: 0;
  }
  .bb-mode-btn {
    flex: 1; padding: 8px 0; font-family: 'Syne', sans-serif;
    font-size: 10px; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; border: none; cursor: pointer;
    transition: background 0.2s, color 0.2s;
    background: transparent; color: rgba(160,160,192,0.4);
  }
  .bb-mode-btn.active {
    background: rgba(99,102,241,0.08); color: #a5b4fc;
    border-bottom: 2px solid #6366f1;
  }

  /* ── Messages ── */
  .bb-messages {
    flex: 1; overflow-y: auto; padding: 14px 12px;
    display: flex; flex-direction: column; gap: 10px;
    scrollbar-width: thin; scrollbar-color: rgba(99,102,241,0.2) transparent;
  }
  .bb-messages::-webkit-scrollbar { width: 3px; }
  .bb-messages::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.2); border-radius: 3px; }

  .bb-bubble {
    max-width: 84%; padding: 9px 13px; border-radius: 12px;
    font-size: 12.5px; line-height: 1.6; word-break: break-word;
  }
  .bb-bubble.user {
    align-self: flex-end;
    background: linear-gradient(135deg, #3730a3, #4f46e5);
    color: #eef0ff; border-bottom-right-radius: 3px;
    box-shadow: 0 2px 10px rgba(79,70,229,0.3);
  }
  .bb-bubble.bot {
    align-self: flex-start; background: rgba(255,255,255,0.04);
    color: #c8caff; border: 1px solid rgba(99,102,241,0.12);
    border-bottom-left-radius: 3px;
  }
  .bb-bubble.bot strong { color: #a5b4fc; font-weight: 500; }

  /* voice badge on bubble */
  .bb-bubble-voice-tag {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 9px; color: rgba(99,102,241,0.55);
    margin-bottom: 3px; text-transform: uppercase; letter-spacing: 0.06em;
  }

  .bb-typing {
    align-self: flex-start; background: rgba(255,255,255,0.04);
    border: 1px solid rgba(99,102,241,0.12); border-radius: 12px;
    border-bottom-left-radius: 3px; padding: 10px 14px;
    display: flex; gap: 4px; align-items: center;
  }
  .bb-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: rgba(99,102,241,0.7);
    animation: bb-bounce 1.2s ease-in-out infinite;
  }
  .bb-dot:nth-child(2) { animation-delay: 0.2s; }
  .bb-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes bb-bounce {
    0%,60%,100% { transform: translateY(0);   opacity: 0.4; }
    30%          { transform: translateY(-5px); opacity: 1;   }
  }

  /* ── Suggestions ── */
  .bb-suggestions {
    padding: 0 12px 8px; display: flex; flex-wrap: wrap;
    gap: 5px; flex-shrink: 0;
  }
  .bb-chip {
    font-family: 'DM Mono', monospace; font-size: 10.5px;
    padding: 4px 9px; border-radius: 6px;
    border: 1px solid rgba(99,102,241,0.2);
    background: rgba(99,102,241,0.06); color: rgba(165,180,252,0.8);
    cursor: pointer; transition: all 0.15s; white-space: nowrap;
  }
  .bb-chip:hover {
    background: rgba(99,102,241,0.15); color: #c7d2fe;
    border-color: rgba(99,102,241,0.4);
  }

  /* ── Voice panel ── */
  .bb-voice-panel {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 20px;
    padding: 24px 20px;
  }
  .bb-voice-orb-wrap { position: relative; display: flex; align-items: center; justify-content: center; }
  .bb-voice-ring {
    position: absolute; border-radius: 50%;
    border: 1px solid rgba(99,102,241,0.25);
    animation: bb-ring-pulse 1.8s ease-out infinite;
  }
  .bb-voice-ring:nth-child(1) { width: 90px;  height: 90px;  animation-delay: 0s;    }
  .bb-voice-ring:nth-child(2) { width: 115px; height: 115px; animation-delay: 0.4s;  }
  .bb-voice-ring:nth-child(3) { width: 140px; height: 140px; animation-delay: 0.8s;  }
  @keyframes bb-ring-pulse {
    0%   { transform: scale(0.95); opacity: 0.7; }
    100% { transform: scale(1.15); opacity: 0;   }
  }
  .bb-voice-ring.idle { animation: none; opacity: 0.15; }

  .bb-mic-btn {
    width: 72px; height: 72px; border-radius: 50%; position: relative; z-index: 1;
    border: 1.5px solid rgba(99,102,241,0.5); cursor: pointer;
    background: linear-gradient(135deg, #1e1b4b, #312e81);
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; transition: all 0.2s;
    box-shadow: 0 0 24px rgba(99,102,241,0.2);
  }
  .bb-mic-btn:hover { transform: scale(1.06); box-shadow: 0 0 32px rgba(99,102,241,0.4); }
  .bb-mic-btn.listening {
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    border-color: rgba(165,180,252,0.6);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.25), 0 0 40px rgba(99,102,241,0.5);
    animation: bb-mic-throb 0.8s ease-in-out infinite alternate;
  }
  @keyframes bb-mic-throb {
    from { transform: scale(1);    }
    to   { transform: scale(1.05); }
  }
  .bb-mic-btn.speaking {
    background: linear-gradient(135deg, #065f46, #047857);
    border-color: rgba(52,211,153,0.5);
    box-shadow: 0 0 0 3px rgba(52,211,153,0.15), 0 0 40px rgba(52,211,153,0.3);
  }

  .bb-voice-status {
    font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(165,180,252,0.6); text-align: center;
  }
  .bb-voice-status.active { color: #a5b4fc; }
  .bb-voice-status.speaking { color: #6ee7b7; }

  .bb-voice-transcript {
    width: 100%; background: rgba(99,102,241,0.05);
    border: 1px solid rgba(99,102,241,0.15); border-radius: 10px;
    padding: 10px 14px; font-size: 11.5px; color: #c8caff;
    line-height: 1.6; min-height: 44px; text-align: center;
    font-style: italic;
  }

  /* waveform bars */
  .bb-waveform {
    display: flex; align-items: center; gap: 3px; height: 24px;
  }
  .bb-bar {
    width: 3px; border-radius: 2px; background: rgba(99,102,241,0.6);
    animation: bb-wave 0.8s ease-in-out infinite alternate;
  }
  .bb-bar:nth-child(1) { animation-delay: 0s;    height: 8px;  }
  .bb-bar:nth-child(2) { animation-delay: 0.1s;  height: 16px; }
  .bb-bar:nth-child(3) { animation-delay: 0.2s;  height: 22px; }
  .bb-bar:nth-child(4) { animation-delay: 0.15s; height: 14px; }
  .bb-bar:nth-child(5) { animation-delay: 0.05s; height: 10px; }
  @keyframes bb-wave {
    from { transform: scaleY(0.4); opacity: 0.5; }
    to   { transform: scaleY(1);   opacity: 1;   }
  }
  .bb-waveform.idle .bb-bar { animation: none; transform: scaleY(0.3); opacity: 0.2; }

  /* auto-speak toggle */
  .bb-auto-speak {
    display: flex; align-items: center; gap: 8px;
    font-size: 10px; color: rgba(160,160,192,0.5);
    font-family: 'Syne', sans-serif; letter-spacing: 0.06em; text-transform: uppercase;
    cursor: pointer; user-select: none;
  }
  .bb-toggle {
    width: 28px; height: 15px; border-radius: 10px;
    background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.25);
    position: relative; transition: background 0.2s;
  }
  .bb-toggle.on { background: rgba(99,102,241,0.4); border-color: rgba(99,102,241,0.5); }
  .bb-toggle::after {
    content: ''; position: absolute; top: 2px; left: 2px;
    width: 9px; height: 9px; border-radius: 50%;
    background: rgba(165,180,252,0.5); transition: transform 0.2s, background 0.2s;
  }
  .bb-toggle.on::after { transform: translateX(13px); background: #a5b4fc; }

  /* ── Text input ── */
  .bb-input-row {
    padding: 10px 12px; border-top: 1px solid rgba(99,102,241,0.1);
    display: flex; gap: 8px; align-items: flex-end;
    background: rgba(255,255,255,0.01); flex-shrink: 0;
  }
  .bb-input {
    flex: 1; background: rgba(255,255,255,0.05);
    border: 1px solid rgba(99,102,241,0.2); border-radius: 8px;
    padding: 8px 12px; font-family: 'DM Mono', monospace;
    font-size: 12px; color: #e0e0ff; outline: none; resize: none;
    line-height: 1.5; transition: border-color 0.15s; max-height: 80px;
  }
  .bb-input::placeholder { color: rgba(99,102,241,0.35); }
  .bb-input:focus { border-color: rgba(99,102,241,0.5); }
  .bb-send {
    width: 36px; height: 36px; border-radius: 8px;
    background: linear-gradient(135deg, #4338ca, #6d28d9);
    border: none; color: #fff; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: opacity 0.15s, transform 0.15s;
    box-shadow: 0 2px 10px rgba(99,102,241,0.3);
  }
  .bb-send:hover:not(:disabled) { transform: scale(1.06); }
  .bb-send:disabled { opacity: 0.35; cursor: default; }

  /* no-support notice */
  .bb-no-support {
    font-size: 11px; color: rgba(248,113,113,0.7); text-align: center;
    padding: 8px 12px; font-family: 'Syne', sans-serif;
  }
`;

const SUGGESTIONS = [
    "Show latest blogs",
    "What topics are covered?",
    "How do I write a blog?",
    "Who are the top authors?",
];

const hasSpeechRecognition = () =>
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

const hasSpeechSynthesis = () =>
    typeof window !== "undefined" && "speechSynthesis" in window;

export default function BlogBot() {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("text"); // "text" | "voice"
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "Hey! I'm Blognest AI, your BlogNest assistant. Ask me anything about the blogs here — topics, authors, summaries, or writing tips! ✨", via: "text",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);

    // Voice states
    const [listening, setListening] = useState(false);
    const [speaking, setSpeaking] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [autoSpeak, setAutoSpeak] = useState(true);

    const bottomRef = useRef(null);
    const textareaRef = useRef(null);
    const recognitionRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    // ── Core send ──
    const send = useCallback(async (text, via = "text") => {
        const content = (text || input).trim();
        if (!content || loading) return;

        setInput("");
        setShowSuggestions(false);
        setTranscript("");
        if (textareaRef.current) textareaRef.current.style.height = "auto";

        const userMsg = { role: "user", content, via };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setLoading(true);

        // placeholder for streaming
        setMessages((prev) => [...prev, { role: "assistant", content: "", via: "text" }]);

        let fullReply = "";

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/chat`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        messages: newMessages.map((m) => ({
                            role: m.role,
                            content: m.content,
                        })),
                    }),
                }
            );

            const reader = res.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const lines = decoder.decode(value).split("\n");
                for (const line of lines) {
                    if (line.startsWith("data: ") && line !== "data: [DONE]") {
                        try {
                            const { content: delta } = JSON.parse(line.slice(6));
                            if (delta) {
                                fullReply += delta;
                                setMessages((prev) => {
                                    const updated = [...prev];
                                    updated[updated.length - 1] = {
                                        ...updated[updated.length - 1],
                                        content: updated[updated.length - 1].content + delta,
                                    };
                                    return updated;
                                });
                            }
                        } catch { }
                    }
                }
            }
        } catch {
            fullReply = "Sorry, couldn't connect right now. Please try again!";
            setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1].content = fullReply;
                return updated;
            });
        }

        setLoading(false);

        // Auto-speak in voice mode OR if autoSpeak is on
        if ((mode === "voice" || autoSpeak) && hasSpeechSynthesis() && fullReply) {
            speakText(fullReply);
        }
    }, [input, loading, messages, mode, autoSpeak]);

    // ── Text-to-speech ──
    // ── Text-to-speech (smooth, clear, natural) ──
    const speakText = (text) => {
        synthRef.current?.cancel();

        // Strip markdown-style symbols for cleaner speech
        const clean = text
            .replace(/\*\*(.*?)\*\*/g, "$1")
            .replace(/\*(.*?)\*/g, "$1")
            .replace(/#+\s/g, "")
            .replace(/`{1,3}(.*?)`{1,3}/gs, "$1")
            .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
            .replace(/[-•]\s/g, "")
            .trim();

        // Split into sentences so streaming feels natural
        const sentences = clean.match(/[^.!?]+[.!?]+/g) || [clean];

        let index = 0;
        setSpeaking(true);

        const speakNext = () => {
            if (index >= sentences.length) {
                setSpeaking(false);
                return;
            }

            const utter = new SpeechSynthesisUtterance(sentences[index].trim());

            // Voice selection priority: Google US English → Samantha → any en-US
            const voices = synthRef.current?.getVoices() || [];
            const voice =
                voices.find(v => v.name === "Google US English") ||
                voices.find(v => v.name === "Samantha") ||
                voices.find(v => v.name.includes("Google") && v.lang === "en-US") ||
                voices.find(v => v.lang === "en-US" && !v.name.includes("compact")) ||
                voices.find(v => v.lang.startsWith("en"));

            if (voice) utter.voice = voice;

            utter.rate = 0.92;   // slightly slower = clearer
            utter.pitch = 1.05;   // natural, slightly warm
            utter.volume = 1;

            utter.onend = () => { index++; speakNext(); };
            utter.onerror = () => { index++; speakNext(); };

            synthRef.current?.speak(utter);
            index++;
        };

        // Chrome needs a tiny delay on first call for voices to load
        if (synthRef.current?.getVoices().length === 0) {
            window.speechSynthesis.onvoiceschanged = () => speakNext();
        } else {
            speakNext();
        }
    };

    const stopSpeaking = () => {
        synthRef.current?.cancel();
        setSpeaking(false);
    };

    // ── Speech-to-text ──
    // ── Speech-to-text (confident, noise-tolerant) ──
    const startListening = () => {
        if (!hasSpeechRecognition() || listening) return;
        stopSpeaking();

        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        const rec = new SR();

        rec.continuous = false;   // single utterance — cleaner UX
        rec.interimResults = true;    // show live transcript as you speak
        rec.lang = "en-US";
        rec.maxAlternatives = 1;

        let finalTranscript = "";
        let silenceTimer = null;

        rec.onstart = () => {
            setListening(true);
            setTranscript("");
        };

        rec.onresult = (e) => {
            let interim = "";
            for (let i = e.resultIndex; i < e.results.length; i++) {
                const t = e.results[i][0].transcript;
                if (e.results[i].isFinal) {
                    finalTranscript += t + " ";
                } else {
                    interim = t;
                }
            }
            setTranscript((finalTranscript + interim).trim());

            // Auto-submit after 1.2s of silence post final result
            clearTimeout(silenceTimer);
            if (finalTranscript.trim()) {
                silenceTimer = setTimeout(() => {
                    rec.stop();
                }, 1200);
            }
        };

        rec.onspeechend = () => {
            clearTimeout(silenceTimer);
            rec.stop();
        };

        rec.onend = () => {
            setListening(false);
            clearTimeout(silenceTimer);
            const toSend = finalTranscript.trim();
            if (toSend) {
                send(toSend, "voice");
            }
            setTranscript("");
        };

        rec.onerror = (e) => {
            setListening(false);
            if (e.error === "no-speech") setTranscript("No speech detected — try again");
            else if (e.error === "not-allowed") setTranscript("Mic permission denied");
            else setTranscript("Error: " + e.error);
        };

        recognitionRef.current = rec;
        rec.start();
    };

    const stopListening = () => {
        recognitionRef.current?.stop();
        setListening(false);
    };

    const handleKey = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    };

    const handleInput = (e) => {
        setInput(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = Math.min(e.target.scrollHeight, 80) + "px";
    };

    const micStatus = speaking ? "speaking" : listening ? "listening" : "idle";

    return (
        <>
            <style>{styles}</style>

            {/* FAB */}
            <button className="bb-fab" onClick={() => setOpen((o) => !o)} aria-label="Open blog assistant">
                <span className="bb-fab-pulse" />
                {open ? "✕" : "🤖"}
            </button>

            {open && (
                <div className="bb-window">
                    {/* Header */}
                    <div className="bb-header">
                        <div className="bb-avatar">🤖</div>
                        <div className="bb-header-text">
                            <p className="bb-header-name">Blognest AI — Blog Assistant</p>
                            <p className="bb-header-status">
                                <span className="bb-status-dot" />
                                {speaking ? "Speaking..." : listening ? "Listening..." : "Online"}
                            </p>
                        </div>
                        <div className="bb-header-actions">
                            {speaking && (
                                <button className="bb-icon-btn" onClick={stopSpeaking} title="Stop speaking">⏹</button>
                            )}
                            <button className="bb-icon-btn" onClick={() => setOpen(false)}>✕</button>
                        </div>
                    </div>

                    {/* Mode toggle */}
                    <div className="bb-mode-bar">
                        <button
                            className={`bb-mode-btn ${mode === "text" ? "active" : ""}`}
                            onClick={() => setMode("text")}
                        >
                            💬 Text
                        </button>
                        <button
                            className={`bb-mode-btn ${mode === "voice" ? "active" : ""}`}
                            onClick={() => { setMode("voice"); stopSpeaking(); }}
                        >
                            🎙 Voice
                        </button>
                    </div>

                    {/* ── TEXT MODE ── */}
                    {mode === "text" && (
                        <>
                            <div className="bb-messages">
                                {messages.map((msg, i) => (
                                    <div key={i} className={`bb-bubble ${msg.role === "user" ? "user" : "bot"}`}>
                                        {msg.via === "voice" && msg.role === "user" && (
                                            <div className="bb-bubble-voice-tag">🎙 voice</div>
                                        )}
                                        {msg.content}
                                    </div>
                                ))}
                                {loading && (
                                    <div className="bb-typing">
                                        <span className="bb-dot" /><span className="bb-dot" /><span className="bb-dot" />
                                    </div>
                                )}
                                <div ref={bottomRef} />
                            </div>

                            {showSuggestions && (
                                <div className="bb-suggestions">
                                    {SUGGESTIONS.map((s) => (
                                        <button key={s} className="bb-chip" onClick={() => send(s)}>{s}</button>
                                    ))}
                                </div>
                            )}

                            <div className="bb-input-row">
                                <textarea
                                    ref={textareaRef}
                                    className="bb-input"
                                    rows={1}
                                    value={input}
                                    onChange={handleInput}
                                    onKeyDown={handleKey}
                                    placeholder="Ask about blogs..."
                                />
                                <button className="bb-send" onClick={() => send()} disabled={!input.trim() || loading}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13" />
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                </button>
                            </div>
                        </>
                    )}

                    {/* ── VOICE MODE ── */}
                    {mode === "voice" && (
                        <>
                            <div className="bb-voice-panel">
                                {/* Animated orb */}
                                <div className="bb-voice-orb-wrap">
                                    <span className={`bb-voice-ring ${micStatus === "idle" ? "idle" : ""}`} />
                                    <span className={`bb-voice-ring ${micStatus === "idle" ? "idle" : ""}`} />
                                    <span className={`bb-voice-ring ${micStatus === "idle" ? "idle" : ""}`} />
                                    <button
                                        className={`bb-mic-btn ${micStatus}`}
                                        onClick={listening ? stopListening : startListening}
                                        title={listening ? "Stop" : "Tap to speak"}
                                    >
                                        {speaking ? "🔊" : listening ? "⏹" : "🎙"}
                                    </button>
                                </div>

                                {/* Waveform */}
                                <div className={`bb-waveform ${micStatus === "idle" ? "idle" : ""}`}>
                                    {[...Array(5)].map((_, i) => <span key={i} className="bb-bar" />)}
                                </div>

                                {/* Status label */}
                                <p className={`bb-voice-status ${micStatus !== "idle" ? (speaking ? "speaking" : "active") : ""}`}>
                                    {speaking ? "Nexus is speaking..." : listening ? "Listening — speak now" : "Tap mic to speak"}
                                </p>

                                {/* Live transcript */}
                                <div className="bb-voice-transcript">
                                    {transcript || (listening ? "..." : "Your speech will appear here")}
                                </div>

                                {/* Auto-speak toggle */}
                                <label className="bb-auto-speak" onClick={() => setAutoSpeak(a => !a)}>
                                    <span className={`bb-toggle ${autoSpeak ? "on" : ""}`} />
                                    Auto-speak replies
                                </label>

                                {!hasSpeechRecognition() && (
                                    <p className="bb-no-support">⚠️ Speech recognition not supported in this browser. Try Chrome.</p>
                                )}
                            </div>

                            {/* Last exchange preview */}
                            {messages.length > 1 && (
                                <div style={{ padding: "0 12px 12px", flexShrink: 0 }}>
                                    <div className="bb-bubble bot" style={{ maxWidth: "100%", fontSize: "11.5px" }}>
                                        {messages[messages.length - 1]?.content || "..."}
                                    </div>
                                </div>
                            )}

                            {loading && (
                                <div style={{ padding: "0 12px 12px", flexShrink: 0 }}>
                                    <div className="bb-typing">
                                        <span className="bb-dot" /><span className="bb-dot" /><span className="bb-dot" />
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </>
    );
}