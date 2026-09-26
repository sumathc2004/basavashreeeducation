"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { logout, useSession, type Session } from "@/lib/auth-client";
import { getCourseBySlug } from "@/lib/data/courses";
import { CertificateIcon, ClockIcon, PlayIcon, UserIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

type Enrollment = {
  orderId: string;
  courseSlug: string;
  courseTitle: string;
  progress: number;
  enrolledAt: string;
};

type Order = {
  orderId: string;
  reference: string;
  courseTitle: string;
  amount: number;
  status: string;
  createdAt: string;
};

const tabs = ["My Courses", "Certificates", "Payment History", "Profile"] as const;
type Tab = (typeof tabs)[number];

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = tabs.find((tab) => tab === searchParams.get("tab")) ?? "My Courses";
  const { session } = useSession();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  useEffect(() => {
    if (session === undefined) return;
    if (session === null) {
      router.replace("/login");
      return;
    }
    fetch(`/api/enrollments?email=${encodeURIComponent(session.email)}`)
      .then((res) => res.json())
      .then(setEnrollments);
    fetch(`/api/payment/history?email=${encodeURIComponent(session.email)}`)
      .then((res) => res.json())
      .then(setOrders);
  }, [session, router]);

  if (session === undefined || session === null) {
    return (
      <Container className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted">Loading dashboard...</p>
      </Container>
    );
  }

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <section className="section-tint py-14 lg:py-16">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-royal-600 text-lg font-bold text-white">
              {session.name.charAt(0).toUpperCase()}
            </span>
            <div>
              <h1 className="text-xl font-bold text-navy-950">Welcome, {session.name}</h1>
              <p className="text-sm text-muted">{session.email}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Log Out
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-b border-line pb-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors",
                activeTab === tab ? "border-b-2 border-royal-600 text-royal-600" : "text-muted hover:text-navy-800"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {activeTab === "My Courses" ? <MyCoursesTab enrollments={enrollments} /> : null}
          {activeTab === "Certificates" ? <CertificatesTab enrollments={enrollments} studentName={session.name} /> : null}
          {activeTab === "Payment History" ? <PaymentHistoryTab orders={orders} /> : null}
          {activeTab === "Profile" ? <ProfileTab session={session} /> : null}
        </div>
      </Container>
    </section>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardContent />
    </Suspense>
  );
}

function MyCoursesTab({ enrollments }: { enrollments: Enrollment[] }) {
  if (enrollments.length === 0) {
    return (
      <div className="rounded-2xl card-surface p-10 text-center">
        <p className="text-sm text-muted">You haven&apos;t enrolled in any courses yet.</p>
        <Button href="/courses" className="mt-4">
          Browse Courses
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {enrollments.map((enrollment) => {
        const course = getCourseBySlug(enrollment.courseSlug);
        return (
          <div key={enrollment.orderId} className="rounded-2xl card-surface p-5">
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-royal-600">
              {course?.categoryName ?? "Course"}
            </span>
            <h3 className="mt-3 text-base font-semibold text-navy-950">{enrollment.courseTitle}</h3>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1">
                <ClockIcon className="h-3.5 w-3.5" /> {course?.duration}
              </span>
              <span className="inline-flex items-center gap-1">
                <UserIcon className="h-3.5 w-3.5" /> {course?.instructor.name}
              </span>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted">
                <span>Progress</span>
                <span className="font-medium text-navy-950">{enrollment.progress}%</span>
              </div>
              <div className="mt-1.5 h-2 w-full rounded-full bg-sky-100">
                <div className="h-2 rounded-full bg-royal-600" style={{ width: `${enrollment.progress}%` }} />
              </div>
            </div>
            <Button href={`/courses/${enrollment.courseSlug}`} size="sm" className="mt-4 w-full">
              <PlayIcon className="h-3.5 w-3.5" /> Continue Learning
            </Button>
          </div>
        );
      })}
    </div>
  );
}

function CertificatesTab({ enrollments, studentName }: { enrollments: Enrollment[]; studentName: string }) {
  if (enrollments.length === 0) {
    return (
      <div className="rounded-2xl card-surface p-10 text-center">
        <p className="text-sm text-muted">Certificates will appear here once you complete a course.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {enrollments.map((enrollment) => {
        const completed = enrollment.progress >= 100;
        return (
          <div key={enrollment.orderId} className="rounded-2xl card-surface p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-royal-600">
              <CertificateIcon className="h-5 w-5" />
            </span>
            <h3 className="mt-3 text-sm font-semibold text-navy-950">{enrollment.courseTitle}</h3>
            <p className="mt-1 text-xs text-muted">Awarded to {studentName}</p>
            <p className="mt-3 text-xs font-medium text-gold-600">
              {completed ? "Certificate Ready" : `${enrollment.progress}% complete — keep learning`}
            </p>
            <Button size="sm" variant={completed ? "primary" : "outline"} className="mt-4 w-full" disabled={!completed}>
              {completed ? "Download Certificate" : "Locked"}
            </Button>
          </div>
        );
      })}
    </div>
  );
}

function PaymentHistoryTab({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="rounded-2xl card-surface p-10 text-center">
        <p className="text-sm text-muted">No payment history yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl card-surface">
      <table className="w-full text-left text-sm">
        <thead className="bg-sky-50 text-xs uppercase tracking-wide text-muted">
          <tr>
            <th className="px-5 py-3">Order ID</th>
            <th className="px-5 py-3">Course</th>
            <th className="px-5 py-3">Amount</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId} className="border-t border-line">
              <td className="px-5 py-3 font-mono text-xs text-navy-800">{order.orderId}</td>
              <td className="px-5 py-3 text-navy-950">{order.courseTitle}</td>
              <td className="px-5 py-3 text-navy-950">₹{order.amount.toLocaleString("en-IN")}</td>
              <td className="px-5 py-3">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-semibold",
                    order.status === "SUCCESS" && "bg-sky-100 text-royal-600",
                    order.status === "PENDING" && "bg-gold-500/20 text-gold-600",
                    order.status === "FAILED" && "bg-red-100 text-red-600"
                  )}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-5 py-3 text-muted">{new Date(order.createdAt).toLocaleDateString("en-IN")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProfileTab({ session }: { session: Session }) {
  return (
    <div className="max-w-md rounded-2xl card-surface p-6">
      <h3 className="text-base font-semibold text-navy-950">Profile Details</h3>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <dt className="text-muted">Name</dt>
          <dd className="font-medium text-navy-950">{session.name}</dd>
        </div>
        <div className="flex items-center justify-between border-b border-line pb-3">
          <dt className="text-muted">Email</dt>
          <dd className="font-medium text-navy-950">{session.email}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted">Phone</dt>
          <dd className="font-medium text-navy-950">{session.phone || "—"}</dd>
        </div>
      </dl>
      <p className="mt-5 text-xs text-muted">
        Need to update your details?{" "}
        <Link href="/contact" className="font-medium text-royal-600 hover:underline">
          Contact support
        </Link>
        .
      </p>
    </div>
  );
}
