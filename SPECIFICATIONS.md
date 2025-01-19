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

