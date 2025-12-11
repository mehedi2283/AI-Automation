import { Project, TeamMember, Workflow, ClientImage, TechTool, AboutInfo, Booking, ChatSession } from '../types';

// PRODUCTION URL
const API_BASE_URL = 'https://automation-server-bm8q.onrender.com/api';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || response.statusText);
  }
  return response.json();
};

const safeGet = async <T>(url: string, fallback: T): Promise<T> => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
        console.warn(`API endpoint ${url} returned status ${res.status}. Using fallback data.`);
        return fallback;
    }
    return await res.json();
  } catch (error) {
    console.warn(`Network error fetching ${url}. Using fallback data.`, error);
    return fallback;
  }
};

export const api = {
  auth: {
    login: async (password: string): Promise<boolean> => {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        if (res.ok) {
            const data = await res.json();
            return data.success;
        }
        return false;
    }
  },
  stats: {
    recordVisit: async (visitorId: string): Promise<void> => {
       try {
         await fetch(`${API_BASE_URL}/visit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ visitorId, userAgent: navigator.userAgent }),
         });
       } catch (e) {
         console.warn("Failed to track visit", e);
       }
    },
    recordBooking: async (details: any): Promise<void> => {
       try {
         await fetch(`${API_BASE_URL}/bookings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(details),
         });
       } catch (e) {
         console.warn("Failed to record booking", e);
       }
    },
    get: async (): Promise<{ uniqueVisitors: number; totalVisits: number; bookingsCount: number }> => {
      return safeGet(`${API_BASE_URL}/stats`, { uniqueVisitors: 0, totalVisits: 0, bookingsCount: 0 });
    }
  },
  bookings: {
    getAll: async (): Promise<Booking[]> => {
        return safeGet<Booking[]>(`${API_BASE_URL}/bookings`, []);
    },
    update: async (bookingId: string, data: Partial<Booking>): Promise<Booking> => {
        const res = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            throw new Error(`Failed to update booking: ${res.status} ${res.statusText}`);
        }
        return res.json();
    }
  },
  chats: {
    getAll: async (): Promise<ChatSession[]> => {
      return safeGet<ChatSession[]>(`${API_BASE_URL}/chats`, []);
    },
    saveMessage: async (sessionId: string, message: { type: 'human' | 'ai', data: any }) => {
        try {
            await fetch(`${API_BASE_URL}/chats/message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId, ...message })
            });
        } catch (e) {
            console.error("Failed to save chat message", e);
        }
    }
  },
  projects: {
    getAll: async (): Promise<Project[]> => {
      // Removed mock merge to ensure only DB projects are shown
      const data = await safeGet<Project[]>(`${API_BASE_URL}/projects`, []);
      return data;
    },
    create: async (data: Project): Promise<Project> => {
      const res = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
    update: async (id: string, data: Project): Promise<Project> => {
      const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
    delete: async (id: string): Promise<void> => {
      const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'DELETE',
      });
      return handleResponse(res);
    },
    reorder: async (updates: { id: string, order: number }[]): Promise<void> => {
       const res = await fetch(`${API_BASE_URL}/projects/reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      });
      return handleResponse(res);
    }
  },
  team: {
    getAll: async (): Promise<TeamMember[]> => safeGet<TeamMember[]>(`${API_BASE_URL}/team`, []),
    create: async (data: TeamMember): Promise<TeamMember> => {
      const res = await fetch(`${API_BASE_URL}/team`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
    update: async (id: string, data: TeamMember): Promise<TeamMember> => {
      const res = await fetch(`${API_BASE_URL}/team/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
    delete: async (id: string): Promise<void> => {
      const res = await fetch(`${API_BASE_URL}/team/${id}`, {
        method: 'DELETE',
      });
      return handleResponse(res);
    },
  },
  workflows: {
    getAll: async (): Promise<Workflow[]> => safeGet<Workflow[]>(`${API_BASE_URL}/workflows`, []),
    create: async (data: Workflow): Promise<Workflow> => {
      const res = await fetch(`${API_BASE_URL}/workflows`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
    update: async (id: string, data: Workflow): Promise<Workflow> => {
      const res = await fetch(`${API_BASE_URL}/workflows/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
    delete: async (id: string): Promise<void> => {
      const res = await fetch(`${API_BASE_URL}/workflows/${id}`, {
        method: 'DELETE',
      });
      return handleResponse(res);
    },
  },
  clients: {
    getAll: async (): Promise<ClientImage[]> => safeGet<ClientImage[]>(`${API_BASE_URL}/clients`, []),
    create: async (data: ClientImage): Promise<ClientImage> => {
      const res = await fetch(`${API_BASE_URL}/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
    delete: async (id: string): Promise<void> => {
      const res = await fetch(`${API_BASE_URL}/clients/${id}`, {
        method: 'DELETE',
      });
      return handleResponse(res);
    }
  },
  techStack: {
    getAll: async (): Promise<TechTool[]> => safeGet<TechTool[]>(`${API_BASE_URL}/tech-stack`, []),
    create: async (data: TechTool): Promise<TechTool> => {
      const res = await fetch(`${API_BASE_URL}/tech-stack`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
    update: async (id: string, data: TechTool): Promise<TechTool> => {
      const res = await fetch(`${API_BASE_URL}/tech-stack/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
    delete: async (id: string): Promise<void> => {
      const res = await fetch(`${API_BASE_URL}/tech-stack/${id}`, {
        method: 'DELETE',
      });
      return handleResponse(res);
    }
  },
  about: {
    get: async (): Promise<AboutInfo | null> => safeGet<AboutInfo | null>(`${API_BASE_URL}/about`, null),
    update: async (data: AboutInfo): Promise<AboutInfo> => {
      const res = await fetch(`${API_BASE_URL}/about`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    }
  }
};