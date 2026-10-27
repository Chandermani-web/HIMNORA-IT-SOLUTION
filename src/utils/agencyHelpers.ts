/**
 * Pure helper utilities for Himnora IT Solution.
 */

export interface ContactFormValues {
  name: string;
  email: string;
  budget: string;
  service: string;
  message: string;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  budget?: string;
  service?: string;
  message?: string;
}

/**
 * Validates the contact/quote submission form.
 */
export function validateContactForm(values: ContactFormValues): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Please provide your full name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email || !emailRegex.test(values.email.trim())) {
    errors.email = 'Please provide a valid business email address.';
  }

  if (!values.budget || values.budget.trim() === '') {
    errors.budget = 'Please select a project budget range.';
  }

  if (!values.service || values.service.trim() === '') {
    errors.service = 'Please select the primary service required.';
  }

  if (!values.message || values.message.trim().length < 10) {
    errors.message = 'Please provide a brief project summary (at least 10 characters).';
  }

  return errors;
}

/**
 * Calculates reading time in minutes for given content paragraphs.
 */
export function calculateReadTime(paragraphs: string[], wordsPerMinute = 200): number {
  if (!paragraphs || paragraphs.length === 0) return 1;
  const totalWords = paragraphs.reduce((acc, p) => acc + p.trim().split(/\s+/).filter(Boolean).length, 0);
  return Math.max(1, Math.ceil(totalWords / wordsPerMinute));
}

/**
 * Formats a number count with suffix (e.g. 180 -> "180+", 98.4 -> "98.4%").
 */
export function formatStatValue(value: number, type: 'count' | 'percent' | 'rating' = 'count'): string {
  if (type === 'percent') {
    return `${value}%`;
  }
  if (type === 'rating') {
    return `${value.toFixed(1)}/5`;
  }
  return `${value}+`;
}

/**
 * Formats slug into readable title.
 */
export function slugToTitle(slug: string): string {
  if (!slug) return '';
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
