# 🫁 Aplikasi Skrining TBC Digital Mandiri (Kemenkes RI)

Aplikasi web statis untuk **skrining mandiri risiko Tuberkulosis (TBC)** berbasis Instrumen Skrining Sistematik Kementerian Kesehatan Republik Indonesia. Dirancang khusus untuk kemudahan akses masyarakat melalui smartphone maupun komputer desktop, dan langsung terintegrasi dengan petugas Puskesmas rujukan via WhatsApp.

---

## 🌟 Fitur Utama

1. **Routing Otomatis Berdasarkan Perangkat (`router.js`)**:
   - Pengguna smartphone / tablet otomatis diarahkan ke antarmuka **Mobile** (`/mobile/`).
   - Pengguna laptop / PC desktop otomatis diarahkan ke antarmuka **Desktop** (`/desktop/`).

2. **Formulir Gejala Dinamis Berdasarkan Usia**:
   - Pengguna memasukkan tanggal lahir di awal formulir. Sistem menghitung umur secara *real-time*.
   - **Usia < 15 Tahun**: Menampilkan set kuisioner khusus anak (batuk >2 minggu, demam hilang timbul >2 minggu, BB turun/tidak naik 2 bulan, lesu/kurang aktif).
   - **Usia ≥ 15 Tahun**: Menampilkan set kuisioner dewasa (status batuk: tidak batuk, <2 minggu, ≥2 minggu + 3 gejala sistemik tambahan).

3. **Keterangan Jenis Kontak Jelas**:
   - Dilengkapi penjelasan rinci perbedaan **Kontak Serumah** *(tinggal satu rumah)* dan **Kontak Erat** *(teman kerja/sekolah/tetangga sering interaksi)*.

4. **Kalkulator IMT Otomatis**:
   - Menghitung Indeks Massa Tubuh (IMT) dan status gizi secara instan dari input tinggi & berat badan.

5. **Algoritma Diagnosis Sederhana & Tepat**:
   - Hasil diagnosis hanya memiliki 2 status:
     - 🔴 **TERDUGA TBC** (Wajib tes dahak TCM di Puskesmas)
     - 🟢 **BUKAN TERDUGA TBC** (Tetap terapkan PHBS dan etika batuk)
   - *(Catatan: Hasil TPT / TB Laten, KGB, dan Rontgen Toraks ditiadakan sesuai instruksi revisi Kemenkes)*.

6. **Integrasi WhatsApp Petugas Puskesmas**:
   - Tombol langsung membuka obrolan WhatsApp dengan nomor petugas TB Puskesmas.
   - Pesan sudah terformat otomatis memuat ringkasan nama, usia, hasil diagnosis, dan daftar gejala.

7. **Aksi Dokumen Lengkap**:
   - 🖨️ Cetak / Simpan sebagai PDF resmi (dilengkapi styling `@media print` rapi).
   - 📲 Bagikan ringkasan hasil via WhatsApp ke keluarga/kerabat.
   - 🔄 Skrining ulang untuk anggota keluarga lain.

---

## 📁 Struktur Berkas

```text
Form TBC/
├── index.html                   ← Router penentu perangkat (Mobile vs Desktop)
├── .nojekyll                    ← Wajib untuk deployment GitHub Pages
├── README.md                    ← Dokumentasi teknis aplikasi
│
├── mobile/                      ← Antarmuka Khusus Smartphone
│   ├── index.html               ← Beranda mobile (Carousel poster, info edukasi, bottom nav)
│   ├── form.html                ← Form wizard 3-langkah dengan progress bar
│   └── hasil.html               ← Halaman hasil diagnosis & kontak Puskesmas
│
├── desktop/                     ← Antarmuka Khusus Layar Lebar (Laptop/PC)
│   ├── index.html               ← Dashboard desktop (Hero 2-kolom, grid poster)
│   ├── form.html                ← Form interaktif dengan tracker sidebar & live preview
│   └── hasil.html               ← Halaman hasil 2-kolom dengan card Puskesmas sticky
│
└── assets/
    ├── css/
    │   ├── mobile.css           ← Styling responsif mobile & bottom nav
    │   └── desktop.css          ← Styling desktop, sticky sidebar, & print style
    ├── js/
    │   ├── config.js            ← KONFIGURASI PUSKESMAS & NOMOR WHATSAPP
    │   ├── questions.js         ← Definisi pertanyaan, helper usia & IMT
    │   ├── logic.js             ← Algoritma evaluasi Kemenkes RI & SessionStorage
    │   └── router.js            ← Skrip deteksi layar & userAgent
    └── img/
        ├── README.txt           ← Petunjuk peletakan file poster
        ├── poster-gejala.png    ← (Opsional: Taruh file poster Anda di sini)
        ├── poster-penularan.png ← (Opsional: Taruh file poster Anda di sini)
        └── poster-pencegahan.png← (Opsional: Taruh file poster Anda di sini)
```

---

## ⚙️ Cara Mengubah Data Puskesmas & Nomor WhatsApp

Buka berkas `assets/js/config.js` lalu sesuaikan dengan informasi Puskesmas Anda:

```javascript
export const PUSKESMAS_CONFIG = {
    // 1. Nama resmi Puskesmas
    namaPuskesmas: "Puskesmas Rujukan Setempat",

    // 2. Nama petugas atau penanggung jawab program TB
    namaPetugas: "Petugas Program TBC",

    // 3. Nomor WhatsApp petugas (Format internasional 628xxxxxxxxxx tanpa tanda +)
    nomorWA: "6281234567890",

    // 4. Alamat lengkap Puskesmas
    alamat: "Jl. Kesehatan Masyarakat No. 10",

    // 5. Jam pelayanan TCM dahak
    jamLayanan: "Senin – Sabtu, 08.00 – 14.00 WIB",
};
```

---

## 🖼️ Cara Memasang Poster Edukasi

Taruh 3 file poster Anda ke dalam folder `assets/img/` dengan nama:
1. `poster-gejala.png` (atau `.jpg` / `.webp`)
2. `poster-penularan.png` (atau `.jpg` / `.webp`)
3. `poster-pencegahan.png` (atau `.jpg` / `.webp`)

*Jika poster belum ditaruh, website otomatis menampilkan kotak informasi placeholder yang tetap rapi dan informatif.*

---

## 🚀 Cara Menjalankan & Deploy ke GitHub Pages

1. **Jalankan Secara Lokal:**
   - Cukup buka berkas `index.html` menggunakan browser modern (Chrome, Edge, Firefox, Safari) atau gunakan ekstensi *Live Server* di VS Code / editor Anda.
   
2. **Deploy ke GitHub Pages:**
   - Push seluruh isi folder ini ke repository GitHub Anda.
   - Buka **Settings** repository → pilih menu **Pages** di sebelah kiri.
   - Pada bagian **Build and deployment**, pilih branch `main` (atau `master`) dan folder `/ (root)`.
   - Simpan. Website Anda siap diakses secara online di seluruh dunia!
