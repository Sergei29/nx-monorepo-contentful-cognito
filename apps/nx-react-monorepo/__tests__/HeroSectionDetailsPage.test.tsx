import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import HeroSectionDetailsPage from '../src/components/HeroSection/HeroSectionDetailsPage';

describe('HeroSectionDetailsPage', () => {
  const { mockProps } = getTestData();
  it('should render successfully', () => {
    render(
      <HeroSectionDetailsPage {...mockProps}>
        <p>test content</p>
      </HeroSectionDetailsPage>
    );
    const component = screen.getByTestId('HeroSectionDetailsPage');

    expect(component).toBeDefined();
  });

  it('should render nested children', () => {
    render(
      <HeroSectionDetailsPage {...mockProps}>
        <p>test content A</p>
        <p>test content B</p>
      </HeroSectionDetailsPage>
    );
    const childOne = screen.getByText('test content A');
    const childTwo = screen.getByText('test content B');

    expect(childOne).toBeDefined();
    expect(childTwo).toBeDefined();
  });

  it('should render the passed className', () => {
    render(
      <HeroSectionDetailsPage {...mockProps} className="customStyle">
        <p>test content</p>
      </HeroSectionDetailsPage>
    );
    const component = screen.getByTestId('HeroSectionDetailsPage');
    const className = component.getAttribute('class');

    expect(className).toContain('customStyle');
  });

  it('should render the background if the background image url is passed', () => {
    render(
      <HeroSectionDetailsPage
        {...mockProps}
        backgroundImage={mockProps.image.href}
      >
        <p>test content</p>
      </HeroSectionDetailsPage>
    );
    const component = screen.getByTestId(
      'HeroSectionDetailsPage_BackgroundImage'
    );

    expect(component).toBeDefined();
    expect(component.style.backgroundImage).toContain(mockProps.image.href);
  });
});

function getTestData() {
  const mockProps = {
    title: 'Oathbringer',
    subTitle:
      "Dalinar Kholin's Alethi armies won a fleeting victory at a terrible cost: The enemy Parshendi summoned the violent Everstorm, which now sweeps the world with destruction, and in its passing awakens the once peaceful and subservient parshmen.",
    image: {
      id: '1PdcNl5yW875xwuA6BvRHV',
      alt: 'dalinar',
      href: 'https://images.ctfassets.net/cv73opqg0cmm/1PdcNl5yW875xwuA6BvRHV/dc626aeec7ee936faa9bd57061eeb36c/need-help-creating-a-dalinar-kohlin-the-stormlight-archive-v0-921lo3fvrosa1.webp',
      width: 543,
      height: 900,
    },
    goBack: { pathname: '/books', name: 'back to books' },
  };

  return { mockProps };
}
