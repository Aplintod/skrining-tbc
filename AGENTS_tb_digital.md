# 🫁 Project: Skrining TBC Digital — Instruksi Agent

## Langkah Pertama (WAJIB)
Sebelum menulis satu baris kode pun, baca file spesifikasi lengkap berikut:

```
.agents/rancangan_tb_digital.md
```

File itu berisi:
- Kriteria skrining Kemenkes RI yang telah direvisi
- Arsitektur folder pemisahan UI mobile & desktop (WAJIB diikuti)
- Algoritma diagnosis Kemenkes (TERDUGA TBC vs BUKAN TERDUGA TBC)
- Konfigurasi kontak Puskesmas (`assets/js/config.js`)
- Design system (medical teal, glassmorphism, Plus Jakarta Sans)
- Spesifikasi setiap halaman (mobile & desktop)
- Prompt pengembangan lengkap

---

## Aturan Khusus & Revisi Terbaru (SANGAT KRUSIAL)

Agent **WAJIB** memperhatikan poin-poin berikut saat membangun formulir & logika:

1. **Bagian yang DITIADAKAN (Dilarang Dibuat):**
   - ❌ **Jenis TBC kasus indeks:** Pilihan TBC Paru Bakteriologis/Klinis/Ekstra Paru **tidak boleh ada**.
   - ❌ **Pembesaran Kelenjar Getah Bening (KGB):** **Tidak boleh ada** (karena ini formulir skrining mandiri masyarakat, bukan pemeriksaan fisik faskes).
   - ❌ **Pemeriksaan Radiografi Toraks / Rontgen:** **Tidak boleh ada** untuk semua kelompok umur (<15 th dan ≥15 th).
   - ❌ **Output TB Laten / Evaluasi TPT:** **Tidak boleh ada**. Hasil diagnosis HANYA 2: **TERDUGA TBC** atau **BUKAN TERDUGA TBC**.

2. **Keterangan Jenis Kontak (WAJIB Ada Teks Penjelas):**
   - Jika responden memilih pernah kontak dengan pasien TBC, tampilkan pilihan jenis kontak dengan penjelasan jelas:
     - **Kontak Serumah:** *Keluarga atau orang yang tinggal bersama dalam satu rumah.*
     - **Kontak Erat:** *Teman kerja, teman sekolah, atau tetangga yang sering berinteraksi intens.*

3. **Formulir Gejala Bersifat Dinamis (Berdasarkan Umur):**
   - Input tanggal lahir pada tahap identitas akan menghitung usia secara otomatis.
   - **Jika Usia < 15 Tahun:** Formulir hanya menampilkan pertanyaan gejala anak (batuk >2 minggu, demam hilang timbul >2 minggu, BB turun/tidak naik 2 bulan, lesu/malaise/kurang aktif bermain).
   - **Jika Usia ≥ 15 Tahun:** Formulir hanya menampilkan pertanyaan gejala dewasa (status batuk: tidak batuk / batuk <2 minggu / batuk ≥2 minggu, demam hilang timbul, BB/nafsu makan turun, berkeringat malam tanpa aktivitas fisik).

4. **Integrasi Kontak Petugas Puskesmas (Di Halaman Hasil):**
   - Buat file `assets/js/config.js` untuk menampung nama puskesmas, nama nakes, nomor WhatsApp, alamat, dan jam layanan.
   - Di `hasil.html`, tampilkan kartu info Puskesmas dan tombol WhatsApp hijau besar: **"💬 Hubungi Petugas Puskesmas via WhatsApp"**.
   - Saat diklik, tombol tersebut otomatis membuka WhatsApp ke nomor petugas dengan pesan pra-isi yang merangkum nama, usia, status hasil (Terduga / Bukan Terduga), serta gejala pasien.

---

## Stack Teknologi

Project ini adalah **web statis murni** (siap deploy di GitHub Pages). TIDAK menggunakan framework backend/SSR.

| Layer | Teknologi | Sumber |
| :--- | :--- | :--- |
| CSS Framework | Tailwind CSS v3 | `https://cdn.tailwindcss.com` |
| JS Interaktivitas | Alpine.js v3 | `https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js` |
| Font | Plus Jakarta Sans | Google Fonts |
| Icons | SVG inline (Heroicons style) | — |

---

## Aturan Arsitektur Folder (WAJIB DIIKUTI)

1. **Pemisahan folder mobile/desktop adalah WAJIB:**
   - Folder `mobile/` khusus UI mobile (thumb-friendly, wizard step-by-step, bottom navigation).
   - Folder `desktop/` khusus UI layar lebar (grid layout, top navigation, visual tracker).
2. **`index.html` di root** hanya bertindak sebagai Router penentu device (`router.js`) yang langsung redirect ke `/mobile/` atau `/desktop/`.
3. **Logic, data, dan konfigurasi terpusat:**
   - `assets/js/config.js` → data Puskesmas & nomor WA petugas (mudah diedit user).
   - `assets/js/questions.js` → data opsi, teks keterangan kontak, helper hitung umur.
   - `assets/js/logic.js` → fungsi evaluasi diagnosa (dipakai oleh mobile maupun desktop).

---

## Struktur File Project

```
screening-tbc/
├── index.html                   ← Router (detect device → redirect)
├── .nojekyll                    ← Wajib untuk GitHub Pages
├── README.md
├── mobile/
│   ├── index.html               ← Dashboard edukasi mobile
│   ├── form.html                ← Wizard form mobile
│   └── hasil.html               ← Halaman hasil diagnosis mobile (Card Puskesmas + WhatsApp Nakes)
├── desktop/
│   ├── index.html               ← Dashboard edukasi desktop
│   ├── form.html                ← Form interaktif desktop
│   └── hasil.html               ← Halaman hasil diagnosis desktop
└── assets/
    ├── css/
    │   ├── mobile.css
    │   └── desktop.css
    ├── js/
    │   ├── config.js            ← Konfigurasi kontak Puskesmas & nomor WA
    │   ├── router.js
    │   ├── questions.js
    │   └── logic.js
    └── img/                     ← Asset gambar/poster
```

---

## Cara Memulai

Setelah membaca `.agents/rancangan_tb_digital.md`, bangun project dengan tahapan:
1. `assets/js/config.js`, `assets/js/questions.js` & `assets/js/logic.js` (fondasi data, konfigurasi, & logika)
2. `assets/js/router.js` & `index.html` (entry point routing)
3. `mobile/index.html`, `mobile/form.html`, `mobile/hasil.html` (flow mobile)
4. `desktop/index.html`, `desktop/form.html`, `desktop/hasil.html` (flow desktop)
5. `assets/css/mobile.css` & `desktop.css` (sentuhan akhir estetika & print style)
6. `.nojekyll` & `README.md`
