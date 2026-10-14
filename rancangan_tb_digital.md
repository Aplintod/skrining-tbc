# 🫁 Rancangan Project: Skrining TBC Digital (Revisi Lengkap)

> **Status:** Dokumen Rancangan & Spesifikasi — Dilengkapi integrasi kontak petugas Puskesmas  
> **Dasar:** Analisis HTML contoh + Instrumen Skrining TBC Sistematik Kemenkes RI (dengan penyesuaian tanda merah & brief terbaru)

---

## 📋 1. Ringkasan Perubahan & Catatan Revisi Terbaru

Berdasarkan koreksi pada PDF Kemenkes dan brief terbaru:
1. ❌ **Bagian Ditiadakan (Dihapus dari Formulir):**
   - **Jenis TBC yang diderita kasus indeks** *(TBC Paru Bakteriologis, TBC Klinis, TBC Ekstra Paru)* — ditandai merah di PDF, ditiadakan.
   - **Tanda Pembesaran Kelenjar Getah Bening (KGB)** — ditandai merah di PDF, ditiadakan (karena skrining mandiri, masyarakat tidak memeriksa KGB sendiri).
   - **Pemeriksaan Radiografi Toraks / Rontgen** — ditiadakan untuk SEMUA kelompok usia (<15 tahun dan ≥15 tahun).
2. ℹ️ **Keterangan Jenis Kontak (Wajib Ditampilkan):**
   - **Kontak Serumah:** Keluarga atau orang yang tinggal bersama dalam satu rumah.
   - **Kontak Erat:** Teman kerja, teman sekolah, atau tetangga yang sering berinteraksi intens.
3. 🔄 **Kuisioner Gejala Dinamis Berdasarkan Usia:**
   - Responden memasukkan tanggal lahir di awal form.
   - Sistem menghitung usia saat ini secara otomatis.
   - **Jika Usia < 15 Tahun:** Menampilkan set kuisioner gejala anak.
   - **Jika Usia ≥ 15 Tahun:** Menampilkan set kuisioner gejala dewasa.
4. 🎯 **Penyederhanaan Output Hasil Diagnosis:**
   - **Hasil TB Laten (TPT) DITIADAKAN.**
   - Output diagnosis hanya memiliki **2 STATUS UTAMA**:
     - 🔴 **TERDUGA TBC** (Rujuk ke Puskesmas/Faskes terdekat untuk tes dahak TCM).
     - 🟢 **BUKAN TERDUGA TBC** (Tetap terapkan PHBS dan etika batuk).
5. 🏥 **Integrasi Kontak Petugas Puskesmas (Di Halaman Hasil):**
   - Menampilkan kartu informasi faskes rujukan (nama puskesmas, alamat, jam pelayanan).
   - Tombol aksi utama: **"💬 Hubungi Petugas Puskesmas via WhatsApp"** yang langsung membuka obrolan WA dengan format pesan hasil skrining otomatis.
   - Nomor WhatsApp dan data Puskesmas diletakkan di satu file config (`assets/js/config.js`) agar mudah diganti sendiri oleh pengguna.

---

## 📋 2. Kriteria & Data Input Skrining (Kemenkes RI Revisi)

### A. Identitas Responden (Step 1)
| Field | Tipe | Keterangan |
| :--- | :--- | :--- |
| **Nama Lengkap** | Text | Wajib diisi |
| **NIK** | Number (16 digit) | Opsional |
| **Tanggal Lahir** | Date picker | **Kunci Utama**: Sistem otomatis menghitung usia dan menentukan cabang kuisioner |
| **Usia** | Readonly badge | Tampil otomatis (misal: "21 Tahun — Kategori Dewasa") |
| **Jenis Kelamin** | Radio cards | Laki-laki / Perempuan |
| **No. HP / WhatsApp** | Tel | Untuk tindak lanjut petugas/notifikasi |
| **Pekerjaan & Alamat** | Text | Opsional/Sederhana |

---

### B. Riwayat Kontak TBC & Faktor Risiko (Step 2)

#### 1. Riwayat Kontak
- **Pernah kontak dengan pasien TBC?**
  - Pilihan: `Ya` / `Tidak` / `Tidak Tahu`
- **Jika Ya, Pilih Jenis Kontak:**
  - 🏠 **Kontak Serumah** → *(Keluarga atau orang yang tinggal bersama dalam satu rumah)*
  - 👥 **Kontak Erat** → *(Teman kerja, teman sekolah, atau tetangga yang sering berinteraksi intens)*
- **Nama Kasus Indeks (Opsional):** Input teks nama orang yang menderita TBC *(jika tahu)*.
- *(Catatan: Pilihan Jenis TBC Paru/Klinis/Ekstra Paru SUDAH DIHAPUS)*.

#### 2. Berat Badan & Tinggi Badan
- **Berat Badan (kg)** dan **Tinggi Badan (cm)**.
- Sistem otomatis menghitung **IMT (Indeks Massa Tubuh)**:
  - Sangat Kurus: < 17,0 kg/m²
  - Kurus: 17,0 – < 18,5 kg/m²
  - Normal: 18,5 – 25,0 kg/m²
  - Gemuk / Berlebih: > 25,0 – 27,0 kg/m²
  - Obese: > 27,0 kg/m²

#### 3. Faktor Risiko & Komorbid
- Riwayat pernah berobat/terdiagnosis TBC sebelumnya? (`Ya` / `Tidak`)
- Pernah berobat TBC tapi putus/tidak tuntas? (`Ya` / `Tidak`)
- Kebiasaan Merokok? (`Perokok Aktif` / `Perokok Pasif` / `Tidak Merokok`)
- Riwayat Kencing Manis / Diabetes Melitus (DM)? (`Ya` / `Tidak` / `Tidak Tahu`)
- ODHIV (Orang dengan HIV)? (`Ya` / `Tidak` / `Tidak Tahu`)
- Ibu Hamil? *(Hanya tampil jika responden Perempuan usia subur)* (`Ya` / `Tidak`)
- WBP (Warga Binaan Pemasyarakatan)? (`Ya` / `Tidak`)
- Tinggal di lingkungan padat kumuh miskin? (`Ya` / `Tidak`)

---

### C. Skrining Gejala TBC (Step 3) — Tampil Dinamis Berdasarkan Usia

#### 👶 KELOMPOK 1: Responden Anak (Usia < 15 Tahun)
Pertanyaan yang muncul khusus untuk anak:
1. **Batuk > 2 minggu?** (`Ya` / `Tidak`)
2. **Demam hilang timbul tanpa sebab jelas > 2 minggu?** (`Ya` / `Tidak`)
3. **Berat badan turun tanpa sebab jelas / BB tidak naik dalam 2 bulan terakhir / nafsu makan turun?** (`Ya` / `Tidak`)
4. **Anak tampak lesu, lemas, malaise, atau kurang aktif bermain seperti biasa?** (`Ya` / `Tidak`)

*(Keterangan: KGB dan Rontgen Toraks ditiadakan)*

---

#### 🧑 KELOMPOK 2: Responden Dewasa (Usia ≥ 15 Tahun)
Pertanyaan yang muncul khusus untuk dewasa:
1. **Status Keluhan Batuk (Pertanyaan Utama):**
   - ⭕ **Tidak Batuk**
   - ⭕ **Batuk < 2 minggu**
   - ⭕ **Batuk ≥ 2 minggu** *(Indikator kuat TBC)*
2. **Gejala Tambahan:**
   - **Demam hilang timbul tanpa sebab yang jelas?** (`Ya` / `Tidak`)
   - **Berat badan turun drastis tanpa sebab jelas / nafsu makan turun?** (`Ya` / `Tidak`)
   - **Berkeringat di malam hari tanpa melakukan aktivitas fisik?** (`Ya` / `Tidak`)

*(Keterangan: KGB dan Radiografi Toraks ditiadakan)*

---

## 🧮 3. Algoritma Diagnosis (Kemenkes RI - Tanpa TPT)

```
====================================================================
JALUR USIA < 15 TAHUN (ANAK):
====================================================================
IF (batuk > 2 minggu == Ya)
   OR (demam > 2 minggu == Ya)
   OR (bb_turun == Ya)
   OR (lesu_malaise == Ya):
   
   → HASIL: 🔴 TERDUGA TBC
   
ELSE:
   → HASIL: 🟢 BUKAN TERDUGA TBC


====================================================================
JALUR USIA ≥ 15 TAHUN (DEWASA):
====================================================================
IF (status_batuk == "Batuk ≥ 2 minggu"):
   → HASIL: 🔴 TERDUGA TBC

ELSE IF (status_batuk == "Batuk < 2 minggu") 
        AND (demam == Ya OR bb_turun == Ya OR keringat_malam == Ya):
   → HASIL: 🔴 TERDUGA TBC

ELSE IF (isODHIV == Ya) 
        AND (status_batuk != "Tidak Batuk" OR demam == Ya OR bb_turun == Ya OR keringat_malam == Ya):
   → HASIL: 🔴 TERDUGA TBC

ELSE:
   → HASIL: 🟢 BUKAN TERDUGA TBC
```

---

## 🎯 4. Spesifikasi Halaman Hasil (hasil.html)

Output hasil hanya menampilkan 2 kemungkinan kondisi:

### 🔴 Kasus 1: TERDUGA TBC
- **Badge Status:** Merah terang, ikon peringatan medis.
- **Judul:** "Hasil Skrining: Terduga TBC"
- **Penjelasan:** "Berdasarkan gejala yang Anda laporkan, Anda memenuhi kriteria **Terduga TBC (Suspek TBC)** sesuai pedoman skrining Kemenkes RI."
- **Langkah Tindak Lanjut yang Harus Dilakukan:**
  1. 🏥 **Segera periksakan diri ke Puskesmas atau Fasilitas Kesehatan terdekat** untuk pemeriksaan dahak (Tes Cepat Molekuler / TCM). Pengobatan TBC di Puskesmas disediakan **GRATIS** oleh pemerintah.
  2. 😷 **Gunakan masker medis** setiap saat untuk melindungi orang di sekitar Anda dari percikan dahak (droplet).
  3. 🪟 **Buka ventilasi dan jendela rumah** agar sirkulasi udara lancar dan sinar matahari masuk.
  4. 🤧 **Terapkan etika batuk**: tutup mulut dan hidung dengan lengan atas bagian dalam atau tisu saat batuk/bersin.

### 🟢 Kasus 2: BUKAN TERDUGA TBC
- **Badge Status:** Hijau cerah, ikon checklist aman.
- **Judul:** "Hasil Skrining: Bukan Terduga TBC"
- **Penjelasan:** "Saat ini Anda **tidak memenuhi kriteria Terduga TBC** berdasarkan gejala yang dilaporkan."
- **Rekomendasi Kesehatan:**
  1. 🥦 **Terapkan Perilaku Hidup Bersih dan Sehat (PHBS)** dan konsumsi makanan dengan gizi seimbang.
  2. 🏃‍♂️ **Jaga imunitas tubuh** dengan istirahat cukup dan olahraga teratur.
  3. ⚠️ **Jika mengalami batuk yang berlanjut hingga lebih dari 2 minggu**, segera lakukan skrining ulang atau periksakan ke faskes.

---

### 🏥 5. Fitur Kontak Puskesmas & Aksi di Halaman Hasil

Halaman hasil dilengkapi kartu kontak petugas faskes resmi:

#### A. Card Puskesmas Rujukan
- Menampilkan info nama puskesmas, nama petugas/nakes program TB, alamat, dan jam layanan aktif.
- Sumber data diambil secara dinamis dari file `assets/js/config.js`.

#### B. Tombol Aksi WhatsApp ke Petugas Puskesmas (Fitur Unggulan)
- **Tombol WhatsApp Hijau Berkilau:** `"💬 Hubungi Petugas Puskesmas via WhatsApp"`
- Saat tombol diklik, browser langsung membuka tautan `https://wa.me/{nomorWA}?text={pesan}`.
- **Format Pesan Otomatis (Pre-filled):**
  ```text
  Halo Petugas Puskesmas [Nama Puskesmas], saya telah mengisi formulir Skrining TBC Mandiri melalui website.

  Berikut ringkasan data skrining saya:
  • Nama: [Nama Lengkap]
  • Tanggal Lahir / Usia: [Tanggal Lahir] ([Usia] Tahun)
  • No. HP: [Nomor HP]
  • Tanggal Skrining: [Tanggal Hari Ini]
  • Hasil Diagnosis: [TERDUGA TBC / BUKAN TERDUGA TBC]
  • Gejala yang Dialami: [Daftar Gejala]
  • Riwayat Kontak TBC: [Ya (Serumah/Erat) / Tidak]

  Mohon arahan dan petunjuk pemeriksaan lebih lanjut (TCM Dahak) di Puskesmas. Terima kasih.
  ```

#### C. Aksi Tambahan:
- 📲 **Tombol "Bagikan Hasil ke Keluarga/Kerabat"**: Share ringkasan hasil via WA ke nomor lain.
- 🖨️ **Tombol "Cetak / Simpan PDF"**: Layout print-friendly `@media print` untuk mencetak dokumen hasil resmi.
- 🔄 **Tombol "Skrining Ulang"**: Reset form untuk anggota keluarga lain.

---

## 🏗️ 6. Arsitektur Folder & Pemisahan UI Mobile/Desktop

```text
screening-tbc/
│
├── index.html                   ← Router: Deteksi perangkat → redirect ke /mobile/ atau /desktop/
│
├── mobile/                      ← 📱 UI KHUSUS SMARTPHONE (Bottom Nav, Touch Cards, Wizard)
│   ├── index.html               ← Beranda/Dashboard edukasi mobile (Poster carousel, info cepat)
│   ├── form.html                ← Wizard step-by-step form (Step 1 → Step 2 → Step 3)
│   └── hasil.html               ← Halaman hasil diagnosis mobile (Card Puskesmas, CTA WhatsApp Nakes)
│
├── desktop/                     ← 🖥️ UI KHUSUS DESKTOP / LAPTOP (Header Nav, Grid, Sidebar)
│   ├── index.html               ← Beranda/Dashboard edukasi desktop (Hero 2-kolom, grid poster)
│   ├── form.html                ← Form interaktif dengan tracker progress & preview
│   └── hasil.html               ← Halaman hasil diagnosis desktop (Lengkap dengan rincian data)
│
├── assets/
│   ├── css/
│   │   ├── mobile.css           ← Styling khusus mobile (touch gesture, bottom nav)
│   │   └── desktop.css          ← Styling khusus desktop (sidebar sticky, layout lebar)
│   ├── js/
│   │   ├── config.js            ← KONFIGURASI TERPUSAT (Nomor WA Puskesmas, Nama Faskes, dll)
│   │   ├── router.js            ← Script deteksi device (userAgent + screen width)
│   │   ├── questions.js         ← Definisi pertanyaan, helper umur, teks keterangan kontak
│   │   └── logic.js             ← Algoritma evaluasi Kemenkes (terduga vs bukan terduga)
│   └── img/
│       ├── poster-gejala.webp
│       ├── poster-penularan.webp
│       ├── poster-pencegahan.webp
│       └── logo-tbc.svg
│
├── .nojekyll                    ← Wajib ada untuk GitHub Pages
└── README.md
```

---

## 💻 7. File Konfigurasi & Logika Inti

### `assets/js/config.js` (Pengaturan Kontak Puskesmas — Ganti Sendiri di Sini!)
```javascript
export const PUSKESMAS_CONFIG = {
    // Ganti dengan nama Puskesmas lo
    namaPuskesmas: "Puskesmas Rujukan Setempat",
    
    // Ganti dengan nama atau jabatan petugas TB
    namaPetugas: "Petugas Program TBC",
    
    // GANTI DENGAN NOMOR ASLI PUSKESMAS (Format internasional tanpa simbol: 628xxxxxxxxxx)
    nomorWA: "6281234567890", 
    
    // Alamat lengkap Puskesmas
    alamat: "Jl. Kesehatan Masyarakat No. 10",
    
    // Jam pelayanan skrining & lab dahak
    jamLayanan: "Senin - Sabtu (08.00 - 14.00 WITA/WIB)",
    
    // Fungsi generate pesan WhatsApp otomatis
    buatPesanWhatsApp: function(dataPasien, hasil) {
        let teks = `Halo Petugas ${this.namaPuskesmas}, saya telah mengisi formulir Skrining TBC Mandiri melalui website.%0A%0A`;
        teks += `*Ringkasan Data Skrining:*%0A`;
        teks += `• Nama: ${dataPasien.nama || '-' }%0A`;
        teks += `• Usia: ${dataPasien.usia || '-'} Tahun (${hasil.kategoriUsia})%0A`;
        teks += `• No. HP: ${dataPasien.noHp || '-'}%0A`;
        teks += `• Hasil Skrining: *${hasil.label.toUpperCase()}*%0A`;
        
        if (hasil.alasan && hasil.alasan.length > 0) {
            teks += `• Indikasi / Gejala: ${hasil.alasan.join(', ')}%0A`;
        }
        
        teks += `%0AMohon arahan dan informasi mengenai jadwal pemeriksaan dahak (TCM) di Puskesmas. Terima kasih.`;
        return teks;
    }
};
```

---

## 🎨 8. Design System (Mengadopsi Estetika Premium e-Voting)

- **Font Keluarga:** `Plus Jakarta Sans` (400, 500, 600, 700, 800) dari Google Fonts.
- **Palet Warna Medis Modern:**
  - Primary: Deep Teal (`#0f766e` / Tailwind `teal-700`)
  - Accent / Vibrant: Soft Emerald (`#14b8a6` / Tailwind `teal-500`)
  - Background: Soft Mint-White (`#f0fdfa` / Tailwind `teal-50/40`)
  - WhatsApp CTA: Emerald Green (`#25D366` / Tailwind `emerald-600`)
  - Status Terduga: Rose / Red 600 (`#e11d48` / `#dc2626`)
  - Status Aman: Emerald 600 (`#16a34a`)
- **Card Styling:** Glassmorphism modern — `backdrop-blur-md bg-white/85 border border-white/60 shadow-xl rounded-2xl`.
- **Top Gradient Bar:** Garis tipis gradasi teal-ke-emerald di bagian atas card aktif.

---

## 🚀 9. PROMPT SIAP PAKAI (Copy-Paste Langsung ke Project Baru)

```markdown
Halo Antigravity! Tolong buatkan project aplikasi web statis: **Web Skrining TBC Digital Mandiri**.
Aplikasi ini akan di-host di GitHub Pages (tanpa backend server, pure static HTML, CSS, JS).

Teknologi yang digunakan (semua via CDN):
- Tailwind CSS v3 via CDN (https://cdn.tailwindcss.com)
- Alpine.js v3 via CDN (https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js)
- Font: Plus Jakarta Sans via Google Fonts

---

### STRUKTUR FOLDER WAJIB:
```
screening-tbc/
├── index.html                   ← Router: cek userAgent/screen width → redirect ke mobile/ atau desktop/
├── mobile/
│   ├── index.html               ← Dashboard edukasi mobile (Bottom navigation, 3 slide poster carousel)
│   ├── form.html                ← Wizard step-by-step form mobile
│   └── hasil.html               ← Halaman hasil diagnosis mobile (Card Puskesmas, CTA WhatsApp Nakes)
├── desktop/
│   ├── index.html               ← Dashboard edukasi desktop (Top navbar, 2-kolom hero, poster grid)
│   ├── form.html                ← Form interaktif desktop dengan tracker progres
│   └── hasil.html               ← Halaman hasil diagnosis desktop
├── assets/
│   ├── css/
│   │   ├── mobile.css           ← Styling khusus mobile
│   │   └── desktop.css          ← Styling khusus desktop
│   ├── js/
│   │   ├── config.js            ← KONFIGURASI PUSKESMAS (Nomor WA, Nama Faskes, Template Pesan WA)
│   │   ├── router.js            ← Logika redirect device
│   │   ├── questions.js         ← Helper umur & data opsi
│   │   └── logic.js             ← Algoritma evaluasi Kemenkes RI
│   └── img/                     ← Asset gambar/poster
└── .nojekyll
```

---

### REVISI & ATURAN PENTING FORMULIR (SESUAI PEDOMAN KEMENKES TERBARU):

1. **Bagian yang TIDAK BOLEH ADA (Dihapus):**
   - ❌ Jenis TBC pada kasus indeks (TBC Bakteriologis/Klinis/Ekstra Paru) TIDAK ADA.
   - ❌ Pembesaran kelenjar getah bening (KGB) TIDAK ADA (karena ini skrining mandiri masyarakat).
   - ❌ Pemeriksaan Radiografi Toraks / Rontgen TIDAK ADA untuk semua kelompok umur.
   - ❌ Hasil TPT / TB Laten TIDAK ADA. Output HANYA "TERDUGA TBC" vs "BUKAN TERDUGA TBC".

2. **Keterangan Jenis Kontak (WAJIB DITAMPILKAN):**
   - Pada pertanyaan riwayat kontak dengan pasien TBC, jika user memilih "Ya", sediakan pilihan jenis kontak beserta keterangannya:
     - **Kontak Serumah**: Keluarga atau orang yang tinggal bersama dalam satu rumah.
     - **Kontak Erat**: Teman kerja, teman sekolah, atau tetangga yang sering berinteraksi intens.

3. **Formulir Gejala Dinamis Berdasarkan Umur:**
   - Di Step 1 (Identitas), user mengisi Tanggal Lahir.
   - Sistem langsung menghitung usia responden.
   - Di Step Gejala:
     - Jika usia **< 15 tahun**, tampilkan kuisioner gejala ANAK:
       1. Batuk > 2 minggu? (Ya/Tidak)
       2. Demam hilang timbul > 2 minggu tanpa sebab jelas? (Ya/Tidak)
       3. BB turun tanpa sebab / BB tidak naik 2 bulan / nafsu makan turun? (Ya/Tidak)
       4. Anak tampak lesu, lemas, atau kurang aktif bermain? (Ya/Tidak)
     - Jika usia **≥ 15 tahun**, tampilkan kuisioner gejala DEWASA:
       1. Status Batuk: [Tidak Batuk] / [Batuk < 2 minggu] / [Batuk ≥ 2 minggu]
       2. Demam hilang timbul tanpa sebab jelas? (Ya/Tidak)
       3. BB turun tanpa sebab jelas / nafsu makan turun? (Ya/Tidak)
       4. Berkeringat malam hari tanpa aktivitas fisik? (Ya/Tidak)

4. **Logika Diagnosis (Hanya 2 Status):**
   - Untuk Anak (< 15 th): Jika ada MINIMAL 1 gejala positif → **TERDUGA TBC**. Jika tidak ada → **BUKAN TERDUGA TBC**.
   - Untuk Dewasa (≥ 15 th):
     - Jika Batuk ≥ 2 minggu → **TERDUGA TBC**.
     - Jika Batuk < 2 minggu DAN ada minimal 1 gejala tambahan (demam / BB turun / keringat malam) → **TERDUGA TBC**.
     - Jika ODHIV dan ada batuk atau gejala tambahan → **TERDUGA TBC**.
     - Selain kondisi di atas → **BUKAN TERDUGA TBC**.

5. **Halaman Hasil (hasil.html) & Integrasi Kontak Puskesmas:**
   - Tampilkan badge status besar (🔴 Merah: Terduga TBC / 🟢 Hijau: Bukan Terduga TBC).
   - Rincian gejala yang dialami dan rekomendasi tindak lanjut.
   - **Card Kontak Puskesmas Rujukan**: Menampilkan info faskes dari `assets/js/config.js`.
   - **Tombol WhatsApp Hubungi Petugas Puskesmas**: Membuka WhatsApp ke nomor petugas Puskesmas dengan template pesan otomatis yang sudah memuat nama, usia, status hasil skrining, dan permohonan jadwal tes dahak TCM.
   - Tombol "Bagikan via WhatsApp" (ke keluarga/kerabat).
   - Tombol "Cetak / Simpan PDF" (layout cetak ramah printer).
   - Tombol "Skrining Ulang".

Tolong buatkan semua file di atas secara lengkap, rapi, dan dengan desain yang modern, responsif, dan estetik (medical teal palette, glassmorphism cards).
```
