import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useSession } from "../utils/authConfig";
import { FcGoogle } from "react-icons/fc";
import { Button } from "antd";

export function Login() {
  const { signInWithGoogle, signInWithEmail } = useSession();
  const schemaLogin = Yup.object().shape({
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo electrónico es requerido"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es requerida"),
  });

  return (
    <div className="mt-[100px] flex h-[100vh] items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Iniciar Sesión
        </h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={schemaLogin}
          onSubmit={(values) => {
            signInWithEmail(values.email, values.password);
          }}
        >
          {() => (
            <Form>
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
              <div className="flex justify-evenly">
                <Link to="/register">
                  <Button className="border-none">Registrarse</Button>
                </Link>
                <Link to="/reset-password">
                  <Button className="border-none">Olvidé mi contraseña</Button>
                </Link>
              </div>
              <button
                className="my-2 w-full rounded-lg bg-indigo-600 p-3 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                type="submit"
              >
                Iniciar Sesión
              </button>

              <div className="z-30 mt-4 flex items-center justify-evenly">
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

export default Login;
