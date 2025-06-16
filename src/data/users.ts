export type Role = 'developer' | 'Manager';

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
    role: 'Manager',
  },
];
