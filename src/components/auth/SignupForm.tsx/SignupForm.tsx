'use client';
import { EnvelopeClosedIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text, TextField } from '@radix-ui/themes'
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { use } from 'react'
import { Controller, useForm } from 'react-hook-form';

function SignupForm() {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm(
        {
            values: {
                name: '',
                email: '',
                password: ''
            }
        }
    );

    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        const res = await axios.post('/api/auth/register', data)
        if (res.status === 201) {
            const resul = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            })
        }

        if (!res.status || res.status !== 201) {
            console.error('Registration failed');
            return;
        }

        router.push('/dashboard');
    })
    return (
        <>
            <form onSubmit={onSubmit}>
                <Flex className='h-auto w-full mt-2' direction={"column"} gap={"3"}>
                    <label htmlFor="name">Name:</label>
                    <Controller
                        name="name"
                        control={control}
                        rules={{
                            required: {
                                message: "Name is required",
                                value: true
                            },
                            validate: {
                                noNumbers: (value) =>
                                    !/\d/.test(value) || "Name cannot contain numbers",
                            }
                        }}
                        render={({ field }) => (
                            <TextField.Root
                                placeholder="Jhon Doe"
                                autoFocus
                                {...field}>
                                <TextField.Slot>
                                    <PersonIcon />
                                </TextField.Slot>
                            </TextField.Root>
                        )}
                    />
                    {
                        errors.name &&
                        <Text size={'1'} color='ruby'>{errors.name.message}</Text>
                    }

                    <label htmlFor="email">Email:</label>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: {
                                message: "Email is required",
                                value: true
                            }
                        }}
                        render={({ field }) => (
                            <TextField.Root
                                type='email'
                                placeholder="email@domain.com"
                                autoFocus
                                {...field}
                            >
                                <TextField.Slot>
                                    <EnvelopeClosedIcon />
                                </TextField.Slot>
                            </TextField.Root>
                        )}
                    />
                    {
                        errors.email &&
                        <Text size={'1'} color='ruby'>{errors.email.message}</Text>
                    }

                    <label htmlFor="password">Password:</label>
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: {
                                message: "Password is required",
                                value: true
                            },
                            minLength: {
                                message: "Password must be at least 8 characters",
                                value: 8
                            },
                            validate: {
                                hasNumber: (value) =>
                                    /[0-9]/.test(value) || "Password must contain at least one number",
                                hasUpperCase: (value) =>
                                    /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                                hasLowerCase: (value) =>
                                    /[a-z]/.test(value) || "Password must contain at least one lowercase letter",
                            }
                        }}
                        render={({ field }) => (
                            <TextField.Root
                                type='password'
                                placeholder="********"
                                autoFocus
                                {...field}
                            >
                                <TextField.Slot>
                                    <LockClosedIcon />
                                </TextField.Slot>
                            </TextField.Root>
                        )} />
                    {
                        errors.password &&
                        <Text size={'1'} color='ruby'>{errors.password.message}</Text>
                    }
                    <Button type='submit'>
                        Sign Up
                    </Button>
                </Flex>
            </form>
        </>
    )
}

export default SignupForm