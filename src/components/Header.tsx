import React, { useRef } from 'react';
import { KopSekolah } from '../types';
import {
  GraduationCap,
  Upload,
  FileSpreadsheet,
  UserPlus,
  FileDown,
  BookOpen,
  Building2,
  Edit3,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  onOpenAddModal: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
  onDownloadTemplate: () => void;
  onOpenRincianMapel?: () => void;
  onOpenFuturisticPreview?: () => void;
  kop: KopSekolah;
  onOpenEditKop: () => void;
  totalCount: number;
  activeModule: 'pegawai' | 'siswa';
  onSelectModule: (module: 'pegawai' | 'siswa') => void;
  onOpenGoogleForms: () => void;
  siswaCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAddModal,
  onExport,
  onImport,
  onDownloadTemplate,
  onOpenRincianMapel,
  onOpenFuturisticPreview,
  kop,
  onOpenEditKop,
  totalCount,
  activeModule,
  onSelectModule,
  onOpenGoogleForms,
  siswaCount
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-30 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand & School Logo */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 bg-white/10 rounded-xl border border-white/20 p-1 flex items-center justify-center shrink-0 shadow-inner overflow-hidden">
            {kop.logoKiri ? (
              <img
                src={kop.logoKiri}
                alt="Logo Sekolah"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <GraduationCap className="w-6 h-6 text-amber-300" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-wide uppercase text-white leading-tight">
                {kop.namaSekolah || 'SIMPEG & DAPODIK SMAN'}
              </h1>
            </div>
            <p className="text-xs text-slate-300 font-normal truncate max-w-md">
              {kop.alamatJalan ? `${kop.alamatJalan}, ${kop.kotaKabupaten}` : 'Sistem Informasi Manajemen Guru, Pegawai & Kesiswaan SMA'}
            </p>
          </div>
        </div>

        {/* Module Switcher Tabs: Pegawai vs Siswa + Google Forms */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Switcher Navigation */}
          <div className="bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 flex items-center gap-1 shadow-inner">
            <button
              id="tab-module-pegawai"
              type="button"
              onClick={() => onSelectModule('pegawai')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeModule === 'pegawai'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <span>Guru & Pegawai</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeModule === 'pegawai' ? 'bg-blue-800 text-blue-100' : 'bg-slate-700 text-slate-300'
              }`}>
                {totalCount}
              </span>
            </button>

            <button
              id="tab-module-siswa"
              type="button"
              onClick={() => onSelectModule('siswa')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeModule === 'siswa'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <span>Data Siswa (Dapodik)</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeModule === 'siswa' ? 'bg-blue-800 text-blue-100' : 'bg-slate-700 text-slate-300'
              }`}>
                {siswaCount}
              </span>
            </button>
          </div>

          {/* Google Forms Trigger Button */}
          <button
            id="btn-open-google-forms"
            type="button"
            onClick={onOpenGoogleForms}
            title="Kelola & Hubungkan Google Forms (PPDB, Angket Peminatan & Sinkronisasi Respons)"
            className="btn-3d btn-3d-purple text-purple-50 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-200 animate-pulse" />
            <span>Google Forms</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Futuristic Preview Button */}
          {onOpenFuturisticPreview && (
            <button
              id="btn-preview-futuristik-header"
              type="button"
              onClick={onOpenFuturisticPreview}
              title="Buka Preview KTA Digital Futuristik (3D Interactive Card & Background Menarik)"
              className="btn-3d btn-3d-cyan text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
              <span>Preview KTA Futuristik</span>
            </button>
          )}

          {/* Edit KOP Sekolah Button */}
          <button
            id="btn-edit-kop-header"
            type="button"
            onClick={onOpenEditKop}
            title="Edit KOP Surat Resmi, Alamat Lengkap & Ganti Logo KOP"
            className="btn-3d btn-3d-amber text-amber-50 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5"
          >
            <Building2 className="w-3.5 h-3.5 text-amber-100" />
            <span>Edit KOP Sekolah</span>
          </button>

          {/* Template Download */}
          <button
            id="btn-download-template"
            type="button"
            onClick={onDownloadTemplate}
            title="Unduh Format Template CSV untuk Import Massal"
            className="btn-3d btn-3d-dark text-slate-200 hover:text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5"
          >
            <FileDown className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Format CSV</span>
          </button>

          {/* Import CSV */}
          <label
            htmlFor="importCsvInput"
            className="btn-3d btn-3d-dark text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
            title="Import Data dari CSV / Excel"
          >
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span>Import CSV</span>
          </label>
          <input
            ref={fileInputRef}
            type="file"
            id="importCsvInput"
            accept=".csv,text/csv"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Rincian Guru Mapel SMA Button */}
          {onOpenRincianMapel && (
            <button
              id="btn-rincian-mapel"
              type="button"
              onClick={onOpenRincianMapel}
              className="btn-3d btn-3d-indigo text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5"
              title="Lihat Rincian Guru Mapel SMA, Rumpun Kurikulum, Jam Mengajar & Sertifikasi"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-200" />
              <span>Rincian Guru Mapel</span>
            </button>
          )}

          {/* Export Excel / CSV */}
          <button
            id="btn-export-excel"
            type="button"
            onClick={onExport}
            className="btn-3d btn-3d-emerald text-white text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5"
            title="Ekspor seluruh data ke format CSV yang kompatibel dengan Microsoft Excel"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-100" />
            <span>Export Excel</span>
          </button>

          {/* Tambah Pegawai Button */}
          <button
            id="btn-tambah-pegawai"
            type="button"
            onClick={onOpenAddModal}
            className="btn-3d btn-3d-blue text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Tambah Pegawai</span>
          </button>
        </div>
      </div>
    </header>
  );
};

