const symbols = ["🍒", "🍋", "🍊", "🍉", "7️⃣"]
let credits = localStorage.getItem("credits") ? parseInt(localStorage.getItem("credits")) : 1000;

document.getElementById("credits").textContent = credits;

let autospinEnabled = false;
let autospinInterval;

document.getElementById("autospin").addEventListener("click", function(){
	if (autospinEnabled){
		clearInterval(autospinInterval);
		document.getElementById("autospin").textContent = "Spustit Autospin";
		autospinEnabled = false;
	}
	else{
		autospinInterval = setInterval(function(){
			spinReel();
		}, 1000);
		document.getElementById("autospin").textContent = "Zastavit Autospin";
		autospinEnabled = true;
	}
});

function spinReel(){
	let bet = parseInt(document.getElementById("bet").value);
	
	if (credits < bet){
		document.getElementById("message").textContent = "Nemáš dostatek kreditů!";
		clearInterval(autospinInterval);
		document.getElementById("autospin").textContent = "Spustit Autospin";
		autospinEnabled = false;
		return;
	}
	
	credits -= bet;
	
	const slots = document.querySelectorAll(".slot");
	slots.forEach(slot =>{
		slot.style.animation = "spin 0.3s ease-in-out infinity";
	});
	
	setTimeout(() => {
		let slot1 = symbols[Math.floor(Math.random() * symbols.length)];
		let slot2 = symbols[Math.floor(Math.random() * symbols.length)];
		let slot3 = symbols[Math.floor(Math.random() * symbols.length)];	
		
		slots.forEach(slot => {
			slot.style.animation = "none";
		});

	
		document.getElementById("slot1").textContent = slot1;
		document.getElementById("slot2").textContent = slot2;
		document.getElementById("slot3").textContent = slot3;
	
		let message = "Nic jsi nevyhrál..."
		if (slot1 === slot2 && slot2 === slot3){
			let winMultiplier = slot1 === "7️⃣" ? 10 : 5;
			let winAmount = bet * winMultiplier;
			credits += winAmount;
			message = `Vyhrál jsi ${winAmount} kreditů!`;
		}
	
		localStorage.setItem("credits", credits);
		document.getElementById("credits").textContent = credits;
		document.getElementById("message").textContent = message;
	}, 500);
}


document.getElementById("reset").addEventListener("click", function(){
	credits = 1000;
	localStorage.setItem("credits", credits);
	document.getElementById("credits").textContent = credits;
	document.getElementById("message").textContent = "Kredit obnoven na 1000!"
});

document.getElementById("spin").addEventListener("click", function(){
	if (autospinEnabled){
		return;
	}
		let bet = parseInt(document.getElementById("bet").value);
	
	if (credits < bet){
		document.getElementById("message").textContent = "Nemáš dostatek kreditů!";
		clearInterval(autospinInterval);
		document.getElementById("autospin").textContent = "Spustit Autospin";
		autospinEnabled = false;
		return;
	}
	
	credits -= bet;
	
	const slots = document.querySelectorAll(".slot");
	slots.forEach(slot =>{
		slot.style.animation = "spin 0.3s ease-in-out infinity";
	});
	
	setTimeout(() => {
		let slot1 = symbols[Math.floor(Math.random() * symbols.length)];
		let slot2 = symbols[Math.floor(Math.random() * symbols.length)];
		let slot3 = symbols[Math.floor(Math.random() * symbols.length)];	
		
		slots.forEach(slot => {
			slot.style.animation = "none";
		});

	
		document.getElementById("slot1").textContent = slot1;
		document.getElementById("slot2").textContent = slot2;
		document.getElementById("slot3").textContent = slot3;
	
		let message = "Nic jsi nevyhrál..."
		if (slot1 === slot2 && slot2 === slot3){
			let winMultiplier = slot1 === "7️⃣" ? 10 : 5;
			let winAmount = bet * winMultiplier;
			credits += winAmount;
			message = `Vyhrál jsi ${winAmount} kreditů!`;
		}
	
		localStorage.setItem("credits", credits);
		document.getElementById("credits").textContent = credits;
		document.getElementById("message").textContent = message;
	}, 500);
});

document.getElementById("info-btn").addEventListener("click", function(){
	document.getElementById("info-popup").style.display = "block";
});

document.getElementById("close-info").addEventListener("click", function(){
	document.getElementById("info-popup").style.display = "none";
});