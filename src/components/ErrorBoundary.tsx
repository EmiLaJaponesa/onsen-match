import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch and handle React errors gracefully
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error in development
    if (import.meta.env.DEV) {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <Card className="p-8 max-w-md text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Algo salió mal</h2>
            <p className="text-muted-foreground">
              Lo sentimos, ha ocurrido un error inesperado.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <details className="text-left text-sm text-muted-foreground bg-muted p-3 rounded">
                <summary className="cursor-pointer font-medium">Detalles del error</summary>
                <pre className="mt-2 overflow-auto">{this.state.error.message}</pre>
              </details>
            )}
            <Button 
              onClick={() => window.location.href = '/'}
              className="w-full"
            >
              Volver al inicio
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
