import React, { useEffect, useState } from 'react';
import { Download, RefreshCw, Trash2, Database, ShieldCheck } from 'lucide-react';
import { ContentService } from '../../services/contentService';
import { ElizChatSample } from '../../types/content';

export const ElizChatDataManager: React.FC = () => {
  const [samples, setSamples] = useState<ElizChatSample[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadSamples = async () => {
    setIsLoading(true);
    setError('');
    const result = await ContentService.getElizChatSamples();
    setSamples(result.data);
    setError(result.error || '');
    setIsLoading(false);
  };

  useEffect(() => {
    void loadSamples();
  }, []);

  const exportSamples = () => {
    const jsonl = samples.map((sample) => JSON.stringify({
      messages: [
        { role: 'user', content: sample.visitor_message },
        { role: 'assistant', content: sample.eliz_reply },
      ],
      metadata: { created_at: sample.created_at, consented_at: sample.consented_at, consent_version: sample.consent_version },
    })).join('\n');
    const blob = new Blob([jsonl], { type: 'application/x-ndjson' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `eliz-chat-samples-${new Date().toISOString().slice(0, 10)}.jsonl`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const deleteSample = async (sample: ElizChatSample) => {
    if (!window.confirm('Delete this saved chat turn? This cannot be undone.')) return;
    const result = await ContentService.deleteElizChatSample(sample.id);
    if (!result.success) {
      setError(result.error || 'Could not delete this sample.');
      return;
    }
    setSamples((current) => current.filter((item) => item.id !== sample.id));
  };

  const clearSamples = async () => {
    if (!window.confirm('Permanently delete every ELIZ chat sample in the database? Export first if you want to keep a copy.')) return;
    const result = await ContentService.clearElizChatSamples();
    if (!result.success) {
      setError(result.error || 'Could not clear the chat samples.');
      return;
    }
    setSamples([]);
  };

  return (
    <section className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-burgundy/15 pb-5">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-burgundy mb-2">
            <Database className="w-3.5 h-3.5" />
            <span>Opt-in conversation dataset</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-wine">ELIZ Chat Samples</h1>
          <p className="mt-1 max-w-2xl text-xs text-taupe-dark">
            Review and export visitor turns shared with consent. These examples do not train ELIZ automatically; use them to find gaps and curate future improvements.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => void loadSamples()} className="inline-flex items-center gap-2 rounded-lg border border-burgundy/20 px-3 py-2 text-xs font-mono text-wine hover:bg-burgundy/5">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <button disabled={!samples.length} onClick={exportSamples} className="inline-flex items-center gap-2 rounded-lg bg-burgundy px-3 py-2 text-xs font-mono text-cream hover:bg-wine disabled:opacity-40">
            <Download className="w-3.5 h-3.5" /> Export JSONL
          </button>
          <button disabled={!samples.length} onClick={() => void clearSamples()} className="inline-flex items-center gap-2 rounded-lg border border-red-300 px-3 py-2 text-xs font-mono text-red-700 hover:bg-red-50 disabled:opacity-40">
            <Trash2 className="w-3.5 h-3.5" /> Delete all
          </button>
        </div>
      </header>

      <div className="flex items-start gap-3 rounded-xl border border-emerald-700/15 bg-emerald-50/70 p-4 text-xs text-emerald-950">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
        <p>Only authenticated Portfolio Studio users can review or delete saved samples. ELIZ masks common email, phone, and credential patterns before saving. Visitors can opt out at any time; saved turns remain here until you delete them.</p>
      </div>

      {error && <p role="alert" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900">{error}</p>}
      {isLoading ? (
        <p className="py-8 text-center text-xs font-mono text-taupe">Loading shared chat samples…</p>
      ) : samples.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-burgundy/25 bg-cream-surface p-10 text-center">
          <p className="font-display text-lg font-semibold text-wine">No shared chat turns yet</p>
          <p className="mt-2 text-xs text-taupe-dark">They’ll appear here after a visitor enables sharing and sends a message.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-[10px] font-mono uppercase tracking-wider text-taupe">Showing {samples.length} most recent turns</p>
          {samples.map((sample) => (
            <article key={sample.id} className="rounded-xl border border-burgundy/15 bg-cream-surface p-4 space-y-3">
              <div className="flex items-center justify-between gap-3 text-[10px] font-mono text-taupe">
                <time dateTime={sample.created_at}>{new Date(sample.created_at).toLocaleString()}</time>
                <button onClick={() => void deleteSample(sample)} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-red-700 hover:bg-red-50" aria-label="Delete this chat sample">
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-2 text-xs">
                <div>
                  <p className="mb-1 text-[10px] font-mono font-bold uppercase tracking-wider text-burgundy">Visitor</p>
                  <p className="whitespace-pre-wrap break-words text-wine">{sample.visitor_message}</p>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-mono font-bold uppercase tracking-wider text-burgundy">ELIZ</p>
                  <p className="whitespace-pre-wrap break-words text-wine">{sample.eliz_reply}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
