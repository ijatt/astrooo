export function toastSuccess(title:string, message: string) {
  const toast = useToast()
  toast.add({
    title,
    description: message,
    color: "green",
    icon: "i-heroicons-check-circle"
  })
}

export function toastError(title:string, message: string) {
  const toast = useToast()
  toast.add({
    title,
    description: message,
    icon: "i-heroicons-x-circle",
    color: "red"
  })
}

export function toastInfo(title:string, message: string) {
  const toast = useToast()
  toast.add({
    title,
    description: message,
    icon: "i-heroicons-information-circle",
    color: "indigo"
  })
}
