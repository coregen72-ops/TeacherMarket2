export function PageSkeleton({ variant = 'dashboard' }) {
  if (variant === 'auth') {
    return (
      <div className="skeleton-page skeleton-auth">
        <div className="sk-panel sk-auth-left">
          <div className="sk-line w-40" />
          <div className="sk-line w-70 h-lg" />
          <div className="sk-line w-85" />
          <div className="sk-grid two">
            <div className="sk-card" />
            <div className="sk-card" />
          </div>
        </div>
        <div className="sk-panel sk-auth-form">
          <div className="sk-line w-55 h-lg" />
          <div className="sk-line w-80" />
          <div className="sk-input" />
          <div className="sk-button" />
          <div className="sk-line w-35" />
        </div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="skeleton-stack">
        <div className="sk-line w-35 h-lg" />
        <div className="sk-line w-55" />
        <div className="sk-filter-row">
          <div className="sk-pill" />
          <div className="sk-pill" />
          <div className="sk-pill" />
          <div className="sk-pill" />
        </div>
        {[0, 1, 2].map(i => (
          <div className="sk-list-card" key={i}>
            <div className="sk-avatar" />
            <div className="sk-list-body">
              <div className="sk-line w-50" />
              <div className="sk-line w-80" />
              <div className="sk-line w-65" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="skeleton-stack">
      <div className="sk-hero" />
      <div className="sk-grid four">
        <div className="sk-card" />
        <div className="sk-card" />
        <div className="sk-card" />
        <div className="sk-card" />
      </div>
      <div className="sk-grid two">
        <div className="sk-card tall" />
        <div className="sk-card tall" />
      </div>
    </div>
  );
}
