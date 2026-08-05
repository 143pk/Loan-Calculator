export type CurrencySymbol = '$' | '£' | '€' | 'A$' | 'C$' | 'NZ$' | '₹';

export type PaymentFrequency = 'monthly' | 'biweekly' | 'weekly';

export type LoanType = 'mortgage' | 'auto' | 'personal' | 'student' | 'business';

export interface CurrencyConfig {
  code: string;
  symbol: CurrencySymbol;
  name: string;
}

export interface LoanInputState {
  amount: number;
  interestRate: number; // Annual Percentage Rate (APR) in %
  termYears: number;
  termMonths: number;
  startDate: string; // YYYY-MM-DD
  paymentFrequency: PaymentFrequency;
  extraPaymentMonthly: number;
  extraPaymentLumpSum: number;
  lumpSumMonth: number;
  currency: CurrencySymbol;
  loanType: LoanType;
}

export interface PaymentScheduleRow {
  paymentNumber: number;
  date: string;
  paymentAmount: number;
  principalPaid: number;
  interestPaid: number;
  totalInterestPaid: number;
  remainingBalance: number;
  extraPayment: number;
}

export interface YearlySummaryRow {
  year: number;
  yearLabel: string;
  totalPaid: number;
  principalPaid: number;
  interestPaid: number;
  endBalance: number;
}

export interface LoanCalculationResult {
  monthlyPayment: number;
  effectivePayment: number; // payment based on frequency
  totalPaymentsCount: number;
  totalInterest: number;
  totalCost: number;
  payoffDate: string;
  originalPayoffDate: string;
  interestSavedWithExtra: number;
  monthsSavedWithExtra: number;
  schedule: PaymentScheduleRow[];
  yearlySummary: YearlySummaryRow[];
  principalPercentage: number;
  interestPercentage: number;
}

export interface LoanComparisonInput {
  loanA: LoanInputState;
  loanB: LoanInputState;
}

export interface LoanComparisonResult {
  resultA: LoanCalculationResult;
  resultB: LoanCalculationResult;
  monthlyDifference: number;
  interestDifference: number;
  totalCostDifference: number;
  cheaperLoan: 'A' | 'B' | 'Equal';
}

export interface RefinanceInput {
  currentBalance: number;
  currentRate: number;
  remainingYears: number;
  newRate: number;
  newTermYears: number;
  refinanceCosts: number;
  currency: CurrencySymbol;
}

export interface RefinanceResult {
  currentMonthlyPayment: number;
  newMonthlyPayment: number;
  monthlySavings: number;
  currentRemainingInterest: number;
  newTotalInterest: number;
  netLifetimeSavings: number;
  breakEvenMonths: number;
  isRecommended: boolean;
}

export interface DTIInput {
  grossMonthlyIncome: number;
  monthlyRentMortgage: number;
  monthlyAutoLoan: number;
  monthlyCreditCards: number;
  monthlyStudentLoans: number;
  monthlyOtherDebt: number;
  currency: CurrencySymbol;
}

export interface DTIResult {
  totalMonthlyDebt: number;
  frontEndRatio: number; // Housing DTI
  backEndRatio: number; // Total DTI
  status: 'excellent' | 'good' | 'fair' | 'high';
  maxRecommendedMortgagePayment: number;
}
