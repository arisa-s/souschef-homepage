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

export function openInstagramUser(handle: string) {
  if (!handle) return

  // Convert web URL to Instagram deep link
  let appUrl = `instagram://user?username=${handle}`
  let webUrl = `https://www.instagram.com/${handle}`

  // Try opening Instagram app first
  window.location.href = appUrl

  // If the app is not installed, fall back to web version after a delay
  setTimeout(() => {
    window.location.href = webUrl
  }, 1000) // Adjust the delay if needed
}

export function openInstagramPost(postId: string) {
  if (!postId) return

  // let appUrl = `instagram://p/${postId}`
  let webUrl = `https://www.instagram.com/p/${postId}`
  // window.location.href = appUrl

  setTimeout(() => {
    window.location.href = webUrl
  }, 1000)
}
