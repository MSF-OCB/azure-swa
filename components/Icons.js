import React from 'react';

export function LoginIcon({ slug }) {
  return (
    <div>
      <button>
        <a href={`/${slug}`}>Login</a>
      </button>
    </div>
  );
}

export const projectIcons = {
  login: LoginIcon,
};
