"use client"; // Ensures this component runs on the client side (Next.js specific)

import React, { createContext, useContext, useState, useCallback } from 'react';
// Importing icons for different toast types
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

// Create a context to share toast functionality across components
const ToastContext = createContext();

// Custom hook to use toast functions anywhere in the app
export const useToast = () => {
  const context = useContext(ToastContext);
  // Ensures the hook is used inside a ToastProvider
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Define the types of toasts supported
const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Component to display a single toast notification
const ToastItem = ({ toast, onRemove }) => {
  // Returns the appropriate icon based on toast type
  const getIcon = (type) => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return <CheckCircle className="w-5 h-5" />;
      case TOAST_TYPES.ERROR:
        return <XCircle className="w-5 h-5" />;
      case TOAST_TYPES.WARNING:
        return <AlertCircle className="w-5 h-5" />;
      case TOAST_TYPES.INFO:
        return <Info className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  // Returns the background and border styles based on toast type
  const getStyles = (type) => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return 'bg-green-50 border-green-200 text-green-800';
      case TOAST_TYPES.ERROR:
        return 'bg-red-50 border-red-200 text-red-800';
      case TOAST_TYPES.WARNING:
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case TOAST_TYPES.INFO:
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  // Returns the icon color based on toast type
  const getIconColor = (type) => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return 'text-green-400';
      case TOAST_TYPES.ERROR:
        return 'text-red-400';
      case TOAST_TYPES.WARNING:
        return 'text-yellow-400';
      case TOAST_TYPES.INFO:
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  // Render the toast UI
  return (
    <div className={`${getStyles(toast.type)} border rounded-lg p-4 mb-3 shadow-lg transform transition-all duration-300 ease-in-out max-w-md w-full`}>
      <div className="flex items-start">
        {/* Icon */}
        <div className={`flex-shrink-0 ${getIconColor(toast.type)}`}>
          {getIcon(toast.type)}
        </div>
        {/* Title and message */}
        <div className="ml-3 flex-1">
          {toast.title && (
            <h4 className="text-sm font-semibold mb-1">{toast.title}</h4>
          )}
          <p className="text-sm">{toast.message}</p>
        </div>
        {/* Close button */}
        <button
          onClick={() => onRemove(toast.id)}
          className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Component to display all active toasts
const ToastContainer = ({ toasts, onRemove }) => {
  // If there are no toasts, render nothing
  if (toasts.length === 0) return null;

  // Render each toast using ToastItem
  return (
    <div className="fixed top-4 right-4 z-50">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

// Provider component that manages toast state and functions
export const ToastProvider = ({ children }) => {
  // State to hold all active toasts
  const [toasts, setToasts] = useState([]);

  // Function to remove a toast by its id
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Function to add a new toast
  const addToast = useCallback((toast) => {
    // Generate a unique id for the toast
    const id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const newToast = { ...toast, id };
    
    // Add the new toast to the state
    setToasts(prev => [...prev, newToast]);

    // Automatically remove the toast after a certain duration (default 5 seconds)
    const duration = toast.duration || 5000;
    setTimeout(() => {
      removeToast(id);
    }, duration);

    return id; // Return the id in case you want to remove it manually
  }, [removeToast]);
  
  // Helper functions to show different types of toasts
  const toast = {
    success: (message, options = {}) => {
      return addToast({ 
        ...options, 
        message, 
        type: TOAST_TYPES.SUCCESS,
        title: options.title || 'Success'
      });
    },
    error: (message, options = {}) => {
      return addToast({ 
        ...options, 
        message, 
        type: TOAST_TYPES.ERROR,
        title: options.title || 'Error'
      });
    },
    warning: (message, options = {}) => {
      return addToast({ 
        ...options, 
        message, 
        type: TOAST_TYPES.WARNING,
        title: options.title || 'Warning'
      });
    },
    info: (message, options = {}) => {
      return addToast({ 
        ...options, 
        message, 
        type: TOAST_TYPES.INFO,
        title: options.title || 'Info'
      });
    },
  };

  // Provide toast functions and state to all children
  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      {/* Render the ToastContainer with current toasts */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

export default ToastProvider; // Export the provider for use in the app
