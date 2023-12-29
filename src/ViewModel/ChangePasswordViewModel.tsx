import { useState } from 'react';
import { ChangePasswordRepository } from '../Repository/ChangePasswordRepository';

const useChangePasswordViewModel = (onSuccess: () => void) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changePasswordRepository = new ChangePasswordRepository();

  const sendEmail = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await changePasswordRepository.sendEmail(email);

      if (result?.status !== 200) {
        setError(result?.data?.message);
      }
    } catch (error) {
      setError('Error de red o del servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await changePasswordRepository.updatePassword(email, code, newPassword);

      if (result?.status === 200) {
        onSuccess();
      } else {
        setError(result?.data?.message);
      }
    } catch (error) {
      setError('Error de red o del servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    code,
    newPassword,
    isLoading,
    error,
    setEmail,
    setCode,
    setNewPassword,
    sendEmail,
    updatePassword,
  };
};

export default useChangePasswordViewModel;