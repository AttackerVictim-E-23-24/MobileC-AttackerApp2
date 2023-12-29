import { useState } from 'react';
import { LoginRepository } from '../Repository/LoginRepository';
import { useHistory } from 'react-router-dom';

const useLoginViewModel = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const loginRepository = new LoginRepository();

  const login = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Llama a la función de autenticación del Repository
      const result = await loginRepository.login(username, password);

      // Manejar el resultado, por ejemplo, redirigir a la página de inicio si es exitoso
      if (result.respuesta === true) {
        history.push('/home');
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Error de red o del servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    password,
    isLoading,
    error,
    setUsername,
    setPassword,
    login,
  };
};

export default useLoginViewModel;