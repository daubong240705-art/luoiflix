import z from "zod";

//schema
export const movieSchema = z
    .object({
        title: z
            .string()
            .min(1, "Tiêu đề không được để trống")
            .max(255, "Tiêu đề quá dài"),

        slug: z
            .string()
            .min(1, "Slug không được để trống")
            .regex(/^[a-z0-9-]+$/, "Slug chỉ gồm chữ thường, số và dấu -"),

        description: z
            .string()
            .min(1, "Mô tả không được để trống"),

        type: z.enum(["SINGLE", "SERIES"], {
            message: "Type không hợp lệ",
        }),

        status: z.enum(["ONGOING", "COMPLETED"], {
            message: "Status không hợp lệ",
        }),

        posterUrl: z
            .string()
            .url("Poster phải là URL hợp lệ")
            .optional()
            .or(z.literal("")),

        thumbUrl: z
            .string()
            .url("Thumbnail phải là URL hợp lệ")
            .optional()
            .or(z.literal("")),

        publishYear: z.coerce
            .number<number>()
            .int("Năm phải là số nguyên")
            .min(1900, "Năm không hợp lệ")
            .max(new Date().getFullYear(), "Năm không hợp lệ"),

        categoryIds: z
            .array(z.number().int().positive())
            .min(1, "Phải chọn ít nhất 1 thể loại"),
    })



export const categorySchema = z.object({
    name: z
        .string()
        .min(1, "Tên không được để trống")
        .max(255, "Tên quá dài"),

    slug: z
        .string()
        .min(1, "Slug không được để trống")
        .regex(/^[a-z0-9-]+$/, "Slug chỉ gồm chữ thường, số và dấu -"),
})




export const userSchema = z
    .object({
        fullName: z.string().min(2, "Tên tối thiểu 2 ký tự"),
        username: z.string().min(3, "Username tối thiểu 3 ký tự"),
        email: z.string().email("Email không hợp lệ"),
        role: z.enum(["ADMIN", "USER"]),

        password: z
            .string()
            .min(6, "Mật khẩu tối thiểu 6 ký tự")
            .optional()
            .or(z.literal("")),

        confirmPassword: z
            .string()
            .optional()
            .or(z.literal("")),
    })
    .superRefine((data, ctx) => {
        if (data.password && data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: "custom",
                path: ["confirmPassword"],
                message: "Mật khẩu không khớp",
            });
        }
    });


export const episodeSchema = z.object({
    name: z.string().min(1, "Tiêu đề không được để trống").max(255, "Tiêu đề quá dài"),
    slug: z
        .string()
        .min(1, "Slug khong duoc de trong")
        .regex(/^[a-z0-9-]+$/, "Slug chỉ gồm chữ thường, số và dấu -"),
    videoUrl: z.string(),
    episodeOrder: z.coerce.number<number>().int("Thứ tự phải là số nguyên").min(1, "Thứ tự phải >= 1"),
});



export const loginSchema = z.object({
    username: z
        .string()
        .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),

    password: z
        .string()
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
})

export type LoginForm = z.infer<typeof loginSchema>

export const signupSchema = z
    .object({
        fullName: z.string().min(1, "Họ tên không được để trống"),
        email: z.string().email("Email không hợp lệ"),
        username: z.string().min(3, "Tên đăng nhập phải có í nhất 3 ký tự"),
        password: z.string().min(6, "Mật khẩu phải có í nhất 6 ký tự"),
        confirmPassword: z.string().min(6, ""),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu xác nhận không chính xác",
        path: ["confirmPassword"],
    })

export type SignupForm = z.infer<typeof signupSchema>


export type MovieFormValues = z.infer<typeof movieSchema>;
export type CategoryFormValues = z.infer<typeof categorySchema>;
export type UserFormValues = z.infer<typeof userSchema>;
export type UserSubmitValues = z.infer<typeof userSchema>;
export type EpisodeFormValues = z.infer<typeof episodeSchema>;


//payload

export type MoviePayload = {
    title: string;
    slug: string;
    description: string;
    type: MovieType;
    status: MovieStatus;
    posterUrl?: string;
    thumbUrl?: string;
    publishYear: number;
    categoryIds: number[];
};

export type MovieSubmitPayload = MoviePayload & {
    posterFile?: File | null;
    thumbFile?: File | null;
};

export type EpisodePayload = {
    movieId?: number;
    name: string;
    slug: string;
    videoUrl: string;
    episodeOrder: number;
};


export type CategoryPayload = {
    name: string;
    slug: string;
};


export type UserPayload = {
    fullName: string;
    username: string;
    email: string;
    role: Role;
    password?: string;
    avatarUrl?: string;
};

export type UserSubmitPayload = UserPayload & {
    avatarFile?: File | null;
};
