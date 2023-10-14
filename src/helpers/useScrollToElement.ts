export function useScrollToElement(id: string, top = 20, delay = 100) {
  const el = document.getElementById(id)

  if (el === null) {
    return
  }

  setTimeout(() => {
    const topPosition = el.offsetTop - top
    window.scrollTo({ top: topPosition, behavior: "smooth" })
  }, delay)
}
