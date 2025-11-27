export enum Tab {
  HOME = 'HOME',
  MONEY = 'MONEY',
  DAILY = 'DAILY',
  ADMIN = 'ADMIN'
}

export interface Contact {
  title: string;
  phone: string;
  hours?: string;
  description?: string;
  urgent?: boolean;
}

export interface SalaryLevel {
  level: string;
  roles: string[];
}

export interface SeniorityBonus {
  years: string;
  amount: number; // cents per hour
}
