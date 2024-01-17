import { User } from '@prisma/client';

export const baseUser: User = {
  id: 'user-id',
  email: 'user@mail.com',
  password: 'password',
  name: 'user',
  createdAt: new Date(),
  updatedAt: new Date(),
  emailVerified: null,
  image: null
};
