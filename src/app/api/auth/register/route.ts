import { prisma } from '@/libs/prisma'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

interface UserRequestBody {
  name: string
  email: string
  password: string
}

export async function POST(request: Request) {
  try {
    const body: UserRequestBody = await request.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return new NextResponse(
        JSON.stringify({ error: 'Faltan campos requeridos' }),
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ error: 'El correo ya está registrado' }),
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.genSalt(10).then((salt) => {
      return bcrypt.hash(password, salt)
    })

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    const { password: _, ...user } = newUser  

    return new NextResponse(JSON.stringify(user), { status: 201 })
  } catch (error) {
    console.error('Error al crear usuario:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    )
  }
}
