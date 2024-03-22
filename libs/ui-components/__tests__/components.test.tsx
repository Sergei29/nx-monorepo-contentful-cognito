import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { ComponentExample } from '../src';

describe('ComponentExample', () => {
  it('should render the component', () => {
    const { baseElement } = render(<ComponentExample />);
    expect(baseElement).toBeTruthy();
  });
});
