export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

let googleInitializedClientId = '';
let googleCredentialCallback = null;

export function loadGoogleIdentity() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve(window.google);
      return;
    }

    const existing = document.querySelector('script[data-google-identity]');
    if (existing) {
      // Script already in DOM but may still be loading
      const poll = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(poll);
          resolve(window.google);
        }
      }, 100);
      existing.addEventListener('error', () => { clearInterval(poll); reject(new Error('Google script failed to load')); }, { once: true });
      setTimeout(() => { clearInterval(poll); if (window.google?.accounts?.id) resolve(window.google); else reject(new Error('Google script timeout')); }, 10000);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.dataset.googleIdentity = 'true';
    script.onload = () => resolve(window.google);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export async function renderGoogleButton(container, callback) {
  if (!GOOGLE_CLIENT_ID) throw new Error('Google client ID is not configured');
  if (!container) return;

  const google = await loadGoogleIdentity();
  googleCredentialCallback = callback;
  container.innerHTML = '';
  const buttonWidth = Math.min(
    400,
    Math.max(300, Math.floor(container.getBoundingClientRect().width || container.offsetWidth || 400)),
  );

  if (googleInitializedClientId !== GOOGLE_CLIENT_ID) {
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response) => googleCredentialCallback?.(response),
      ux_mode: 'popup',
      auto_select: false,
      cancel_on_tap_outside: true,
      // Disable FedCM which can block the button in some browser configs
      use_fedcm_for_prompt: false,
      use_fedcm_for_button: false,
      button_auto_select: false,
    });
    googleInitializedClientId = GOOGLE_CLIENT_ID;
  }

  google.accounts.id.renderButton(container, {
    type: 'standard',
    theme: 'outline',
    size: 'large',
    text: 'continue_with',
    shape: 'rectangular',
    logo_alignment: 'left',
    width: buttonWidth,
  });
}
