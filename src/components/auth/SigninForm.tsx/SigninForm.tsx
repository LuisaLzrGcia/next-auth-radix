'use client';
import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text, TextField } from '@radix-ui/themes'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'

function SigninForm() {

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm(
        {
            values: {
                email: '',
                password: ''
            }
        }
    );

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    })

    return (
        <>
            <form onSubmit={onSubmit}>
                <Flex className='h-auto w-full mt-2' direction={"column"} gap={"3"}>
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
                        Sign In
                    </Button>
                </Flex>
            </form>
        </>
    )
}

export default SigninForm