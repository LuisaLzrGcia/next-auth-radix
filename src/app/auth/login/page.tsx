import SigninForm from '@/components/auth/SigninForm.tsx/SigninForm'
import { Button, Card, Container, Flex, Heading, Text } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

async function LoginPage() {

    const session = await getServerSession()
      if (session) {
        redirect("/dashboard")
      }

    return (
        <>
            <Container size={"1"} height={"100%"} className='justify-center'>
                <Flex className='h-[calc(100vh-10rem)] w-full items-center'>
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