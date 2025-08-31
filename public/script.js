// ===============================
// Voice Command Shopping Assistant
// ===============================
// This script handles voice input, shopping list management,
// smart suggestions, and debugging utilities for the project.

// ===============================
// DOM ELEMENTS
// ===============================
const micBtn = document.getElementById("micBtn"); // Main "Click to Speak" button
const shoppingList = document.getElementById("shopping-list"); // Shopping list container
const smartSuggestionsPanel = document.getElementById("smart-suggestions"); // Smart suggestions container
const findResultsPanel = document.getElementById("find-results"); // Product search results container

// Utility buttons
const testMicBtn = document.querySelector(".btn.secondary:nth-of-type(1)"); // Test Mic button
const debugInfoBtn = document.querySelector(".btn.secondary:nth-of-type(2)"); // Debug Info button

// ===============================
// DATA STORAGE
// ===============================
let items = []; // Stores shopping list items (name + quantity)

// Smart suggestions data (based on context/history/seasonal)
const smartSuggestions = {
  bread: "It looks like you're running low on bread 🥖",
  milk: "You usually buy milk. Do you need some today? 🥛",
  apples: "Fresh apples are in season 🍎",
  rice: "Basmati rice is on sale at ₹90/kg 🍚"
};

// Substitute products for healthier or alternative options
const substitutes = {
  milk: "How about trying almond milk instead? 🌱",
  sugar: "Consider jaggery as a healthier alternative 🍯"
};

// Word-to-number mapping (e.g., "five bananas" → 5 bananas)
const numberWords = {
  one: 1, two: 2, three: 3, four: 4, five: 5,
  six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12
};

// ===============================
// SPEECH RECOGNITION SETUP
// ===============================
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
  alert("Sorry, your browser does not support Speech Recognition. Try Chrome or Edge!");
}

const recognition = new SpeechRecognition();
recognition.continuous = false;   // Stop after one phrase
recognition.lang = "en-US";       // Default language
recognition.interimResults = false; // Only final results, not partial

// ===============================
// MIC BUTTON BEHAVIOR
// ===============================
// Start listening when button is clicked
micBtn.addEventListener("click", () => {
  console.log("🎤 Mic button clicked");
  micBtn.classList.add("active"); // Add glowing effect
  recognition.start();
});

// Recognition lifecycle events
recognition.addEventListener("start", () => {
  console.log("🎤 Listening...");
});
recognition.addEventListener("end", () => {
  console.log("🛑 Stopped listening");
  micBtn.classList.remove("active"); // Remove glow when finished
});
recognition.addEventListener("error", (e) => {
  console.error("Recognition error:", e.error);
});

// ===============================
// HANDLE VOICE RESULT
// ===============================
recognition.addEventListener("result", (event) => {
  const transcript = event.results[0][0].transcript.toLowerCase(); // Convert to lowercase
  console.log("Heard:", transcript);
  handleCommand(transcript); // Pass to command handler
});

// ===============================
// COMMAND HANDLER
// Determines whether the voice input is an "add", "remove" or "find" command
// ===============================
function handleCommand(command) {
  if (command.includes("add") || command.includes("buy") || command.includes("need")) {
    addItem(command);
  } else if (command.includes("remove") || command.includes("delete")) {
    removeItem(command);
  } else if (command.includes("find") || command.includes("search")) {
    searchItem(command);
  } else {
    showFindResults([`🤔 Didn't understand: "${command}"`]);
  }
}

// ===============================
// ADD ITEM TO SHOPPING LIST
// Supports both digit quantities ("2 bananas") and word quantities ("five bananas")
// ===============================
function addItem(command) {
  let quantity = 1;

  // Detect digit quantity
  const quantityMatch = command.match(/\d+/);
  if (quantityMatch) {
    quantity = parseInt(quantityMatch[0]);
  }

  // Detect word quantity
  for (let word in numberWords) {
    if (command.includes(word)) {
      quantity = numberWords[word];
      break;
    }
  }

  // Extract item name (remove keywords and numbers)
  let itemName = command
    .replace(/add|buy|need/gi, "")
    .replace(/\d+/g, "")
    .trim();

  if (!itemName) return;

  // Update existing item quantity or add new item
  const existingItem = items.find((item) => item.name === itemName);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    items.push({ name: itemName, quantity });
  }

  renderList();                 // Update shopping list UI
  updateSmartSuggestions(itemName); // Show suggestions
}

// ===============================
// REMOVE ITEM FROM SHOPPING LIST
// ===============================
function removeItem(command) {
  let itemName = command.replace(/remove|delete/gi, "").trim();
  if (!itemName) return;

  items = items.filter((item) => !item.name.includes(itemName)); // Remove matching items
  renderList();
  showFindResults([`🗑️ Removed ${itemName}`]);
}

// ===============================
// SEARCH ITEM IN LIST
// ===============================
function searchItem(command) {
  let searchTerm = command.replace(/find|search/gi, "").trim();
  if (!searchTerm) return;

  const results = [];
  const found = items.find((item) => item.name.includes(searchTerm));

  if (found) {
    results.push(`🔍 You already have ${found.quantity} × ${found.name} in your list.`);
  } else {
    results.push(`🔍 "${searchTerm}" not in your list. Would you like to add it?`);
  }

  showFindResults(results);
}

// ===============================
// SMART SUGGESTIONS
// Shows contextual + substitute + seasonal recommendations
// ===============================
function updateSmartSuggestions(itemName) {
  smartSuggestionsPanel.innerHTML = "";

  let suggestions = [];

  // Item-specific suggestions
  if (smartSuggestions[itemName]) {
    suggestions.push(`💡 ${smartSuggestions[itemName]}`);
  }
  if (substitutes[itemName]) {
    suggestions.push(`🔄 ${substitutes[itemName]}`);
  }

  // General seasonal tips
  suggestions.push("🍌 Bananas are fresh this week");
  suggestions.push("🥬 Spinach is healthy and on sale");

  renderCards(suggestions, smartSuggestionsPanel);
}

// ===============================
// DISPLAY FIND RESULTS
// ===============================
function showFindResults(results) {
  findResultsPanel.innerHTML = "";
  renderCards(results, findResultsPanel);
}

// ===============================
// RENDER CARDS (UTILITY FUNCTION)
// Renders an array of strings into styled cards inside a container
// ===============================
function renderCards(items, container) {
  items.forEach((text) => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = text;
    container.appendChild(card);
  });
}

// ===============================
// RENDER SHOPPING LIST
// ===============================
function renderList() {
  shoppingList.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.quantity} × ${item.name}`;
    shoppingList.appendChild(li);
  });
}

// ===============================
// TEST MIC BUTTON
// Used for checking if microphone is working properly
// ===============================
if (testMicBtn) {
  testMicBtn.addEventListener("click", () => {
    console.log("🎤 Test Mic started...");
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("🎤 Test Mic heard:", transcript);
      alert(`Mic Test: I heard → "${transcript}"`);
    };
  });
}

// ===============================
// DEBUG INFO BUTTON
// Logs browser and speech recognition support details
// ===============================
if (debugInfoBtn) {
  debugInfoBtn.addEventListener("click", () => {
    const debugData = {
      browser: navigator.userAgent,
      speechRecognition: !!SpeechRecognition,
      micPermission: "Check browser popup",
      itemsInList: items.length
    };
    console.table(debugData);
    alert("✅ Debug info logged in console (F12 → Console)");
  });
}
