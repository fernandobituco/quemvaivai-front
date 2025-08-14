import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import EditForm from "@/components/EditForm";

const Profile = () => {

    const { t } = useTranslation()

    const { user, updateUserProfile, deleteUser } = useAuth()

    const fields = [
        { name: "name", label: t('name'), required: true },
        { name: "email", label: "E-mail", type: "email", required: true },
    ]

    const initialValues = {
        name: user.name || "",
        email: user.email || "",
    }

    const handleSubmit = async (values) => {
        values.id = user.id // Adiciona o ID do usuário aos valores
        const newuser = await updateUserProfile(values)
        console.log("Usuário atualizado:", newuser)
        // Aqui vai sua chamada de API
    }
    
    const handleDelete = async () => {
        await deleteUser(user.id)
    }

    return (
        <EditForm
            title="Editar Usuário"
            description="Atualize suas informações de perfil"
            fields={fields}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            submitLabel="Salvar Alterações"
        />
    )
}

export default Profile