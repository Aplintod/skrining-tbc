// ============================================================
//  logic.js — ALGORITMA EVALUASI DIAGNOSIS TBC (Kemenkes RI)
//  Hanya 2 output: TERDUGA TBC atau BUKAN TERDUGA TBC
// ============================================================

/**
 * Evaluasi hasil skrining berdasarkan data form
 */
window.evaluasiDiagnosis = function(data) {
    const alasan = [];
    let terduga = false;

    // ==================================================================
    // JALUR ANAK (< 15 Tahun)
    // ==================================================================
    if (data.kategoriUsia === "anak") {
        if (data.batukAnak === true) {
            terduga = true;
            alasan.push("Batuk > 2 minggu");
        }
        if (data.demamAnak === true) {
            terduga = true;
            alasan.push("Demam hilang timbul > 2 minggu tanpa sebab jelas");
        }
        if (data.bbTurunAnak === true) {
            terduga = true;
            alasan.push("Berat badan turun / tidak naik / nafsu makan turun");
        }
        if (data.lesuAnak === true) {
            terduga = true;
            alasan.push("Anak tampak lesu, lemas, atau kurang aktif bermain");
        }
    }

    // ==================================================================
    // JALUR DEWASA (>= 15 Tahun)
    // ==================================================================
    else if (data.kategoriUsia === "dewasa") {
        const gejalaTambahan = [];

        if (data.demamDewasa === true) gejalaTambahan.push("Demam hilang timbul tanpa sebab jelas");
        if (data.bbTurunDewasa === true) gejalaTambahan.push("Berat badan / nafsu makan turun");
        if (data.keringatMalam === true) gejalaTambahan.push("Berkeringat malam tanpa aktivitas fisik");

        // Kondisi 1: Batuk >= 2 minggu => langsung terduga
        if (data.statusBatuk === "batuk_lebih2") {
            terduga = true;
            alasan.push("Batuk \u2265 2 minggu");
            alasan.push(...gejalaTambahan);
        }
        // Kondisi 2: Batuk < 2 minggu + ada minimal 1 gejala tambahan
        else if (data.statusBatuk === "batuk_kurang2" && gejalaTambahan.length >= 1) {
            terduga = true;
            alasan.push("Batuk < 2 minggu disertai gejala tambahan");
            alasan.push(...gejalaTambahan);
        }
        // Kondisi 3: ODHIV + ada batuk atau gejala tambahan apapun
        else if (
            data.odhiv === "ya" &&
            (data.statusBatuk !== "tidak_batuk" || gejalaTambahan.length >= 1)
        ) {
            terduga = true;
            alasan.push("Status ODHIV dengan gejala respirasi / sistemik");
            if (data.statusBatuk !== "tidak_batuk") alasan.push("Adanya batuk");
            alasan.push(...gejalaTambahan);
        }
    }

    return {
        terduga,
        label: terduga ? "Terduga TBC" : "Bukan Terduga TBC",
        warna: terduga ? "merah" : "hijau",
        alasan,
        kategoriUsia: data.kategoriUsia === "anak" ? "Anak (< 15 Tahun)" : "Dewasa (\u2265 15 Tahun)",
    };
};

/**
 * Simpan data hasil ke sessionStorage
 */
window.simpanHasil = function(dataPasien, hasilDiagnosis) {
    const payload = {
        pasien: dataPasien,
        hasil: hasilDiagnosis,
        waktuSkrining: new Date().toISOString(),
    };
    sessionStorage.setItem("hasilSkriningTBC", JSON.stringify(payload));
};

/**
 * Ambil data hasil dari sessionStorage
 */
window.ambilHasil = function() {
    const raw = sessionStorage.getItem("hasilSkriningTBC");
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
};

/**
 * Format tanggal skrining untuk tampilan
 */
window.formatTanggal = function(isoString) {
    if (!isoString) return "-";
    return new Date(isoString).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};
