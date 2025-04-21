import AuthForm from "@/components/organisms/Auth-form"
import { FormField } from "@/types/formTypes"
import { LoginInput, User } from "../../types"
import fondoFrutal from "../../assets/Fondo1.jpg"

interface AuthTemplateProps {
  loginFields: FormField[]
  registryFields: FormField[]
  onLogin: (values: LoginInput) => void
  onRegister: (values: User) => void
}

export default function AuthTemplate({
  loginFields,
  registryFields,
  onLogin,
  onRegister,
}: AuthTemplateProps) {
  return (
    <main
      className="grid h-screen w-screen p-8 gap-8 overflow-x-hidden grid-cols-1 xl:grid-cols-2 "
      style={{ backgroundImage: `url(${fondoFrutal})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div></div>
      <section className=" h-fit max-w-md p-6 bg-white rounded-lg shadow-md justify-self-center w-1/2 overflow-x-auto self-center">
      <AuthForm
        loginFields={loginFields}
        registryFields={registryFields}
        onLogin={onLogin}
        onRegister={onRegister}
      />
      </section>
    </main>
  )
}