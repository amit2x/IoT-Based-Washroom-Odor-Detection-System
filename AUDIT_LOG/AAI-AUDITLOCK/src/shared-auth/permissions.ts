import { Role } from './roles';

export const PORTAL_ROLES: Record<string, Role> = {
  admin: 'ADMIN',
  terminal: 'TERMINAL',
  audit: 'AUDITOR'
};

export function hasAccess(role: Role, portal: 'admin' | 'terminal' | 'audit'): boolean {
  return PORTAL_ROLES[portal] === role;
}
