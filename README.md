# roth-ira-calculator-js

A JavaScript library for Roth IRA retirement calculations and projections.

[Live Demo → Roth IRA Calculator](https://rothiracalculator.app)

## Features

- Calculate Roth IRA contribution limits by year and income
- Project future Roth IRA balance with compound interest
- Calculate Roth IRA conversion scenarios
- Income eligibility check (MAGI phase-out ranges)
- Required Minimum Distribution (RMD) calculations
- Backdoor Roth IRA contribution calculations

## Installation

```bash
npm install roth-ira-calculator-js
```

## Usage

```javascript
const { rothIRABalance, contributionLimit, isEligible } = require('roth-ira-calculator-js');

// Project future Roth IRA balance
const balance = rothIRABalance(6000, 30, 7);
console.log(balance); // Future balance

// Check contribution limit
const limit = contributionLimit(2024, 45000, 'single');
console.log(limit); // Annual contribution limit

// Check eligibility
const eligible = isEligible(2024, 100000, 'single');
console.log(eligible); // { eligible: true, limit: 6500 }
```

## Live Demo

Try the full-featured [Roth IRA Calculator](https://rothiracalculator.app) online.

## License

MIT
