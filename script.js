document.getElementById('receiptForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const customerName = document.getElementById('customerName').value;
    const contactNumber = document.getElementById('contactNumber').value;
    const email = document.getElementById('email').value;

    const plans = [];
    for (let i = 1; i <= 10; i++) {
        const plan = document.getElementById(`plan${i}`).value;
        const price = document.getElementById(`price${i}`).value;
        if (plan && price) {
            plans.push({ plan, price });
        }
    }

    // Validate at least one plan is entered
    if (plans.length === 0) {
        alert('At least one plan must be entered.');
        return;
    }

    // Calculate total price
    const totalPrice = plans.reduce((sum, item) => sum + parseFloat(item.price), 0);
    
    // Convert total price to words
    const amountInWords = numberToWords(totalPrice) + ' rupees';

    // Store data in localStorage
    localStorage.setItem('customerName', customerName);
    localStorage.setItem('contactNumber', contactNumber);
    localStorage.setItem('email', email);
    localStorage.setItem('plans', JSON.stringify(plans));
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));
    localStorage.setItem('amountInWords', amountInWords);

    // Redirect to the receipt template page
    window.location.href = 'index.html';
});

// Function to convert numbers to words (improved version)
function numberToWords(num) {
    const belowTwenty = [
        'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
        'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
    ];
    const tens = [
        '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
    ];
    const thousands = [
        '', 'Thousand', 'Million', 'Billion', 'Trillion'
    ];

    if (num === 0) return 'Zero';

    let words = '';

    for (let i = 0; num > 0; i++) {
        if (num % 1000 !== 0) {
            words = helper(num % 1000) + thousands[i] + ' ' + words;
        }
        num = Math.floor(num / 1000);
    }

    return words.trim();

    function helper(num) {
        if (num === 0) return '';
        else if (num < 20) return belowTwenty[num] + ' ';
        else if (num < 100) return tens[Math.floor(num / 10)] + ' ' + helper(num % 10);
        else return belowTwenty[Math.floor(num / 100)] + ' Hundred ' + helper(num % 100);
    }
}
