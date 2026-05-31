import { NextResponse } from "next/server";
import { AccountService } from "@/composer/services/account.service";
import { ApiResponse } from "@/types";

/**
 * GET /api/accounts
 * Retrieve all accounts
 */
export async function GET() {
  try {
    const accounts = await AccountService.getAccountsWithStats();
    const totalBalance = await AccountService.getTotalBalance();

    const response: ApiResponse = {
      success: true,
      data: {
        accounts,
        totalBalance,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch accounts",
    };
    return NextResponse.json(response, { status: 500 });
  }
}

/**
 * POST /api/accounts
 * Create a new account
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, type, initialBalance } = body;

    if (!name || !type) {
      const response: ApiResponse = {
        success: false,
        error: "Name and type are required",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const account = await AccountService.createAccount(name, type, initialBalance || 0);

    const response: ApiResponse = {
      success: true,
      data: account,
      message: "Account created successfully",
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create account",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
