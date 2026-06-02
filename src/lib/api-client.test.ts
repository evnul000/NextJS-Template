/**
 * Unit Tests — buildApiClient / API singleton
 */
import { buildApiClient, API } from "@/lib/api-client";

const mockFetch = jest.fn();
global.fetch = mockFetch;

const ok = <T>(data: T, status = 200) =>
  mockFetch.mockResolvedValueOnce({
    ok: true, status,
    json: async () => ({ success: true, data }),
  });

const fail = (error: string, status = 400) =>
  mockFetch.mockResolvedValueOnce({
    ok: false, status,
    json: async () => ({ success: false, error }),
  });

beforeEach(() => jest.clearAllMocks());

// ── buildApiClient factory ────────────────────────────────────────────────────
describe("buildApiClient", () => {
  it("uses provided baseUrl on every request", async () => {
    const client = buildApiClient({ baseUrl: "https://api.example.com" });
    ok([]);
    await client.accounts.getAll();
    expect(mockFetch.mock.calls[0][0]).toBe("https://api.example.com/api/accounts");
  });

  it("calls getAuthHeaders and injects result", async () => {
    const getAuthHeaders = jest.fn().mockResolvedValue({ Authorization: "Bearer tok" });
    const client = buildApiClient({ getAuthHeaders });
    ok({});
    await client.accounts.getAll();
    expect(getAuthHeaders).toHaveBeenCalled();
    expect(mockFetch.mock.calls[0][1].headers.Authorization).toBe("Bearer tok");
  });
});

// ── Static API singleton ──────────────────────────────────────────────────────
describe("API singleton", () => {
  it("accounts.getAll returns data on success", async () => {
    ok({ accounts: [], totalBalance: 0 });
    const res = await API.accounts.getAll();
    expect(res.success).toBe(true);
    expect(res.data?.totalBalance).toBe(0);
  });

  it("accounts.create posts body", async () => {
    ok({ id: "acc_1" }, 201);
    await API.accounts.create({ name: "Savings", type: "savings" });
    const [, opts] = mockFetch.mock.calls[0];
    expect(opts.method).toBe("POST");
    expect(JSON.parse(opts.body)).toMatchObject({ name: "Savings" });
  });

  it("returns error on 4xx", async () => {
    fail("Not found", 404);
    const res = await API.accounts.getById("missing");
    expect(res.success).toBe(false);
    expect(res.statusCode).toBe(404);
  });

  it("handles network failure gracefully", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));
    const res = await API.accounts.getAll();
    expect(res.success).toBe(false);
    expect(res.statusCode).toBe(500);
  });

  it("exposes all resource modules", () => {
    expect(typeof API.accounts.getAll).toBe("function");
    expect(typeof API.transactions.getAll).toBe("function");
    expect(typeof API.users.me).toBe("function");
    expect(typeof API.dashboard.getStats).toBe("function");
  });
});
