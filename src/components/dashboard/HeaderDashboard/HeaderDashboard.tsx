"use client"
import { Button, Container, Heading } from '@radix-ui/themes'
import { useRouter } from 'next/navigation';
import React from 'react'

function HeaderDashboard() {

    const router = useRouter();

    return (
        <>
            <Container size="3" className="my-10 px-4 md:px-12 w-full">
                <div className="flex flex-row items-center justify-between gap-4 w-full">
                    <Heading size="4" className="text-blue-600 font-bold">
                        TASKS
                    </Heading>
                    <Button
                        variant="outline"
                        size="3"
                        className="px-6 py-2 text-sm md:text-base"
                        onClick={() => router.push("/dashboard/tasks/new")}
                    >
                        Create New Task
                    </Button>
                </div>
            </Container>


        </>
    )
}

export default HeaderDashboard