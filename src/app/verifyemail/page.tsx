"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { set } from "mongoose";

function VerifyEmail() {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [verfied, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      toast.success("Email verified successfully");
      setError(false);
    } catch (error) {
      setError(true);
      toast.error("Invalid token");
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    setError(false);
    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black gap-3">
      <h2 className="text-white text-xl">Verify Email</h2>
      <h2 className="bg-emerald-600 text-black px-8 py-4">
        {token ? `${token}` : "no token"}
      </h2>
      {verfied && (
        <div>
          <h2 className="text-white text-xl">Email verified successfully</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && <h2 className="text-red-700 text-lg">{error}</h2>}
    </div>
  );
}

export default VerifyEmail;
