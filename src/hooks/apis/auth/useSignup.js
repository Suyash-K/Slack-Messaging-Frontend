import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { signUpRequest } from '@/apis/auth';


export const useSignup = () => {
    const { isPending, isSuccess, error, mutateAsync: signupMutation } = useMutation({
        mutationFn: signUpRequest,
        onSuccess: (data) => {
            console.log('Successfully signed up', data);
            toast.success('Successfully signed up', {
                description: 'You will be redirected to the login page in a few seconds',
                style: {
                    background: 'var(--success)',
                    color: 'var(--success-foreground)',
                },
                position: 'top-center'
            });
        },
        onError: (error) => {
            console.error('Failed to sign up', error);
            toast.warning('Failed to sign up', {
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
        signupMutation
    };
};