import { useForm } from "react-hook-form";

function App() {
  /*handlesubmit: We can handled our form and add our own logic */
  /*formState: Can tell us what component has faild*/
  const {
    register,
    handleSubmit,
    formState: { errors } /* It works for capturate the errors in the form*/,
    watch /*To see values in the form*/,
    setValue,
    reset,
  } = useForm();

  console.log(errors);

  const onSubmit = handleSubmit((data) => {
    console.log(data);

    alert("Sending data...");

    reset();
  });

  return (
    <main className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
      <div className="container bg-gray-800 w-full sm:w-2/3 lg:w-2/3 xl:w-2/4 rounded-lg p-6">
        {/* Formulario */}
        <form onSubmit={onSubmit} className="space-y-4">
          <h1 className="text-4xl font-bold">Form using hook form</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="firstname" className="block text-sm mb-1">
                Name
              </label>
              <input
                type="text"
                {...register("firstname", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                  minLength: {
                    value: 2,
                    message: "The name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "The name must have a maximum of 20 characters",
                  },
                })}
                className="bg-gray-800 text-white border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.firstname && (
                <span className="text-red-500 text-sm">{errors.firstname.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Email invalid",
                  },
                })}
                className="bg-gray-800 text-white border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                })}
                className="bg-gray-800 text-white border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Password confirm is required",
                  },
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="bg-gray-800 text-white border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="birthDate" className="block text-sm mb-1">
                Birth Date
              </label>
              <input
                type="date"
                {...register("birthDate", {
                  required: {
                    value: true,
                    message: "Birthdate is required",
                  },
                  validate: (value) => {
                    const birthday = new Date(value);
                    const actualDate = new Date();
                    const age = actualDate.getFullYear() - birthday.getFullYear();
                    return age >= 18 || "You must be older than 18 years old";
                  },
                })}
                className="bg-gray-800 text-white border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.birthDate && (
                <span className="text-red-500 text-sm">{errors.birthDate.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="country" className="block text-sm mb-1">
                Country
              </label>
              <select
                {...register("country")}
                className="bg-gray-800 text-white border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="mx">Mexico</option>
                <option value="sv">El Salvador</option>
                <option value="gt">Guatemala</option>
                <option value="p">Peru</option>
              </select>
            </div>

            {watch("country") === "sv" && (
              <div>
                <label htmlFor="department" className="block text-sm mb-1">
                  Department
                </label>
                <input
                  type="text"
                  {...register("department", {
                    required: {
                      value: true,
                      message: "Department is required",
                    },
                  })}
                  className="bg-gray-800 text-white border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.department && (
                  <span className="text-red-500 text-sm">{errors.department.message}</span>
                )}
              </div>
            )}

            <div>
              <label htmlFor="picture" className="block text-sm mb-1">
                Your picture
              </label>
              <input
                type="file"
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setValue("userPic", e.target.files[0].name);
                }}
                className="bg-gray-800 text-white border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="terms" className="block text-sm mb-1">
                Accepts terms and conditions
              </label>
              <input
                type="checkbox"
                {...register("terms", {
                  required: { value: true, message: "Terms are required" },
                })}
                className="bg-gray-800 text-white border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.terms && (
                <span className="text-red-500 text-sm">{errors.terms.message}</span>
              )}
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
              Send
            </button>
          </div>
        </form>

        {/* Resultado en otra columna */}
        <div className="mt-8">
          <pre className="bg-gray-700 text-white p-4 rounded-md overflow-auto max-h-80">
            {JSON.stringify(watch(), null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}

export default App;
