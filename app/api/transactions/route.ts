import { NextResponse } from "next/server";
import { TransactionService } from "@/composer/services/transaction.service";
import { ApiResponse } from "@/types";

/**
 * GET /api/transactions
 * Retrieve all transactions
 */
export async function GET() {
  try {
    const transactions = await TransactionService.getAllTransactions();

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

/**
 * POST /api/transactions
 * Create a new transaction
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { accountId, type, amount, description, category } = body;

    if (!accountId || !type || !amount) {
      const response: ApiResponse = {
        success: false,
        error: "accountId, type, and amount are required",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const transaction = await TransactionService.createTransaction(
      accountId,
      type,
      amount,
      description || "",
      category || "Uncategorized"
    );

    const response: ApiResponse = {
      success: true,
      data: transaction,
      message: "Transaction created successfully",
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create transaction",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
