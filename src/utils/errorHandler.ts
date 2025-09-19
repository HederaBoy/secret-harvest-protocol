// Global error handler to suppress external extension errors
export class ErrorSuppressor {
  private static instance: ErrorSuppressor;
  private suppressedErrors: Set<string> = new Set();
  private originalConsoleError: typeof console.error;
  private originalWindowError: typeof window.onerror;

  private constructor() {
    this.originalConsoleError = console.error;
    this.originalWindowError = window.onerror;
    this.setupErrorSuppression();
  }

  public static getInstance(): ErrorSuppressor {
    if (!ErrorSuppressor.instance) {
      ErrorSuppressor.instance = new ErrorSuppressor();
    }
    return ErrorSuppressor.instance;
  }

  private setupErrorSuppression() {
    // Suppress console errors from external extensions
    console.error = (...args: any[]) => {
      const message = args.join(' ');
      
      // Suppress known external extension errors
      if (this.shouldSuppressError(message)) {
        return;
      }
      
      // Log other errors normally
      this.originalConsoleError.apply(console, args);
    };

    // Suppress window errors from external extensions
    window.onerror = (message, source, lineno, colno, error) => {
      const errorMessage = message?.toString() || '';
      
      if (this.shouldSuppressError(errorMessage)) {
        return true; // Prevent default error handling
      }
      
      // Call original error handler for our app errors
      if (this.originalWindowError) {
        return this.originalWindowError.call(window, message, source, lineno, colno, error);
      }
      
      return false;
    };

    // Suppress unhandled promise rejections from extensions
    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason?.toString() || '';
      
      if (this.shouldSuppressError(reason)) {
        event.preventDefault();
        return;
      }
    });
  }

  private shouldSuppressError(message: string): boolean {
    // List of patterns to suppress (same as HTML script)
    const suppressPatterns = [
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
      'Failed to load resource: the server responded with a status of 400',
      'Failed to load resource: the server responded with a status of 403',
      'Failed to fetch remote project configuration',
      'Reown Config',
      'pulse.walletconnect',
      'api.web3modal.org',
      'VM57:2',
      'VM59:2',
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

    return suppressPatterns.some(pattern => 
      message.toLowerCase().includes(pattern.toLowerCase())
    );
  }

  public restoreOriginalHandlers() {
    console.error = this.originalConsoleError;
    window.onerror = this.originalWindowError;
  }

  public addSuppressedError(pattern: string) {
    this.suppressedErrors.add(pattern);
  }

  public removeSuppressedError(pattern: string) {
    this.suppressedErrors.delete(pattern);
  }
}

// Initialize error suppression on module load
export const errorSuppressor = ErrorSuppressor.getInstance();
