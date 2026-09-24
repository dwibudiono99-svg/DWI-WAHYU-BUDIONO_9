import React, { useState, useMemo } from 'react';
import { Siswa } from '../types';
import {
  Search,
  Filter,
  UserCheck,
  IdCard,
  Camera,
  Edit2,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  Plus,
  Sparkles,
  FileSpreadsheet,
  CheckCircle2,
  Phone,
  MapPin,
  Award
} from 'lucide-react';

interface SiswaTableProps {
  siswaList: Siswa[];
  selectedCategoryFilter: string;
  onClearCategoryFilter: () => void;
  onEdit: (siswa: Siswa) => void;
  onDelete: (id: number) => void;
  onViewDetail: (siswa: Siswa) => void;
  onManageFoto: (siswa: Siswa) => void;
  onOpenAdd: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
  onDownloadTemplate: () => void;
  onResetAll: () => void;
}

export const SiswaTable: React.FC<SiswaTableProps> = ({
  siswaList,
  selectedCategoryFilter,
  onClearCategoryFilter,
  onEdit,
  onDelete,
  onViewDetail,
  onManageFoto,
  onOpenAdd,
  onExport,
  onImport,
  onDownloadTemplate,
  onResetAll
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKelas, setFilterKelas] = useState('ALL');
  const [filterJk, setFilterJk] = useState('ALL');
  const [filterPeminatan, setFilterPeminatan] = useState('ALL');

  const filteredData = useMemo(() => {
    return siswaList.filter((item) => {
      // Category filter from top stat cards
      if (selectedCategoryFilter === 'Kelas X' && item.tingkatKelas !== 'Kelas X') return false;
      if (selectedCategoryFilter === 'Kelas XI' && item.tingkatKelas !== 'Kelas XI') return false;
      if (selectedCategoryFilter === 'Kelas XII' && item.tingkatKelas !== 'Kelas XII') return false;
      if (selectedCategoryFilter === 'PRESTASI' && !item.prestasi) return false;

      // Table specific dropdown filters
      if (filterKelas !== 'ALL' && item.tingkatKelas !== filterKelas) return false;
      if (filterJk !== 'ALL' && item.jk !== filterJk) return false;
      if (filterPeminatan !== 'ALL' && !item.peminatan.toLowerCase().includes(filterPeminatan.toLowerCase())) {
        return false;
      }

      // Search term
      if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        const matchNama = item.nama.toLowerCase().includes(term);
        const matchNisn = item.nisn.toLowerCase().includes(term);
        const matchNis = item.nis.toLowerCase().includes(term);
        const matchRombel = item.rombel.toLowerCase().includes(term);
        const matchWali = item.waliKelas.toLowerCase().includes(term);
        const matchPeminatan = item.peminatan.toLowerCase().includes(term);
        const matchAlamat = item.alamat.toLowerCase().includes(term);

        if (!matchNama && !matchNisn && !matchNis && !matchRombel && !matchWali && !matchPeminatan && !matchAlamat) {
          return false;
        }
      }

      return true;
    });
  }, [siswaList, selectedCategoryFilter, filterKelas, filterJk, filterPeminatan, searchTerm]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      e.target.value = '';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Control Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200/80 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span>Buku Induk & Data Kesiswaan</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {filteredData.length} dari {siswaList.length} Siswa
              </span>
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Sesuai Standar Dapodik & Aturan Pas Foto Resmi Dinas Pendidikan Jawa Timur
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="btn-add-siswa"
            onClick={onOpenAdd}
            className="btn-3d btn-3d-blue px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Siswa Baru</span>
          </button>

          <button
            id="btn-export-siswa"
            onClick={onExport}
            className="px-3 py-2 text-xs font-medium bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors"
            title="Ekspor ke Excel/CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Ekspor Excel</span>
          </button>

          <label
            htmlFor="csv-siswa-upload-input"
            className="px-3 py-2 text-xs font-medium bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            title="Impor Data Siswa CSV"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Impor CSV</span>
            <input
              id="csv-siswa-upload-input"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>

          <button
            id="btn-template-siswa"
            onClick={onDownloadTemplate}
            className="p-2 text-xs text-slate-600 hover:text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs"
            title="Download Template Format CSV Siswa"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
          </button>

          <button
            id="btn-reset-siswa"
            onClick={onResetAll}
            className="p-2 text-xs text-slate-500 hover:text-red-600 bg-white hover:bg-red-50 border border-slate-200 rounded-lg shadow-2xs"
            title="Kembalikan ke data bawaan simulasi SMA"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 border-b border-slate-100 bg-white flex flex-col md:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-grow">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="search-siswa-input"
            type="text"
            placeholder="Cari nama siswa, NISN, NIS, rombel, wali kelas, atau alamat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Kelas */}
          <select
            id="filter-kelas-select"
            value={filterKelas}
            onChange={(e) => setFilterKelas(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Semua Tingkat Kelas</option>
            <option value="Kelas X">Kelas X (Fase E)</option>
            <option value="Kelas XI">Kelas XI (Fase F)</option>
            <option value="Kelas XII">Kelas XII (Fase F)</option>
          </select>

          {/* Gender */}
          <select
            id="filter-jk-siswa-select"
            value={filterJk}
            onChange={(e) => setFilterJk(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Semua Jenis Kelamin</option>
            <option value="Laki-laki">Putra (L)</option>
            <option value="Perempuan">Putri (P)</option>
          </select>

          {/* Peminatan */}
          <select
            id="filter-peminatan-select"
            value={filterPeminatan}
            onChange={(e) => setFilterPeminatan(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Semua Peminatan</option>
            <option value="Merdeka">Fase E Eksplorasi</option>
            <option value="MIPA">MIPA (Sains)</option>
            <option value="IPS">IPS (Sosial)</option>
            <option value="Bahasa">Bahasa & Budaya</option>
          </select>

          {selectedCategoryFilter !== 'ALL' && (
            <button
              onClick={onClearCategoryFilter}
              className="text-[11px] font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
            >
              <span>Reset Filter Kartu: {selectedCategoryFilter}</span>
              <span>✕</span>
            </button>
          )}
        </div>
      </div>

      {/* Rules Notice Badge */}
      <div className="bg-amber-50/70 border-b border-amber-100/80 px-4 py-2 flex flex-wrap items-center justify-between text-[11px] text-amber-800 gap-2">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span>Aturan Pas Foto Dinas Pendidikan Jawa Timur:</span>
          <span className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">Latar Merah</span>
          <span>(Tahun Ganjil: 2007, 2009)</span>
          <span className="text-amber-300">•</span>
          <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">Latar Biru</span>
          <span>(Tahun Genap: 2006, 2008)</span>
          <span className="text-amber-300">•</span>
          <span>Kemeja Putih Seragam SMA & Badge OSIS</span>
        </div>
        <span className="text-[10px] text-amber-700">Otomatis Terdeteksi Sistem</span>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-200/90 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              <th className="py-3 px-3.5 text-center w-12">No</th>
              <th className="py-3 px-3 text-center w-16">Pas Foto</th>
              <th className="py-3 px-4">Identitas Siswa (Dapodik)</th>
              <th className="py-3 px-4">Kelas & Peminatan</th>
              <th className="py-3 px-4">Orang Tua & Kontak</th>
              <th className="py-3 px-4">Wali Kelas</th>
              <th className="py-3 px-3 text-center w-36">Aksi & KTA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400">
                  <div className="max-w-xs mx-auto flex flex-col items-center">
                    <UserCheck className="w-10 h-10 text-slate-300 mb-2 stroke-1" />
                    <p className="font-semibold text-slate-600">Tidak ada data siswa yang cocok</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Coba sesuaikan kata kunci pencarian atau ubah pilihan filter kelas.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((siswa, idx) => {
                const birthYear = parseInt(siswa.tanggalLahir.split('-')[0]) || 2008;
                const isOddYear = birthYear % 2 !== 0;
                const bgLabel = isOddYear ? 'Merah' : 'Biru';
                const bgBadgeColor = isOddYear ? 'bg-red-50 text-red-700 border-red-200' : 'bg-blue-50 text-blue-700 border-blue-200';

                return (
                  <tr
                    key={siswa.id}
                    id={`siswa-row-${siswa.id}`}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Index */}
                    <td className="py-3 px-3.5 text-center text-slate-400 font-mono text-[11px]">
                      {idx + 1}
                    </td>

                    {/* Pas Foto Aturan Dinas */}
                    <td className="py-3 px-3 text-center">
                      <div className="relative inline-block group/foto">
                        <div className="w-10 h-13 rounded border border-slate-300 shadow-2xs overflow-hidden bg-slate-100 flex items-center justify-center">
                          {siswa.foto ? (
                            <img
                              src={siswa.foto}
                              alt={siswa.nama}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-[10px] text-slate-400 font-bold">3x4</span>
                          )}
                        </div>
                        {/* Dinas background indicator tag */}
                        <div className="mt-1">
                          <span className={`text-[9px] font-bold px-1 py-0.2 rounded border ${bgBadgeColor}`}>
                            {bgLabel}
                          </span>
                        </div>
                        {/* Quick edit photo hover button */}
                        <button
                          onClick={() => onManageFoto(siswa)}
                          title="Kelola Pas Foto Siswa"
                          className="absolute -top-1 -right-1 bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-600 p-0.5 rounded-full border border-slate-200 shadow-xs opacity-0 group-hover/foto:opacity-100 transition-opacity"
                        >
                          <Camera className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </td>

                    {/* Identitas Siswa */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {siswa.nama}
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 mt-0.5 font-mono text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-700">NISN: {siswa.nisn}</span>
                        <span className="text-slate-300">•</span>
                        <span>NIS: {siswa.nis}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                        <span>{siswa.jk}</span>
                        <span>•</span>
                        <span>{siswa.tempatLahir}, {siswa.tanggalLahir}</span>
                        <span>•</span>
                        <span>{siswa.agama}</span>
                      </div>
                      {siswa.prestasi && (
                        <div className="mt-1 flex items-center gap-1 text-[10px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 max-w-fit">
                          <Award className="w-3 h-3 text-amber-600 shrink-0" />
                          <span className="truncate max-w-[260px]">{siswa.prestasi}</span>
                        </div>
                      )}
                    </td>

                    {/* Kelas & Peminatan */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-xs">
                          {siswa.rombel}
                        </span>
                        <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.5 rounded">
                          {siswa.tingkatKelas}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1 line-clamp-1" title={siswa.peminatan}>
                        {siswa.peminatan}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {siswa.faseKurikulum}
                      </div>
                    </td>

                    {/* Orang Tua & Kontak */}
                    <td className="py-3 px-4">
                      <div className="text-[11px] text-slate-800 font-medium">
                        Ayah: {siswa.namaAyah}
                      </div>
                      <div className="text-[11px] text-slate-600">
                        Ibu: {siswa.namaIbu}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5 font-mono">
                        <Phone className="w-2.5 h-2.5 text-slate-400" />
                        <span>Ortu: {siswa.noHpOrtu}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5 truncate max-w-[200px]" title={siswa.alamat}>
                        <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                        <span>{siswa.alamat}</span>
                      </div>
                    </td>

                    {/* Wali Kelas */}
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-800 text-[11px]">
                        {siswa.waliKelas}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 mt-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>{siswa.statusSiswa}</span>
                      </span>
                    </td>

                    {/* Aksi */}
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {/* Lihat KTA / Kartu Pelajar */}
                        <button
                          id={`btn-kta-siswa-${siswa.id}`}
                          onClick={() => onViewDetail(siswa)}
                          title="Cetak & Lihat Kartu Tanda Pelajar (KTA)"
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <IdCard className="w-4 h-4" />
                        </button>

                        {/* Kelola Pas Foto */}
                        <button
                          onClick={() => onManageFoto(siswa)}
                          title="Kelola Pas Foto Resmi Siswa"
                          className="p-1.5 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Camera className="w-4 h-4" />
                        </button>

                        {/* Edit Data */}
                        <button
                          onClick={() => onEdit(siswa)}
                          title="Ubah Data Siswa"
                          className="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {/* Hapus Data */}
                        <button
                          onClick={() => onDelete(siswa.id)}
                          title="Hapus Data Siswa"
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="p-3.5 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-3">
          <span>Menampilkan <strong>{filteredData.length}</strong> siswa</span>
          <span className="text-slate-300">•</span>
          <span>Standar Dapodik & Akreditasi A SMA Negeri</span>
        </div>
        <div className="text-[11px] text-slate-400">
          Klik ikon kartu identitas untuk melihat & mencetak Kartu Tanda Pelajar (KTA) Siswa
        </div>
      </div>
    </div>
  );
};
