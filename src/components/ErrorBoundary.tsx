import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="p-6 border border-[#00ff41] rounded-lg bg-[#0d0208]/90 text-center">
            <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
            <p className="mb-4">Please try refreshing the page</p>
            <button
              onClick={() => window.location.reload()}
              className="matrix-button px-4 py-2 rounded-lg"
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}