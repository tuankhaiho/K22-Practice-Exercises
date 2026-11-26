import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const registerSchema = z
    .object({
        email: z
            .string()
            .min(1, "Vui lòng nhập email")
            .pipe(z.email("Email không đúng định dạng")),
        password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
        confirmPassword: z.string().min(1, "Vui lòng nhập lại mật khẩu"),
    })
    .refine((data) => data.confirmPassword === data.password, {
        message: "Mật khẩu nhập lại không khớp",
        path: ["confirmPassword"],
    });

const inputClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: { email: "", password: "", confirmPassword: "" },
    });

    const onSubmit = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        alert("Đăng ký thành công!");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mx-auto max-w-md space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
            <h2 className="text-xl font-semibold">Đăng ký tài khoản</h2>

            <div>
                <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    className={inputClass}
                    {...register("email")}
                />
                {errors.email && (
                    <p style={{ color: "red" }}>{errors.email.message}</p>
                )}
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="mb-1 block text-sm font-medium"
                >
                    Mật khẩu
                </label>
                <input
                    id="password"
                    type="password"
                    className={inputClass}
                    {...register("password")}
                />
                {errors.password && (
                    <p style={{ color: "red" }}>{errors.password.message}</p>
                )}
            </div>

            <div>
                <label
                    htmlFor="confirmPassword"
                    className="mb-1 block text-sm font-medium"
                >
                    Nhập lại mật khẩu
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    className={inputClass}
                    {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                    <p style={{ color: "red" }}>
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
            </button>
        </form>
    );
}
