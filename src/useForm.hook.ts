import { useRef } from 'react';

import { parseFormData } from './utils/parseFormData';

interface UseForm<T> {
  handleSubmit: (data: T) => void;
}

export function useForm<T = object>({ handleSubmit }: UseForm<T>) {
  const ref = useRef<HTMLFormElement>(null);

  const submit = (event: React.FormEvent) => {
      event.preventDefault();

      if (!ref.current) return

      const formData = new FormData(ref.current);

      const data: object = parseFormData(formData);

      handleSubmit(data as T);
    }

  return { ref, submit };
}