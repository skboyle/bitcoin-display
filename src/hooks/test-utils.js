import React from 'react';
import { render } from '@testing-library/react';

export function renderHook(hook) {
  const result = {};
  function HookWrapper() {
    Object.assign(result, hook());
    return null;
  }
  render(<HookWrapper />);
  return { result };
}
