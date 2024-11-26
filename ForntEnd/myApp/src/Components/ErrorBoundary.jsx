import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state to show the fallback UI on the next render
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details (could be sent to an error monitoring service)
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }
    handleRetry = () => {
        this.setState({ hasError: false });
    }

   
    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    <button onClick={this.handleRetry}>Try Again</button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;