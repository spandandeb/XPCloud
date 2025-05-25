import { useState } from "react";
import axios from "axios";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const scrapeNow = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/scrape");
      setArticles(res.data);
    } catch (err) {
      console.error("Scrape failed", err);
    }
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple hardcoded login for demonstration
    if (username === "spandan" && password === "1234") {
      setLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded shadow max-w-sm w-full"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          {loginError && (
            <div className="mb-4 text-red-600 text-center">{loginError}</div>
          )}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold mb-6"> Admin Panel</h1>
        <button
          onClick={scrapeNow}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        >
          {loading ? "Scraping..." : "Scrape Now"}
        </button>

        {articles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Availability</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((a, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2 border">{i + 1}</td>
                    <td className="px-4 py-2 border">{a.title}</td>
                    <td className="px-4 py-2 border">{a.price}</td>
                    <td className="px-4 py-2 border">{a.availability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No data scraped yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;