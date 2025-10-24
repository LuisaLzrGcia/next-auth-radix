import SigninForm from '@/components/auth/SigninForm.tsx/SigninForm'
import SignupForm from '@/components/auth/SignupForm.tsx/SignupForm'
import { Button, Card, Container, Flex, Heading, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

function RegisterPage() {
  return (
    <>
      <Container size={"1"} height={"100%"} className='justify-center'>
        <Flex className='h-screen w-full items-center'>
          <Card className='w-full' >
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