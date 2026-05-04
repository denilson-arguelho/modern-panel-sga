import React from 'react';
import { usePanel, Message } from '@/contexts/PanelContext';
import { Clock } from 'lucide-react';

export default function HistoryPanel() {
  const { history } = usePanel();

  return (
    <div className="panel-sidebar">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-lg font-heading font-bold text-sidebar-foreground">
          Histórico de Chamadas
        </h2>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto">
        {history.length === 0 ? (
          <div className="p-4 text-center text-sidebar-foreground opacity-50">
            <p className="text-sm">Nenhuma chamada ainda</p>
          </div>
        ) : (
          <div className="divide-y divide-sidebar-border">
            {history.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className={`history-item ${item.data.peso > 0 ? 'priority' : ''}`}
              >
                <div className="history-number">
                  {item.data.siglaSenha}
                  {String(item.data.numeroSenha).padStart(3, '0')}
                </div>
                <div className="history-location">
                  {item.data.local}
                  {String(item.data.numeroLocal).padStart(2, '0')}
                </div>
                {item.data.prioridade && (
                  <div className="text-xs text-gray-500 mt-1">
                    {item.data.prioridade}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Clock Footer */}
      <div className="clock-display">
        <div className="clock-time">
          {new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </div>
        <div className="clock-date">
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
          })}
        </div>
      </div>
    </div>
  );
}
