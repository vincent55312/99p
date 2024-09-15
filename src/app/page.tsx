"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { TitleH1 } from "./fonts";
import { LoginStorage } from "@/lib/localstorage-service";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setError("");
        LoginStorage.setLogin(username, password);
        router.push("/welcome");
      } else {
        setError(data.error);
        setMessage("");
      }
    } catch (err) {
      setError("An error occurred while trying to log in.");
      console.error("Login error:", err);
    }
  };

  return (
    <>
      <div className={`flex flex-col justify-center items-center min-h-screen mt-[-10vh]`}>
        <TitleH1>Connexion</TitleH1>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          className="my-2 p-2 text-lg border border-gray-300 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="my-2 p-2 text-lg border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="mt-5 p-2 px-5 text-lg text-white bg-blue-500 border-none rounded cursor-pointer hover:bg-blue-700"
          onClick={handleLogin}
        >
          Se connecter
        </button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
        {message && <p className="mt-2 text-green-500">{message}</p>}
      </div>
    </>
  );
}
