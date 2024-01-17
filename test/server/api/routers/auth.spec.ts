import { AppRouter } from '@/server/api/root';
import { HashUtils } from '@/server/utils/hash';
import { expect, it } from '@jest/globals';
import { User } from '@prisma/client';
import { TRPCClientError } from '@trpc/client';
import { inferProcedureInput } from '@trpc/server';
import { dbMock } from '../../mocks/db.mock';
import { translations } from '../../mocks/i18n.mock';
import { caller } from '../../mocks/trpc.mock';
import { baseUser } from '../../mocks/user.mock';

jest.mock('@/server/utils/hash', () => ({
  HashUtils: {
    buildHashedPassword: jest.fn(),
    compareHashedPassword: jest.fn()
  }
}));

describe('Auth route tets', () => {
  describe('signUp', () => {
    const input: inferProcedureInput<AppRouter['auth']['signUp']> = {
      email: 'test@mail.com',
      password: '12345678'
    };

    it('should throw error if user already exists', async () => {
      const email = 'test@mail.com';

      dbMock.user.findUnique.mockResolvedValue({ email: input.email } as User);

      translations.mockReturnValue('error-message');

      await expect(caller.auth.signUp(input)).rejects.toThrow(
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

    it('should create a new user with success', async () => {
      dbMock.user.findUnique.mockResolvedValue(null);

      const hashedPassword = 'hashed-password';

      (HashUtils.buildHashedPassword as jest.Mock).mockReturnValue(
        hashedPassword
      );

      const user: User = {
        ...baseUser,
        email: input.email,
        password: hashedPassword,
        name: 'test'
      };

      dbMock.user.create.mockResolvedValue(user);

      await expect(caller.auth.signUp(input)).resolves.toBe(user);

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

      await expect(caller.auth.signUp(invalidInputs)).rejects.toThrowError();
    });
  });

  describe('authorizeCredentials', () => {
    const input: inferProcedureInput<
      AppRouter['auth']['authorizeCredentials']
    > = {
      email: 'test@mail.com',
      password: '12345678'
    };

    it('should throw an user not found error', async () => {
      dbMock.user.findUnique.mockResolvedValue(null);

      translations.mockReturnValue('wrong-credentials');

      await expect(caller.auth.authorizeCredentials(input)).rejects.toThrow(
        new TRPCClientError('wrong-credentials')
      );

      expect(dbMock.user.findUnique).toHaveBeenCalledWith({
        where: {
          email: input.email
        }
      });
      expect(translations).toHaveBeenCalledWith(
        'Auth.errors.credentials.incorrect'
      );
      expect(HashUtils.compareHashedPassword).toHaveBeenCalledWith(
        input.password,
        undefined
      );
    });

    it('should throw an error if password does not match', async () => {
      const user: User = {
        ...baseUser,
        email: input.email,
        password: 'hashed-password'
      };

      dbMock.user.findUnique.mockResolvedValue(user);

      HashUtils.compareHashedPassword = jest.fn().mockResolvedValue(false);

      translations.mockReturnValue('wrong-credentials');

      await expect(caller.auth.authorizeCredentials(input)).rejects.toThrow(
        new TRPCClientError('wrong-credentials')
      );

      expect(dbMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: input.email }
      });
      expect(HashUtils.compareHashedPassword).toHaveBeenCalledWith(
        input.password,
        user.password
      );
    });

    it('should return the user with success', async () => {
      const user: User = {
        ...baseUser,
        email: input.email,
        password: 'hashed-password'
      };

      dbMock.user.findUnique.mockResolvedValue(user);

      HashUtils.compareHashedPassword = jest.fn().mockResolvedValue(true);

      await expect(caller.auth.authorizeCredentials(input)).resolves.toBe(user);

      expect(dbMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: input.email }
      });
      expect(HashUtils.compareHashedPassword).toHaveBeenCalledWith(
        input.password,
        user.password
      );
    });
  });
});
