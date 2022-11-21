let loadingPercent = 0
const root = document.getElementById('app')
root.style.display = 'block'
const maxWidth = document.querySelector('.app-loading-progress').offsetWidth
const progressBar = document.getElementById('progress-bar')
const progressText = document.getElementById('progress-text')
const timer = setInterval(__update_percent__, 50)
function __update_percent__(percent, type) {
  type = type || 'add'
  percent = percent || parseInt(Math.random() * 5)
  if (type !== 'add') {
    loadingPercent = percent
  } else {
    loadingPercent += percent
    loadingPercent = Math.min(loadingPercent, 99)
  }
  progressBar.style.width = loadingPercent * maxWidth * 0.01 + 'px'
  progressText.innerText = loadingPercent + '%'
  if (loadingPercent >= 99) {
    clearInterval(timer)
  }
}
// import('./App')
