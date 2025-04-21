import React from 'react'
import { ColumnConfig } from '@/types/table'
import { DynamicDataTable } from '../organisms/DynamicDataTable'

interface ProductTemplateProps {
  data: any[]
  columnsConfig: ColumnConfig[]
  headerActions?: React.ReactNode
}

export default function ProductTemplate({
  data,
  columnsConfig,
  headerActions,
}: ProductTemplateProps) {
  return (
    <section>
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Productos</h2>
          <p className="text-muted-foreground">Lista de productos</p>
        </div>
        {headerActions && (
          <div className="mt-4 md:mt-0 flex space-x-2">
            {headerActions}
          </div>
        )}
      </div>
      <DynamicDataTable data={data} columnsConfig={columnsConfig} />
    </section>
  )
}
