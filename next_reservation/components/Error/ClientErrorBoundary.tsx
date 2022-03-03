import router from 'next/router';
import React, { ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
}
interface State {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
    console.error('error : ', error, errorInfo);
  }

  clickGotoHomepage() {
    this.setState({ hasError: false });
    router.push('/');
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-black w-1/3 h-300 mx-auto flex flex-col space-y-10 justify-center items-center">
          <h2 className="text-3xl">죄송합니다. 에러가 발생했습니다.</h2>
          <button
            type="button"
            className="w-52 mr-8 rounded-full py-3 px-3 header-sign-in-btn bg-emerald text-white text-xl"
            onClick={this.clickGotoHomepage}
          >
            홈으로 돌아가기.
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
