"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

// Toast Context
const ToastContext = createContext();

// Toast Hook
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Types
const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Toast Component
const ToastItem = ({ toast, onRemove }) => {
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

  return (
    <div className={`${getStyles(toast.type)} border rounded-lg p-4 mb-3 shadow-lg transform transition-all duration-300 ease-in-out max-w-md w-full`}>
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${getIconColor(toast.type)}`}>
          {getIcon(toast.type)}
        </div>
        <div className="ml-3 flex-1">
          {toast.title && (
            <h4 className="text-sm font-semibold mb-1">{toast.title}</h4>
          )}
          <p className="text-sm">{toast.message}</p>
        </div>
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

// Toast Container
const ToastContainer = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

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

// Toast Provider
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const addToast = useCallback((toast) => {
    const id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const newToast = { ...toast, id };
    
    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration (default 5 seconds)
    const duration = toast.duration || 5000;
    setTimeout(() => {
      removeToast(id);
    }, duration);

    return id;
  }, [removeToast]);

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

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
