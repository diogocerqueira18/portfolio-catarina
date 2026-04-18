import { signInWithEmailAndPassword } from "firebase/auth";
import { AlertCircle } from "lucide-react";
import React, { useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
      };

      const expiresInSeconds = 99999999; //CHange to 3h

      document.cookie = `isAdminLoggedIn=true; max-age=${expiresInSeconds}; path=/`;
      document.cookie = `adminUser=${JSON.stringify(user)}; max-age=${expiresInSeconds}; path=/`;

      navigate("/admin", { replace: true });
    } catch (err: any) {
      console.error(err);
      setError("Email ou password incorretos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center p-6">
      <div className="h-full max-w-md">
        <div className="text-center mb-12">
          <div className="text-3xl font-serif font-bold text-brand mb-2">
            CB
          </div>
          <h2 className="text-sm uppercase tracking-[0.3em] text-zinc-400 font-semibold">
            Back Office Access
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2 ml-1">
              Utilizador
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:border-brand/30 transition-colors font-medium"
              placeholder="example@email.com"
              required
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2 ml-1">
              Palavra-passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:border-brand/30 transition-colors font-medium"
              placeholder="••••••••"
              required
            />
          </div>
          {error && (
            <div className="bg-brand/30 text-red-400 p-3 rounded-2xl flex items-center gap-2 text-sm">
              <AlertCircle size={20} />
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-semibold tracking-widest uppercase text-xs hover:bg-brand transition-colors shadow-xl shadow-zinc-200"
          >
            {loading ? "A entrar..." : "Entrar"}
          </button>
        </form>
        <button
          onClick={() => navigate("/")}
          className="mt-8 w-full text-zinc-400 hover:text-zinc-600 text-xs uppercase tracking-widest font-medium transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
