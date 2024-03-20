import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
    label?: string;
    name?: string;
    register:UseFormRegisterReturn;
    placeholder ?: string;
    required : boolean;
  }


  export default function TextArea({ label, name,register, ...rest }: TextAreaProps) {
    return (
      <div>
        {label ? (
          <label
            htmlFor={name}
            className="mb-1 block text-sm font-medium text-white"
          >
            {label}
          </label>
        ) : null}
        <textarea
          id={name}
          {...register}
          className="mt-1 shadow-sm w-full focus:ring-blue-500 rounded-md border-gray-300 focus:border-blue-500 "
          rows={4}
          {...rest}
        />
      </div>
    );
  }