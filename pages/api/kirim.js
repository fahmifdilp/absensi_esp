export const config = {
  api: {
    bodyParser: false,
  },
};

import formidable from "formidable";
import fs from "fs";
import axios from "axios";

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Upload gagal" });

    const filePath = files.file.filepath;
    const fileData = fs.readFileSync(filePath);

    // Kirim ke server Flask
    try {
      const response = await axios.post("http://<IP_SERVER_FLASK>:5000/recognize", fileData, {
        headers: { "Content-Type": "image/jpeg" },
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Gagal kirim ke server pengenalan wajah" });
    }
  });
}
