import CardTasks from '@/components/dashboard/CardTasks/CardTasks';
import HeaderDashboard from '@/components/dashboard/HeaderDashboard/HeaderDashboard';
import { prisma } from '@/libs/prisma';
import { Card, Container, Grid, Heading, Text } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route';

async function loadData(userId: number) {

  return await prisma.project.findMany({
    where: {
      userId: userId
    }
  });
}

async function DashboardPage() {
  const session = await getServerSession(authOptions)

  const tasksFromDb = await loadData(parseInt(session?.user.id as string));

  const tasks = tasksFromDb.map((task) => ({
    id: task.id.toString(),
    title: task.title,
    description: task.description || "",
  }));
  return (
    <>
      <HeaderDashboard />
      <Container>
        <Grid
          columns={{ initial: "3", md: "5", xl: "7", }}
          gap="4"
          className="p-4 flex justify-items-center"
        >
          {tasks.map((task) => (
            <CardTasks task={task} key={task.id} />
          ))}
        </Grid>
      </Container>

    </>
  )
}

export default DashboardPage