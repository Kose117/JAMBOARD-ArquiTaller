import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { DynamicFormHandles } from "@/components/molecules/Dynamic-form";
import AccountTemplate from "@/components/templates/settings/AccountTemplate";
import { useUserActions } from "@/hooks/flux/user/useUserActions";
import type { FormField } from "@/types/formTypes";

const accountFields: FormField[] = [
    {
        type: "email",
        key: "email",
        placeholder: "Ingrese su correo",
        required: true,
    },
];

export default function AccountScreen() {
    const formRef = useRef<DynamicFormHandles>(null);
    const { updateUser, deleteUser } = useUserActions();
    const navigate = useNavigate();

    /* dialogs + confirm texto */
    const [updateOpen, setUpdateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [confirmValue, setConfirmValue] = useState("");

    /* loading flags de peticiones */
    const [loadingUp, setLoadingUp] = useState(false);
    const [loadingDel, setLoadingDel] = useState(false);


    /* ------------ update & delete handlers ------------ */

    const handleConfirmUpdate = async () => {
        formRef.current?.handleSubmit(async (data) => {
            try {
                setLoadingUp(true);
                await updateUser({ email: data.email });
                toast.success("Correo actualizado");
                setUpdateOpen(false);
            } catch {
                toast.error("Error al actualizar cuenta");
            } finally {
                setLoadingUp(false);
            }
        })();
    };

    const handleConfirmDelete = async () => {
        try {
            setLoadingDel(true);
            await deleteUser();
            toast.success("Cuenta eliminada");
            navigate("/auth");
        } catch {
            toast.error("No se pudo eliminar la cuenta");
        } finally {
            setLoadingDel(false);
        }
    };

    /* ------------ render ------------ */

    return (
        <AccountTemplate
            title="Mi Cuenta"
            desc="Actualiza tu correo o elimina completamente tu cuenta."
            fields={accountFields}
            formRef={formRef}
            /* actions & state for dialogs */
            onUpdateOpen={setUpdateOpen}
            updateOpen={updateOpen}
            onDeleteOpen={setDeleteOpen}
            deleteOpen={deleteOpen}
            handleConfirmUpdate={handleConfirmUpdate}
            handleConfirmDelete={handleConfirmDelete}
            confirmValue={confirmValue}
            setConfirmValue={setConfirmValue}
            loading={{ update: loadingUp, del: loadingDel }}
        />
    );
}
