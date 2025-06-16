export type Role = 'developer' | 'manager';

export const users: { username: string; password: string; role: Role }[] = [
  {
    username: 'dev1',
    password: 'devpass',
    role: 'developer',
  },
  {
    username: 'dev2',
    password: 'devpass',
    role: 'developer',
  },
  {
    username: 'manager1',
    password: 'managerpass',
    role: 'manager',
  },
  {
    username: 'manager2',
    password: 'managerpass',
    role: 'manager',
  },
];
