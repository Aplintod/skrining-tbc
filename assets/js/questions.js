// ============================================================
//  questions.js — HELPER USIA, IMT (window globals)
// ============================================================

/**
 * Hitung usia dari tanggal lahir (string format YYYY-MM-DD)
 * @param {string} tanggalLahirStr
 * @returns {{ usia: number, kategori: string, labelBadge: string }}
 */
window.hitungUsia = function(tanggalLahirStr) {
    if (!tanggalLahirStr) return { usia: null, kategori: null, labelBadge: "" };
    const lahir = new Date(tanggalLahirStr);
    const sekarang = new Date();
    let usia = sekarang.getFullYear() - lahir.getFullYear();
    const bulanDiff = sekarang.getMonth() - lahir.getMonth();
    if (bulanDiff < 0 || (bulanDiff === 0 && sekarang.getDate() < lahir.getDate())) {
        usia--;
    }
    const kategori = usia < 15 ? "anak" : "dewasa";
    const labelBadge =
        kategori === "anak"
            ? `${usia} Tahun \u2014 Kategori Anak`
            : `${usia} Tahun \u2014 Kategori Dewasa`;
    return { usia, kategori, labelBadge };
};

/**
 * Hitung IMT (Indeks Massa Tubuh) dan kategorinya
 * @param {number} beratKg
 * @param {number} tinggiCm
 * @returns {{ imt: number, kategori: string }}
 */
window.hitungIMT = function(beratKg, tinggiCm) {
    if (!beratKg || !tinggiCm || tinggiCm === 0) return { imt: null, kategori: "-" };
    const tinggiM = tinggiCm / 100;
    const imt = beratKg / (tinggiM * tinggiM);
    let kategori = "";
    if (imt < 17.0) kategori = "Sangat Kurus";
    else if (imt < 18.5) kategori = "Kurus";
    else if (imt <= 25.0) kategori = "Normal";
    else if (imt <= 27.0) kategori = "Gemuk / Berlebih";
    else kategori = "Obese";
    return { imt: parseFloat(imt.toFixed(1)), kategori };
};
