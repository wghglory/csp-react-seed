export interface Tenant {
  id: string;
  name: string;
  fullName: string;
  enabled: boolean;
  lastModifiedDate: string;
  serviceCount: number;
  userCount: number;
}

export interface UsageReport {
  cpuNumber: number;
  cpuTime: number;
  creationDate: string;
  id: string;
  lastModified: string;
  memory: number;
  reportEnd: string;
  reportStart: string;
  storage: string;
  tenantId: string;
  transferIn: string;
  transferOut: string;
}
