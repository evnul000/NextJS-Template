import { NextResponse } from "next/server";
import { AccountService } from "@/composer/services/account.service";
import { ApiResponse } from "@/types";

/**
 * GET /api/accounts/[id]
 * Retrieve a specific account by ID
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const account = await AccountService.getAccountById(id);

    if (!account) {
      const response: ApiResponse = {
        success: false,
        error: "Account not found",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse = {
      success: true,
      data: account,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch account",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
