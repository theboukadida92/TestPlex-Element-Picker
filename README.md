# TestPlex Element Picker

🎯 A powerful Chrome extension for test automation engineers and QA professionals that generates ready-to-use Selenium selectors with a single click.

⚠️ **IMPORTANT NOTICE**: While this repository is public for demonstration purposes, the code is proprietary and protected. See [License](#⚖️-license) section for details.

## 🌟 Overview

TestPlex Element Picker is a specialized tool designed to streamline the process of creating robust Selenium test scripts. With its intuitive element picker and instant Selenium Java syntax generation, it significantly reduces the time spent on writing element locators for web automation tests.

### 🚀 Key Features

- **Smart Element Picker**: Hover and click to analyze any element on the page
- **Dual Display Format**: 
  - Raw selector value
  - Ready-to-use Selenium Java syntax
- **Multiple Selector Strategies**:
  - ID
  - Name
  - Class
  - Tag
  - Attribute
  - Position
  - Text XPath
  - Full XPath
  - CSS
  - Text
  - Partial Text
- **One-Click Copy**: Individual copy buttons for both raw selectors and Selenium syntax
- **Customizable UI**:
  - Dark/Light theme
  - Reorderable selectors
  - Show/Hide specific selector types
  - Fixed/Floating position
  - Auto-show options

## 🔧 Installation

/*
1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory
*/
## 📖 Usage

1. Click the extension icon in your Chrome toolbar
2. Click "Pick Element" to activate the element picker
3. Hover over elements on the page to analyze them
4. Click an element to lock the selection
5. Use the copy buttons to copy either:
   - The raw selector
   - The ready-to-use Selenium Java syntax

## 🛠️ Development

The extension is built with vanilla JavaScript and Chrome Extension APIs for optimal performance and minimal dependencies.

### Project Structure

```
├── manifest.json          # Extension manifest
├── popup/                 # Popup UI
│   ├── popup.html        # Popup HTML
│   ├── popup.css         # Popup styles
│   └── popup.js          # Popup logic
├── content/              # Content scripts
├── background/           # Background scripts
└── icons/               # Extension icons
```

## ⚖️ License

This project is protected under a Proprietary License - see the [LICENSE](LICENSE) file for details.

### Key Points:
- ⚠️ **Private Code**: While the repository is public, the code is private and protected
- ✅ You MAY:
  - View the code for educational purposes
  - Reference the project in your portfolio
- ❌ You MAY NOT:
  - Copy or download the code
  - Create derivative works
  - Use the code without permission
  - Distribute any part of the code

For permissions or inquiries, please contact the repository owner.

## 🤝 Support

This is a proprietary tool. While we appreciate feedback and bug reports through the issues section, we do not accept public contributions. For collaboration inquiries, please contact the repository owner directly. 
