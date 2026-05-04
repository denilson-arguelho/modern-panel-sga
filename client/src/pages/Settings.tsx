import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { usePanel } from '@/contexts/PanelContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Check, X } from 'lucide-react';
import SGAClient from '@/services/sgaApi';

export default function Settings() {
  const [, setLocation] = useLocation();
  const { config, setConfig } = usePanel();
  const [activeTab, setActiveTab] = useState('connection');
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [unities, setUnities] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  const handleSave = () => {
    setConfig(config);
    setTestResult({ success: true, message: 'Configurações salvas com sucesso!' });
    setTimeout(() => setTestResult(null), 3000);
  };

  const handleTestConnection = async () => {
    setLoading(true);
    try {
      const client = new SGAClient({
        server: config.server,
        moduleName: config.moduleName,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        username: config.username,
        password: config.password,
      });

      const result = await client.authenticate(
        config.clientId,
        config.clientSecret,
        config.username,
        config.password
      );

      if (result.success) {
        // Try to get unities
        const unitiesResult = await client.getUnities();
        if (unitiesResult.success && unitiesResult.data) {
          setUnities(unitiesResult.data);
          setTestResult({ success: true, message: 'Conexão estabelecida com sucesso!' });
        } else {
          setTestResult({ success: false, message: 'Erro ao buscar unidades: ' + unitiesResult.error });
        }
      } else {
        setTestResult({ success: false, message: 'Erro de autenticação: ' + result.error });
      }
    } catch (error: any) {
      setTestResult({ success: false, message: 'Erro: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleUnityChange = async (unityId: string) => {
    setConfig({ unityId });
    
    if (unityId) {
      try {
        const client = new SGAClient({
          server: config.server,
          moduleName: config.moduleName,
          clientId: config.clientId,
          clientSecret: config.clientSecret,
          username: config.username,
          password: config.password,
        });

        const result = await client.authenticate(
          config.clientId,
          config.clientSecret,
          config.username,
          config.password
        );

        if (result.success) {
          const servicesResult = await client.getServices(parseInt(unityId));
          if (servicesResult.success && servicesResult.data) {
            setServices(servicesResult.data);
          }
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => setLocation('/')}
          className="flex items-center gap-2 text-primary hover:text-blue-800 transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>
        <h1 className="text-4xl font-bold text-primary">Configurações</h1>
        <p className="text-gray-600 mt-2">Configure a conexão com o Novo SGA e personalize a interface</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200">
        {[
          { id: 'connection', label: 'Conexão' },
          { id: 'speech', label: 'Vocalização' },
          { id: 'video', label: 'Vídeo' },
          { id: 'appearance', label: 'Aparência' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-2xl">
        {/* Connection Tab */}
        {activeTab === 'connection' && (
          <div className="space-y-6">
            <div className="settings-section">
              <h3 className="text-lg font-semibold text-primary mb-4">Servidor SGA</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="server">URL do Servidor</Label>
                  <Input
                    id="server"
                    value={config.server}
                    onChange={(e) => setConfig({ server: e.target.value })}
                    placeholder="http://localhost:8080"
                    className="settings-input"
                  />
                </div>

                <div>
                  <Label htmlFor="moduleName">Nome do Módulo</Label>
                  <Input
                    id="moduleName"
                    value={config.moduleName}
                    onChange={(e) => setConfig({ moduleName: e.target.value })}
                    placeholder="novo-sga"
                    className="settings-input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="clientId">Client ID</Label>
                    <Input
                      id="clientId"
                      value={config.clientId}
                      onChange={(e) => setConfig({ clientId: e.target.value })}
                      placeholder="client_id"
                      className="settings-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="clientSecret">Client Secret</Label>
                    <Input
                      id="clientSecret"
                      type="password"
                      value={config.clientSecret}
                      onChange={(e) => setConfig({ clientSecret: e.target.value })}
                      placeholder="client_secret"
                      className="settings-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username">Usuário</Label>
                    <Input
                      id="username"
                      value={config.username}
                      onChange={(e) => setConfig({ username: e.target.value })}
                      placeholder="username"
                      className="settings-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      value={config.password}
                      onChange={(e) => setConfig({ password: e.target.value })}
                      placeholder="password"
                      className="settings-input"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Unities and Services */}
            <div className="settings-section">
              <h3 className="text-lg font-semibold text-primary mb-4">Unidade e Serviços</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="unity">Unidade</Label>
                  <select
                    id="unity"
                    value={config.unityId}
                    onChange={(e) => handleUnityChange(e.target.value)}
                    className="settings-input"
                  >
                    <option value="">Selecione uma unidade</option>
                    {unities.map((unity) => (
                      <option key={unity.id} value={unity.id}>
                        {unity.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="services">Serviços</Label>
                  <div className="space-y-2">
                    {services.map((service) => (
                      <label key={service.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.serviceIds.includes(String(service.id))}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setConfig({
                                serviceIds: [...config.serviceIds, String(service.id)],
                              });
                            } else {
                              setConfig({
                                serviceIds: config.serviceIds.filter((id) => id !== String(service.id)),
                              });
                            }
                          }}
                          className="w-4 h-4"
                        />
                        <span>{service.nome}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Test Connection */}
            <div className="flex gap-4">
              <Button
                onClick={handleTestConnection}
                disabled={loading}
                className="settings-button"
              >
                {loading ? 'Testando...' : 'Testar Conexão'}
              </Button>
              <Button
                onClick={handleSave}
                className="settings-button"
              >
                <Save size={16} className="mr-2" />
                Salvar
              </Button>
            </div>

            {testResult && (
              <div
                className={`p-4 rounded-lg flex items-center gap-2 ${
                  testResult.success
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {testResult.success ? (
                  <Check size={20} />
                ) : (
                  <X size={20} />
                )}
                <span>{testResult.message}</span>
              </div>
            )}
          </div>
        )}

        {/* Speech Tab */}
        {activeTab === 'speech' && (
          <div className="space-y-6">
            <div className="settings-section">
              <h3 className="text-lg font-semibold text-primary mb-4">Vocalização de Senhas</h3>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.speechEnabled}
                    onChange={(e) => setConfig({ speechEnabled: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">Ativar vocalização de senhas</span>
                </label>

                {config.speechEnabled && (
                  <>
                    <div>
                      <Label htmlFor="voice">Voz</Label>
                      <select
                        id="voice"
                        value={config.speechVoice}
                        onChange={(e) => setConfig({ speechVoice: e.target.value as 'female' | 'male' })}
                        className="settings-input"
                      >
                        <option value="female">Feminina</option>
                        <option value="male">Masculina</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="locale">Idioma</Label>
                      <select
                        id="locale"
                        value={config.locale}
                        onChange={(e) => setConfig({ locale: e.target.value })}
                        className="settings-input"
                      >
                        <option value="pt_BR">Português (Brasil)</option>
                        <option value="es">Español</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>

            <Button onClick={handleSave} className="settings-button">
              <Save size={16} className="mr-2" />
              Salvar
            </Button>
          </div>
        )}

        {/* Video Tab */}
        {activeTab === 'video' && (
          <div className="space-y-6">
            <div className="settings-section">
              <h3 className="text-lg font-semibold text-primary mb-4">Vídeo de Fundo</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="videoUrl">URL do Vídeo</Label>
                  <Input
                    id="videoUrl"
                    value={config.videoUrl}
                    onChange={(e) => setConfig({ videoUrl: e.target.value })}
                    placeholder="https://exemplo.com/video.mp4"
                    className="settings-input"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Cole a URL de um vídeo MP4. O vídeo será reproduzido em loop como fundo.
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={handleSave} className="settings-button">
              <Save size={16} className="mr-2" />
              Salvar
            </Button>
          </div>
        )}

        {/* Appearance Tab */}
        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <div className="settings-section">
              <h3 className="text-lg font-semibold text-primary mb-4">Aparência</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="theme">Tema</Label>
                  <select
                    id="theme"
                    value={config.theme}
                    onChange={(e) => setConfig({ theme: e.target.value as 'light' | 'dark' })}
                    className="settings-input"
                  >
                    <option value="light">Claro</option>
                    <option value="dark">Escuro</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="fontSize">Tamanho da Fonte</Label>
                  <select
                    id="fontSize"
                    value={config.fontSize}
                    onChange={(e) => setConfig({ fontSize: e.target.value as 'small' | 'medium' | 'large' })}
                    className="settings-input"
                  >
                    <option value="small">Pequeno</option>
                    <option value="medium">Médio</option>
                    <option value="large">Grande</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primaryColor">Cor Primária</Label>
                    <div className="flex gap-2">
                      <input
                        id="primaryColor"
                        type="color"
                        value={config.primaryColor}
                        onChange={(e) => setConfig({ primaryColor: e.target.value })}
                        className="w-12 h-10 rounded cursor-pointer"
                      />
                      <Input
                        value={config.primaryColor}
                        onChange={(e) => setConfig({ primaryColor: e.target.value })}
                        className="settings-input"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="secondaryColor">Cor Secundária</Label>
                    <div className="flex gap-2">
                      <input
                        id="secondaryColor"
                        type="color"
                        value={config.secondaryColor}
                        onChange={(e) => setConfig({ secondaryColor: e.target.value })}
                        className="w-12 h-10 rounded cursor-pointer"
                      />
                      <Input
                        value={config.secondaryColor}
                        onChange={(e) => setConfig({ secondaryColor: e.target.value })}
                        className="settings-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={handleSave} className="settings-button">
              <Save size={16} className="mr-2" />
              Salvar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
