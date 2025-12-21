import { useState, useEffect } from 'react';
import { Conversation } from './components/Conversation';
import { Settings } from './components/Settings';
import { Settings as SettingsIcon } from 'lucide-react';

function App() {
  const [agentId, setAgentId] = useState<string>('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const storedAgentId = localStorage.getItem('elevenlabs_agent_id');
    if (storedAgentId) {
      setAgentId(storedAgentId);
    } else {
      // Fallback for demo
      const fallbackId = 'ece22b4d1386af02c04492e620b6b843011a8d417df36fde883b06a76b733895';
      setAgentId(fallbackId);
      // Save fallback so Settings sees it too
      localStorage.setItem('elevenlabs_agent_id', fallbackId);
    }
  }, []);

  return (
    <div className="h-screen w-full bg-zinc-950 flex flex-col relative">
      <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Top Bar */}
      <div className="absolute top-4 right-4 z-40">
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-3 bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-full text-zinc-400 hover:text-white transition-all hover:bg-zinc-800"
        >
          <SettingsIcon size={20} />
        </button>
      </div>

      {/* Main Experience */}
      <Conversation agentId={agentId} />

      {/* Debug Info */}
      <div className="absolute bottom-4 left-4 z-40 text-[10px] text-zinc-700 font-mono pointer-events-none">
        ID: {agentId}
      </div>


    </div>
  );
}

export default App;
