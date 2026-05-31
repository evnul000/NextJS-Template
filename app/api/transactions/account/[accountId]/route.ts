import { NextResponse } from "next/server";
import { TransactionService } from "@/composer/services/transaction.service";
import { ApiResponse } from "@/types";

/**
 * GET /api/transactions/account/[accountId]
 * Retrieve transactions for a specific account
 */
export async function GET(
  request: Request,
  { params }: { params: { accountId: string } }
) {
  try {
    const { accountId } = params;
    const transactions = await TransactionService.getAccountTransactions(accountId);

    const response: ApiResponse = {
      success: true,
      data: transactions,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch transactions",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
