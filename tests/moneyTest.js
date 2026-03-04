import { formatCurrency } from "../scripts/utils/money.js";

console.log('Test suite: formatCurrency');

console.log('convert cents to dollars');
if (formatCurrency(2099) === '20.99') {
    console.log('passed');
}
else {
    console.log('failed');
}
console.log('works with 0');
if(formatCurrency(0) === '0.00') {
    console.log('passed')
}
else {
    console.log('failed')
}
console.log('round up to nearest cent');

if (formatCurrency(2507.8) === '25.08') {
    console.log('passed')
}
else {
    console.log('failed')
}