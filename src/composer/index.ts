/**
 * Composer Module — Single Export Point
 *
 * The Composer layer is your application's business-logic backbone.
 * It sits between API routes (app/api/) and the data layer (repositories).
 *
 *  API Route → Service → Repository → (Database / External API)
 *
 * Usage:
 *   import { AccountService, TransactionService } from "@/composer"
 *
 * To add a new domain (e.g. "invoices"):
 *   1. Create src/composer/repositories/invoice.repository.ts
 *   2. Create src/composer/services/invoice.service.ts
 *   3. Export both below
 *   4. Add the corresponding route in app/api/invoices/
 */

// ── Services ─────────────────────────────────────────────────────────────────
export { AccountService } from "./services/account.service";
export { TransactionService } from "./services/transaction.service";

// ── Repositories ─────────────────────────────────────────────────────────────
export { AccountRepository } from "./repositories/account.repository";
export { TransactionRepository } from "./repositories/transaction.repository";
