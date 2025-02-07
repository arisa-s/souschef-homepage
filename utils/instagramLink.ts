export function openInstagramLink(instagramPath: string) {
  if (!instagramPath) return

  // Convert web URL to Instagram deep link
  let appUrl = `instagram://${instagramPath}`
  let webUrl = `https://www.instagram.com${instagramPath}`

  // Try opening Instagram app first
  window.location.href = appUrl

  // If the app is not installed, fall back to web version after a delay
  setTimeout(() => {
    window.location.href = webUrl
  }, 1000) // Adjust the delay if needed
}
