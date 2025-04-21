import { ReactNode } from "react"

interface AlertDialogProps {
  open: boolean
  children: ReactNode
}

export function AlertDialog({ open, children }: AlertDialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {children}
      </div>
    </div>
  )
}

interface AlertDialogContentProps {
  children: ReactNode
}

export function AlertDialogContent({ children }: AlertDialogContentProps) {
  return <div className="p-6">{children}</div>
}

interface AlertDialogHeaderProps {
  children: ReactNode
}

export function AlertDialogHeader({ children }: AlertDialogHeaderProps) {
  return <div className="mb-4">{children}</div>
}

interface AlertDialogTitleProps {
  children: ReactNode
}

export function AlertDialogTitle({ children }: AlertDialogTitleProps) {
  return <h2 className="text-lg font-semibold text-gray-900">{children}</h2>
}

interface AlertDialogDescriptionProps {
  children: ReactNode
}

export function AlertDialogDescription({ children }: AlertDialogDescriptionProps) {
  return <p className="text-sm text-gray-600">{children}</p>
}

interface AlertDialogFooterProps {
  children: ReactNode
}

export function AlertDialogFooter({ children }: AlertDialogFooterProps) {
  return <div className="flex justify-end gap-2">{children}</div>
}

interface AlertDialogActionProps {
  onClick: () => void
  children: ReactNode
}

export function AlertDialogAction({ onClick, children }: AlertDialogActionProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {children}
    </button>
  )
}

interface AlertDialogCancelProps {
  onClick: () => void
  children: ReactNode
}

export function AlertDialogCancel({ onClick, children }: AlertDialogCancelProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
    >
      {children}
    </button>
  )
}