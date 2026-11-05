export function navigateTo(href: string) {
  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) return;

  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const nextPath = url.pathname.replace(/\/+$/, '') || '/';
  const nextUrl = `${url.pathname}${url.search}${url.hash}`;

  if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== nextUrl) {
    window.history.pushState({}, '', nextUrl);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  if (url.hash) {
    requestAnimationFrame(() => {
      document.querySelector(decodeURIComponent(url.hash))?.scrollIntoView({ behavior: 'smooth' });
    });
  } else if (currentPath !== nextPath) {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}