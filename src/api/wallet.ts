import http from '@src/api/base';

export const getSignMessage = async (): Promise<{ verificationCode: string }> => {
  return http.post('/user/public_key_verify');
};

export const getPublicKeyValidationMessage = async (publicKey: string): Promise<{ message: string }> => {
  return http.post('/signin/zkgirl_validation_message', { publicKey });
};

export const updatePublicKey = async (key: string, signedMessage: string) => {
  return http.patch('/user/public_key_update', { publicKey: key, signedMessage });
};
