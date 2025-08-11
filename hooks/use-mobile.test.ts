import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from './use-mobile';

// Mock window.matchMedia
class MockMediaQueryList {
  matches: boolean;
  media: string;
  private listeners: ((event: { matches: boolean }) => void)[] = [];

  constructor(matches: boolean, media: string) {
    this.matches = matches;
    this.media = media;
  }

  // Deprecated, but some libraries might still use it
  addListener(listener: (event: { matches: boolean }) => void) {
    this.listeners.push(listener);
  }

  removeListener(listener: (event: { matches: boolean }) => void) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  // Modern API
  addEventListener(type: string, listener: (event: { matches: boolean }) => void) {
    if (type === 'change') {
      this.listeners.push(listener);
    }
  }

  removeEventListener(type: string, listener: (event: { matches: boolean }) => void) {
    if (type === 'change') {
      this.listeners = this.listeners.filter(l => l !== listener);
    }
  }

  dispatchEvent(event: Event) {
    // Not strictly needed for this test, but good for completeness
    return true;
  }

  // Helper to simulate a change event
  _simulateChange(newMatches: boolean) {
    this.matches = newMatches;
    this.listeners.forEach(listener => listener({ matches: newMatches }));
  }
}

describe('useIsMobile', () => {
  const originalMatchMedia = window.matchMedia;
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    // Reset mocks before each test
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 1024 });
    window.matchMedia = jest.fn().mockImplementation((query: string) => {
      const isMobileQuery = query.includes('max-width');
      // Default to desktop unless explicitly set for a test
      return new MockMediaQueryList(!isMobileQuery, query);
    });
  });

  afterAll(() => {
    window.matchMedia = originalMatchMedia;
    Object.defineProperty(window, 'innerWidth', { writable: true, value: originalInnerWidth });
  });

  it('should return true when window width is mobile', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 320 });
    // Ensure matchMedia returns a mock that indicates mobile
    window.matchMedia = jest.fn().mockImplementation((query: string) => {
      return new MockMediaQueryList(true, query);
    });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('should return false when window width is desktop', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 1024 });
    // Ensure matchMedia returns a mock that indicates desktop
    window.matchMedia = jest.fn().mockImplementation((query: string) => {
      return new MockMediaQueryList(false, query);
    });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('should update isMobile when window size changes', () => {
    let mqlInstance: MockMediaQueryList;
    window.matchMedia = jest.fn().mockImplementation((query: string) => {
      mqlInstance = new MockMediaQueryList(false, query); // Initially desktop
      return mqlInstance;
    });

    const { result } = renderHook(() => useIsMobile());

    // Initially desktop
    expect(result.current).toBe(false);

    // Simulate resize to mobile
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 320 });
    act(() => {
      mqlInstance._simulateChange(true); // Simulate change to mobile
    });
    expect(result.current).toBe(true);

    // Simulate resize back to desktop
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 1024 });
    act(() => {
      mqlInstance._simulateChange(false); // Simulate change to desktop
    });
    expect(result.current).toBe(false);
  });
});
