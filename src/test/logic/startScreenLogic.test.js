import { isValidName } from '@/logic/startScreenLogic';

describe('isValidName', () => {
  test('should return true for valid alphanumeric names', () => {
    expect(isValidName('John123')).toBe(true);
    expect(isValidName('Player1')).toBe(true);
    expect(isValidName('ABC123')).toBe(true);
  });

  test('should return false for empty or whitespace-only names', () => {
    expect(isValidName('')).toBe(false);
    expect(isValidName('   ')).toBe(false);
    expect(isValidName(null)).toBe(false);
    expect(isValidName(undefined)).toBe(false);
  });

  test('should return false for names with special characters or spaces', () => {
    expect(isValidName('John Doe')).toBe(false);
    expect(isValidName('Player@123')).toBe(false);
    expect(isValidName('Test-Name')).toBe(false);
    expect(isValidName('User_1')).toBe(false);
  });
});