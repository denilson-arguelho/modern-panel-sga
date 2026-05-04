import axios, { AxiosInstance } from 'axios';

export interface SGAConfig {
  server: string;
  moduleName?: string;
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
  private config: SGAConfig;

  constructor(config: SGAConfig) {
    this.config = config;
    
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
      timeout: 30000,
    });

    // Add interceptor to include token in requests
    this.client.interceptors.request.use((config) => {
      if (this.accessToken) {
        config.headers.Authorization = `Bearer ${this.accessToken}`;
      }
      return config;
    });

    // Add response interceptor to handle token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            await this.refreshAccessToken();
            return this.client(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  private async refreshAccessToken() {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'refresh_token');
      params.append('client_id', this.config.clientId);
      params.append('client_secret', this.config.clientSecret);
      params.append('refresh_token', this.refreshToken);

      const response = await axios.post(`${this.endpoint}/token`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true,
      });

      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token;

      return response.data;
    } catch (error: any) {
      throw new Error(`Token refresh failed: ${error.response?.data?.error_description || error.message}`);
    }
  }

  async authenticate(clientId: string, clientSecret: string, username: string, password: string) {
    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'password');
      params.append('client_id', clientId);
      params.append('client_secret', clientSecret);
      params.append('username', username);
      params.append('password', password);

      const response = await axios.post(`${this.endpoint}/token`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true,
      });

      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token;

      return {
        success: true,
        accessToken: this.accessToken,
        expiresIn: response.data.expires_in,
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.error_description || 
                          error.response?.statusText || 
                          error.message;
      return {
        success: false,
        error: errorMessage,
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
      const errorMessage = error.response?.statusText || error.message;
      return {
        success: false,
        error: errorMessage,
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
      const errorMessage = error.response?.statusText || error.message;
      return {
        success: false,
        error: errorMessage,
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
      const errorMessage = error.response?.statusText || error.message;
      return {
        success: false,
        error: errorMessage,
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

      const messages = Array.isArray(response.data) ? response.data : [response.data];
      return {
        success: true,
        data: messages as SGAMessage[],
      };
    } catch (error: any) {
      const errorMessage = error.response?.statusText || error.message;
      return {
        success: false,
        error: errorMessage,
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
