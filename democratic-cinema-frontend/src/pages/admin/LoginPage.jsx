import { useState } from "react";
import Logo from '../../assets/logo2.svg';
import Button from "../../components/Button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:3000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          login: email,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Fout bij inloggen");
      }

      sessionStorage.setItem("adminToken", data.token);

      setMessage("✅ Inloggen geslaagd");
      window.location.href = "/dashboard";
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-secondary">
      <div className="bg-secondary p-8 w-full max-w-md">
        <img src={Logo} alt="Logo" className="w-[392px]" />

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm text-gray-400 mb-1"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm text-gray-400 mb-1"
              htmlFor="password"
            >
              Wachtwoord
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" variant="accent" className="w-full text-sm">
                      Registreren
                    </Button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-white">{message}</p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;