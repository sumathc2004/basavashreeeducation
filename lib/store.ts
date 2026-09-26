import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * Lightweight file-backed store for orders, enrollments and user accounts.
 *
 * This stands in for a real database so the checkout → payment → enrollment
 * and register → login flows work end to end in development. Swap this
 * module for calls to your actual database (Postgres, MongoDB, etc.) when
 * moving to production — the function signatures are the contract the rest
 * of the app depends on.
 *
 * IMPORTANT: on serverless hosts (Vercel, etc.) the project directory is
 * read-only at runtime — writing there throws ENOENT/EROFS and hard-fails
 * every request that writes (orders, registrations, etc.). This stores data
 * under the OS temp directory instead, which is writable, but on Vercel it
 * is PER-INSTANCE and NOT guaranteed to persist across cold starts or
 * concurrent instances. Orders, enrollments and user accounts can still be
 * lost in production. Do not rely on this for real data until it's backed
 * by a real database (Vercel Postgres, Supabase, etc.).
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

export type User = {
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  createdAt: string;
};

type Database = {
  orders: Order[];
  enrollments: Enrollment[];
  users: User[];
};

const DB_PATH = path.join(os.tmpdir(), "basavashree-education-store.json");

function readDb(): Database {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<Database>;
    return {
      orders: parsed.orders ?? [],
      enrollments: parsed.enrollments ?? [],
      users: parsed.users ?? [],
    };
  } catch {
    return { orders: [], enrollments: [], users: [] };
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

export function createUser(user: User) {
  const db = readDb();
  db.users.push(user);
  writeDb(db);
  return user;
}

export function getUserByEmail(email: string) {
  return readDb().users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;
}
