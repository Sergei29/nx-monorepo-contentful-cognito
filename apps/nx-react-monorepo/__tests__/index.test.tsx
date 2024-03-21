import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import Page from '../src/app/page';

describe('Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Page />);
    expect(baseElement).toBeTruthy();
  });
});
