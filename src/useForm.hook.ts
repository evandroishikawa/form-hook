import { useRef } from 'react';

import { parseFormData } from './utils/parseFormData';

/**
 * Configuration options for the useForm hook
 */
interface UseFormOptions<T> {
  /** Callback function called when form is submitted with parsed form data */
  submit: (data: T) => void;
}

/**
 * Form element types that can have their values set programmatically
 */
type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/**
 * Return type of the useForm hook
 */
interface UseFormReturn<T> {
  /** React ref to be attached to the form element */
  ref: React.RefObject<HTMLFormElement | null>;
  /** Form submission handler - prevents default and calls submit with parsed data */
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  /** Resets the form to its initial state */
  reset: () => void;
  /** Gets current form data without triggering submission */
  getFormData: () => T | null;
  /** Sets the value of a specific form field by name */
  setValue: (name: string, value: string) => void;
}

/**
 * A React hook for handling form state and submission
 *
 * @template T - The expected shape of the parsed form data
 * @param options - Configuration options for the form
 * @returns Object containing form ref, handlers, and utility functions
 *
 * @example
 * ```typescript
 * interface LoginData {
 *   email: string;
 *   password: string;
 * }
 *
 * const form = useForm<LoginData>({
 *   submit: (data) => console.log(data.email, data.password)
 * });
 *
 * return (
 *   <form ref={form.ref} onSubmit={form.onSubmit}>
 *     <input name="email" type="email" />
 *     <input name="password" type="password" />
 *     <button type="submit">Login</button>
 *   </form>
 * );
 * ```
 */
export function useForm<T = Record<string, unknown>>(
  { submit }: UseFormOptions<T>
): UseFormReturn<T> {
  const ref = useRef<HTMLFormElement>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!ref.current) return;

      const formData = new FormData(ref.current);

      const data = parseFormData(formData) as T;

      submit(data);
    }

  const reset = () => {
    if (!ref.current) return;

    ref.current.reset();
  };

  const getFormData = (): T | null => {
    if (!ref.current) return null;

    const formData = new FormData(ref.current);

    const data = parseFormData(formData) as T;

    return data;
  };

  const setValue = (name: string, value: string) => {
    if (!ref.current) return;

    const element = ref.current.elements.namedItem(name) as FormElement | null;

    if (element && 'value' in element) {
      element.value = value;
    }
  };

  return {
    ref,
    onSubmit,
    reset,
    getFormData,
    setValue
  };
}