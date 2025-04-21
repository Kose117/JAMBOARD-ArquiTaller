import AuthTemplate from '@/components/templates/AuthTemplate';
import { FormField } from '@/types/formTypes';
import { useAuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import type { User } from '@/types';

const loginFields: FormField[] = [
  { type: 'email', key: 'email', placeholder: 'Correo', required: true },
  { type: 'password', key: 'password', placeholder: 'Contraseña', required: true },
];

const registryFields: FormField[] = [
  { type: 'email', key: 'email', placeholder: 'Correo', required: true },
  { type: 'password', key: 'password', placeholder: 'Contraseña', required: true },
];

export default function AuthScreen() {
  const { login, createAccount } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    await login(email, password);
    navigate('/estadisticas');
  };

  const handleRegister = async (user: User) => {
    await createAccount(user.email, user.password);
    navigate('/estadisticas');
  };

  return (
    <AuthTemplate
      loginFields={loginFields}
      registryFields={registryFields}
      onLogin={handleLogin}
      onRegister={handleRegister}
    />
  );
}
