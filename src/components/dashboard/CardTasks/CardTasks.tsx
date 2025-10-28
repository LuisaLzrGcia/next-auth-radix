import { Card, Heading, Text } from "@radix-ui/themes";
import { Grid, Flex } from "@radix-ui/themes";

export default function CardTasks({ tasks }: { tasks: { id: string; title: string; description: string }[] }) {
    return (
        <Grid
            columns={{ initial: "3", md: "5", xl: "7", }}
            gap="4"
            className="p-4 flex justify-items-center"
        >
            {tasks.map((task) => (
                <Card key={task.id}
                    className="p-4 w-full
                    hover:shadow-lg hover:bg-gray-900 hover:cursor-pointer">
                    <Heading size="2">{task.title}</Heading>
                    <Text className="mt-2 text-gray-600">{task.description}</Text>
                </Card>
            ))}
        </Grid>
    );
}
