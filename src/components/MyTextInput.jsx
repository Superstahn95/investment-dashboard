import { useField } from "formik";

function MyTextInput({ label, directive, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col space-y-2 mb-4 text-gray-600 font-montserrat">
      <label
        htmlFor={props.id || props.name}
        className="text-gray-700 dark:text-white"
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        className="border border-gray-500 outline-none p-2 dark:text-white dark:bg-slate-900 dark:border-white rounded-md"
      />
      <p className="text-sm dark:text-white">{directive}</p>
      {meta.touched && meta.error ? (
        <div className="text-red-500 dark:text-red-300 text-xs">
          {meta.error}
        </div>
      ) : null}
    </div>
  );
}

export default MyTextInput;
