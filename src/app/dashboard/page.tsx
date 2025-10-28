"use client"
import { Button, Container, Heading } from '@radix-ui/themes'
import { useRouter } from 'next/navigation';
import React from 'react'

function DashboardPage() {

  const router = useRouter();
  return (
    <>
      <Container className='my-10'>
        <div className="flex justify-between gap-4">
          <Heading > Tasks </Heading>
        <Button onClick={()=>router.push("/dashboard/tasks/new")}> Create New Task </Button>
        </div>
      </Container>
    </>
  )
}

export default DashboardPage