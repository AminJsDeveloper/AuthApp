"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "@/styles/auth.module.scss";

export default function AuthPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const validatePhone = (value: string) => {
    const iranPhoneRegex = /^09\d{9}$/;
    return iranPhoneRegex.test(value);
  };

  const handleSubmit = async () => {
    let valid = true;

    if (name.trim().length < 3) {
      setNameError("Name must be at least 3 characters");
      valid = false;
    } else {
      setNameError("");
    }

    if (!validatePhone(phone)) {
      setPhoneError("Enter a valid Iranian phone number (e.g., 09123456789)");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!valid) return;

    const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
    const data = await res.json();
    const user = data.results[0];

    login({
      name: name,
      email: user.email,
      picture: user.picture.thumbnail,
    });

    router.push("/dashboard");
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Login</h2>
        <input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <p>{nameError}</p>}

        <input
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {phoneError && <p>{phoneError}</p>}

        <button onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
}
