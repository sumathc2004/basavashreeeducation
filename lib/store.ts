import fs from "node:fs";
import path from "node:path";

/**
 * Lightweight file-backed store for orders and enrollments.
 *
 * This stands in for a real database so the checkout → payment → enrollment
 * flow works end to end in development. Swap this module for calls to your
 * actual database (Postgres, MongoDB, etc.) when moving to production — the
 * function signatures are the contract the rest of the app depends on.
 */

export type OrderStatus = "PENDING" | "SUCCESS" | "FAILED";

export type Order = {
  orderId: string;
  reference: string;
  courseSlug: string;
  courseTitle: string;
  amount: number; // rupees
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
};

export type Enrollment = {
  orderId: string;
  courseSlug: string;
  courseTitle: string;
  customerEmail: string;
  progress: number;
  enrolledAt: string;
};

type Database = {
  orders: Order[];
  enrollments: Enrollment[];
};

const DB_PATH = path.join(process.cwd(), "data", "store.json");

function readDb(): Database {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(raw) as Database;
  } catch {
    return { orders: [], enrollments: [] };
  }
}

function writeDb(db: Database) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf8");
}

export function createOrder(order: Order) {
  const db = readDb();
  db.orders.push(order);
  writeDb(db);
  return order;
}

export function getOrder(orderId: string) {
  return readDb().orders.find((order) => order.orderId === orderId) ?? null;
}

export function updateOrderStatus(orderId: string, status: OrderStatus) {
  const db = readDb();
  const order = db.orders.find((item) => item.orderId === orderId);
  if (!order) return null;
  order.status = status;
  order.updatedAt = new Date().toISOString();
  writeDb(db);
  return order;
}

export function createEnrollment(enrollment: Enrollment) {
  const db = readDb();
  const exists = db.enrollments.some((item) => item.orderId === enrollment.orderId);
  if (!exists) {
    db.enrollments.push(enrollment);
    writeDb(db);
  }
  return enrollment;
}

export function getEnrollmentsByEmail(email: string) {
  return readDb().enrollments.filter((item) => item.customerEmail.toLowerCase() === email.toLowerCase());
}

export function getOrdersByEmail(email: string) {
  return readDb()
    .orders.filter((item) => item.customerEmail.toLowerCase() === email.toLowerCase())
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
