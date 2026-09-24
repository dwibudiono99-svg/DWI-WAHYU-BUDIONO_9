import { Siswa, Pegawai, KopSekolah } from '../types';
import { getOfficialDinasPhotoBgColor } from '../data/initialSiswaData';

/**
 * Trigger download of an HTML file in the browser
 */
export function downloadHTMLFile(filename: string, htmlContent: string): void {
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.html') ? filename : `${filename}.html`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generate Standalone HTML for Data Siswa (Buku Induk & Dapodik)
 */
export function generateSiswaStandaloneHTML(siswaList: Siswa[], kop: KopSekolah): string {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const rowsHtml = siswaList
    .map((s, idx) => {
      const isRed = s.fotoBgColor?.includes('Merah');
      const bgBadgeClass = isRed ? 'bg-red' : 'bg-blue';
      const bgBadgeText = isRed ? 'Ganjil (Merah)' : 'Genap (Biru)';

      return `
        <tr>
          <td class="text-center font-mono">${idx + 1}</td>
          <td class="text-center">
            ${
              s.foto
                ? `<img src="${s.foto}" class="photo-thumb" alt="${s.nama}">`
                : `<div class="photo-fallback ${bgBadgeClass}">${s.jk === 'Laki-laki' ? '👨' : '👩'}</div>`
            }
          </td>
          <td class="font-bold text-dark">
            ${s.nama}
            <div class="sub-text">NIK: ${s.nik} | JK: ${s.jk}</div>
          </td>
          <td class="font-mono text-center font-semibold text-primary">${s.nisn}</td>
          <td class="font-mono text-center">${s.nis}</td>
          <td class="text-center"><span class="badge badge-kelas">${s.tingkatKelas} (${s.rombel})</span></td>
          <td>${s.tempatLahir}, ${s.tanggalLahir}</td>
          <td class="text-center">
            <span class="badge ${bgBadgeClass}">${bgBadgeText}</span>
          </td>
          <td>${s.peminatan}</td>
          <td>
            <div class="font-semibold">${s.namaAyah} / ${s.namaIbu}</div>
            <div class="sub-text">HP: ${s.noHpOrtu}</div>
          </td>
          <td>${s.waliKelas}</td>
        </tr>
      `;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BUKU INDUK SISWA - ${kop.namaSekolah}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      color: #1e293b;
      line-height: 1.5;
      padding: 24px;
    }
    .container { max-width: 1300px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); padding: 32px; }
    
    /* KOP SURAT */
    .kop-wrapper {
      border-bottom: 3px double #0f172a;
      padding-bottom: 16px;
      margin-bottom: 24px;
      text-align: center;
    }
    .kop-atas { font-size: 14px; font-weight: 700; letter-spacing: 0.05em; color: #334155; }
    .kop-dinas { font-size: 15px; font-weight: 800; letter-spacing: 0.05em; color: #1e293b; }
    .kop-sekolah { font-size: 22px; font-weight: 900; color: #0f172a; margin: 4px 0; text-transform: uppercase; }
    .kop-alamat { font-size: 12px; color: #475569; }
    
    /* TOOLBAR */
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      background: #f1f5f9;
      padding: 12px 16px;
      border-radius: 8px;
    }
    .toolbar-title { font-size: 16px; font-weight: 700; color: #0f172a; }
    .search-box {
      padding: 8px 14px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 13px;
      width: 280px;
    }
    .btn-print {
      background: #2563eb;
      color: #ffffff;
      padding: 8px 18px;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
    }
    .btn-print:hover { background: #1d4ed8; }

    /* TABLE */
    .table-responsive { overflow-x: auto; margin-top: 12px; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th {
      background-color: #1e3a8a;
      color: #ffffff;
      padding: 10px 8px;
      font-weight: 700;
      text-align: left;
      border: 1px solid #1e3a8a;
      white-space: nowrap;
    }
    td {
      padding: 8px;
      border: 1px solid #e2e8f0;
      vertical-align: middle;
    }
    tr:nth-child(even) { background-color: #f8fafc; }
    tr:hover { background-color: #f1f5f9; }

    /* BADGES & PHOTOS */
    .photo-thumb { width: 36px; height: 44px; object-fit: cover; border-radius: 4px; border: 1px solid #cbd5e1; display: block; margin: 0 auto; }
    .photo-fallback { width: 36px; height: 44px; display: flex; align-items: center; justify-content: center; border-radius: 4px; color: #fff; font-size: 16px; margin: 0 auto; }
    .bg-red { background-color: #dc2626; }
    .bg-blue { background-color: #2563eb; }
    .badge {
      display: inline-block;
      padding: 3px 8px;
      font-size: 10px;
      font-weight: 700;
      border-radius: 9999px;
      color: #ffffff;
      text-align: center;
      white-space: nowrap;
    }
    .badge-kelas { background-color: #0d9488; }
    .text-center { text-align: center; }
    .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
    .font-bold { font-weight: 700; }
    .font-semibold { font-weight: 600; }
    .text-primary { color: #2563eb; }
    .sub-text { font-size: 10.5px; color: #64748b; font-weight: normal; margin-top: 2px; }

    /* PRINT RULES */
    @media print {
      body { background: #ffffff; padding: 0; }
      .container { box-shadow: none; padding: 0; }
      .toolbar { display: none; }
      th { background-color: #1e3a8a !important; color: #ffffff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .badge { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="kop-wrapper">
      <div class="kop-atas">PEMERINTAH PROVINSI ${kop.provinsi || 'JAWA TIMUR'}</div>
      <div class="kop-dinas">DINAS PENDIDIKAN — ${kop.cabangDinas || 'CABANG DINAS WILAYAH SURABAYA'}</div>
      <div class="kop-sekolah">${kop.namaSekolah}</div>
      <div class="kop-alamat">${kop.alamatJalan}, ${kop.kotaKabupaten} | NPSN: ${kop.npsn} | Telp: ${kop.telepon}</div>
    </div>

    <div class="toolbar">
      <div>
        <div class="toolbar-title">BUKU INDUK DAN DATA DAPODIK KESISWAAN</div>
        <div style="font-size: 12px; color: #64748b;">Per Tanggal: ${currentDate} | Total Siswa: ${siswaList.length} Siswa</div>
      </div>
      <div style="display: flex; gap: 10px;">
        <input type="text" id="searchInput" class="search-box" placeholder="Cari Nama, NISN, Rombel..." onkeyup="filterTable()">
        <button type="button" class="btn-print" onclick="window.print()">🖨️ Cetak / Simpan PDF</button>
      </div>
    </div>

    <div class="table-responsive">
      <table id="siswaTable">
        <thead>
          <tr>
            <th style="width: 40px;">No</th>
            <th style="width: 50px;">Foto</th>
            <th>Nama Lengkap Siswa</th>
            <th>NISN</th>
            <th>NIS</th>
            <th>Kelas / Rombel</th>
            <th>Tempat, Tanggal Lahir</th>
            <th>Latar Pas Foto</th>
            <th>Peminatan</th>
            <th>Nama Orang Tua & Kontak</th>
            <th>Wali Kelas</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>

    <div style="margin-top: 24px; font-size: 11px; color: #64748b; text-align: right;">
      Dokumen ini sah dibuat secara digital oleh Sistem Informasi Manajemen Sekolah Resmi (${kop.namaSekolah}).
    </div>
  </div>

  <script>
    function filterTable() {
      const input = document.getElementById('searchInput');
      const filter = input.value.toLowerCase();
      const tbody = document.querySelector('#siswaTable tbody');
      const trs = tbody.getElementsByTagName('tr');

      for (let i = 0; i < trs.length; i++) {
        const text = trs[i].textContent || trs[i].innerText;
        trs[i].style.display = text.toLowerCase().includes(filter) ? '' : 'none';
      }
    }
  </script>
</body>
</html>`;
}

/**
 * Generate Standalone HTML for Data Guru & Pegawai (SIMPEG)
 */
export function generatePegawaiStandaloneHTML(pegawaiList: Pegawai[], kop: KopSekolah): string {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const rowsHtml = pegawaiList
    .map((p, idx) => {
      const isCertified = p.statusSertifikasi?.toLowerCase().includes('sudah');
      const sertifBadgeClass = isCertified ? 'badge-certified' : 'badge-uncertified';

      return `
        <tr>
          <td class="text-center font-mono">${idx + 1}</td>
          <td class="text-center">
            ${
              p.foto
                ? `<img src="${p.foto}" class="photo-thumb" alt="${p.nama}">`
                : `<div class="photo-fallback">${p.jk === 'Laki-laki' ? '👨‍🏫' : '👩‍🏫'}</div>`
            }
          </td>
          <td class="font-bold text-dark">
            ${p.nama}
            <div class="sub-text">Pendidikan: ${p.pendidikan} | JK: ${p.jk}</div>
          </td>
          <td class="font-mono text-center">${p.nip || '-'}</td>
          <td class="font-mono text-center">${p.nuptk || '-'}</td>
          <td class="text-center"><span class="badge badge-status">${p.statusPegawai}</span></td>
          <td>${p.jenisPtk}</td>
          <td class="text-center font-semibold">${p.golongan || '-'}</td>
          <td>${p.mapel || '-'}</td>
          <td class="text-center">${p.jumlahJamMengajar ?? 0} JJM</td>
          <td class="text-center"><span class="badge ${sertifBadgeClass}">${p.statusSertifikasi || 'Belum'}</span></td>
          <td>
            <div class="font-semibold">${p.noHp}</div>
            <div class="sub-text">${p.email || '-'}</div>
          </td>
        </tr>
      `;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SIMPEG GURU & PEGAWAI - ${kop.namaSekolah}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      color: #1e293b;
      line-height: 1.5;
      padding: 24px;
    }
    .container { max-width: 1300px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); padding: 32px; }
    
    /* KOP */
    .kop-wrapper { border-bottom: 3px double #0f172a; padding-bottom: 16px; margin-bottom: 24px; text-align: center; }
    .kop-atas { font-size: 14px; font-weight: 700; letter-spacing: 0.05em; color: #334155; }
    .kop-dinas { font-size: 15px; font-weight: 800; letter-spacing: 0.05em; color: #1e293b; }
    .kop-sekolah { font-size: 22px; font-weight: 900; color: #0f172a; margin: 4px 0; text-transform: uppercase; }
    .kop-alamat { font-size: 12px; color: #475569; }
    
    /* TOOLBAR */
    .toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; background: #f1f5f9; padding: 12px 16px; border-radius: 8px; }
    .toolbar-title { font-size: 16px; font-weight: 700; color: #0f172a; }
    .search-box { padding: 8px 14px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; width: 280px; }
    .btn-print { background: #0f766e; color: #ffffff; padding: 8px 18px; border: none; border-radius: 6px; font-weight: 600; font-size: 13px; cursor: pointer; }
    .btn-print:hover { background: #115e59; }

    /* TABLE */
    .table-responsive { overflow-x: auto; margin-top: 12px; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th { background-color: #0f766e; color: #ffffff; padding: 10px 8px; font-weight: 700; text-align: left; border: 1px solid #0f766e; white-space: nowrap; }
    td { padding: 8px; border: 1px solid #e2e8f0; vertical-align: middle; }
    tr:nth-child(even) { background-color: #f8fafc; }
    tr:hover { background-color: #f1f5f9; }

    .photo-thumb { width: 36px; height: 44px; object-fit: cover; border-radius: 4px; border: 1px solid #cbd5e1; display: block; margin: 0 auto; }
    .photo-fallback { width: 36px; height: 44px; display: flex; align-items: center; justify-content: center; border-radius: 4px; background: #e2e8f0; font-size: 16px; margin: 0 auto; }
    .badge { display: inline-block; padding: 3px 8px; font-size: 10px; font-weight: 700; border-radius: 9999px; text-align: center; }
    .badge-status { background-color: #e0f2fe; color: #0369a1; }
    .badge-certified { background-color: #dcfce7; color: #15803d; }
    .badge-uncertified { background-color: #fef3c7; color: #b45309; }
    .text-center { text-align: center; }
    .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
    .font-bold { font-weight: 700; }
    .sub-text { font-size: 10.5px; color: #64748b; font-weight: normal; margin-top: 2px; }

    @media print {
      body { background: #ffffff; padding: 0; }
      .container { box-shadow: none; padding: 0; }
      .toolbar { display: none; }
      th { background-color: #0f766e !important; color: #ffffff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="kop-wrapper">
      <div class="kop-atas">PEMERINTAH PROVINSI ${kop.provinsi || 'JAWA TIMUR'}</div>
      <div class="kop-dinas">DINAS PENDIDIKAN — ${kop.cabangDinas || 'CABANG DINAS WILAYAH SURABAYA'}</div>
      <div class="kop-sekolah">${kop.namaSekolah}</div>
      <div class="kop-alamat">${kop.alamatJalan}, ${kop.kotaKabupaten} | NPSN: ${kop.npsn} | Telp: ${kop.telepon}</div>
    </div>

    <div class="toolbar">
      <div>
        <div class="toolbar-title">DAFTAR URUT KEPEGAWAIAN (SIMPEG SMAN)</div>
        <div style="font-size: 12px; color: #64748b;">Per Tanggal: ${currentDate} | Total Pegawai: ${pegawaiList.length} Orang</div>
      </div>
      <div style="display: flex; gap: 10px;">
        <input type="text" id="searchInput" class="search-box" placeholder="Cari NIP, Nama, Mapel..." onkeyup="filterTable()">
        <button type="button" class="btn-print" onclick="window.print()">🖨️ Cetak / Simpan PDF</button>
      </div>
    </div>

    <div class="table-responsive">
      <table id="pegawaiTable">
        <thead>
          <tr>
            <th style="width: 40px;">No</th>
            <th style="width: 50px;">Foto</th>
            <th>Nama Lengkap & Gelar</th>
            <th>NIP / NIPPPK</th>
            <th>NUPTK</th>
            <th>Status</th>
            <th>Jenis PTK</th>
            <th>Gol</th>
            <th>Mapel Diampu</th>
            <th>Beban Mengajar</th>
            <th>Sertifikasi</th>
            <th>Kontak & Email</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>

    <div style="margin-top: 24px; font-size: 11px; color: #64748b; text-align: right;">
      Dokumen ini sah dibuat secara digital oleh Sistem Informasi Kepegawaian (${kop.namaSekolah}).
    </div>
  </div>

  <script>
    function filterTable() {
      const input = document.getElementById('searchInput');
      const filter = input.value.toLowerCase();
      const tbody = document.querySelector('#pegawaiTable tbody');
      const trs = tbody.getElementsByTagName('tr');

      for (let i = 0; i < trs.length; i++) {
        const text = trs[i].textContent || trs[i].innerText;
        trs[i].style.display = text.toLowerCase().includes(filter) ? '' : 'none';
      }
    }
  </script>
</body>
</html>`;
}
