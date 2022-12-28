export default function initLocalStorage() {
  // Check if local storage has been created 
  if (localStorage.getItem('darkMode') === null) {
    localStorage.setItem('darkMode', true)
  }
}