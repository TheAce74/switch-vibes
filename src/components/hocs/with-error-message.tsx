import type { ReactElement } from "react";
import {
  type FieldErrors,
  type FieldValues,
  get,
  type Path,
} from "react-hook-form";
import { cn } from "#/lib/utils";

export default function withErrorMessage<T extends FieldValues = FieldValues>(
  component: ReactElement,
  err: {
    errors: FieldErrors<T>;
    key: Path<T>;
  },
  errorClassName?: string,
  containerClassName?: string,
) {
  const { errors, key } = err;
  const error = get(errors, String(key));

  return (
    <div className={containerClassName}>
      {component}
      {error && (
        <span
          className={cn(
            "mt-1 text-left block text-xs text-destructive",
            errorClassName,
          )}
        >
          {String(error.message)}
        </span>
      )}
    </div>
  );
}
