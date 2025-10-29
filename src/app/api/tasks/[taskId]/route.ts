import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";


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
