import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Icons } from "./ui/Icons";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="m-0 text-slate-50 rounded-md bg-blue-700 text-sm transition-all duration-300 hover:bg-blue-600 md:text-base w-16 h-8 text-center"
      disabled={pending}
    >
      {pending ? (
        <Icons.Spinner className="animate-spin m-auto" size={20} />
      ) : (
        "Dodaj"
      )}
    </button>
  );
};
