import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:3000";

const emptyFilm = {
  title: "",
  description: "",
  releaseDate: ""
};

const DashboardPage = () => {
  const [films, setFilms] = useState([]);
  const [form, setForm] = useState(emptyFilm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/films`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Fout bij laden films");
      }

      const normalizedFilms = Array.isArray(data)
        ? data
        : data.films || data.data || [];

      setFilms(normalizedFilms);
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const resetForm = () => {
    setForm(emptyFilm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingId
        ? `${API_URL}/films/${editingId}`
        : `${API_URL}/films`;

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Fout bij opslaan film");
      }

      setMessage(editingId ? "✅ Film geüpdatet" : "✅ Film aangemaakt");
      resetForm();
      fetchFilms();
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  const handleEdit = (film) => {
    setEditingId(film.idFilm || film.id);
    setForm({
      title: film.title || "",
      description: film.description || "",
      releaseDate: film.releaseDate || ""
    });
    setMessage("");
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Удалить этот фильм?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_URL}/films/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Fout bij verwijderen");
      }

      setMessage("✅ Film verwijderd");
      fetchFilms();
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700"
          >
            Uitloggen
          </button>
        </div>

        {message && (
          <div className="mb-6 bg-gray-800 border border-gray-700 rounded-md p-4">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Film Bewerken" : "Nieuwe Film"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Titel
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none"
                  placeholder="Film titel"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Beschrijving
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none min-h-[120px]"
                  placeholder="Beschrijving"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Release Date
                </label>
                <input
                  type="text"
                  name="releaseDate"
                  value={form.releaseDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none"
                  placeholder="2024"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="w-full bg-accent text-white py-2 rounded-md hover:bg-blue-600"
                >
                  {editingId ? "Opslaan" : "Aanmaken"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-500"
                  >
                    Annuleren
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Films</h2>
              <button
                onClick={fetchFilms}
                className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Vernieuwen
              </button>
            </div>

            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : films.length === 0 ? (
              <p className="text-gray-400">Films niet gevonden</p>
            ) : (
              <div className="space-y-4">
                {films.map((film) => {
                  const filmId = film.idFilm || film.id;

                  return (
                    <div
                      key={filmId}
                      className="border border-gray-700 rounded-lg p-4 bg-gray-900"
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-bold">
                            {film.title || "Zonder titel"}
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">
                            Release: {film.releaseDate || "—"}
                          </p>
                          <p className="text-gray-300 mt-3">
                            {film.description || "Geen beschrijving beschikbaar"}
                          </p>
                        </div>

                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => handleEdit(film)}
                            className="bg-yellow-600 px-4 py-2 rounded-md hover:bg-yellow-700"
                          >
                            Bewerken
                          </button>
                          <button
                            onClick={() => handleDelete(filmId)}
                            className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700"
                          >
                            Verwijderen
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;