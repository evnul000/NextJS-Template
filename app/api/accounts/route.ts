import { NextResponse } from "next/server";
import { AccountService } from "@/composer/services/account.service";
import { requireAuth } from "@/lib/clerk";
import { ApiResponse } from "@/types";

/**
 * GET /api/accounts
 * Retrieve all accounts — requires authentication via Clerk.
 * Uses requireAuth() from the centralized clerk module (src/lib/clerk.ts).
 */
export async function GET() {
  try {
    await requireAuth();

    const stats = await AccountService.getAccountsWithStats();
    const response: ApiResponse = {
      success: true,
      data: { accounts: stats.accounts, totalBalance: stats.totalBalance },
    };
    return NextResponse.json(response);
  } catch (error) {
    // requireAuth() throws a NextResponse — pass it through
    if (error instanceof NextResponse) return error;
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to fetch accounts" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/accounts
 * Create a new account — requires authentication via Clerk.
 */
export async function POST(request: Request) {
  try {
    const { userId } = await requireAuth();

    const body = await request.json();
    const { name, type, initialBalance } = body;

    if (!name || !type) {
      return NextResponse.json(
        { success: false, error: "Name and type are required" },
        { status: 400 }
      );
    }

    const account = await AccountService.createAccount(name, type, initialBalance || 0);
    return NextResponse.json(
      { success: true, data: { ...account, userId }, message: "Account created successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof NextResponse) return error;
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to create account" },
      { status: 500 }
    );
  }
}
