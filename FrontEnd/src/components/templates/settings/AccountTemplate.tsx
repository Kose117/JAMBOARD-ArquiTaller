import React from "react";
import ContentSection from "@/components/molecules/ContentSection";
import { DynamicForm, DynamicFormHandles } from "@/components/molecules/Dynamic-form";
import { Button } from "@/components/atoms/ui/button";
import ConfirmDialog from "@/components/organisms/dialogs/ConfirmDialog";
import { Input } from "@/components/atoms/ui/input";
import { Label } from "@/components/atoms/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/atoms/ui/alert";
import { TriangleAlert } from "lucide-react";
import type { FormField } from "@/types/formTypes";

interface AccountTemplateProps {
    title: string;
    desc: string;
    fields: FormField[];
    formRef: React.RefObject<DynamicFormHandles | null>;

    /* -------- acciones & estado -------- */
    /** abre / cierra el diálogo “Actualizar cuenta” */
    onUpdateOpen: (o: boolean) => void;
    updateOpen: boolean;
    /** abre / cierra el diálogo “Eliminar cuenta” */
    onDeleteOpen: (o: boolean) => void;
    deleteOpen: boolean;
    /** callback que realmente hace el update */
    handleConfirmUpdate: () => void;
    /** callback que realmente hace el delete */
    handleConfirmDelete: () => void;

    /* -------- delete confirmation -------- */
    confirmValue: string;
    setConfirmValue: (v: string) => void;

    /* loading flags */
    loading: { update: boolean; del: boolean };
}

/**
 *  UI‑only template para “Mi Cuenta”.
 *  – Formulario con un Email  
 *  – Botón “Actualizar cuenta” + confirmación  
 *  – Botón “Eliminar cuenta” + confirmación destructiva
 */
export default function AccountTemplate({
    title,
    desc,
    fields,
    formRef,
    onUpdateOpen,
    updateOpen,
    onDeleteOpen,
    deleteOpen,
    handleConfirmUpdate,
    handleConfirmDelete,
    confirmValue,
    setConfirmValue,
    loading,
}: AccountTemplateProps) {
    return (
        <ContentSection title={title} desc={desc}>
            <>
                <DynamicForm
                    ref={formRef}
                    formDataConfig={fields}
                    containerClassName="flex flex-col gap-4"
                />

                <div className="flex gap-2 mt-4">
                    <Button onClick={() => onUpdateOpen(true)} disabled={loading.update}>
                        Actualizar cuenta
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={() => onDeleteOpen(true)}
                        disabled={loading.del}
                    >
                        Eliminar cuenta
                    </Button>
                </div>

                {/* -------- Dialogo de ACTUALIZAR -------- */}
                <ConfirmDialog
                    open={updateOpen}
                    onOpenChange={onUpdateOpen}
                    handleConfirm={handleConfirmUpdate}
                    title="¿Actualizar correo?"
                    description="Se guardará tu nuevo correo electrónico."
                    confirmText="Sí, actualizar"
                />

                {/* -------- Dialogo de ELIMINAR -------- */}
                <ConfirmDialog
                    open={deleteOpen}
                    onOpenChange={onDeleteOpen}
                    handleConfirm={handleConfirmDelete}
                    disabled={confirmValue.trim() !== "DELETE"}
                    destructive
                    title={
                        <span className="text-destructive">
                            <TriangleAlert size={18} className="inline-block mr-1" />
                            Eliminar mi cuenta
                        </span>
                    }
                    description={
                        <div className="space-y-4">
                            <p>
                                Esta acción es <strong>irreversible</strong>. Para confirmar, escribe <code>DELETE</code>:
                            </p>
                            <Label>
                                <Input
                                    value={confirmValue}
                                    onChange={(e) => setConfirmValue(e.target.value)}
                                    placeholder="DELETE"
                                />
                            </Label>
                            <Alert variant="destructive">
                                <AlertTitle>¡Atención!</AlertTitle>
                                <AlertDescription>
                                    Tu cuenta y toda tu información se eliminarán permanentemente.
                                </AlertDescription>
                            </Alert>
                        </div>
                    }
                    confirmText="Eliminar"
                />
            </>
        </ContentSection>
    );
}
