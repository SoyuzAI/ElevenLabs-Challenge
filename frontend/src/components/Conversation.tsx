import { useConversation } from '@elevenlabs/react';
import { motion } from 'framer-motion';
import { MicOff, Volume2 } from 'lucide-react';
import { useCallback } from 'react';

interface ConversationProps {
    agentId: string;
}

export function Conversation({ agentId }: ConversationProps) {
    const conversation = useConversation({
        onConnect: () => console.log('Connected'),
        onDisconnect: () => console.log('Disconnected'),
        onMessage: (message: any) => console.log('Message:', message),
        onError: (error: any) => console.error('Error:', error),
    });

    const { status, startSession, endSession } = conversation;

    const toggleConversation = useCallback(async () => {
        if (status === 'connected') {
            await endSession();
        } else {
            try {
                // Request microphone permission first
                await navigator.mediaDevices.getUserMedia({ audio: true });
                // Start the conversation
                await startSession({ agentId } as any);

            } catch (error) {
                console.error('Failed to start session:', error);
                alert('Could not access microphone or connect to agent.');
            }
        }
    }, [status, startSession, endSession, agentId]);

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-b from-zinc-900 to-black overflow-hidden relative">

            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse-slow" />
            </div>

            <div className="z-10 flex flex-col items-center gap-12">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-cyan-200 mb-4">
                        ElevenLabs AI Agent
                    </h1>
                    <p className="text-zinc-400 text-lg">Powered by Google Vertex AI</p>
                </motion.div>

                {/* Orb Visualizer */}
                <div className="relative">
                    <motion.div
                        animate={{
                            scale: status === 'connected' ? [1, 1.1, 1] : 1,
                            filter: status === 'connected' ? "brightness(1.5)" : "brightness(1)",
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className={`w-48 h-48 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 blur-md transition-all duration-500 shadow-2xl ${status === 'connected' ? 'shadow-indigo-500/50' : 'opacity-50'
                            }`}
                    />
                    {/* Inner Core */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-black/90 flex items-center justify-center backdrop-blur-sm">
                        {status === 'connected' ? (
                            <Volume2 className="w-16 h-16 text-cyan-400 animate-pulse" />
                        ) : (
                            <MicOff className="w-16 h-16 text-zinc-600" />
                        )}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center gap-4">
                    <button
                        onClick={toggleConversation}
                        className={`
                px-8 py-4 rounded-full text-lg font-semibold tracking-wide transition-all duration-300 transform hover:scale-105 active:scale-95
                ${status === 'connected'
                                ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30'
                                : 'bg-white text-black hover:bg-zinc-200 shadow-lg shadow-cyan-500/20'}
              `}
                    >
                        {status === 'connected' ? 'End Conversation' : 'Start Talking'}
                    </button>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                        <div className={`w-2 h-2 rounded-full ${status === 'connected' ? 'bg-green-500' : 'bg-red-500'}`} />
                        {status === 'connected' ? 'LIVE' : 'DISCONNECTED'}
                    </div>
                </div>
            </div>

        </div>
    );
}
