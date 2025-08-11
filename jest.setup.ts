// jest.setup.ts

// Minimal polyfill for Request, Response, and Headers objects for Jest's JSDOM environment.
// This is necessary because Next.js's NextRequest/NextResponse rely on these global Web APIs,
// which might not be fully available in Jest's default JSDOM environment.

if (typeof global.Request === 'undefined') {
  global.Request = class Request {
    url: string;
    method: string;
    headers: Headers;
    body: any;

    constructor(input: RequestInfo, init?: RequestInit) {
      if (typeof input === 'string') {
        this.url = input;
      } else {
        this.url = input.url;
      }
      this.method = init?.method || 'GET';
      this.headers = new Headers(init?.headers);
      this.body = init?.body;
    }

    async json() {
      return JSON.parse(this.body);
    }

    async text() {
      return String(this.body);
    }
  } as any;
}

if (typeof global.Response === 'undefined') {
  global.Response = class Response {
    body: any;
    status: number;
    headers: Headers;

    constructor(body: any, init?: ResponseInit) {
      this.body = body;
      this.status = init?.status || 200;
      this.headers = new Headers(init?.headers);
    }

    async json() {
      try {
        return JSON.parse(this.body);
      } catch (e) {
        return this.body;
      }
    }

    async text() {
      return String(this.body);
    }
  } as any;
}

if (typeof global.Headers === 'undefined') {
  global.Headers = class Headers {
    private headers: Record<string, string> = {};

    constructor(init?: HeadersInit) {
      if (init) {
        if (Array.isArray(init)) {
          init.forEach(([name, value]) => this.set(name, value));
        } else if (typeof init === 'object') {
          for (const name in init) {
            this.set(name, (init as Record<string, string>)[name]);
          }
        }
      }
    }

    append(name: string, value: string) {
      this.headers[name.toLowerCase()] = value;
    }

    delete(name: string) {
      delete this.headers[name.toLowerCase()];
    }

    get(name: string) {
      return this.headers[name.toLowerCase()];
    }

    has(name: string) {
      return this.headers.hasOwnProperty(name.toLowerCase());
    }

    set(name: string, value: string) {
      this.headers[name.toLowerCase()] = value;
    }

    forEach(callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any) {
      for (const key in this.headers) {
        callbackfn.call(thisArg, this.headers[key], key, this);
      }
    }

    [Symbol.iterator]() {
      let index = 0;
      const keys = Object.keys(this.headers);
      const values = Object.values(this.headers);
      return {
        next: () => {
          if (index < keys.length) {
            return { value: [keys[index], values[index++]], done: false };
          } else {
            return { done: true };
          }
        }
      };
    }
  } as any;
}