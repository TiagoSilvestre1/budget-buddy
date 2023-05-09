import axios, { Axios } from 'axios'

export interface API {
  // defined in backend
  success: boolean
  data?: any
}

export class BackendService {
  private readonly client: Axios

  constructor(api_url: string = 'http://127.0.0.1:3000') {
    this.client = axios.create({
      baseURL: api_url,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async get(relative_url: string, return_axios: boolean = false): Promise<any> {
    const response = await this.client.get(relative_url)

    if (!return_axios) return response.data

    return response
  }

  async post(relative_url: string, data: any, return_axios: boolean = false): Promise<any> {
    const response = await this.client.post(relative_url, data)

    if (!return_axios) return response.data

    return response
  }

  async put(relative_url: string, data: any, return_axios: boolean = false): Promise<any> {
    const response = await this.client.put(relative_url, data)

    if (!return_axios) return response.data

    return response
  }

  async delete(relative_url: string, return_axios: boolean = false): Promise<any> {
    const response = await this.client.delete(relative_url)

    if (!return_axios) return response.data

    return response
  }
}

export const backendService = new BackendService()
