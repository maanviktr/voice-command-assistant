# 🛒 Voice Command Shopping Assistant

A **voice-enabled shopping list manager** that uses the Web Speech API to recognize natural language commands.  
Users can add, remove, and search items from their shopping list by speaking, and the app provides smart suggestions with substitutes and seasonal items.  
Deployed with **Netlify** for easy access.

🔗 **Live Demo:** [Click here to try it](https://boisterous-alfajores-89343e.netlify.app/)

---

## ✨ Features

### 🎤 Voice Input
- Add items: `"Add 2 apples"`, `"Buy milk"`, `"I need eggs"`.
- Remove items: `"Remove bread"`, `"Delete rice"`.
- Search items: `"Find sugar"`, `"Search bananas"`.
- Supports **word-based quantities** (`"five bananas"` → `5 × bananas`).

### 💡 Smart Suggestions
- Contextual recommendations (e.g., suggest almond milk if you add milk).
- Seasonal suggestions (bananas, spinach, etc.).
- Substitutes for healthier alternatives.

### 📋 Shopping List Management
- Add, remove, and update items with voice.
- Automatically tracks quantities.
- Items displayed in a clean glassy container.

### 🔍 Product Search
- Check if items are already in the list.
- Results displayed in **separate suggestion cards**.

### ⚙️ Utility Tools
- **Test Mic** → Quickly checks microphone input.  
- **Debug Info** → Displays browser details and app status.  
- **Help Section** → Troubleshooting guide for voice access.

---

## 🖼️ UI Highlights
- Dark gradient background with frosted-glass effect.  
- Big glowing mic button (pulses when active).  
- Modern responsive layout with **cards** for suggestions & results.  
- Clean typography with Poppins font.  

---

## 🛠️ Tech Stack
- **HTML5** → Structure  
- **CSS3** → Styling (modern UI, glassmorphism)  
- **JavaScript (Vanilla)** → Logic & DOM handling  
- **Web Speech API** → Voice recognition  
- **Netlify** → Deployment  

---

## 🚀 Setup & Running Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/maanviktr/voice-command-assistant.git
   cd voice-command-assistant
