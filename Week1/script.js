document.getElementById('calculateBtn').addEventListener('click', function() {
    const number = parseInt(document.getElementById('number').value);
    
    if (isNaN(number) || number < 0) {
        alert('Please enter a valid positive integer.');
        return;
    }

    const iterativeResult = calculateFactorialIterative(number);
    const recursiveResult = calculateFactorialRecursive(number);

    document.getElementById('iterativeResult').innerHTML = `Iterative Result: ${iterativeResult}`;
    document.getElementById('recursiveResult').innerHTML = `Recursive Result: ${recursiveResult}`;
});

// Iterative method
function calculateFactorialIterative(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Recursive method
function calculateFactorialRecursive(n) {
    if (n === 0) return 1;
    return n * calculateFactorialRecursive(n - 1);
}

// FAQ Toggle functionality
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((faq) => {
    faq.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});
