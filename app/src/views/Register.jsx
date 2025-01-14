import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { useSession } from "../utils/authConfig";

export function Register() {
  const { signInWithGoogle, registerWithEmail } = useSession();

  const schemaRegister = Yup.object().shape({
    username: Yup.string()
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
      .required("El nombre de usuario es requerido"),
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo electrónico es requerido"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es requerida"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("Confirmar la contraseña es requerido"),
  });

  return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Registro de Usuario
        </h1>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={schemaRegister}
          onSubmit={(values) => {
            console.log("Valores del formulario:", values);
            registerWithEmail(values.email, values.password, values.username);
          }}
        >
          {() => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de Usuario
                </label>
                <Field
                  name="username"
                  type="text"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
                  autoComplete="off"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo Electrónico
                </label>
                <Field
                  name="email"
                  type="email"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
                  autoComplete="off"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <Field
                  name="password"
                  type="password"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
                  autoComplete="off"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirmar Contraseña
                </label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
                  autoComplete="off"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>
              <button
                className="w-full rounded-lg bg-indigo-600 p-3 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                type="submit"
              >
                Registrar
              </button>
              <div className="z-30 flex items-center justify-evenly">
                <button
                  onClick={signInWithGoogle}
                  className="cursor-pointer p-2"
                >
                  <FcGoogle size="50" />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
