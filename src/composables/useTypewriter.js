import { ref } from 'vue'

export function useTypewriter(paragraphs, speed = 35, delayBetween = 500) {
  const displayedParagraphs = ref([])
  const currentLine = ref('')
  const done = ref(false)

  let paragraphIndex = 0
  let charIndex = 0

  function typeNextParagraph() {
    if (paragraphIndex >= paragraphs.length) {
      done.value = true
      return
    }

    currentLine.value = ''
    charIndex = 0

    const currentParagraph = paragraphs[paragraphIndex]
    const interval = setInterval(() => {
      currentLine.value += currentParagraph[charIndex]
      charIndex++

      if (charIndex >= currentParagraph.length) {
        clearInterval(interval)
        displayedParagraphs.value.push(currentLine.value)
        currentLine.value = ''
        paragraphIndex++
        setTimeout(typeNextParagraph, delayBetween)
      }
    }, speed)
  }

  return {
    displayedParagraphs,
    currentLine,
    done,
    startTyping: typeNextParagraph
  }
}
