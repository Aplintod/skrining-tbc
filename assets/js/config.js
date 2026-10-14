// ============================================================
//  config.js — KONFIGURASI TERPUSAT PUSKESMAS
//  Ganti isi variabel di bawah sesuai data Puskesmas lo!
// ============================================================

window.PUSKESMAS_CONFIG = {
    // Nama resmi Puskesmas
    namaPuskesmas: "Puskesmas Rujukan Setempat",

    // Nama petugas atau jabatan program TBC
    namaPetugas: "Petugas Program TBC",

    // Nomor WhatsApp petugas (format internasional, tanpa + atau spasi)
    // Contoh: 6281234567890
    nomorWA: "6281234567890",

    // Alamat lengkap Puskesmas
    alamat: "Jl. Kesehatan Masyarakat No. 10",

    // Jam pelayanan skrining & lab dahak TCM
    jamLayanan: "Senin \u2013 Sabtu, 08.00 \u2013 14.00 WIB",

    // ============================================================
    //  KONFIGURASI GOOGLE SHEETS (via Google Apps Script)
    //  Langkah: Deploy GAS sebagai Web App → salin URL di bawah
    // ============================================================
    // Ganti dengan URL Web App GAS lo setelah deploy
    // Contoh: "https://script.google.com/macros/s/AKfyc.../exec"
    // Biarkan string kosong ("") jika belum diatur / tidak dipakai
    gasEndpointURL: "",

    // Fungsi generate pesan WhatsApp otomatis (jangan diubah)
    buatPesanWhatsApp(dataPasien, hasil) {
        let teks = `Halo Petugas ${this.namaPuskesmas}, saya telah mengisi formulir Skrining TBC Mandiri melalui website.%0A%0A`;
        teks += `*Ringkasan Data Skrining:*%0A`;
        teks += `\u2022 Nama: ${dataPasien.nama || "-"}%0A`;
        teks += `\u2022 Tanggal Lahir: ${dataPasien.tanggalLahir || "-"} (${dataPasien.usia || "-"} Tahun)%0A`;
        teks += `\u2022 No. HP: ${dataPasien.noHp || "-"}%0A`;
        teks += `\u2022 Tanggal Skrining: ${new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}%0A`;
        teks += `\u2022 Hasil Skrining: *${hasil.label ? hasil.label.toUpperCase() : "-"}*%0A`;
        if (hasil.alasan && hasil.alasan.length > 0) {
            teks += `\u2022 Gejala / Indikasi: ${hasil.alasan.join(", ")}%0A`;
        }
        teks += `\u2022 Riwayat Kontak TBC: ${dataPasien.riwayatKontak === "ya" ? (dataPasien.jenisKontak === "serumah" ? "Kontak Serumah" : "Kontak Erat") : "Tidak Ada"}%0A`;
        teks += `%0AMohon arahan dan informasi mengenai jadwal pemeriksaan dahak (TCM) di ${this.namaPuskesmas}. Terima kasih.`;
        return teks;
    },

    // Fungsi buat link WhatsApp
    getLinkWA(dataPasien, hasil) {
        const pesan = this.buatPesanWhatsApp(dataPasien, hasil);
        return `https://wa.me/${this.nomorWA}?text=${pesan}`;
    },

    // ============================================================
    //  Fungsi kirim data ke Google Sheets via GAS
    //  Dipanggil otomatis setelah submit form (jika gasEndpointURL diisi)
    // ============================================================
    async kirimKeGoogleSheets(dataPasien, hasil) {
        if (!this.gasEndpointURL || this.gasEndpointURL.trim() === "") {
            console.info("[GAS] gasEndpointURL belum diisi. Data tidak dikirim ke Google Sheets.");
            return { sukses: false, pesan: "Endpoint GAS belum dikonfigurasi." };
        }

        const payload = {
            waktuSkrining: new Date().toLocaleString("id-ID"),
            nama: dataPasien.nama || "",
            nik: dataPasien.nik || "",
            tanggalLahir: dataPasien.tanggalLahir || "",
            usia: dataPasien.usia || "",
            kategoriUsia: hasil.kategoriUsia || "",
            jenisKelamin: dataPasien.jenisKelamin === "L" ? "Laki-laki" : "Perempuan",
            noHp: dataPasien.noHp || "",
            pekerjaan: dataPasien.pekerjaan || "",
            alamat: dataPasien.alamat || "",
            riwayatKontak: dataPasien.riwayatKontak || "tidak",
            jenisKontak: dataPasien.jenisKontak || "",
            namaKasusIndeks: dataPasien.namaKasusIndeks || "",
            beratBadan: dataPasien.beratBadan || "",
            tinggiBadan: dataPasien.tinggiBadan || "",
            imt: dataPasien.imt || "",
            kategoriIMT: dataPasien.kategoriIMT || "",
            riwayatTBC: dataPasien.riwayatTBC ? "Ya" : "Tidak",
            putusObat: dataPasien.putusObat ? "Ya" : "Tidak",
            merokok: dataPasien.merokok || "tidak",
            dm: dataPasien.dm || "tidak",
            odhiv: dataPasien.odhiv || "tidak",
            ibuHamil: dataPasien.ibuHamil ? "Ya" : "Tidak",
            wbp: dataPasien.wbp ? "Ya" : "Tidak",
            padatKumuh: dataPasien.padatKumuh ? "Ya" : "Tidak",
            hasilDiagnosis: hasil.label || "",
            statusTerduga: hasil.terduga ? "TERDUGA TBC" : "BUKAN TERDUGA TBC",
            alasanGejala: (hasil.alasan || []).join("; "),
        };

        try {
            const response = await fetch(this.gasEndpointURL, {
                method: "POST",
                mode: "no-cors", // GAS CORS workaround
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            console.info("[GAS] Data berhasil dikirim ke Google Sheets.");
            return { sukses: true, pesan: "Data berhasil dikirim." };
        } catch (err) {
            console.error("[GAS] Gagal mengirim ke Google Sheets:", err);
            return { sukses: false, pesan: "Gagal mengirim data." };
        }
    }
};
