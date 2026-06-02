import { NextResponse } from "next/server";
import { TransactionService } from "@/composer/services/transaction.service";
import type { ApiResponse } from "@/types";

/**
 * GET /api/transactions/account/:accountId
 */
export async function GET(_request: Request, props: { params: Promise<{ accountId: string }> }) {
  const params = await props.params;
  try {
    const transactions = await TransactionService.getTransactionsByAccount(params.accountId);
    const response: ApiResponse = { success: true, data: transactions };
    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch transactions",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
