# Nextjs Snake Game

<p align="justify">
Game Snake menggunakan Next.js yang dapat dimainkan dari PC, laptop, ponsel, dan tablet.
</p>

<p align="justify">
Pada PC dan laptop, Anda dapat menggunakan tombol keyboard ⬅️⬆️⬇️➡️. Sedangkan pada ponsel dan tablet, Anda bisa menekan tombol yang ditampilkan di layar.
</p>

-----

Opsi Frontend Next.js untuk melakukan ini:

Ini adalah proyek [Next.js](https://nextjs.org/) yang disiapkan dengan [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
Versi Node.js v20.10.0 dan Next.js v14.2.4 diperlukan.

Pertama, install paket yang dibutuhkan:

```bash
npm install
```
Untuk menjalankan server development:

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
# atau
bun dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat hasilnya.

## Mengatasi Masalah: Error Next.js Parsing error: Cannot find module 'next/babel'

Tambahkan kode berikut di .eslintrc.json:
```bash
{
  "extends": ["next/babel","next/core-web-vitals"]
}
```

Dibuat oleh [Zulfikri Nanda Hadi]
