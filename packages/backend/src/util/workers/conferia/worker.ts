import { parentPort } from 'node:worker_threads';

export interface Inputs {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  country: string;
}

interface authData {
  accessToken?: string;
  refreshToken?: string;
}

const CONFERIA_URL = process.env.CONFERIA_URL;
const CONFERIA_ADMIN_EMAIL = process.env.CONFERIA_ADMIN_EMAIL;
const CONFERIA_ADMIN_PASSWORD = process.env.CONFERIA_ADMIN_PASSWORD;

/**
 * Worker thread that handles user registration with CONFERIA
 */
async function registerUserWithConferia(data: Inputs): Promise<{ success: boolean; error?: Error }> {
  try {
    if (!CONFERIA_URL || !CONFERIA_ADMIN_EMAIL || !CONFERIA_ADMIN_PASSWORD) {
      throw new Error('Missing CONFERIA environment variables');
    }

    // First authenticate as admin
    const authResponse = await fetch(`${CONFERIA_URL}/api/v1/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: CONFERIA_ADMIN_EMAIL,
        password: CONFERIA_ADMIN_PASSWORD
      })
    });

    if (!authResponse.ok) {
      throw new Error(`Failed to authenticate with CONFERIA: ${authResponse.statusText}`);
    }

    const authData = await authResponse.json() as authData;
    const token = authData.accessToken;

    if (!token) {
      throw new Error('Failed to get authentication token from CONFERIA');
    }

    // Now register the user
    const registerResponse = await fetch(`${CONFERIA_URL}/api/v1/account/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        company: data.company,
        country: data.country
      })
    });

    if (!registerResponse.ok) {
      throw new Error(`Failed to register user with CONFERIA: ${registerResponse.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error registering user with CONFERIA:', error);
    return { success: false, error: error instanceof Error ? error : new Error(String(error)) };
  }
}

// Listen for messages from the parent process
parentPort?.on('message', async (data: Inputs) => {
  const result = await registerUserWithConferia(data);
  parentPort?.postMessage(result);
});
