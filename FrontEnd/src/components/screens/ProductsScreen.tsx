import  {
  useEffect,
  useMemo,
  useState,
} from 'react'
import ProductTemplate from '@/components/templates/ProductTemplate'
import ModalForm from '@/components/organisms/dialogs/ModalForm'
import { ColumnConfig } from '@/types/table'
import { Button } from '@/components/atoms/ui/button'
import { Calendar } from '@/components/atoms/ui/calendar'
import { toast } from 'sonner'

import { useProductStore } from '@/hooks/flux/product/useProductStore'
import { useProductActions } from '@/hooks/flux/product/useProductActions'

const usd = (v: number) =>
  `$${v.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

const fmtDate = (d: string | Date) =>
  new Date(d).toISOString().split('T')[0]

const toTableRow = (p: any) => ({
  id: p.id,
  name: p.name,
  price: usd(p.price),
  quantity: p.quantity,
  expirationDate: fmtDate(p.expirationDate),
})

function columns({
  onEdit,
  onDelete,
}: {
  onEdit: (row: any) => void
  onDelete: (row: any) => void
}): ColumnConfig[] {
  return [
    { id: 'id', accessorKey: 'id', headerLabel: 'ID', searchable: true },
    { id: 'name', accessorKey: 'name', headerLabel: 'Nombre', searchable: true },
    { id: 'price', accessorKey: 'price', headerLabel: 'Precio (USD)' },
    { id: 'quantity', accessorKey: 'quantity', headerLabel: 'Stock' },
    { id: 'expirationDate', accessorKey: 'expirationDate', headerLabel: 'Vence' },
    {
      id: 'actions',
      type: 'actions',
      actionItems: [
        { label: 'Editar', onClick: onEdit },
        { label: 'Eliminar', onClick: onDelete },
      ],
    },
  ]
}

export default function ProductScreen() {
  const { products } = useProductStore()
  const {
    loadUserProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProductActions()

  // carga inicial
  useEffect(() => {
    loadUserProducts()
  }, [loadUserProducts])

  // ** Para el modal de creación **
  const [createOpen, setCreateOpen] = useState(false)
  const [expirationDate, setExpirationDate] = useState<Date>(new Date())

  const handleCreate = async (data: any) => {
    try {
      await addProduct({
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        expirationDate: expirationDate.toISOString(),
      })
      toast.success('Producto creado')
      setCreateOpen(false)
    } catch {
      toast.error('Error al crear producto')
    }
  }

  const createFields = [
    [
      { type: '', key: 'name', placeholder: 'Nombre', required: true },
      { type: 'number', key: 'price', placeholder: 'Precio (USD)', required: true },
    ],
    [
      { type: 'number', key: 'quantity', placeholder: 'Cantidad', required: true },
      {
        type: 'custom',
        key: 'expirationDate',
        placeholder: 'Fecha de Vencimiento',
        component: (
          <Calendar
            mode="single"
            selected={expirationDate}
            onSelect={setExpirationDate}
            required={true}
          />
        ),
      },
    ],
  ] as Array<Array<import('@/types/formTypes').FormField>>

  const handleEdit = async (row: any) => {
    const newName = window.prompt('Nuevo nombre:', row.name)
    if (!newName || newName === row.name) return
    await updateProduct(row.id, { name: newName })
    toast.success('Producto actualizado')
  }
  const handleDelete = async (row: any) => {
    if (window.confirm(`¿Eliminar producto "${row.name}"?`)) {
      await deleteProduct(row.id)
      toast.success('Producto eliminado')
    }
  }

  const cols = useMemo(() => columns({ onEdit: handleEdit, onDelete: handleDelete }), [
    handleEdit,
    handleDelete,
  ])
  const tableData = useMemo(() => products.map(toTableRow), [products])

  const headerActions = (
    <>
      <ModalForm
        open={createOpen}
        onOpenChange={setCreateOpen}
        title={{ text: 'Crear producto' }}
        formDataConfig={createFields}
        onSubmit={handleCreate}
        submitButtonText="Crear"
        width="400px"
      />
      <Button onClick={() => setCreateOpen(true)}>Crear Producto</Button>
    </>
  )

  return (
    <ProductTemplate
      data={tableData}
      columnsConfig={cols}
      headerActions={headerActions}
    />
  )
}
