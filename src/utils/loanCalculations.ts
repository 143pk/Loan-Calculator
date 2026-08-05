import {
  CurrencySymbol,
  DTIInput,
  DTIResult,
  LoanCalculationResult,
  LoanInputState,
  PaymentScheduleRow,
  RefinanceInput,
  RefinanceResult,
  YearlySummaryRow,
} from '../types';

export const CURRENCIES = [
  { code: 'USD', symbol: '$' as CurrencySymbol, name: 'USD ($)' },
  { code: 'INR', symbol: '₹' as CurrencySymbol, name: 'INR (₹)' },
  { code: 'GBP', symbol: '£' as CurrencySymbol, name: 'GBP (£)' },
  { code: 'EUR', symbol: '€' as CurrencySymbol, name: 'EUR (€)' },
  { code: 'AUD', symbol: 'A$' as CurrencySymbol, name: 'AUD (A$)' },
  { code: 'CAD', symbol: 'C$' as CurrencySymbol, name: 'CAD (C$)' },
  { code: 'NZD', symbol: 'NZ$' as CurrencySymbol, name: 'NZD (NZ$)' },
];

export function formatCurrency(amount: number, symbol: CurrencySymbol = '$'): string {
  if (isNaN(amount) || !isFinite(amount)) return `${symbol}0.00`;
  const locale = symbol === '₹' ? 'en-IN' : 'en-US';
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));
  
  return amount < 0 ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
}

export function formatNumber(num: number): string {
  if (isNaN(num) || !isFinite(num)) return '0';
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(num);
}

export function calculateLoan(input: LoanInputState): LoanCalculationResult {
  const {
    amount,
    interestRate,
    termYears,
    termMonths,
    startDate,
    paymentFrequency,
    extraPaymentMonthly,
    extraPaymentLumpSum,
    lumpSumMonth,
  } = input;

  const totalTermInMonths = Math.max(1, (termYears || 0) * 12 + (termMonths || 0));
  const annualRate = Math.max(0, interestRate) / 100;
  
  let periodsPerYear = 12;
  if (paymentFrequency === 'biweekly') periodsPerYear = 26;
  if (paymentFrequency === 'weekly') periodsPerYear = 52;

  const periodicRate = annualRate / periodsPerYear;
  const totalPeriods = Math.round(totalTermInMonths * (periodsPerYear / 12));

  // Calculate base required payment
  let basePeriodicPayment = 0;
  if (periodicRate === 0) {
    basePeriodicPayment = amount / totalPeriods;
  } else {
    basePeriodicPayment =
      (amount * (periodicRate * Math.pow(1 + periodicRate, totalPeriods))) /
      (Math.pow(1 + periodicRate, totalPeriods) - 1);
  }

  // Monthly base payment equivalent for reference
  const monthlyRate = annualRate / 12;
  let standardMonthlyPayment = 0;
  if (monthlyRate === 0) {
    standardMonthlyPayment = amount / totalTermInMonths;
  } else {
    standardMonthlyPayment =
      (amount * (monthlyRate * Math.pow(1 + monthlyRate, totalTermInMonths))) /
      (Math.pow(1 + monthlyRate, totalTermInMonths) - 1);
  }

  const schedule: PaymentScheduleRow[] = [];
  let remainingBalance = amount;
  let totalInterestPaid = 0;
  let periodNumber = 0;

  const start = startDate ? new Date(startDate) : new Date();

  // Generate Schedule with optional Extra Payments
  while (remainingBalance > 0.01 && periodNumber < totalPeriods * 2) {
    periodNumber++;
    
    const interestForPeriod = remainingBalance * periodicRate;
    let extraForThisPeriod = extraPaymentMonthly || 0;
    
    // Add lump sum if matching period (approximated by month conversion)
    if (lumpSumMonth > 0 && Math.ceil(periodNumber / (periodsPerYear / 12)) === lumpSumMonth) {
      extraForThisPeriod += extraPaymentLumpSum || 0;
    }

    let regularPrincipal = basePeriodicPayment - interestForPeriod;
    if (regularPrincipal > remainingBalance) {
      regularPrincipal = remainingBalance;
    }

    let totalPrincipalForPeriod = regularPrincipal + extraForThisPeriod;
    if (totalPrincipalForPeriod > remainingBalance) {
      totalPrincipalForPeriod = remainingBalance;
      extraForThisPeriod = Math.max(0, remainingBalance - regularPrincipal);
    }

    const actualPaymentAmount = Math.min(
      remainingBalance + interestForPeriod,
      basePeriodicPayment + extraForThisPeriod
    );

    totalInterestPaid += interestForPeriod;
    remainingBalance -= totalPrincipalForPeriod;
    if (remainingBalance < 0) remainingBalance = 0;

    // Calculate Payment Date
    const currentDate = new Date(start);
    if (paymentFrequency === 'monthly') {
      currentDate.setMonth(start.getMonth() + periodNumber - 1);
    } else if (paymentFrequency === 'biweekly') {
      currentDate.setDate(start.getDate() + (periodNumber - 1) * 14);
    } else {
      currentDate.setDate(start.getDate() + (periodNumber - 1) * 7);
    }

    const dateString = currentDate.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });

    schedule.push({
      paymentNumber: periodNumber,
      date: dateString,
      paymentAmount: actualPaymentAmount,
      principalPaid: totalPrincipalForPeriod,
      interestPaid: interestForPeriod,
      totalInterestPaid,
      remainingBalance,
      extraPayment: extraForThisPeriod,
    });
  }

  // Calculate baseline schedule without extra payments to determine interest & months saved
  let baselineTotalInterest = 0;
  let baselineBalance = amount;
  for (let p = 1; p <= totalPeriods; p++) {
    const interest = baselineBalance * periodicRate;
    const principal = Math.min(baselineBalance, basePeriodicPayment - interest);
    baselineTotalInterest += interest;
    baselineBalance -= principal;
  }

  const interestSavedWithExtra = Math.max(0, baselineTotalInterest - totalInterestPaid);
  const periodsSaved = Math.max(0, totalPeriods - periodNumber);
  const monthsSavedWithExtra = Math.round(periodsSaved / (periodsPerYear / 12));

  // Yearly Aggregations
  const yearlyMap = new Map<number, YearlySummaryRow>();
  schedule.forEach((row) => {
    // extract year from date string
    const yearNum = new Date(row.date).getFullYear() || new Date().getFullYear();
    const existing = yearlyMap.get(yearNum) || {
      year: yearNum,
      yearLabel: `Year ${yearlyMap.size + 1} (${yearNum})`,
      totalPaid: 0,
      principalPaid: 0,
      interestPaid: 0,
      endBalance: 0,
    };

    existing.totalPaid += row.paymentAmount;
    existing.principalPaid += row.principalPaid;
    existing.interestPaid += row.interestPaid;
    existing.endBalance = row.remainingBalance;

    yearlyMap.set(yearNum, existing);
  });

  const yearlySummary = Array.from(yearlyMap.values());

  const totalCost = amount + totalInterestPaid;
  const principalPercentage = totalCost > 0 ? (amount / totalCost) * 100 : 100;
  const interestPercentage = totalCost > 0 ? (totalInterestPaid / totalCost) * 100 : 0;

  const lastRow = schedule[schedule.length - 1];
  const payoffDate = lastRow ? lastRow.date : 'N/A';

  // Original Payoff Date
  const origEnd = new Date(start);
  origEnd.setMonth(start.getMonth() + totalTermInMonths);
  const originalPayoffDate = origEnd.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return {
    monthlyPayment: standardMonthlyPayment,
    effectivePayment: basePeriodicPayment,
    totalPaymentsCount: schedule.length,
    totalInterest: totalInterestPaid,
    totalCost,
    payoffDate,
    originalPayoffDate,
    interestSavedWithExtra,
    monthsSavedWithExtra,
    schedule,
    yearlySummary,
    principalPercentage,
    interestPercentage,
  };
}

export function calculateRefinance(input: RefinanceInput): RefinanceResult {
  const { currentBalance, currentRate, remainingYears, newRate, newTermYears, refinanceCosts } = input;

  const currentMonthlyRate = currentRate / 100 / 12;
  const currentMonths = remainingYears * 12;
  
  let currentMonthlyPayment = 0;
  if (currentMonthlyRate === 0) {
    currentMonthlyPayment = currentBalance / currentMonths;
  } else {
    currentMonthlyPayment =
      (currentBalance * (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentMonths))) /
      (Math.pow(1 + currentMonthlyRate, currentMonths) - 1);
  }

  const currentRemainingInterest = currentMonthlyPayment * currentMonths - currentBalance;

  const newMonthlyRate = newRate / 100 / 12;
  const newMonths = newTermYears * 12;

  let newMonthlyPayment = 0;
  if (newMonthlyRate === 0) {
    newMonthlyPayment = currentBalance / newMonths;
  } else {
    newMonthlyPayment =
      (currentBalance * (newMonthlyRate * Math.pow(1 + newMonthlyRate, newMonths))) /
      (Math.pow(1 + newMonthlyRate, newMonths) - 1);
  }

  const newTotalInterest = newMonthlyPayment * newMonths - currentBalance;

  const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
  const netLifetimeSavings = currentRemainingInterest - newTotalInterest - refinanceCosts;
  
  const breakEvenMonths = monthlySavings > 0 ? Math.ceil(refinanceCosts / monthlySavings) : 0;
  const isRecommended = netLifetimeSavings > 0 && monthlySavings > 0;

  return {
    currentMonthlyPayment,
    newMonthlyPayment,
    monthlySavings,
    currentRemainingInterest,
    newTotalInterest,
    netLifetimeSavings,
    breakEvenMonths,
    isRecommended,
  };
}

export function calculateDTI(input: DTIInput): DTIResult {
  const {
    grossMonthlyIncome,
    monthlyRentMortgage,
    monthlyAutoLoan,
    monthlyCreditCards,
    monthlyStudentLoans,
    monthlyOtherDebt,
  } = input;

  const income = Math.max(1, grossMonthlyIncome);
  const nonHousingDebt = monthlyAutoLoan + monthlyCreditCards + monthlyStudentLoans + monthlyOtherDebt;
  const totalMonthlyDebt = monthlyRentMortgage + nonHousingDebt;

  const frontEndRatio = (monthlyRentMortgage / income) * 100;
  const backEndRatio = (totalMonthlyDebt / income) * 100;

  let status: DTIResult['status'] = 'excellent';
  if (backEndRatio <= 35) {
    status = 'excellent';
  } else if (backEndRatio <= 43) {
    status = 'good';
  } else if (backEndRatio <= 50) {
    status = 'fair';
  } else {
    status = 'high';
  }

  // Lenders usually capping back-end DTI at 43%
  const maxAllowedDebt = income * 0.43;
  const maxRecommendedMortgagePayment = Math.max(0, maxAllowedDebt - nonHousingDebt);

  return {
    totalMonthlyDebt,
    frontEndRatio,
    backEndRatio,
    status,
    maxRecommendedMortgagePayment,
  };
}

export function exportToCSV(schedule: PaymentScheduleRow[], filename = 'loan-amortization-schedule.csv') {
  const headers = [
    'Payment #',
    'Date',
    'Payment Amount',
    'Principal Paid',
    'Interest Paid',
    'Total Interest Paid',
    'Remaining Balance',
  ];

  const rows = schedule.map((row) => [
    row.paymentNumber,
    row.date,
    row.paymentAmount.toFixed(2),
    row.principalPaid.toFixed(2),
    row.interestPaid.toFixed(2),
    row.totalInterestPaid.toFixed(2),
    row.remainingBalance.toFixed(2),
  ]);

  const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
