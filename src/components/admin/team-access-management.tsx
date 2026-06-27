"use client";

import { useState } from "react";
import { Shield, KeyRound, UserPlus } from "lucide-react";
import { useAdminToast } from "@/components/admin/admin-toast";
import { useAdminSession } from "@/components/admin/admin-auth-provider";
import { useEmployees } from "@/components/admin/employees-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { PlayfulCard } from "@/components/ui/playful-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROLE_LABELS, type AdminRole } from "@/lib/admin-rbac";

const ROLES: AdminRole[] = ["super-admin", "admin", "employee"];

/** Super admin manages internal roles, passwords, and new team members. */
export function TeamAccessManagement() {
  const { users, currentUser, setUserRole, setUserPassword, addUser } = useAdminSession();
  const { addRosterEmployee } = useEmployees();
  const { toast } = useAdminToast();
  const [passwordDrafts, setPasswordDrafts] = useState<Record<string, string>>({});
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<AdminRole>("employee");
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newDepartment, setNewDepartment] = useState("");

  const handleRoleChange = (userId: string, role: AdminRole) => {
    if (userId === currentUser?.id && role !== "super-admin") {
      const otherSuperAdmins = users.filter(
        (u) => u.role === "super-admin" && u.id !== userId,
      );
      if (otherSuperAdmins.length === 0) {
        toast("Cannot change role", "At least one super admin is required.");
        return;
      }
    }
    setUserRole(userId, role);
    toast("Role updated", ROLE_LABELS[role]);
  };

  const handlePasswordSave = (userId: string) => {
    const password = passwordDrafts[userId]?.trim();
    if (!password) {
      toast("Password required", "Enter a new password before saving.");
      return;
    }
    setUserPassword(userId, password);
    setPasswordDrafts((prev) => ({ ...prev, [userId]: "" }));
    toast("Password updated", "User can sign in with the new password.");
  };

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const result = addUser({
      name: newName,
      email: newEmail,
      password: newPassword,
      role: newRole,
      assigneeName: newName.trim(),
    });
    if (!result.ok) {
      toast("Could not add user", result.error);
      return;
    }

    addRosterEmployee({
      id: `emp-${result.user.id.replace("user-", "")}`,
      name: result.user.name,
      role: newJobTitle.trim() || "Team member",
      department: newDepartment.trim() || "Operations",
    });

    toast("Employee added", `${result.user.name} can sign in with ${result.user.email}`);
    setNewName("");
    setNewEmail("");
    setNewPassword("");
    setNewRole("employee");
    setNewJobTitle("");
    setNewDepartment("");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <PlayfulBadge variant="stamp" className="mb-3">
          Super admin only
        </PlayfulBadge>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Team access</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Add employees, manage roles, and reset passwords. New team members appear in attendance
          and can sign in immediately.
        </p>
      </div>

      <PlayfulCard variant="ticket" tone="mint" className="p-5 sm:p-6">
        <h2 className="font-bold text-foreground flex items-center gap-2 mb-4">
          <UserPlus className="size-4" />
          Add new employee
        </h2>
        <form onSubmit={handleAddEmployee} className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="new-name">Full name</Label>
            <Input
              id="new-name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Jordan Lee"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-email">Email</Label>
            <Input
              id="new-email"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="name@admarkapture.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Initial password"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-role">Role</Label>
            <select
              id="new-role"
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as AdminRole)}
            >
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {ROLE_LABELS[role]}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-job-title">Job title</Label>
            <Input
              id="new-job-title"
              value={newJobTitle}
              onChange={(e) => setNewJobTitle(e.target.value)}
              placeholder="Account strategist"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-department">Department</Label>
            <Input
              id="new-department"
              value={newDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
              placeholder="Client success"
            />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit">
              <UserPlus className="size-4" />
              Add employee
            </Button>
          </div>
        </form>
      </PlayfulCard>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="size-4" />
            Team members ({users.length})
          </CardTitle>
          <CardDescription>Update roles and passwords for existing accounts</CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader className="pb-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-base">{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
                <PlayfulBadge variant="ticket">{ROLE_LABELS[user.role]}</PlayfulBadge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`role-${user.id}`}>Role</Label>
                <select
                  id={`role-${user.id}`}
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value as AdminRole)}
                >
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {ROLE_LABELS[role]}
                    </option>
                  ))}
                </select>
                {user.assigneeName && (
                  <p className="text-xs text-muted-foreground">
                    Lead scope: {user.assigneeName}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`password-${user.id}`}>New password</Label>
                <div className="flex gap-2">
                  <Input
                    id={`password-${user.id}`}
                    type="password"
                    value={passwordDrafts[user.id] ?? ""}
                    onChange={(e) =>
                      setPasswordDrafts((prev) => ({ ...prev, [user.id]: e.target.value }))
                    }
                    placeholder="Set new password"
                  />
                  <Button type="button" variant="outline" onClick={() => handlePasswordSave(user.id)}>
                    <KeyRound className="size-3.5" />
                    Save
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
