import { renderToString } from 'react-dom/server';
import App from './App';
import { AuthProvider } from './lib/auth';

export function render(url: string = '/') {
  const html = renderToString(
    <AuthProvider>
      <App initialPath={url} />
    </AuthProvider>
  );
  return { html };
}
