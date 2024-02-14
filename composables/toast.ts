export function toastSuccess(title:string, message?: string) {
  const toast = useToast()
  const toastOption = {
    title: title,
    icon: "i-heroicons-check-circle",
    color: "green"
  }

  if (message) {
    toastOption.description = message
  }
  toast.add(toastOption)
}

export function toastError(title:string, message?: string) {
  const toast = useToast()
  const toastOption = {
    title: title,
    color: "red",
    icon: "i-heroicons-x-circle"
  }

  if (message) {
    toastOption.description = message
  }

  toast.add(toastOption)
}

export function toastInfo(title:string, message?: string) {
  const toast = useToast()
  const toastOption = {
    title: title,
    color: "blue",
    icon: "i-heroicons-information-circle"
  }
  if (message) {
    toastOption.description = message
  }
  toast.add(toastOption)
}
