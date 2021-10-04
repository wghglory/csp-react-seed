import { UserRole } from './role';
import { Tenant } from './tenant';

// CDS User
export interface UserCds {
  name: string;
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  active: boolean;
  tenantId: string;
  tenantName: string;
  tenant: Tenant;
}

export interface LoginPayload {
  authMethod: AuthMethod;
  token: string;
}

export type AuthMethod = 'CDS_CREDENTIAL' | 'CDS_JWT' | 'CSP';
