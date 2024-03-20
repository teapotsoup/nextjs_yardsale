import { useForm } from "react-hook-form";

type LoginForm = {
  username: string;
  password: string;
  email: string;
  errors?:string;
};

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>({ mode: "onSubmit" });
  //register는 input을 state에 연결시켜주는 역할

  const onValid = (data: LoginForm) => {
    setError("username", {message:"Taken username"})
  };

  const onInValid = (errors: any) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInValid)}>
      <input
        {...register("username", {
          required: "Username is required",
          minLength: {
            message: "The username should be longer than 5 chars.",
            value: 5,
          },
        })}
        //name이나 onchange들이 포함된 객체 분해
        type="text"
        placeholder="Username"
      />
      {errors.username?.message}
      <input
        {...register("email", {
          required: "Email is required",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "Gmail is not allowed",
          },
        })}
        type="email"
        placeholder="Email"
        className={`${Boolean(errors.email) ? "border-red-500" : ""}`}
      />
      {errors.email?.message}
      <input
        {...register("password", { required: "Password is required" })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
      {errors.errors?.message}
    </form>
  );
}
