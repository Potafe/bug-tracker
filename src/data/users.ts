export type Role = 'Developer' | 'Manager';

export const users: { username: string; password: string; role: Role }[] = [
  {
    username: 'dev1',
    password: 'devpass',
    role: 'Developer',
  },
  {
    username: 'dev2',
    password: 'devpass',
    role: 'Developer',
  },
  {
    username: 'manager1',
    password: 'managerpass',
    role: 'Manager',
  },
];
