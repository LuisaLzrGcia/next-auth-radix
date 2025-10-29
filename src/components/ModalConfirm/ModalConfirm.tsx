"use client"
import * as Dialog from "@radix-ui/react-dialog";
import { Button, Flex, Text } from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";

type ModalConfirmProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
};

export default function ModalConfirm({
    open,
    onOpenChange,
    onConfirm,
    title = "Confirm Action",
    description = "Are you sure you want to proceed?",
}: ModalConfirmProps) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            {/* Fondo gris semi-transparente */}
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />

            <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-md p-6 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gray-900 text-white shadow-lg">
                <Dialog.Title className="text-lg font-bold">{title}</Dialog.Title>
                <Dialog.Description className="mt-2 text-sm text-gray-300">
                    {description}
                </Dialog.Description>

                <Flex justify="end" gap="2" mt="4">
                    <Dialog.Close asChild>
                        <Button variant="soft" color="gray">Cancel</Button>
                    </Dialog.Close>
                    <Button
                        color="ruby"
                        onClick={() => {
                            onConfirm();
                            onOpenChange(false);
                        }}
                    >
                        Confirm
                    </Button>
                </Flex>

                <Dialog.Close asChild>
                    <button className="absolute top-3 right-3 text-gray-300 hover:text-white">
                        <Cross2Icon />
                    </button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Root>

    );
}
