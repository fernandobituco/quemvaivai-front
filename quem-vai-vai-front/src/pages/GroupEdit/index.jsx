import { useLoading } from "@/contexts/LoadingContext"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import * as GroupService from "@/services/groups.service"
import EditForm from "@/components/Forms/EditForm"

const GroupEdit = () => {

    const { t } = useTranslation()
    const { showLoading, hideLoading } = useLoading()
    const location = useLocation()
    const { id } = useParams()
    const navigate = useNavigate()

    const [group, setGroup] = useState(location.state?.group || null)

    const getGorup = async () => {
        const response = await GroupService.getGroupById(id)
        setGroup(response.Data)
        setInitialValues({
            name: response.Data?.Name || "",
            description: response.Data?.Description || "",
        })
    }
    useEffect(() => {
        if (!group && id) {
            showLoading()
            getGorup(id)
            hideLoading()
        }
    }, [id, group])

    const fields = [
        { name: "name", label: t('name'), required: true },
        { name: "description", label: t('description'), required: false },
    ]

    const [initialValues, setInitialValues] = useState({
        name: group?.Name || "",
        description: group?.Description || "",
    })

    const handleSubmit = async (values) => {
        showLoading()
        values.id = group.Id
        try {
            const newGroup = await GroupService.updateGroup(values)
        } finally {
            hideLoading()
        }
    }

    const handleDelete = async () => {
        showLoading()
        try {
            const response = await GroupService.deleteGroup(group.Id)
            if (response.StatusCode == 200) {
                hideLoading()
                navigate('/groups')
            }
        } finally {
            hideLoading()
        }
    }
    return (
        <EditForm
            title="Editar Grupo"
            description="Atualize suas informações do grupo"
            fields={fields}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            submitLabel="Salvar Alterações"
        />
    )
}

export default GroupEdit