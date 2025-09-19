// Error suppression script for browser extensions
(function() {
  'use strict';
  
  // Store original handlers
  const originalError = console.error;
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalInfo = console.info;
  const originalTrace = console.trace;
  
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
    '_onMessage @ contentscript.js:10'
  ];
  
  // Check if message should be suppressed
  function shouldSuppress(message) {
    if (typeof message !== 'string') return false;
    return extensionPatterns.some(pattern => 
      message.toLowerCase().includes(pattern.toLowerCase())
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
  
  console.log('Error suppression initialized');
})();
