# TestPlex Element Picker Specifications

## Overview
TestPlex Element Picker is a Chrome extension that helps users identify and generate various types of selectors for web elements. It provides a user-friendly interface for picking elements and copying their selectors for testing purposes.

## Core Features

### 1. Element Picker Tool
- Activates with a "Pick Element" button
- Shows a crosshair cursor when active
- Highlights elements on hover
- Shows element tag name in a tooltip while hovering
- Clicking an element captures its information

### 2. Selector Types
The extension must generate and display 11 types of selectors:
1. ID Selector (e.g., `#elementId`)
2. Name Selector (e.g., `[name="elementName"]`)
3. Class Selector (e.g., `.class-name`)
4. Tag Selector (e.g., `div`)
5. Attribute Selector (prioritizing test-specific attributes)
6. Position Selector (e.g., `div:nth-of-type(2)`)
7. Text Content XPath (e.g., `//*[contains(text(),'Example')]`)
8. Full XPath (e.g., `/html/body/div[1]/div[2]`)
9. CSS Selector (e.g., `div.class-name[data-testid="elementId"]`)
10. Text Selector (e.g., `div:contains("Example")`)
11. Partial Text Selector (e.g., `div:contains("Exam")`)

### 3. UI Components

#### Popup Interface
- Clean, modern dark theme
- Fixed width: 400px
- Max height: 600px with scrolling
- Sticky header with controls
- Sticky selector sections that can be collapsed

#### Header Section
- Title: "TestPlex Element Picker"
- Three control buttons:
  1. Pick Element (Primary action)
  2. Auto-show button
  3. Fixed position button
- Settings gear icon

#### Selector Display
- Each selector in its own group
- Clear label for each selector type
- Monospace font for selector values
- Copy button for each selector
- Success message on copy
- Each selector field updates when element is selected

### 4. Element Highlighting
- Visible highlight border around hovered elements
- Non-intrusive highlight style
- Clear visual feedback
- Tooltip showing element tag name

### 5. Settings
- Include a gear icon in the header section to open the settings popup
- Settings options:
  - Auto-show: Automatically shows popup when element is selected
  - Fixed position: Keeps popup in sticky position
  - Show only selected element: Only shows the selected element
- Each setting has:
  - Checkbox
  - Label
  - Tooltip explaining the setting and default value
- Settings persistence:
  - Persist between page navigations
  - Persist between popup open/close
  - Persist between browser sessions
  - Persist when clicking picker icon

### 6. Technical Requirements

#### Selector Generation
- Accurate selector generation for all types
- Proper escaping of special characters
- Handle nested elements correctly
- Support for iframes
- Handle dynamic content

#### Priority for Attribute Selectors
1. data-testid
2. data-test
3. data-cy
4. data-qa
5. aria-label
6. title
7. name
8. placeholder
9. value

#### Performance
- Minimal impact on page performance
- Efficient DOM traversal
- Clean up event listeners when deactivated
- Handle large DOM trees efficiently
- Clean and maintainable code architecture
- Well-documented and organized code
- Easy to extend with new selector types
- Proper error handling and debugging
- Security best practices
- Comprehensive testing

### 7. User Experience
- Intuitive element selection
- Clear visual feedback
- Easy to copy selectors
- Persistent settings
- Smooth transitions
- Responsive UI

### 8. Error Handling
- Graceful handling of missing attributes
- Clear feedback when selectors cannot be generated
- Handle iframe access restrictions
- Recovery from extension crashes

## File Structure
```
backend/TestPlex Element Picker/
├── manifest.json
├── popup/
│   ├── popup.html
│   ├── popup.js
│   └── popup.css
├── content/
│   ├── content.js
│   └── content.css
├── background/
│   └── background.js
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## Browser Support
- Chrome (Latest version)
- Chromium-based browsers (Edge, Brave, etc.)

## Development Guidelines
1. Use modern JavaScript (ES6+)
2. Follow Chrome Extension best practices
3. Implement proper error handling
4. Use semantic HTML
5. Write maintainable CSS
6. Follow accessibility guidelines
7. Implement proper cleanup
8. Use clear naming conventions 