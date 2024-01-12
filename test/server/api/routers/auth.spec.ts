import { AppRouter } from '@/server/api/root';
import { HashUtils } from '@/server/utils/hash';
import { expect, it } from '@jest/globals';
import { User } from '@prisma/client';
import { TRPCClientError } from '@trpc/client';
import { inferProcedureInput } from '@trpc/server';
import { dbMock } from '../../mocks/db.mock';
import { translations } from '../../mocks/i18n.mock';
import { caller } from '../../mocks/trpc.mock';

jest.mock('@/server/utils/hash', () => ({
  HashUtils: {
    buildHashedPassword: jest.fn()
  }
}));

describe('Auth route tets', () => {
  describe('signIn', () => {
    const input: inferProcedureInput<AppRouter['auth']['signIn']> = {
      email: 'test@mail.com',
      password: '12345678'
    };

    it('should throw error if user already exists', async () => {
      const email = 'test@mail.com';

      dbMock.user.findUnique.mockResolvedValue({ email: input.email } as User);

      translations.mockReturnValue('error-message');

      await expect(caller.auth.signIn(input)).rejects.toThrow(
        new TRPCClientError('error-message')
      );

      expect(translations).toHaveBeenCalledWith(
        'Auth.errors.email.emailAlreadyExists'
      );
      expect(dbMock.user.findUnique).toHaveBeenCalledWith({
        where: {
          email
        }
      });
    });

    it('should create a new user', async () => {
      dbMock.user.findUnique.mockResolvedValue(null);

      const hashedPassword = 'hashed-password';

      (HashUtils.buildHashedPassword as jest.Mock).mockReturnValue(
        hashedPassword
      );

      const user: User = {
        email: input.email,
        password: hashedPassword,
        id: 1,
        name: 'test',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      dbMock.user.create.mockResolvedValue(user);

      await expect(caller.auth.signIn(input)).resolves.toBe(user);

      expect(dbMock.user.create).toHaveBeenCalledWith({
        data: {
          email: user.email,
          password: user.password,
          name: user.name
        }
      });
      expect(HashUtils.buildHashedPassword).toHaveBeenCalledWith(
        input.password
      );
    });

    it('should throw an error with invalid credentials fields', async () => {
      const invalidInputs = {
        email: 'invalid.email',
        password: 'invalid'
      };

      await expect(caller.auth.signIn(invalidInputs)).rejects.toThrowError();
    });
  });
});