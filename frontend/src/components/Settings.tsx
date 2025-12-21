import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, X } from 'lucide-react';

interface SettingsProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Settings({ isOpen, onClose }: SettingsProps) {
    const [agentId, setAgentId] = useState('');
    const [geminiKey, setGeminiKey] = useState('');
    const [googleProjectId, setGoogleProjectId] = useState('');

    useEffect(() => {
        if (isOpen) {
            setAgentId(localStorage.getItem('elevenlabs_agent_id') || '');
            setGeminiKey(localStorage.getItem('gemini_api_key') || '');
            setGoogleProjectId(localStorage.getItem('google_project_id') || '');
        }
    }, [isOpen]);

    const handleSave = () => {
        localStorage.setItem('elevenlabs_agent_id', agentId);
        localStorage.setItem('gemini_api_key', geminiKey);
        localStorage.setItem('google_project_id', googleProjectId);
        onClose();
        window.location.reload(); // Reload to apply changes/re-initialize
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
            >
                <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                    <h2 className="text-xl font-bold text-white">Configuration</h2>
                    <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* ElevenLabs Section */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-indigo-400 uppercase tracking-wider">ElevenLabs</h3>
                        <div>
                            <label className="block text-xs text-zinc-500 mb-1">Agent ID</label>
                            <input
                                type="text"
                                value={agentId}
                                onChange={(e) => setAgentId(e.target.value)}
                                placeholder="e.g. ece22b4d..."
                                className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono text-sm"
                            />
                            <p className="text-[10px] text-zinc-600 mt-1">Found in ElevenLabs Console &gt; My Agents.</p>
                        </div>
                    </div>

                    <div className="h-px bg-zinc-800" />

                    {/* Google / Gemini Section */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-cyan-400 uppercase tracking-wider">Google Cloud / Gemini</h3>
                        <div>
                            <label className="block text-xs text-zinc-500 mb-1">Gemini API Key (Optional)</label>
                            <input
                                type="password"
                                value={geminiKey}
                                onChange={(e) => setGeminiKey(e.target.value)}
                                placeholder="AIzaSy..."
                                className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-mono text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-zinc-500 mb-1">Google Project ID (Backend)</label>
                            <input
                                type="text"
                                value={googleProjectId}
                                onChange={(e) => setGoogleProjectId(e.target.value)}
                                placeholder="my-project-id"
                                className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-mono text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-zinc-800 bg-zinc-900/50">
                    <button
                        onClick={handleSave}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold py-3 rounded-lg transition-all shadow-lg shadow-indigo-500/20"
                    >
                        <Save size={18} />
                        Save Configuration
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
