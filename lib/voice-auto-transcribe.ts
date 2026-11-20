// Auto transcription configuration
export interface VoiceAutoTranscribeConfig {
    enabledCharacters: string[];
}

export function isCharacterAutoTranscribeEnabled(characterId?: string): boolean {
    if (!characterId) return false;
    try {
        const stored = typeof window !== "undefined" ? localStorage.getItem("ai_phone_voice_auto_transcribe") : null;
        if (!stored) return false;
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) && parsed.includes(characterId);
    } catch {
        return false;
    }
}

export function setCharacterAutoTranscribeEnabled(characterId: string, enabled: boolean): void {
    if (!characterId || typeof window === "undefined") return;
    try {
        const stored = localStorage.getItem("ai_phone_voice_auto_transcribe");
        const list: string[] = stored ? JSON.parse(stored) : [];
        const next = enabled
            ? Array.from(new Set([...list, characterId]))
            : list.filter(id => id !== characterId);
        localStorage.setItem("ai_phone_voice_auto_transcribe", JSON.stringify(next));
        window.dispatchEvent(new CustomEvent("ai-phone-voice-auto-transcribe-changed", { detail: { characterId, enabled } }));
    } catch {
        // ignore
    }
}
