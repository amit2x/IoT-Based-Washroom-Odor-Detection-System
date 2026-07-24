import { Role } from './roles';

export interface UserProfile {
  userId: string;
  name: string;
  role: Role;
}

export function getRoleFromUserId(userId: string): Role | null {
  if (/^AP-\d{3}$/.test(userId)) return 'ADMIN';
  if (/^TP-\d{3}$/.test(userId)) return 'TERMINAL';
  if (/^ALP-\d{3}$/.test(userId)) return 'AUDITOR';
  return null;
}

export function validateCredentials(userId: string, password?: string): UserProfile | null {
  const role = getRoleFromUserId(userId);
  if (!role) return null;

  // Accept any password of length >= 4 for demo purposes
  if (password !== undefined && password.length < 4) return null;

  let name = '';
  switch (role) {
    case 'ADMIN':
      name = `Admin User (${userId})`;
      break;
    case 'TERMINAL':
      name = `Terminal Operator (${userId})`;
      break;
    case 'AUDITOR':
      name = `Auditor (${userId})`;
      break;
  }

  return { userId, name, role };
}
