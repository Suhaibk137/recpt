document.addEventListener('DOMContentLoaded', function() {
    // Retrieve data from localStorage
    const customerName = localStorage.getItem('customerName');
    const contactNumber = localStorage.getItem('contactNumber');
    const email = localStorage.getItem('email');
    const plans = JSON.parse(localStorage.getItem('plans'));
    const totalPrice = localStorage.getItem('totalPrice');
    const amountInWords = localStorage.getItem('amountInWords');

    // Update template with stored values
    document.getElementById('customerNameOutput').innerText = customerName;
    document.getElementById('contactNumberOutput').innerText = contactNumber;
    document.getElementById('emailOutput').innerText = email;

    const planDetailsOutput = plans.map(plan => `${plan.plan} - ₹${plan.price}`).join('<br>');
    document.getElementById('planDetailsOutput').innerHTML = planDetailsOutput;

    document.getElementById('totalPriceOutput').innerText = totalPrice;
    document.getElementById('amountWordsOutput').innerText = amountInWords;

    // Download PDF functionality
    document.getElementById('downloadPdf').addEventListener('click', function() {
        const element = document.body;
        const opt = {
            margin:       0.5,
            filename:     `${customerName}_payment_receipt.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(element).set(opt).save();
    });
});
