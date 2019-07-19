import { clamp, distance } from '@popmotion/popcorn'

// Prevent rapid reverse swapping
const buffer = 5

export const findIndex = (tab, xOffset, tabs) => {
  const i = tab.position
  let target = i
  const { left, width } = tab.rect
  const right = left + width

  // If moving down
  if (xOffset > 0) {
    const nextTab = Array.from(tabs.items.values()).find(
      t => t.position === i + 1
    )
    if (nextTab === undefined) return i

    const swapOffset =
      distance(right, nextTab.rect.left + nextTab.rect.width / 2) + buffer

    if (xOffset > swapOffset) target = i + 1

    // If moving up
  } else if (xOffset < 0) {
    const prevTab = Array.from(tabs.items.values()).find(
      t => t.position === i - 1
    )
    if (prevTab === undefined) return i

    const prevRight = prevTab.rect.left + prevTab.rect.width
    const swapOffset =
      distance(left, prevRight - prevTab.rect.width / 2) + buffer

    if (xOffset < -swapOffset) target = i - 1
  }

  return clamp(0, tabs.items.size - 1, target)
}
