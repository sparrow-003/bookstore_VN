// In-memory database simulation for the bookstore
// In production, this would connect to MongoDB, PostgreSQL, etc.

import { db as serverDb } from "@/server/db/index.js"

// Export the complete database implementation
export const db = serverDb
