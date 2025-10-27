import { prisma } from '@/libs/prisma'
import bcrypt from 'bcryptjs'

interface UserRequestBody {
  name: string
  email: string
  password: string
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    return new Response(
      JSON.stringify({ error: 'Error al obtener usuarios' }),
      { status: 500 }
    )
  }
}


export async function POST(request: Request) {
  try {
    const body: UserRequestBody = await request.json()
    const { name, email, password } = body

    // Validar campos requeridos
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ error: 'Faltan campos requeridos' }),
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'El correo ya está registrado' }),
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return new Response(JSON.stringify(newUser), { status: 201 })
  } catch (error) {
    console.error('Error al crear usuario:', error)
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    )
  }
}
