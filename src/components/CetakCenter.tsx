import React, { useState } from 'react';
import {
  Printer,
  FileText,
  IdCard,
  Users,
  GraduationCap,
  Sparkles,
  Download,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { Siswa, Pegawai, KopSekolah } from '../types';
import {
  generateSiswaStandaloneHTML,
  generatePegawaiStandaloneHTML,
  downloadHTMLFile
} from '../utils/htmlExporter';

interface CetakCenterProps {
  siswaList: Siswa[];
  pegawaiList: Pegawai[];
  kop: KopSekolah;
  onViewSiswaDetail: (siswa: Siswa) => void;
  onViewPegawaiDetail: (pegawai: Pegawai) => void;
}

export const CetakCenter: React.FC<CetakCenterProps> = ({
  siswaList,
  pegawaiList,
  kop,
  onViewSiswaDetail,
  onViewPegawaiDetail
}) => {
  const [selectedDoc, setSelectedDoc] = useState<'siswa' | 'pegawai' | 'kartu-siswa' | 'kta-pegawai'>('siswa');

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadHTML = () => {
    if (selectedDoc === 'siswa' || selectedDoc === 'kartu-siswa') {
      const html = generateSiswaStandaloneHTML(siswaList, kop);
      downloadHTMLFile(`Dokumen-Cetak-Siswa-${kop.namaSekolah.replace(/\s+/g, '-')}.html`, html);
    } else {
      const html = generatePegawaiStandaloneHTML(pegawaiList, kop);
      downloadHTMLFile(`Dokumen-Cetak-SIMPEG-${kop.namaSekolah.replace(/\s+/g, '-')}.html`, html);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-950 rounded-2xl p-6 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-indigo-500/30 text-indigo-200 text-xs font-bold px-2.5 py-0.5 rounded-full border border-indigo-400/30">
              Alamat: /cetak.html
            </span>
            <span className="text-xs text-slate-300">Format Siap Cetak A4/F4</span>
          </div>
          <h2 className="text-xl font-black mt-1 text-white">
            Pusat Cetak Dokumen Resmi & Kartu Pelajar
          </h2>
          <p className="text-xs text-slate-300 max-w-xl mt-1">
            Cetak langsung ke printer, simpan sebagai PDF, atau unduh berkas HTML mandiri untuk arsip kesiswaan dan kepegawaian.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleDownloadHTML}
            className="btn-3d btn-3d-emerald text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Berkas .html</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="btn-3d btn-3d-blue text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Dokumen (Ctrl+P)</span>
          </button>
        </div>
      </div>

      {/* Doc Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          type="button"
          onClick={() => setSelectedDoc('siswa')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            selectedDoc === 'siswa'
              ? 'bg-blue-50 border-blue-600 shadow-xs ring-2 ring-blue-500/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-2 font-bold">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Buku Induk Siswa</h3>
          <p className="text-xs text-slate-500 mt-0.5">Daftar {siswaList.length} siswa dengan verifikasi foto dinas</p>
        </button>

        <button
          type="button"
          onClick={() => setSelectedDoc('pegawai')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            selectedDoc === 'pegawai'
              ? 'bg-emerald-50 border-emerald-600 shadow-xs ring-2 ring-emerald-500/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 font-bold">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">DUK Guru & Pegawai</h3>
          <p className="text-xs text-slate-500 mt-0.5">Daftar {pegawaiList.length} PTK dengan golongan & JJM</p>
        </button>

        <button
          type="button"
          onClick={() => setSelectedDoc('kartu-siswa')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            selectedDoc === 'kartu-siswa'
              ? 'bg-purple-50 border-purple-600 shadow-xs ring-2 ring-purple-500/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-2 font-bold">
            <IdCard className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Kartu Pelajar Digital</h3>
          <p className="text-xs text-slate-500 mt-0.5">KTA Pelajar dengan barcode & pas foto dinas</p>
        </button>

        <button
          type="button"
          onClick={() => setSelectedDoc('kta-pegawai')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            selectedDoc === 'kta-pegawai'
              ? 'bg-amber-50 border-amber-600 shadow-xs ring-2 ring-amber-500/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-2 font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">KTA Pegawai & Guru</h3>
          <p className="text-xs text-slate-500 mt-0.5">Kartu Tanda Anggota SIMPEG resmi</p>
        </button>
      </div>

      {/* Live Preview Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Pratinjau Lembar Cetak
            </h3>
            <p className="text-xs text-slate-500">
              Menampilkan tata letak presisi yang akan dihasilkan saat mencetak atau mengunduh .html
            </p>
          </div>
          <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">
            Kertas Standar: A4 / Folio
          </span>
        </div>

        {/* Selected Doc Preview Content */}
        {selectedDoc === 'siswa' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-slate-300">
              <thead>
                <tr className="bg-blue-900 text-white font-bold">
                  <th className="p-2 border border-blue-900 text-center w-10">No</th>
                  <th className="p-2 border border-blue-900">NISN</th>
                  <th className="p-2 border border-blue-900">Nama Siswa</th>
                  <th className="p-2 border border-blue-900 text-center">JK</th>
                  <th className="p-2 border border-blue-900">Kelas / Rombel</th>
                  <th className="p-2 border border-blue-900">Peminatan</th>
                  <th className="p-2 border border-blue-900 text-center">Latar Foto</th>
                  <th className="p-2 border border-blue-900">Wali Kelas</th>
                </tr>
              </thead>
              <tbody>
                {siswaList.slice(0, 10).map((s, idx) => (
                  <tr key={s.id} className="hover:bg-slate-50 border-b border-slate-200">
                    <td className="p-2 text-center text-slate-500">{idx + 1}</td>
                    <td className="p-2 font-mono font-semibold text-blue-700">{s.nisn}</td>
                    <td className="p-2 font-bold text-slate-800">{s.nama}</td>
                    <td className="p-2 text-center">{s.jk}</td>
                    <td className="p-2">{s.tingkatKelas} - {s.rombel}</td>
                    <td className="p-2">{s.peminatan}</td>
                    <td className="p-2 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${
                        s.fotoBgColor?.includes('Merah') ? 'bg-red-600' : 'bg-blue-600'
                      }`}>
                        {s.fotoBgColor?.includes('Merah') ? 'Merah' : 'Biru'}
                      </span>
                    </td>
                    <td className="p-2">{s.waliKelas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-slate-400 mt-2 text-center">
              Menampilkan 10 dari {siswaList.length} data siswa. Klik "Cetak Dokumen" atau "Unduh Berkas .html" untuk seluruh data.
            </p>
          </div>
        )}

        {selectedDoc === 'pegawai' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-slate-300">
              <thead>
                <tr className="bg-emerald-800 text-white font-bold">
                  <th className="p-2 border border-emerald-800 text-center w-10">No</th>
                  <th className="p-2 border border-emerald-800">Nama Lengkap</th>
                  <th className="p-2 border border-emerald-800">NIP</th>
                  <th className="p-2 border border-emerald-800">Status</th>
                  <th className="p-2 border border-emerald-800">Gol</th>
                  <th className="p-2 border border-emerald-800">Mapel</th>
                  <th className="p-2 border border-emerald-800 text-center">JJM</th>
                  <th className="p-2 border border-emerald-800">Sertifikasi</th>
                </tr>
              </thead>
              <tbody>
                {pegawaiList.slice(0, 10).map((p, idx) => (
                  <tr key={p.id} className="hover:bg-slate-50 border-b border-slate-200">
                    <td className="p-2 text-center text-slate-500">{idx + 1}</td>
                    <td className="p-2 font-bold text-slate-800">{p.nama}</td>
                    <td className="p-2 font-mono text-slate-600">{p.nip || '-'}</td>
                    <td className="p-2">{p.statusPegawai}</td>
                    <td className="p-2 font-semibold">{p.golongan || '-'}</td>
                    <td className="p-2">{p.mapel || '-'}</td>
                    <td className="p-2 text-center">{p.jumlahJamMengajar ?? 0}</td>
                    <td className="p-2">{p.statusSertifikasi || 'Belum'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-slate-400 mt-2 text-center">
              Menampilkan 10 dari {pegawaiList.length} data guru & pegawai.
            </p>
          </div>
        )}

        {selectedDoc === 'kartu-siswa' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {siswaList.slice(0, 4).map((s) => (
              <div key={s.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {s.foto ? (
                    <img src={s.foto} alt={s.nama} className="w-12 h-14 object-cover rounded-lg border border-slate-300" />
                  ) : (
                    <div className={`w-12 h-14 rounded-lg flex items-center justify-center text-white font-bold text-xs ${
                      s.fotoBgColor?.includes('Merah') ? 'bg-red-600' : 'bg-blue-600'
                    }`}>
                      {s.jk === 'Laki-laki' ? 'SISWA' : 'SISWI'}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{s.nama}</div>
                    <div className="text-xs font-mono text-blue-700">NISN: {s.nisn}</div>
                    <div className="text-[11px] text-slate-500">{s.tingkatKelas} ({s.rombel})</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onViewSiswaDetail(s)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lihat Kartu</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedDoc === 'kta-pegawai' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pegawaiList.slice(0, 4).map((p) => (
              <div key={p.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {p.foto ? (
                    <img src={p.foto} alt={p.nama} className="w-12 h-14 object-cover rounded-lg border border-slate-300" />
                  ) : (
                    <div className="w-12 h-14 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold text-xs">
                      PTK
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{p.nama}</div>
                    <div className="text-xs font-mono text-slate-600">NIP: {p.nip || '-'}</div>
                    <div className="text-[11px] text-slate-500">{p.jenisPtk} - {p.golongan}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onViewPegawaiDetail(p)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lihat KTA</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
