import authFetch from "./authFetch";

const mockResponse = (
  status: any,
  statusText: any,
  response: any,
  isAuth?: any
) => {
  const headers = new Headers();
  headers.set("Content-type", "application/json");
  if (isAuth) {
    headers.set("Authorization", "Bearer testToken");
  }

  return new (window as any).Response(response, {
    status,
    statusText,
    headers
  });
};

const mockDispatch = jest.fn();

describe("authFetch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  (window as any).fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve(
      mockResponse(200, null, JSON.stringify({ success: false }))
    );
  });

  // runs fetch without auth
  it("handles normal fetch", () => {
    (window as any).fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(
        mockResponse(200, null, JSON.stringify({ success: true }))
      );
    });
    authFetch(mockDispatch, "/test", "GET").then(body => {
      expect(mockDispatch.mock.calls.length).toBe(0);
      expect(body).toEqual({ success: true });
    });
  });

  // dispatches updateToken on new token
  it("handles new Token", () => {
    (window as any).fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(
        mockResponse(200, null, JSON.stringify({ success: true }), true)
      );
    });

    authFetch(mockDispatch, "/test", "GET").then(body => {
      expect(body).toEqual({ success: true });
      expect(mockDispatch.mock.calls.length).toBe(1);
    });
  });

  // on error, returns error
  it("handles errors", () => {
    (window as any).fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(
        mockResponse(422, null, JSON.stringify({ success: false }), true)
      );
    });
    authFetch(mockDispatch, "/test", "GET")
      .then(body => {
        expect(body).toEqual({ success: false, message: "authFetch" });
        expect(mockDispatch.mock.calls.length).toBe(1);
      })
      .catch(e => {
        // tslint:disable-next-line
        console.log(e);
      });
  });
});
