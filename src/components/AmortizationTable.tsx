import React, { useState } from 'react';
import { Table, Calendar, Search, ArrowUpDown, FileText } from 'lucide-react';
import { CurrencySymbol, PaymentScheduleRow, YearlySummaryRow } from '../types';
import { formatCurrency } from '../utils/loanCalculations';

interface AmortizationTableProps {
  schedule: PaymentScheduleRow[];
  yearlySummary: YearlySummaryRow[];
  currency: CurrencySymbol;
}

export const AmortizationTable: React.FC<AmortizationTableProps> = ({
  schedule,
  yearlySummary,
  currency,
}) => {
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('yearly');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12;

  const filteredSchedule = schedule.filter(
    (row) =>
      row.paymentNumber.toString().includes(searchTerm) ||
      row.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSchedule.length / rowsPerPage);
  const paginatedSchedule = filteredSchedule.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl backdrop-blur-md">
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Table className="h-5 w-5 text-sky-400" />
            Amortization Schedule
          </h2>
          <p className="text-xs text-slate-400">
            Complete repayment breakdown showing principal, interest, and remaining balance
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Yearly vs Monthly Toggle */}
          <div className="flex rounded-lg border border-slate-800 bg-slate-950 p-1">
            <button
              type="button"
              onClick={() => setViewMode('yearly')}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                viewMode === 'yearly'
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Yearly Summary
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode('monthly');
                setCurrentPage(1);
              }}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                viewMode === 'monthly'
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Monthly Search filter */}
      {viewMode === 'monthly' && (
        <div className="my-4 flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 w-full max-w-xs">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search payment # or date..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none font-mono"
          />
        </div>
      )}

      {/* Table Render */}
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800/80">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-300 font-semibold uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">{viewMode === 'yearly' ? 'Year' : 'Pmt #'}</th>
              <th className="px-4 py-3">{viewMode === 'yearly' ? 'Period' : 'Date'}</th>
              <th className="px-4 py-3 text-right">Payment</th>
              <th className="px-4 py-3 text-right">Principal</th>
              <th className="px-4 py-3 text-right">Interest</th>
              <th className="px-4 py-3 text-right">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono text-slate-200">
            {viewMode === 'yearly'
              ? yearlySummary.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 font-bold text-sky-400">Year {row.year}</td>
                    <td className="px-4 py-3 text-slate-400">{row.yearLabel}</td>
                    <td className="px-4 py-3 text-right font-bold text-white">
                      {formatCurrency(row.totalPaid, currency)}
                    </td>
                    <td className="px-4 py-3 text-right text-emerald-400">
                      {formatCurrency(row.principalPaid, currency)}
                    </td>
                    <td className="px-4 py-3 text-right text-amber-400">
                      {formatCurrency(row.interestPaid, currency)}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-300">
                      {formatCurrency(row.endBalance, currency)}
                    </td>
                  </tr>
                ))
              : paginatedSchedule.map((row) => (
                  <tr key={row.paymentNumber} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-2.5 font-bold text-slate-400">#{row.paymentNumber}</td>
                    <td className="px-4 py-2.5 text-slate-300">{row.date}</td>
                    <td className="px-4 py-2.5 text-right font-bold text-white">
                      {formatCurrency(row.paymentAmount, currency)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-emerald-400">
                      {formatCurrency(row.principalPaid, currency)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-amber-400">
                      {formatCurrency(row.interestPaid, currency)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-slate-300">
                      {formatCurrency(row.remainingBalance, currency)}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls for Monthly View */}
      {viewMode === 'monthly' && totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>
            Showing {(currentPage - 1) * rowsPerPage + 1} to{' '}
            {Math.min(currentPage * rowsPerPage, filteredSchedule.length)} of{' '}
            {filteredSchedule.length} payments
          </span>

          <div className="flex gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 font-semibold text-slate-300 hover:bg-slate-800 disabled:opacity-40"
            >
              Prev
            </button>
            <span className="px-2 py-1 font-bold text-sky-400">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 font-semibold text-slate-300 hover:bg-slate-800 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
