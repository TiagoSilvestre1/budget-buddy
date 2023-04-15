import axios, { Axios } from 'axios';

export interface API // defined in backend
{
    success: boolean;
    data?: any;
}

export class BackendService {

    private readonly client: Axios;

  constructor(api_url: string = 'http://172.16.238.11:3000') {
    this.client = axios.create({
      baseURL: api_url,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async get(relative_url: string): Promise<API> {
    const response = await this.client.get(relative_url);
    return response.data;
  }

  async post(relative_url: string, data: any): Promise<API> {
    const response = await this.client.post(relative_url, data);
    return response.data;
  }

  async put(relative_url: string, data: any): Promise<API> {
    const response = await this.client.put(relative_url, data);
    return response.data;
  }

  async delete(relative_url: string): Promise<API> {
    const response = await this.client.delete(relative_url);
    return response.data;
  }
};

export const backendService = new BackendService();