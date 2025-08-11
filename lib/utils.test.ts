import { cn } from './utils';

describe('cn', () => {
  it('should combine class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should handle conditional class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should merge Tailwind CSS classes correctly', () => {
    expect(cn('px-2', 'py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('should handle mixed inputs', () => {
    expect(cn('text-red-500', { 'font-bold': true }, 'bg-blue-200')).toBe(
      'text-red-500 font-bold bg-blue-200'
    );
  });

  it('should return an empty string for no inputs', () => {
    expect(cn()).toBe('');
  });
});
