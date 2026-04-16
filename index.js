/**
 * roth-ira-calculator-js
 * JavaScript library for Roth IRA calculations and retirement planning
 * Live demo: https://rothiracalculator.app
 */

'use strict';

const CONTRIBUTION_LIMITS = {
  2024: { under50: 7000, over50: 8000 },
  2025: { under50: 7000, over50: 8000 },
  2026: { under50: 7000, over50: 8000 }
};

const MAGI_LIMITS = {
  2024: {
    single: { phaseOutStart: 146000, phaseOutEnd: 161000 },
    married: { phaseOutStart: 230000, phaseOutEnd: 240000 }
  },
  2025: {
    single: { phaseOutStart: 150000, phaseOutEnd: 165000 },
    married: { phaseOutStart: 236000, phaseOutEnd: 246000 }
  }
};

function rothIRABalance(annualContribution, years, annualReturnRate) {
  const r = annualReturnRate / 100;
  return annualContribution * ((Math.pow(1 + r, years) - 1) / r) * (1 + r);
}

function contributionLimit(year, age, filingStatus) {
  const limits = CONTRIBUTION_LIMITS[year] || CONTRIBUTION_LIMITS[2024];
  const baseLimit = age >= 50 ? limits.over50 : limits.under50;
  const magiLimits = (MAGI_LIMITS[year] || MAGI_LIMITS[2024])[filingStatus] || MAGI_LIMITS[2024].single;
  return { baseLimit, magiLimits };
}

function isEligible(year, magi, filingStatus) {
  const { magiLimits, baseLimit } = contributionLimit(year, 30, filingStatus);
  if (magi <= magiLimits.phaseOutStart) return { eligible: true, limit: baseLimit };
  if (magi >= magiLimits.phaseOutEnd) return { eligible: false, limit: 0 };
  const range = magiLimits.phaseOutEnd - magiLimits.phaseOutStart;
  const reducedLimit = Math.floor((baseLimit * (magiLimits.phaseOutEnd - magi)) / range / 10) * 10;
  return { eligible: true, limit: Math.max(reducedLimit, 200) };
}

function projectedRetirementBalance(currentAge, retirementAge, annualContribution, currentBalance, annualReturn) {
  const years = retirementAge - currentAge;
  const r = annualReturn / 100;
  const futureCurrentBalance = currentBalance * Math.pow(1 + r, years);
  const futureContributions = rothIRABalance(annualContribution, years, annualReturn);
  return futureCurrentBalance + futureContributions;
}

function rothConversionTaxCost(conversionAmount, marginalTaxRate) {
  return {
    taxDue: conversionAmount * (marginalTaxRate / 100),
    afterTaxCost: conversionAmount * (1 - marginalTaxRate / 100),
    effectiveRate: marginalTaxRate
  };
}

module.exports = {
  rothIRABalance,
  contributionLimit,
  isEligible,
  projectedRetirementBalance,
  rothConversionTaxCost
};
