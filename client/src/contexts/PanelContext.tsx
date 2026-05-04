import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export interface Message {
  id: string;
  type: 'ticket';
  title: string;
  subtitle: string;
  description: string;
  priority: number;
  data: {
    siglaSenha: string;
    numeroSenha: string;
    local: string;
    numeroLocal: string;
    peso: number;
    prioridade?: string;
  };
}

export interface PanelConfig {
  server: string;
  moduleName: string;
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  unityId: string;
  serviceIds: string[];
  locale: string;
  speechEnabled: boolean;
  speechVoice: 'female' | 'male';
  alertSound: string;
  videoUrl: string;
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  primaryColor: string;
  secondaryColor: string;
}

interface PanelContextType {
  config: PanelConfig;
  setConfig: (config: Partial<PanelConfig>) => void;
  currentMessage: Message | null;
  setCurrentMessage: (message: Message | null) => void;
  history: Message[];
  addToHistory: (message: Message) => void;
  clearHistory: () => void;
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
  connectionError: string | null;
  setConnectionError: (error: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const defaultConfig: PanelConfig = {
  server: localStorage.getItem('sga-server') || '',
  moduleName: localStorage.getItem('sga-moduleName') || 'novo-sga',
  clientId: localStorage.getItem('sga-clientId') || '',
  clientSecret: localStorage.getItem('sga-clientSecret') || '',
  username: localStorage.getItem('sga-username') || '',
  password: localStorage.getItem('sga-password') || '',
  unityId: localStorage.getItem('sga-unityId') || '',
  serviceIds: JSON.parse(localStorage.getItem('sga-serviceIds') || '[]'),
  locale: localStorage.getItem('sga-locale') || 'pt_BR',
  speechEnabled: localStorage.getItem('sga-speechEnabled') === 'true',
  speechVoice: (localStorage.getItem('sga-speechVoice') as 'female' | 'male') || 'female',
  alertSound: localStorage.getItem('sga-alertSound') || 'default',
  videoUrl: localStorage.getItem('sga-videoUrl') || '',
  theme: (localStorage.getItem('sga-theme') as 'light' | 'dark') || 'light',
  fontSize: (localStorage.getItem('sga-fontSize') as 'small' | 'medium' | 'large') || 'medium',
  primaryColor: localStorage.getItem('sga-primaryColor') || '#1E3A8A',
  secondaryColor: localStorage.getItem('sga-secondaryColor') || '#F97316',
};

const PanelContext = createContext<PanelContextType | undefined>(undefined);

export function PanelProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfigState] = useState<PanelConfig>(defaultConfig);
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const [history, setHistory] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setConfig = useCallback((newConfig: Partial<PanelConfig>) => {
    setConfigState((prev) => {
      const updated = { ...prev, ...newConfig };
      
      // Persist to localStorage
      Object.entries(updated).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          localStorage.setItem(`sga-${key}`, JSON.stringify(value));
        } else {
          localStorage.setItem(`sga-${key}`, String(value));
        }
      });
      
      return updated;
    });
  }, []);

  const addToHistory = useCallback((message: Message) => {
    setHistory((prev) => {
      const updated = [message, ...prev];
      // Keep only last 10 messages
      return updated.slice(0, 10);
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <PanelContext.Provider
      value={{
        config,
        setConfig,
        currentMessage,
        setCurrentMessage,
        history,
        addToHistory,
        clearHistory,
        isConnected,
        setIsConnected,
        connectionError,
        setConnectionError,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </PanelContext.Provider>
  );
}

export function usePanel() {
  const context = useContext(PanelContext);
  if (!context) {
    throw new Error('usePanel must be used within PanelProvider');
  }
  return context;
}
