const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://xborg-tech-challenge-production.up.railway.app';

export const api = {
  async getProfile(token: string) {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  },

  async updateProfile(token: string, data: any) {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
  }
};
