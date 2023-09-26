import { useField } from "formik";

function MySelectField({ label, directive, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col space-y-2 mb-2 text-gray-600">
      <label
        htmlFor={props.id || props.name}
        className="text-gray-700 dark:text-white"
      >
        {label}
      </label>
      <select
        {...field}
        {...props}
        className="dark:bg-slate-900 p-2 dark:text-white"
      />
      <p className="text-sm dark:text-white">{directive}</p>
      {meta.touched && meta.error ? (
        <div className="text-red-500 dark:text-red-300">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default MySelectField;
