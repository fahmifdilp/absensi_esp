
export default function Home() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name: e.target.name.value };

    const res = await fetch("/api/kirim", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    alert("Response: " + result.message);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Kirim Data ke API</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Masukkan nama" required />
        <button type="submit">Kirim</button>
      </form>
    </div>
  );
}
