/**
 * Optional V.E.D.A. AI Backend Adapter
 * 
 * For genuine generative AI inference, configure VITE_VEDA_API_URL to point
 * to a separately hosted service (e.g. lightweight Rust/Axum microservice).
 * 
 * In accordance with strict security requirements:
 * 1. Never embed private API keys or administrative secrets in this frontend bundle.
 * 2. If no backend URL is configured, gracefully fall back to the deterministic local engine.
 */

import { GuideMessage, VedaGuideService } from './vedaGuideService';
import { resolveVedaLanguage, VedaReplyLanguage } from './vedaLocalization';

export interface BackendChatRequest {
  query: string;
  language?: 'english' | 'malayalam' | 'manglish';
  history?: Array<{ role: 'user' | 'assistant'; text: string }>;
}

export class VedaBackendAdapter {
  private static getApiUrl(): string | null {
    // Read from Vite environment if defined
    const url = import.meta.env.VITE_VEDA_API_URL;
    return typeof url === 'string' && url.trim().length > 0 ? url.trim() : null;
  }

  public static isBackendAvailable(): boolean {
    return this.getApiUrl() !== null;
  }

  public static async query(
    rawQuery: string,
    currentSection?: string,
    preferredLanguage: VedaReplyLanguage = 'auto',
  ): Promise<GuideMessage> {
    const apiUrl = this.getApiUrl();
    const language = resolveVedaLanguage(rawQuery, preferredLanguage);

    // If no backend configured, use local deterministic guide engine
    if (!apiUrl || language !== 'english') {
      return VedaGuideService.answerQuestion(rawQuery, currentSection, preferredLanguage);
    }

    try {
      const response = await fetch(`${apiUrl}/api/veda/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          query: rawQuery,
          language,
        } as BackendChatRequest)
      });

      if (!response.ok) {
        throw new Error(`Backend returned status ${response.status}`);
      }

      const data = await response.json();
      return {
        id: `veda-ai-${Date.now()}`,
        sender: 'veda',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: data.text || data.message || 'Response received from V.E.D.A. core.',
        pose: data.pose || 'thinking',
        actions: data.actions || [
          { label: 'Explore Projects', type: 'navigate', target: 'projects' },
          { label: 'Contact Vasudev', type: 'navigate', target: 'contact' }
        ]
      };
    } catch (err) {
      console.warn('V.E.D.A. backend unavailable, falling back to local guide engine:', err);
      // Graceful deterministic fallback
      return VedaGuideService.answerQuestion(rawQuery, currentSection, preferredLanguage);
    }
  }
}
