const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// 静态文件目录
app.use(express.static(path.join(__dirname)));

// 自动生成文件列表 JSON
app.get("/files/list.json", (req, res) => {
  const filesDir = path.join(__dirname, "files");
  fs.readdir(filesDir, (err, files) => {
    if (err) return res.status(500).json([]);
    // 过滤 DOCX 文件（忽略大小写）
    const docxFiles = files.filter((f) => f.toLowerCase().endsWith(".docx"));
    res.json(docxFiles);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
