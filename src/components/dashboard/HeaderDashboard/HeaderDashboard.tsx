"use client"
import { Button, Container, Heading } from '@radix-ui/themes'
import { useRouter } from 'next/navigation';
import React from 'react'

function HeaderDashboard() {

    const router = useRouter();

    return (
        <>
            <Container size={"1"} className='my-10 mx-12'>
                <div className="flex justify-between gap-4">
                    <Heading> Tasks </Heading>
                    <Button onClick={() => router.push("/dashboard/tasks/new")}> Create New Task </Button>
                </div>
            </Container>
        </>
    )
}

export default HeaderDashboard