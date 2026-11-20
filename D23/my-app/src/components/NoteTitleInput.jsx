import { useImperativeHandle, useRef } from "react";

export default function NoteTitleInput({ ref, value, onChange, invalid }) {
    const inputRef = useRef(null);
    useImperativeHandle(
        ref,
        () => ({
            focus() {
                inputRef.current?.focus();
            },
        }),
        [],
    );
    return (
        <input
            ref={inputRef}
            type="text"
            placeholder="Nhập tiêu đề..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={invalid}
            className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition outline-none border ${
                invalid
                    ? "border-red-400 bg-red-50/40 text-red-900 placeholder-red-300 focus:ring-2 focus:ring-red-400"
                    : "border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }`}
        />
    );
}
