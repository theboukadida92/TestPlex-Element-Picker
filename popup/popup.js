/**
 * TestPlex Element Picker - Popup Script
 * Handles popup UI interactions and settings management
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Get UI elements
  const startButton = document.getElementById('startButton');
  const elementInfo = document.getElementById('elementInfo');
  const successMessage = document.getElementById('successMessage');
  const settingsButton = document.getElementById('settingsButton');
  const settingsPanel = document.getElementById('settingsPanel');
  const closeSettings = document.getElementById('closeSettings');
  
  // Get settings elements
  const themeSetting = document.getElementById('themeSetting');
  const autoSortSetting = document.getElementById('autoSortSetting');
  
  // Get all selector elements
  const selectors = {
    id: document.getElementById('idSelector'),
    idSelenium: document.getElementById('idSelectorSelenium'),
    name: document.getElementById('nameSelector'),
    nameSelenium: document.getElementById('nameSelectorSelenium'),
    class: document.getElementById('classSelector'),
    classSelenium: document.getElementById('classSelectorSelenium'),
    tag: document.getElementById('tagSelector'),
    tagSelenium: document.getElementById('tagSelectorSelenium'),
    attribute: document.getElementById('attributeSelector'),
    attributeSelenium: document.getElementById('attributeSelectorSelenium'),
    position: document.getElementById('positionSelector'),
    positionSelenium: document.getElementById('positionSelectorSelenium'),
    textXPath: document.getElementById('textXPathSelector'),
    textXPathSelenium: document.getElementById('textXPathSelectorSelenium'),
    fullXPath: document.getElementById('fullXPathSelector'),
    fullXPathSelenium: document.getElementById('fullXPathSelectorSelenium'),
    css: document.getElementById('cssSelector'),
    cssSelenium: document.getElementById('cssSelectorSelenium'),
    text: document.getElementById('textSelector'),
    textSelenium: document.getElementById('textSelectorSelenium'),
    partialText: document.getElementById('partialTextSelector'),
    partialTextSelenium: document.getElementById('partialTextSelectorSelenium')
  };
  
  let isPickerActive = false;
  
  // Initialize settings
  async function initializeSettings() {
    const settings = await chrome.storage.local.get([
      'theme',
      'autoSort'
    ]);
    
    // Set theme
    if (settings.theme === 'light') {
      themeSetting.checked = true;
      document.documentElement.setAttribute('data-theme', 'light');
    }

    // Set auto-sort
    if (settings.autoSort) {
      autoSortSetting.checked = true;
    }
  }
  
  // Handle settings changes
  function handleSettingChange(setting, value) {
    chrome.storage.local.set({ [setting]: value }, () => {
      showSuccessMessage(`${setting} ${value ? 'enabled' : 'disabled'}`);
    });
  }
  
  // Settings panel handlers
  settingsButton.addEventListener('click', () => {
    settingsPanel.style.display = 'block';
  });
  
  closeSettings.addEventListener('click', () => {
    settingsPanel.style.display = 'none';
  });
  
  // Handle theme change
  themeSetting.addEventListener('change', (e) => {
    const theme = e.target.checked ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    handleSettingChange('theme', theme);
  });
  
  // Handle auto-sort change
  autoSortSetting.addEventListener('change', (e) => {
    handleSettingChange('autoSort', e.target.checked);
    if (e.target.checked) {
      sortSelectorsByValue();
    }
  });
  
  // Copy to clipboard function
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      showSuccessMessage('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      showSuccessMessage('Failed to copy to clipboard', true);
    }
  }
  
  // Show success/error message
  function showSuccessMessage(text, isError = false) {
    successMessage.textContent = text;
    successMessage.style.background = isError ? '#dc2626' : '#059669';
    successMessage.style.display = 'block';
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 2000);
  }
  
  // Add click handlers for copy buttons
  document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', () => {
      const selectorType = button.dataset.selector;
      const valueType = button.dataset.type;
      const elementId = valueType === 'selenium' ? 
        selectorType + 'SelectorSelenium' : 
        selectorType + 'Selector';
      const textToCopy = document.getElementById(elementId).textContent;
      
      if (textToCopy !== '-') {
        copyToClipboard(textToCopy);
      }
    });
  });
  
  // Get current active tab
  async function getCurrentTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab;
  }
  
  // Start/stop picker button click handler
  startButton.addEventListener('click', async () => {
    console.log('Picker button clicked');
    try {
        const tab = await getCurrentTab();
        if (!tab) {
            showSuccessMessage('No active tab found', true);
            return;
        }
        
        isPickerActive = !isPickerActive;
        startButton.textContent = isPickerActive ? 'Stop Picking' : 'Pick Element';
        startButton.classList.toggle('active', isPickerActive);
        
        // Send message to content script
        await chrome.tabs.sendMessage(tab.id, { 
            action: "togglePicker",
            shouldActivate: isPickerActive
        });
        
        // Set up listeners for updates
        if (isPickerActive) {
            // Listen for storage changes
            chrome.storage.onChanged.addListener(function(changes, namespace) {
                if (namespace === 'local' && changes.selectedElement) {
                    const element = changes.selectedElement.newValue;
                    updateElementInfo(element);
                }
            });
            
            // Listen for direct messages
            chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
                if (request.action === "elementUpdated") {
                    updateElementInfo(request.element);
                    sendResponse({ success: true });
                }
                return true;
            });
        }
    } catch (error) {
        console.error('Error toggling picker:', error);
        showSuccessMessage('Please refresh the page and try again', true);
    }
  });
  
  function getSeleniumSyntax(type, value) {
    if (!value || value === '-') return '-';
    
    switch(type) {
      case 'id':
        return `driver.findElement(By.id("${value.replace('#', '')}"));`;
      case 'name':
        return `driver.findElement(By.name("${value}"));`;
      case 'class':
        return `driver.findElement(By.className("${value.replace('.', '')}"));`;
      case 'tag':
        return `driver.findElement(By.tagName("${value}"));`;
      case 'attribute':
        return `driver.findElement(By.cssSelector("${value}"));`;
      case 'position':
        return `driver.findElement(By.cssSelector("${value}"));`;
      case 'textXPath':
        return `driver.findElement(By.xpath("${value}"));`;
      case 'fullXPath':
        return `driver.findElement(By.xpath("${value}"));`;
      case 'css':
        return `driver.findElement(By.cssSelector("${value}"));`;
      case 'text':
        return `driver.findElement(By.xpath("//*[text()='${value}']"));`;
      case 'partialText':
        return `driver.findElement(By.xpath("//*[contains(text(),'${value}')]"));`;
      default:
        return '-';
    }
  }

  function sortSelectorsByValue() {
    const infoBox = document.getElementById('elementInfo');
    const selectorGroups = Array.from(infoBox.querySelectorAll('.selector-group'));
    
    // Sort selector groups based on whether they have values
    selectorGroups.sort((a, b) => {
      const aValue = a.querySelector('.selector-value').textContent;
      const bValue = b.querySelector('.selector-value').textContent;
      
      if (aValue === '-' && bValue !== '-') return 1;
      if (aValue !== '-' && bValue === '-') return -1;
      return 0;
    });
    
    // Reapply sorted groups
    selectorGroups.forEach(group => infoBox.appendChild(group));
  }

  function updateElementInfo(element) {
    if (!element || !element.selectors) {
      console.log('No element or selectors found');
      return;
    }
    
    elementInfo.style.display = 'block';
    
    // Update all selectors
    Object.entries(element.selectors).forEach(([key, value]) => {
      if (selectors[key]) {
        selectors[key].textContent = value || '-';
        // Update corresponding Selenium syntax
        const seleniumKey = key + 'Selenium';
        if (selectors[seleniumKey]) {
          selectors[seleniumKey].textContent = getSeleniumSyntax(key, value);
        }
      }
    });
    
    // Auto-sort if enabled
    if (autoSortSetting.checked) {
      sortSelectorsByValue();
    }
    
    // Show success message
    showSuccessMessage('Element selected!');
  }
  
  // Check for stored element
  chrome.storage.local.get(['selectedElement'], (result) => {
    if (result.selectedElement) {
      updateElementInfo(result.selectedElement);
    }
  });
  
  // Initialize picker state
  async function initializePickerState() {
    const tab = await getCurrentTab();
    if (tab) {
      try {
        const response = await chrome.tabs.sendMessage(tab.id, { action: "getPickerState" });
        if (response && response.isActive) {
          isPickerActive = true;
          startButton.textContent = 'Stop Picking';
          startButton.classList.add('active');
        }
      } catch (error) {
        // Content script not ready yet, ignore error
      }
    }
  }
  
  // Selector reordering functionality
  const selectorList = document.getElementById('selectorList');
  const selectorItems = document.querySelectorAll('.selector-item');
  let draggedItem = null;

  selectorItems.forEach(item => {
    // Make items draggable
    item.setAttribute('draggable', true);
    
    item.addEventListener('dragstart', function(e) {
      draggedItem = this;
      setTimeout(() => this.classList.add('dragging'), 0);
    });
    
    item.addEventListener('dragend', function(e) {
      this.classList.remove('dragging');
      draggedItem = null;
      
      // Save the new order
      const newOrder = Array.from(selectorList.children).map(item => item.dataset.selector);
      chrome.storage.local.set({ selectorOrder: newOrder }, () => {
        // Update the main view order
        const infoBox = document.getElementById('elementInfo');
        newOrder.forEach(selector => {
          const group = infoBox.querySelector(`.selector-group:has([id="${selector}Selector"])`);
          if (group) infoBox.appendChild(group);
        });
      });
    });
    
    item.addEventListener('dragover', function(e) {
      e.preventDefault();
      if (!draggedItem || draggedItem === this) return;
      
      const bounding = this.getBoundingClientRect();
      const offset = e.clientY - bounding.top - bounding.height / 2;
      
      if (offset < 0) {
        this.parentNode.insertBefore(draggedItem, this);
      } else {
        this.parentNode.insertBefore(draggedItem, this.nextSibling);
      }
    });
  });

  // Load saved order
  chrome.storage.local.get('selectorOrder', ({ selectorOrder }) => {
    if (selectorOrder) {
      // Reorder settings list
      const fragment = document.createDocumentFragment();
      selectorOrder.forEach(selector => {
        const item = selectorList.querySelector(`[data-selector="${selector}"]`);
        if (item) fragment.appendChild(item);
      });
      selectorList.appendChild(fragment);
      
      // Reorder main view
      const infoBox = document.getElementById('elementInfo');
      selectorOrder.forEach(selector => {
        const group = infoBox.querySelector(`.selector-group:has([id="${selector}Selector"])`);
        if (group) infoBox.appendChild(group);
      });
    }
  });
  
  // Initialize selector visibility settings
  const selectorVisibilitySettings = {
    id: document.getElementById('showIdSelector'),
    name: document.getElementById('showNameSelector'),
    class: document.getElementById('showClassSelector'),
    tag: document.getElementById('showTagSelector'),
    attribute: document.getElementById('showAttributeSelector'),
    position: document.getElementById('showPositionSelector'),
    textXPath: document.getElementById('showTextXPathSelector'),
    fullXPath: document.getElementById('showFullXPathSelector'),
    css: document.getElementById('showCssSelector'),
    text: document.getElementById('showTextSelector'),
    partialText: document.getElementById('showPartialTextSelector')
  };

  // Load visibility settings
  async function loadVisibilitySettings() {
    const settings = await chrome.storage.local.get('selectorVisibility');
    if (settings.selectorVisibility) {
      Object.entries(settings.selectorVisibility).forEach(([selector, isVisible]) => {
        if (selectorVisibilitySettings[selector]) {
          selectorVisibilitySettings[selector].checked = isVisible;
          updateSelectorVisibility(selector, isVisible);
        }
      });
    }
  }

  // Update selector visibility in the main view
  function updateSelectorVisibility(selector, isVisible) {
    const selectorGroup = document.querySelector(`.selector-group:has([id="${selector}Selector"])`);
    if (selectorGroup) {
      selectorGroup.style.display = isVisible ? 'block' : 'none';
    }
  }

  // Add event listeners for visibility toggles
  Object.entries(selectorVisibilitySettings).forEach(([selector, checkbox]) => {
    checkbox.addEventListener('change', (e) => {
      const isVisible = e.target.checked;
      updateSelectorVisibility(selector, isVisible);
      
      // Save visibility settings
      chrome.storage.local.get('selectorVisibility', (data) => {
        const visibility = data.selectorVisibility || {};
        visibility[selector] = isVisible;
        chrome.storage.local.set({ selectorVisibility: visibility });
      });
    });
  });

  // Load visibility settings on startup
  loadVisibilitySettings();
  
  // Initialize
  initializeSettings();
  initializePickerState();
}); 