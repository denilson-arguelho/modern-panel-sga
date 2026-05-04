import axios, { AxiosInstance } from 'axios';

export interface SGAConfig {
  server: string;
  moduleName: string;
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
}

export interface SGAMessage {
  id: string;
  siglaSenha: string;
  numeroSenha: string;
  local: string;
  numeroLocal: string;
  prioridade: string;
  peso: number;
}

export interface SGAUnity {
  id: number;
  nome: string;
  descricao: string;
}

export interface SGAService {
  id: number;
  nome: string;
  descricao: string;
}

class SGAClient {
  private client: AxiosInstance;
  private endpoint: string;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(config: SGAConfig) {
    let host = config.server;
    if (!host.endsWith('/')) {
      host += '/';
    }
    if (config.moduleName) {
      host += config.moduleName + '/';
    }

    this.endpoint = host + 'api';

    this.client = axios.create({
      baseURL: this.endpoint,
      withCredentials: true,
    });

    // Add interceptor to include token in requests
    this.client.interceptors.request.use((config) => {
      if (this.accessToken) {
        config.headers.Authorization = `Bearer ${this.accessToken}`;
      }
      return config;
    });
  }

  async authenticate(clientId: string, clientSecret: string, username: string, password: string) {
    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'password');
      params.append('client_id', clientId);
      params.append('client_secret', clientSecret);
      params.append('username', username);
      params.append('password', password);

      const response = await this.client.post('/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token;

      return {
        success: true,
        accessToken: this.accessToken,
        expiresIn: response.data.expires_in,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error_description || error.message,
      };
    }
  }

  async testConnection() {
    try {
      const response = await this.client.get('');
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.statusText || error.message,
      };
    }
  }

  async getUnities() {
    try {
      const response = await this.client.get('/unidades');
      return {
        success: true,
        data: response.data as SGAUnity[],
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.statusText || error.message,
      };
    }
  }

  async getServices(unityId: number) {
    try {
      const response = await this.client.get(`/unidades/${unityId}/servicos`);
      return {
        success: true,
        data: response.data as SGAService[],
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.statusText || error.message,
      };
    }
  }

  async getMessages(unityId: number, serviceIds: number[]) {
    try {
      const servicesParam = serviceIds.filter((s) => s > 0).join(',');
      const response = await this.client.get(`/unidades/${unityId}/painel`, {
        params: {
          servicos: servicesParam,
        },
      });

      const messages = response.data as SGAMessage[];
      return {
        success: true,
        data: messages,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.statusText || error.message,
      };
    }
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  getAccessToken() {
    return this.accessToken;
  }
}

export default SGAClient;
