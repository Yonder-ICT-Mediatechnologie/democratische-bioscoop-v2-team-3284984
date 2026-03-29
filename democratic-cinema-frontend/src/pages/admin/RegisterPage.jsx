import { useState } from "react";
import Logo from '../../assets/logo2.svg';
import Button from "../../components/Button";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:3000/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          login: email,       // backend ждёт login
          password: password,
          apiKey: apiKey
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Fout bij registratie");
      }

      setMessage("✅ Account word gemaakt!");
      window.location.href = "/login";
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-secondary">
      <div className=" p-8 w-full max-w-md">
        <img src={Logo} alt="Logo" className="w-[392px]" />

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Wachtwoord
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              API KEY
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200"
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

export default RegisterPage;