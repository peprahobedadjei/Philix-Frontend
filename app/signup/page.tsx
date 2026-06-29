"use client";

import Spinner from "@/components/Spinner";
import { authApi } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SingupPage() {
  const router = useRouter();
  const {login} =useAuth();
  const [form, setForm] = useState({
    email: "",
    username: "",
    full_name: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      setError("Password do not match");
      return;
    }
    setError("");
    setLoading(true);

    try{
        const res =await authApi.signup({
            email:form.email,
            username:form.username,
            full_name:form.full_name,
            password:form.password
        });
        login(res.user);
    }catch (err){

    }
  };

  const field = (
    id: keyof typeof form,
    label: string,
    type: string,
    placeholder: string,
    autoComplete?: string,
  ) => (
    <div>
      <label className="block text-xs font-black uppercase mb-1.5">
        {label}
      </label>
      <input
        type={type}
        className="nb-input"
        placeholder={placeholder}
        value={form[id]}
        onChange={(e) => setForm({ ...form, [id]: e.target.value })}
        required={id !== "confirm" ? true : undefined}
        autoComplete={autoComplete}
      />
    </div>
  );

  return (

    <div className="min-h-screen flex items-center justify-center p-6 bg-[#fafafa]">
      <div className="w-full max-w-md">
        <div className="nb-card">
          <div className="bg-[#f472b6] border-b-2 border-black px-6 py-5">
            <h1 className="text-3xl font-black uppercase tracking-tighter">
              {" "}
              Create Account
            </h1>
            <p className="text-sm font-medium mt-1"> Join Philix</p>
          </div>

          <div className="px-6 py-6">
            {error && (
              <div className="border-2 border-black bg-red-400 px-4 py-3 text-sm font-bold mb-5">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {field("full_name", "Full Name", "text", "Philipa Baby", "name")}
              {field(
                "username",
                "Username",
                "text",
                "philipa_baby",
                "username",
              )}
              {field(
                "email",
                "Email Address",
                "email",
                "philipa@gmail.com",
                "email",
              )}
              {field(
                "password",
                "Password",
                "password",
                "Min. 6 charcters",
                "new-password",
              )}
              {field(
                "confirm",
                "Confirm Password",
                "password",
                "Repeat Password",
                "new-password",
              )}

              <button
                type="submit"
                disabled={loading}
                className="nb-btn nb-btn-black w-full mt-2 text-base"
              >
                {loading ? (
                  <>
                    <Spinner />
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <p className="text-center mt-5 text-sm font-medium">
                Already have an account?{" "}
                <Link href ="/login"  className="font-black underline hover:text-[#f472b6]">
                Sign In
                </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
