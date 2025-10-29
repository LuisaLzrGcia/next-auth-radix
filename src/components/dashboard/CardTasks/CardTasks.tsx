"use client"
import { Card, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function CardTasks(
    { task }: { task: { id: string; title: string; description: string } }
) {

    const router = useRouter()
    return (

        <>
            <Card key={task.id}
                onClick={() => router.push(`/dashboard/tasks/${task.id}`)}
                className="p-4 w-full
                    hover:shadow-lg hover:bg-gray-900 hover:cursor-pointer">
                <Heading size="5">{task.title}</Heading>
                <Text className="mt-2 text-gray-600">{task.description}</Text>
            </Card>
        </>

    );
}
