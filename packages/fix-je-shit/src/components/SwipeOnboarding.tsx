import React, { useEffect, useState } from 'react';

interface SwipeOnboardingProps {
  onDismiss: () => void;
}

export function SwipeOnboarding({ onDismiss }: SwipeOnboardingProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, 3500);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  const handleClick = () => {
    setVisible(false);
    setTimeout(onDismiss, 300);
  };

  return (
    <div
      className={`fjs-onboarding ${
        visible ? 'fjs-onboarding--visible' : 'fjs-onboarding--hidden'
      }`}
      onClick={handleClick}
      role="dialog"
      aria-label="Swipe instructie">
      <div className="fjs-onboarding-content">
        <div className="fjs-onboarding-hand">
          {/* Animated hand icon */}
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path
              d="M24 40C17.37 40 12 34.63 12 28V20C12 18.9 12.9 18 14 18C15.1 18 16 18.9 16 20V28H18V14C18 12.9 18.9 12 20 12C21.1 12 22 12.9 22 14V26H24V12C24 10.9 24.9 10 26 10C27.1 10 28 10.9 28 12V26H30V16C30 14.9 30.9 14 32 14C33.1 14 34 14.9 34 16V28C34 34.63 30.63 40 24 40Z"
              fill="white"
              opacity="0.9"
            />
          </svg>
        </div>
        <p className="fjs-onboarding-text">Swipe of gebruik de knoppen</p>
      </div>
    </div>
  );
}
