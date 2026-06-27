"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, LogIn } from "lucide-react";
import { useAdminSession } from "@/components/admin/admin-auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { PlayfulCard } from "@/components/ui/playful-card";
import { siteConfig } from "@/lib/site-config";
import { ROLE_LABELS } from "@/lib/admin-rbac";

const DEMO_ACCOUNTS = [
  { email: "nabila@admarkapture.com", role: "super-admin" as const },
  { email: "jordan@admarkapture.com", role: "admin" as const },
  { email: "marcus@admarkapture.com", role: "employee" as const },
];

/** Email + password sign-in for internal admin access. */
export function AdminLoginForm() {
  const { login } = useAdminSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const result = login(email, password);
    if (!result.ok) {
      setError(result.error);
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary"
        >
          ← {siteConfig.name}
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-foreground">Internal admin</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in with your team email and password.
        </p>
      </div>

      <PlayfulCard variant="ticket" tone="neutral" className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email</Label>
            <Input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@admarkapture.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={submitting}>
            <LogIn className="size-4" />
            Sign in
          </Button>
        </form>
      </PlayfulCard>

      <PlayfulCard variant="pin" tone="sky" className="mt-6 p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Lock className="size-4" />
          Default team accounts
        </div>
        <p className="text-xs text-muted-foreground">
          Initial password for all accounts: <strong className="text-foreground">admin123</strong>.
          Super admin can change roles and passwords under Team access.
        </p>
        <ul className="space-y-2 text-xs">
          {DEMO_ACCOUNTS.map((account) => (
            <li
              key={account.email}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-card/80 px-3 py-2"
            >
              <span className="font-mono text-foreground">{account.email}</span>
              <PlayfulBadge variant="chip">{ROLE_LABELS[account.role]}</PlayfulBadge>
            </li>
          ))}
        </ul>
      </PlayfulCard>
    </div>
  );
}
