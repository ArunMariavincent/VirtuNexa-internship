const auctionItems = [
    {
        id: 1,
        name: "Vintage Watch",
        description: "A classic vintage watch in excellent condition. Comes with original packaging.",
        currentBid: 100,
        timeRemaining: 30, 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRbF8ARrFyFYSdCIyFRkRAi5AojPWtzyor3g&s",
    },
    {
        id: 2,
        name: "Antique Vase",
        description: "A rare antique vase from the 18th century. Great addition to any collection.",
        currentBid: 200,
        timeRemaining: 60,
        image: "https://t4.ftcdn.net/jpg/09/89/62/35/360_F_989623565_nNH9BuQwFPc82EiEx8PJ33ZDVtzzl33W.jpg",
    },
    {
        id: 3,
        name: "Classic Guitar",
        description: "A beautifully crafted classic guitar, perfect for collectors and musicians alike.",
        currentBid: 500,
        timeRemaining: 45,
        image: "https://static.vecteezy.com/system/resources/previews/032/934/378/non_2x/antique-acoustic-guitar-on-wooden-table-playing-classical-free-photo.jpg",
    }
];
function startCountdown(itemId) {
    const item = auctionItems.find(i => i.id === itemId);
    const countdownElement = document.getElementById(`countdown-${itemId}`);
    
    const interval = setInterval(() => {
        if (item.timeRemaining > 0) {
            item.timeRemaining--;
            countdownElement.innerText = `Time Remaining: ${item.timeRemaining}s`;
        } else {
            clearInterval(interval);
            countdownElement.innerText = 'Auction Ended';
            document.getElementById(`bid-button-${itemId}`).disabled = true; // Disable the bid button after auction ends
        }
    }, 1000);
}
function placeBid(itemId) {
    const bidAmount = parseInt(prompt("Enter your bid:"));
    const item = auctionItems.find(i => i.id === itemId);
    const alertElement = document.getElementById('alert-message');

    if (isNaN(bidAmount) || bidAmount <= 0) {
        alertElement.classList.remove('hidden');
        alertElement.classList.add('alert-error');
        alertElement.innerText = "Please enter a valid bid!";
    } else if (bidAmount <= item.currentBid) {
        alertElement.classList.remove('hidden');
        alertElement.classList.add('alert-error');
        alertElement.innerText = "Bid must be higher than the current bid!";
    } else {
        item.currentBid = bidAmount;
        document.getElementById(`bid-${itemId}`).innerText = `Current Bid: $${item.currentBid}`;
        
        alertElement.classList.remove('hidden');
        alertElement.classList.add('alert-success');
        alertElement.innerText = `Bid of $${item.currentBid} placed successfully!`;
    }
    setTimeout(() => {
        alertElement.classList.add('hidden');
    }, 3000);
}
function displayAuctionItems() {
    const auctionItemsContainer = document.getElementById('auctionItems');
    auctionItems.forEach(item => {
        const auctionItemElement = document.createElement('div');
        auctionItemElement.classList.add('auction-item', 'shadow-lg', 'transition', 'duration-300');
        auctionItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3 class="text-xl text-gray-900">${item.name}</h3>
            <p class="text-gray-600">${item.description}</p>
            <p id="bid-${item.id}" class="text-lg font-semibold text-blue-600">Current Bid: $${item.currentBid}</p>
            <p id="countdown-${item.id}" class="countdown">Time Remaining: ${item.timeRemaining}s</p>
            <button id="bid-button-${item.id}" class="bid-button mt-4" onclick="placeBid(${item.id})">Place Bid</button>
        `;
        auctionItemsContainer.appendChild(auctionItemElement);
        startCountdown(item.id);
    });
}
displayAuctionItems();
