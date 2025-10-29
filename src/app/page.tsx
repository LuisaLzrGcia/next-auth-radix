import { Container } from '@radix-ui/themes'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata: Metadata = {
  title: "Home page",
  description: "Description"
}

async function HomePage() {

  const session = await getServerSession()
  if (session) {
    redirect("/dashboard")
  }
  return (
    <Container size="2" className="py-20 px-4" >
      <header className="border border-blue-600 text-center max-w-2xl mx-auto bg-gray-800/70 backdrop-blur-md p-10 rounded-2xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-6">
          NextAuth + Radix
        </h1>
        <p className="text-gray-200 text-lg md:text-xl mb-8">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam pariatur autem
          deleniti ratione quo veniam! Suscipit, libero quibusdam aut praesentium ea quidem
          earum repudiandae, impedit delectus excepturi quis numquam exercitationem.
        </p>
        <Link
          className="px-4 py-2 text-lg bg-blue-600 rounded-md hover:bg-blue-500"
          href='/auth/login'
        >
          Ingresar
        </Link>
      </header>
    </Container>
  )
}

export default HomePage
