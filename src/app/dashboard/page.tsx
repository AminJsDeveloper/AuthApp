"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/dashboard.module.scss";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/auth");
  }, [user]);

  if (!user) return null;

  return (
    <div className={styles.container}>
      <h1>Welcome to the Dashboard, {user.name} 👋</h1>
      <img src={user.picture} alt="avatar" />
      <p>{user.email}</p>
    </div>
  );
}
