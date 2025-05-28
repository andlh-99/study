export function getTelegramUser() {
  if (!window.Telegram?.WebApp) {
    console.warn('Telegram WebApp is not available');
    return null;
  }

  const { user } = window.Telegram.WebApp.initDataUnsafe;
  
  if (!user) {
    console.warn('No user data available from Telegram WebApp');
    return null;
  }

  return {
    id: user.id,
    name: user.first_name + (user.last_name ? ` ${user.last_name}` : ''),
    photoUrl: user.photo_url,
  };
}

export function setupTelegramApp() {
  if (!window.Telegram?.WebApp) {
    console.warn('Telegram WebApp is not available');
    return;
  }
  
  // Inform Telegram that the Web App is ready
  window.Telegram.WebApp.ready();
  
  // Expand the Web App to take up the full screen
  window.Telegram.WebApp.expand();
}

export function closeTelegramApp() {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.close();
  }
}

export function showBackButton(callback: () => void) {
  if (window.Telegram?.WebApp?.BackButton) {
    window.Telegram.WebApp.BackButton.onClick(callback);
    window.Telegram.WebApp.BackButton.show();
  }
}

export function hideBackButton() {
  if (window.Telegram?.WebApp?.BackButton) {
    window.Telegram.WebApp.BackButton.hide();
  }
}