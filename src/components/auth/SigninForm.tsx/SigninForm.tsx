import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons'
import { Button, Flex, TextField } from '@radix-ui/themes'
import React from 'react'

function SigninForm() {
    return (
        <>
            <Flex className='h-auto w-full mt-2' direction={"column"} gap={"3"}>
                <label htmlFor="email">Email:</label>
                <TextField.Root placeholder="email@domain.com" autoFocus>
                    <TextField.Slot>
                        <EnvelopeClosedIcon />
                    </TextField.Slot>
                </TextField.Root>

                <label htmlFor="password">Password:</label>
                <TextField.Root type='password' placeholder="********" autoFocus>
                    <TextField.Slot>
                        <LockClosedIcon />
                    </TextField.Slot>
                </TextField.Root>
                <Button>
                    Sign In
                </Button>
            </Flex>
        </>
    )
}

export default SigninForm