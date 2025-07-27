import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Upload error:", err);
      setResult({ error: "Terjadi kesalahan saat upload" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>👤 Sistem Pengenalan Wajah</h1>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br /><br />
        <button type="submit" disabled={loading}>
          {loading ? "Mengirim..." : "Kirim Gambar"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Hasil:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
