import SigninForm from '@/components/auth/SigninForm.tsx/SigninForm'
import { Button, Card, Container, Flex, Heading, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

function LoginPage() {
    return (
        <>
            <Container size={"1"} height={"100%"} className='justify-center'>
                <Flex className='h-screen w-full items-center'>
                    <Card className='w-full m-5' >
                        <div className='p-7'>
                            <Heading>
                                Sign In
                            </Heading>
                            <SigninForm />
                            <Flex className='mt-4' gap={"1"} justify={"center"}>
                                <Text>Don't have an account? </Text>
                                <Link href='/auth/register' className='text-blue-400 font-'>Sign Up</Link>
                            </Flex>
                        </div>
                    </Card>
                </Flex>
            </Container>
        </>
    )
}

export default LoginPage