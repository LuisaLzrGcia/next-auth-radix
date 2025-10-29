import SigninForm from '@/components/auth/SigninForm.tsx/SigninForm'
import SignupForm from '@/components/auth/SignupForm.tsx/SignupForm'
import { Button, Card, Container, Flex, Heading, Text } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

async function RegisterPage() {
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
                Sign Up
              </Heading>
              <SignupForm />
              <Flex className='mt-4' gap={"1"} justify={"center"}>
                <Text>Already have an account? </Text>
                <Link href='/auth/login' className='text-blue-400 font-bold'>Sign In</Link>
              </Flex>
            </div>
          </Card>
        </Flex>
      </Container>
    </>
  )
}

export default RegisterPage