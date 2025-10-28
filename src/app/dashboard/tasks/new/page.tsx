"use client"
import { ArrowLeftIcon, TrashIcon } from '@radix-ui/react-icons';
import { Button, Container, Flex, Heading, TextArea, TextField } from '@radix-ui/themes'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

function NewTaskPage() {
    const router = useRouter();

    const params = useParams()
    const { taskId } = params

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const onSubmit = handleSubmit(async (data) => {

        try {
            if (!taskId) {
                const response = await axios.post('/api/tasks', data);
                console.log('Task created:', response.data);
                router.push('/dashboard');
                router.refresh()
            } else {

            }

        } catch (error) {
            console.error('Error creating task:', error);
            // Opcional: mostrar notificación al usuario
        }
    });


    return (
        <>
            {/* Botón Back */}
            <div className="w-full flex justify-center mt-3">
                <div className="w-full max-w-4xl px-4">
                    <div className="mb-6">
                        <Button
                            variant="soft"
                            color="gray"
                            className="flex items-center gap-2 transition-all hover:-translate-x-1"
                            onClick={() => router.back()}
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
                            <span>Back</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Contenedor principal */}
            <Container size="1" className="flex justify-center px-4">
                <div className="w-full max-w-2xl my-12 p-2 md:p-10 rounded-2xl shadow-md border border-gray-200 bg-transparent backdrop-blur-sm">
                    <form
                        onSubmit={onSubmit}
                        className="flex flex-col gap-6"
                    >
                        <Heading
                            size="5"
                            className="text-rose-600 font-semibold mb-2 text-center md:text-left"
                        >
                            {
                                params.taskId ? "Edit Project" : " Create New Project"
                            }
                        </Heading>

                        {/* Project title */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="title"
                                className="text-sm font-medium text-white"
                            >
                                Project title
                            </label>
                            <Controller
                                name="title"
                                control={control}
                                rules={{ required: "The project title cannot be empty" }}
                                render={({ field }) => (
                                    <TextField.Root
                                        id="title"
                                        placeholder="Enter project name"
                                        className="text-white"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.title && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Project description */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="description"
                                className="text-sm font-medium text-white"
                            >
                                Project description
                            </label>
                            <Controller
                                name="description"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextArea
                                        id="description"
                                        placeholder="Enter project description"
                                        className="text-white min-h-[120px]"
                                        {...field}
                                    />
                                )}
                            />
                        </div>

                        {/* Botones de acción */}
                        <Flex justify="between" align="center" gap="3" className="mt-4 w-full">
                            <Button
                                type="submit"
                                className="w-full"
                            >
                                {params.taskId ? "Edit Project" : "Create New Project"}
                            </Button>

                            {params.taskId && (
                                <Button
                                    type="button"
                                    color='ruby'
                                    className="w-full "
                                >
                                    <TrashIcon/>
                                    Delete Project
                                </Button>
                            )}
                        </Flex>


                    </form>
                </div>
            </Container>
        </>
    )
}

export default NewTaskPage