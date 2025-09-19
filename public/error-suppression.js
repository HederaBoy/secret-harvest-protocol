// Error suppression script for browser extensions
(function() {
  'use strict';
  
  // Store original handlers
  const originalError = console.error;
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalInfo = console.info;
  const originalTrace = console.trace;
  const originalDebug = console.debug;
  const originalDir = console.dir;
  const originalDirxml = console.dirxml;
  const originalGroup = console.group;
  const originalGroupCollapsed = console.groupCollapsed;
  const originalGroupEnd = console.groupEnd;
  const originalTable = console.table;
  
  // Extension error patterns to suppress
  const extensionPatterns = [
    'proto pollution in event origin',
    'contentScript.js',
    'contentscript.js',
    'injected.js',
    'bundle_content.js',
    'contentScript.ts',
    'inpage.js',
    'Razor Wallet',
    'wallet-',
    'start patch Notification',
    'init content Log模式',
    'content Log模式',
    'Uncaught TypeError: v is not a function',
    'Failed to load resource:',
    'Failed to fetch remote project configuration',
    'Reown Config',
    'pulse.walletconnect',
    'api.web3modal.org',
    'VM59:2',
    'VM57:2',
    'VM54:2',
    '(anonymous) @ contentScript.js:2',
    '(anonymous) @ contentscript.js:1',
    '(anonymous) @ contentscript.js:10',
    '(anonymous) @ contentscript.js:12',
    '(anonymous) @ injected.js:1',
    '(anonymous) @ bundle_content.js:1',
    '(anonymous) @ inpage.js:1',
    '(anonymous) @ inpage.js:2',
    '(anonymous) @ inpage.js:41',
    '_postMessage @ contentscript.js:1',
    '_write @ contentscript.js:1',
    'R.write @ contentscript.js:12',
    'a.emit @ contentscript.js:10',
    'J.push @ contentscript.js:10',
    '_onMessage @ contentscript.js:10',
    '_postMessage @ inpage.js:41',
    '_write @ inpage.js:41',
    'k @ inpage.js:41',
    'O @ inpage.js:41',
    '_send @ inpage.js:45',
    'call @ inpage.js:45',
    'callAsync @ inpage.js:45',
    'await in call',
    '_postMessage @ contentScript.js:6',
    '_write @ contentScript.js:6',
    'ee @ contentScript.js:6',
    'L @ contentScript.js:6',
    'Rs.I.write @ contentScript.js:6',
    'Ul @ contentScript.js:7',
    'he.emit @ contentScript.js:6',
    'ae @ contentScript.js:7',
    'oe @ contentScript.js:7',
    'M.push @ contentScript.js:7',
    '_onMessage @ contentScript.js:7'
  ];
  
  // Check if message should be suppressed
  function shouldSuppress(message) {
    if (typeof message !== 'string') return false;
    
    // More aggressive pattern matching
    const lowerMessage = message.toLowerCase();
    
    // Check for any extension-related patterns
    if (lowerMessage.includes('proto pollution') ||
        lowerMessage.includes('contentscript') ||
        lowerMessage.includes('contentScript') ||
        lowerMessage.includes('injected.js') ||
        lowerMessage.includes('bundle_content') ||
        lowerMessage.includes('inpage.js') ||
        lowerMessage.includes('razor wallet') ||
        lowerMessage.includes('wallet-') ||
        lowerMessage.includes('init content log') ||
        lowerMessage.includes('content log模式') ||
        lowerMessage.includes('start patch notification') ||
        lowerMessage.includes('uncaught typeerror: v is not a function') ||
        lowerMessage.includes('failed to load resource') ||
        lowerMessage.includes('failed to fetch remote project') ||
        lowerMessage.includes('reown config') ||
        lowerMessage.includes('pulse.walletconnect') ||
        lowerMessage.includes('api.web3modal.org') ||
        lowerMessage.includes('vm59:2') ||
        lowerMessage.includes('vm57:2') ||
        lowerMessage.includes('vm54:2') ||
        lowerMessage.includes('(anonymous) @') ||
        lowerMessage.includes('_postmessage @') ||
        lowerMessage.includes('_write @') ||
        lowerMessage.includes('r.write @') ||
        lowerMessage.includes('a.emit @') ||
        lowerMessage.includes('j.push @') ||
        lowerMessage.includes('_onmessage @') ||
        lowerMessage.includes('postmessage') ||
        lowerMessage.includes('_write') ||
        lowerMessage.includes('r.write') ||
        lowerMessage.includes('a.emit') ||
        lowerMessage.includes('j.push') ||
        lowerMessage.includes('_onmessage') ||
        lowerMessage.includes('i @') ||
        lowerMessage.includes('m @') ||
        lowerMessage.includes('d @') ||
        lowerMessage.includes('f @') ||
        lowerMessage.includes('x @') ||
        lowerMessage.includes('k @') ||
        lowerMessage.includes('o @') ||
        lowerMessage.includes('l @') ||
        lowerMessage.includes('e @') ||
        lowerMessage.includes('h @') ||
        lowerMessage.includes('u @') ||
        lowerMessage.includes('a @') ||
        lowerMessage.includes('s @') ||
        lowerMessage.includes('c @') ||
        lowerMessage.includes('_send @') ||
        lowerMessage.includes('call @') ||
        lowerMessage.includes('callasync @') ||
        lowerMessage.includes('await in call') ||
        lowerMessage.includes('rs.i.write @') ||
        lowerMessage.includes('ul @') ||
        lowerMessage.includes('he.emit @') ||
        lowerMessage.includes('ae @') ||
        lowerMessage.includes('oe @') ||
        lowerMessage.includes('m.push @') ||
        lowerMessage.includes('_onmessage @') ||
        lowerMessage.includes('inpage.js:41') ||
        lowerMessage.includes('inpage.js:45') ||
        lowerMessage.includes('inpage.js:64') ||
        lowerMessage.includes('contentscript.js:6') ||
        lowerMessage.includes('contentscript.js:7')) {
      return true;
    }
    
    return extensionPatterns.some(pattern => 
      lowerMessage.includes(pattern.toLowerCase())
    );
  }
  
  // Override console methods
  console.error = function(...args) {
    const message = args.join(' ');
    if (shouldSuppress(message)) return;
    originalError.apply(console, args);
  };
  
  console.log = function(...args) {
    const message = args.join(' ');
    if (shouldSuppress(message)) return;
    originalLog.apply(console, args);
  };
  
  console.warn = function(...args) {
    const message = args.join(' ');
    if (shouldSuppress(message)) return;
    originalWarn.apply(console, args);
  };
  
  console.info = function(...args) {
    const message = args.join(' ');
    if (shouldSuppress(message)) return;
    originalInfo.apply(console, args);
  };
  
  console.trace = function(...args) {
    const message = args.join(' ');
    if (shouldSuppress(message)) return;
    originalTrace.apply(console, args);
  };
  
  console.debug = function(...args) {
    const message = args.join(' ');
    if (shouldSuppress(message)) return;
    originalDebug.apply(console, args);
  };
  
  console.dir = function(...args) {
    const message = args.join(' ');
    if (shouldSuppress(message)) return;
    originalDir.apply(console, args);
  };
  
  console.dirxml = function(...args) {
    const message = args.join(' ');
    if (shouldSuppress(message)) return;
    originalDirxml.apply(console, args);
  };
  
  console.group = function(...args) {
    const message = args.join(' ');
    if (shouldSuppress(message)) return;
    originalGroup.apply(console, args);
  };
  
  console.groupCollapsed = function(...args) {
    const message = args.join(' ');
    if (shouldSuppress(message)) return;
    originalGroupCollapsed.apply(console, args);
  };
  
  console.groupEnd = function(...args) {
    const message = args.join(' ');
    if (shouldSuppress(message)) return;
    originalGroupEnd.apply(console, args);
  };
  
  console.table = function(...args) {
    const message = args.join(' ');
    if (shouldSuppress(message)) return;
    originalTable.apply(console, args);
  };
  
  // Override window.onerror
  window.onerror = function(message, source, lineno, colno, error) {
    if (shouldSuppress(message || '')) return true;
    return false;
  };
  
  // Handle unhandled rejections
  window.addEventListener('unhandledrejection', function(event) {
    const reason = event.reason?.toString() || '';
    if (shouldSuppress(reason)) {
      event.preventDefault();
      return false;
    }
  });
  
  // Handle DOM errors
  document.addEventListener('error', function(event) {
    if (shouldSuppress(event.message || '')) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true);
  
  // Handle window errors
  window.addEventListener('error', function(event) {
    if (shouldSuppress(event.message || '')) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true);
  
  // Additional aggressive error suppression
  // Override all possible console methods
  const consoleMethods = ['assert', 'clear', 'count', 'countReset', 'dir', 'dirxml', 'group', 'groupCollapsed', 'groupEnd', 'table', 'time', 'timeEnd', 'timeLog', 'timeStamp', 'profile', 'profileEnd'];
  
  consoleMethods.forEach(method => {
    if (console[method]) {
      const original = console[method];
      console[method] = function(...args) {
        const message = args.join(' ');
        if (shouldSuppress(message)) return;
        original.apply(console, args);
      };
    }
  });
  
  // Override console methods that might be added dynamically
  const originalConsole = console;
  Object.defineProperty(window, 'console', {
    get: function() {
      return originalConsole;
    },
    set: function(value) {
      // Prevent console from being overridden
      return;
    }
  });
  
  // Additional error interception
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    if (type === 'error' || type === 'unhandledrejection') {
      const wrappedListener = function(event) {
        if (shouldSuppress(event.message || event.reason?.toString() || '')) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
        return listener.call(this, event);
      };
      return originalAddEventListener.call(this, type, wrappedListener, options);
    }
    return originalAddEventListener.call(this, type, listener, options);
  };
  
  console.log('Error suppression initialized');
})();
