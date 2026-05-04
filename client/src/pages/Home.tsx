import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { usePanel } from '@/contexts/PanelContext';
import FeaturedDisplay from '@/components/FeaturedDisplay';
import HistoryPanel from '@/components/HistoryPanel';
import { Settings } from 'lucide-react';
import SGAClient from '@/services/sgaApi';

export default function Home() {
  const [, setLocation] = useLocation();
  const { config, setCurrentMessage, addToHistory, isConnected, setIsConnected, connectionError, setConnectionError, isLoading, setIsLoading } = usePanel();
  const [sgaClient, setSgaClient] = useState<SGAClient | null>(null);
  const [currentMessage, setCurrentMessageLocal] = useState<any>(null);

  // Initialize connection
  useEffect(() => {
    if (!config.server || !config.clientId) {
      setLocation('/settings');
      return;
    }

    const client = new SGAClient({
      server: config.server,
      moduleName: config.moduleName,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      username: config.username,
      password: config.password,
    });

    setSgaClient(client);

    // Authenticate
    const authenticate = async () => {
      setIsLoading(true);
      const result = await client.authenticate(
        config.clientId,
        config.clientSecret,
        config.username,
        config.password
      );

      if (result.success) {
        setIsConnected(true);
        setConnectionError(null);

        // Start polling for messages
        const pollMessages = async () => {
          if (config.unityId && config.serviceIds.length > 0) {
            const messagesResult = await client.getMessages(
              parseInt(config.unityId),
              config.serviceIds.map((id) => parseInt(id))
            );

            if (messagesResult.success && messagesResult.data && messagesResult.data.length > 0) {
              const sgaMessage = messagesResult.data[0];
              const message = {
                id: sgaMessage.id || String(Date.now()),
                type: 'ticket' as const,
                title: `${sgaMessage.siglaSenha || ''}${String(sgaMessage.numeroSenha || 0).padStart(3, '0')}`,
                subtitle: `${sgaMessage.local || ''}${String(sgaMessage.numeroLocal || 0).padStart(2, '0')}`,
                description: sgaMessage.prioridade || '',
                priority: sgaMessage.peso || 0,
                data: {
                  siglaSenha: sgaMessage.siglaSenha || '',
                  numeroSenha: String(sgaMessage.numeroSenha || 0),
                  local: sgaMessage.local || '',
                  numeroLocal: String(sgaMessage.numeroLocal || 0),
                  peso: sgaMessage.peso || 0,
                  prioridade: sgaMessage.prioridade || '',
                },
              };

              setCurrentMessage(message);
              setCurrentMessageLocal(message);
              addToHistory(message);
            }
          }
        };

        // Poll every 2 seconds
        pollMessages();
        const interval = setInterval(pollMessages, 2000);

        return () => {
          clearInterval(interval);
        };
      } else {
        setIsConnected(false);
        setConnectionError(result.error || 'Erro ao conectar');
      }

      setIsLoading(false);
    };

    authenticate();
  }, [config, setLocation, setIsConnected, setConnectionError, setIsLoading, setCurrentMessage, addToHistory]);

  return (
    <div className="panel-container">
      {/* Settings Button */}
      <button
        onClick={() => setLocation('/settings')}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-white hover:bg-blue-800 transition-colors duration-200 shadow-lg"
        title="Configurações"
      >
        <Settings size={24} />
      </button>

      {/* Connection Status */}
      {!isConnected && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          <p className="font-semibold">Desconectado</p>
          {connectionError && <p className="text-sm">{connectionError}</p>}
        </div>
      )}

      {/* Main Panel */}
      <div className="panel-main">
        <FeaturedDisplay message={currentMessage} />
        <HistoryPanel />
      </div>
    </div>
  );
}
