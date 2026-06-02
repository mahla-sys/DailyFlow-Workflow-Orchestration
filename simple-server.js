/**
 * سرور ساده HTTP برای تست پروژه
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const SRC_DIR = path.join(__dirname, 'src');

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    
    // مسیر فایل
    let filePath = req.url === '/' ? '/index.html' : req.url;
    
    // اول از public/ جستجو کن
    let fullPath = path.join(PUBLIC_DIR, filePath);
    let dirToCheck = PUBLIC_DIR;
    
    // اگر پیدا نشد و مسیر شامل /src/ باشد، از src/ جستجو کن
    if (!fs.existsSync(fullPath)) {
        if (filePath.startsWith('/src/')) {
            // برای مسیرهایی که با /src/ شروع می‌شوند، از ریشه src استفاده کن
            const relativePath = filePath.substring(5); // حذف /src/ از ابتدا
            fullPath = path.join(SRC_DIR, relativePath);
        } else {
            fullPath = path.join(SRC_DIR, filePath);
        }
    }
    
    // بررسی وجود فایل
    fs.readFile(fullPath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // فایل یافت نشد
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>');
            } else {
                // خطای سرور
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // تعیین نوع محتوا
            const extname = path.extname(fullPath);
            const contentType = MIME_TYPES[extname] || 'application/octet-stream';
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${PUBLIC_DIR} and ${SRC_DIR}`);
    console.log(`\n📋 پروژه آماده است!`);
    console.log(`🌐 مرورگر را باز کنید و به آدرس زیر بروید:`);
    console.log(`   http://localhost:${PORT}`);
    console.log(`\nبرای توقف سرور: Ctrl+C`);
});

// هندل کردن خروج تمیز
process.on('SIGINT', () => {
    console.log('\n\n👋 سرور متوقف شد');
    process.exit(0);
});