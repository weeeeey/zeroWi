import { AuthHostType } from '@/types/auth';
import { User } from '@/types/user';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AUTH_HOSTS } from './constants';

export const isValidHost = (value: string): boolean => {
  if (AUTH_HOSTS.includes(value as AuthHostType)) return true;
  return false;
};

async function getCookie() {
  const cookieStore = await cookies();
  return cookieStore;
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await getCookie();
  try {
    const token = cookieStore.get('auth-token')?.value;
    if (!token) return null;

    // const secret = new TextEncoder().encode(JWT_SECRET)

    try {
      //   const { payload } = await jose.jwtVerify(token, secret)
      return null;
    } catch (jwtError) {
      cookieStore.delete('auth-token');
      return null;
    }
  } catch (error) {
    cookieStore.delete('auth-token');
    return null;
  }
}

// Server action to log out
export async function logoutAction() {
  const cookieStore = await getCookie();
  cookieStore.delete('auth-token');
  revalidatePath('/');
  redirect('/');
}
