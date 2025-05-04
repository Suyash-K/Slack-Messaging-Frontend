import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { signInRequest } from '@/apis/auth';

export const useSignin = () => {
    const { isPending, isSuccess, error, mutateAsync: signinMutation } = useMutation({
        mutationFn: signInRequest,
        onSuccess: (response) => {
            console.log('Scuccessfully signed in', response);

            const userObject = JSON.stringify(response.data);

            localStorage.setItem('user', userObject);
            localStorage.setItem('token', response.data.token);
            
            toast.success('Successfully signed in', {
                description: 'You will be redirected to the home page in a few seconds',
                style: {
                    background: 'var(--success)',
                    color: 'var(--success-foreground)',
                },
                position: 'top-center'
            });
        },
        onError: (error) => {
            console.error('Failed to sign in', error);
            toast.warning('Failed to sign in', {
                            description: error?.response?.data?.message || 'Something went wrong',
                            style: {
                                background: 'var(--destructive)',
                                color: 'var(--destructive-foreground)',
                            },
                            position: 'top-center'
                        });
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        signinMutation
    };
};