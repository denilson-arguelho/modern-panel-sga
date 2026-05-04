import React, { useEffect, useState } from 'react';
import { usePanel, Message } from '@/contexts/PanelContext';
import { speechService } from '@/services/speechService';

interface FeaturedDisplayProps {
  message: Message | null;
}

export default function FeaturedDisplay({ message }: FeaturedDisplayProps) {
  const { config } = usePanel();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (message) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);

      // Trigger speech if enabled
      if (config.speechEnabled) {
        speechService.announceTicket(
          message.data.siglaSenha + message.data.numeroSenha,
          message.data.local,
          message.data.numeroLocal,
          config.locale === 'pt_BR' ? 'pt-BR' : config.locale === 'es' ? 'es-ES' : 'en-US',
          config.speechVoice
        ).catch((error) => console.error('Speech error:', error));
      }

      return () => clearTimeout(timer);
    }
  }, [message, config.speechEnabled, config.speechVoice, config.locale]);

  const isPriority = message && message.data.peso > 0;
  const videoUrl = config.videoUrl;

  return (
    <div className="featured-display">
      {/* Video Background */}
      {videoUrl && (
        <>
          <video
            className="video-background"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div className="video-overlay" />
        </>
      )}

      {/* Featured Card */}
      {message ? (
        <div
          className={`featured-card ${isAnimating ? 'animate-fade-in-scale' : ''} relative`}
        >
          {/* Priority Indicator */}
          <div
            className={`priority-indicator ${
              isPriority ? 'priority-high' : 'priority-normal'
            }`}
          />

          {/* Content */}
          <div className="pl-4">
            {/* Priority Badge */}
            {isPriority && (
              <div className="mb-4 inline-block">
                <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Prioritário
                </span>
              </div>
            )}

            {/* Ticket Number */}
            <div className="featured-number">
              {message.data.siglaSenha}
              {String(message.data.numeroSenha).padStart(3, '0')}
            </div>

            {/* Location */}
            <div className="featured-location">
              {message.data.local}
              {String(message.data.numeroLocal).padStart(2, '0')}
            </div>

            {/* Description */}
            {message.data.prioridade && (
              <div className="featured-description">
                {message.data.prioridade}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-400">
          <div className="text-6xl font-display font-bold mb-4">--</div>
          <div className="text-2xl font-heading">Aguardando chamadas</div>
        </div>
      )}
    </div>
  );
}
