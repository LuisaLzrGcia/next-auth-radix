import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

interface RouteContext {
    params: {
        taskId: string;
    };
}

export async function GET(request: Request) {
    const url = new URL(request.url);
    const taskId = url.pathname.split("/").pop(); // obtener el último segmento de la URL

    if (!taskId || isNaN(parseInt(taskId))) {
        return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const id = parseInt(taskId);
    const project = await prisma.project.findUnique({ where: { id } });

    if (!project) {
        return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ project }, { status: 200 });
}


export async function DELETE(
    request: Request,
    { params }: { params: { taskId: string } }
) {
    try {
        const { taskId } = params;

        // Validar que el ID sea un número
        const id = parseInt(taskId);
        if (isNaN(id)) {
            return NextResponse.json(
                { error: "ID inválido." },
                { status: 400 }
            );
        }

        // Buscar el proyecto antes de eliminarlo (opcional)
        const existingProject = await prisma.project.findUnique({
            where: { id },
        });

        if (!existingProject) {
            return NextResponse.json(
                { error: `No se encontró el proyecto con ID ${id}.` },
                { status: 404 }
            );
        }

        // Intentar eliminar el proyecto
        const deletedProject = await prisma.project.delete({
            where: { id },
        });

        // Validar que realmente se eliminó (Prisma devuelve el objeto eliminado si tuvo éxito)
        if (!deletedProject) {
            return NextResponse.json(
                { error: `No se pudo eliminar el proyecto con ID ${id}.` },
                { status: 400 }
            );
        }

        // Respuesta exitosa
        return NextResponse.json(
            { message: `Proyecto con ID ${id} eliminado correctamente.` },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code = "P2025") {
                return NextResponse.json(
                    { error: "Proyecto no encontrado" },
                    { status: 404 }
                );
            }
        }

        return NextResponse.json(
            { error: "Ocurrió un error al eliminar el proyecto." },
            { status: 500 }
        );
    }
}


export async function PUT(
    request: Request,
    { params }: { params: { taskId: string } }
) {
    try {
        const { taskId } = params;
        const id = parseInt(taskId);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: "ID inválido." },
                { status: 400 }
            );
        }

        // Leer los datos del body
        const body = await request.json();
        const { title, description } = body;

        // Validaciones simples
        if (!title || !description) {
            return NextResponse.json(
                { error: "El título y la descripción son requeridos." },
                { status: 400 }
            );
        }

        // Verificar que el proyecto exista
        const existingProject = await prisma.project.findUnique({
            where: { id },
        });

        if (!existingProject) {
            return NextResponse.json(
                { error: `No se encontró el proyecto con ID ${id}.` },
                { status: 404 }
            );
        }

        // Actualizar el proyecto
        const updatedProject = await prisma.project.update({
            where: { id },
            data: {
                title,
                description,
                updatedAt: new Date(), // opcional si tienes timestamp
            },
        });

        return NextResponse.json(
            { message: "Proyecto actualizado correctamente", project: updatedProject },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error al actualizar el proyecto:", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return NextResponse.json(
                    { error: "Proyecto no encontrado." },
                    { status: 404 }
                );
            }
        }

        return NextResponse.json(
            { error: "Ocurrió un error al actualizar el proyecto." },
            { status: 500 }
        );
    }
}