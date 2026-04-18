import { describe, expect, it, afterEach } from 'vitest';
import { announceToScreenReader, cleanupAnnouncements } from '@/utils/a11y';

describe('announceToScreenReader', () => {
  afterEach(() => {
    cleanupAnnouncements();
  });

  it('creates aria-live element with correct text', () => {
    announceToScreenReader('hello');
    const el = document.querySelector('[aria-live]');
    expect(el).not.toBeNull();
    expect(el?.textContent).toBe('hello');
  });

  it('defaults to polite priority', () => {
    announceToScreenReader('test');
    const el = document.querySelector('[aria-live]');
    expect(el?.getAttribute('aria-live')).toBe('polite');
  });

  it('sets aria-live to assertive when specified', () => {
    announceToScreenReader('urgent', 'assertive');
    const el = document.querySelector('[aria-live="assertive"]');
    expect(el).not.toBeNull();
    expect(el?.textContent).toBe('urgent');
  });

  it('sets role="status" for polite, role="alert" for assertive', () => {
    announceToScreenReader('test');
    const polite = document.querySelector('[aria-live="polite"]') as HTMLDivElement;
    expect(polite.getAttribute('role')).toBe('status');
    expect(polite.className).toBe('sr-only');
    expect(polite.getAttribute('aria-atomic')).toBe('true');

    announceToScreenReader('urgent', 'assertive');
    const assertive = document.querySelector('[aria-live="assertive"]') as HTMLDivElement;
    expect(assertive.getAttribute('role')).toBe('alert');
  });

  it('persists element in DOM across announcements', () => {
    announceToScreenReader('first');
    announceToScreenReader('second');
    const elements = document.querySelectorAll('[aria-live="polite"]');
    expect(elements.length).toBe(1);
    expect(elements[0].textContent).toBe('second');
  });

  it('updates text on rapid-fire calls without duplicating elements', () => {
    announceToScreenReader('first');
    announceToScreenReader('second');
    announceToScreenReader('third');
    const elements = document.querySelectorAll('[aria-live="polite"]');
    expect(elements.length).toBe(1);
    expect(elements[0].textContent).toBe('third');
  });

  it('handles empty string without crashing', () => {
    announceToScreenReader('');
    const el = document.querySelector('[aria-live]');
    expect(el).not.toBeNull();
    expect(el?.textContent).toBe('');
  });

  it('cleans up elements on cleanupAnnouncements', () => {
    announceToScreenReader('hello');
    announceToScreenReader('world', 'assertive');
    expect(document.querySelectorAll('[aria-live]').length).toBe(2);

    cleanupAnnouncements();
    expect(document.querySelectorAll('[aria-live]').length).toBe(0);
  });
});
