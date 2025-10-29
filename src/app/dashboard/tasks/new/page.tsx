"use client"
import ModalConfirm from '@/components/ModalConfirm/ModalConfirm';
import { ArrowLeftIcon, TrashIcon } from '@radix-ui/react-icons';
import { Button, Container, Flex, Heading, TextArea, TextField } from '@radix-ui/themes'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner';

function NewTaskPage() {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const router = useRouter();

    const params = useParams() as { taskId: string }
    const { taskId } = params

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            setLoading(true);
            if (!taskId) {
                await axios.post('/api/tasks', data);
                toast.success('Task created');
                router.push("/dashboard");
            } else {
                await axios.put(`/api/tasks/${taskId}`, data);
                router.push("/dashboard");
                toast.success('Task updated');
            }

        } catch (error) {
            console.error(error);
            toast.error('Ocurrió un error al guardar el proyecto.');
        } finally {
            setLoading(false);
        }
    });


    // Borrar proyecto
    const handleDelete = async (taskId: string) => {
        try {
            const res = await axios.delete(`/api/tasks/${taskId}`);
            toast.success(res.data.message || "Project deleted successfully");
            router.push("/dashboard");
            router.refresh();
        } catch (error) {
            console.error("Error deleting project:", error);
            toast.error("Error deleting project");
        }
    };

    useEffect(() => {
        if (!taskId) return;

        const fetchTask = async () => {
            try {
                const res = await axios.get(`/api/tasks/${taskId}`);
                const project = res.data.project; // según cómo devuelva tu API

                if (project) {
                    // Llenar los campos del formulario
                    setValue("title", project.title);
                    setValue("description", project.description);
                }
            } catch (error) {
                console.error("Error al obtener el proyecto:", error);
                alert("No se pudo cargar el proyecto.");
            }
        };

        fetchTask();
    }, [taskId, setValue]);


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
                                disabled={loading} // Deshabilitar mientras se ejecuta la petición
                            >
                                {params.taskId ? "Edit Project" : "Create New Project"}
                            </Button>

                            {taskId && (
                                <Button
                                    type="button"
                                    color="ruby"
                                    className="w-full"
                                    onClick={() => setModalOpen(true)}
                                    disabled={loading} // También deshabilitar el botón de borrar
                                >
                                    <TrashIcon />
                                    Delete Project
                                </Button>
                            )}
                        </Flex>

                    </form>
                </div>
            </Container>

            {/* Modal de confirmación */}
            <ModalConfirm
                open={modalOpen}
                onOpenChange={setModalOpen}
                onConfirm={() => handleDelete(params.taskId!)}
                title="Delete Project"
                description="Are you sure you want to delete this project? This action cannot be undone."
            />
        </>
    )
}

export default NewTaskPage