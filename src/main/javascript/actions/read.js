export const UPDATE_READING_STEPPER = 'UPDATE_READING_STEPPER'
export const UPDATE_READING_LISTS = 'UPDATE_READING_LISTS'
export const SUBMIT_READING_ITEM = 'SUBMIT_READING_ITEM'
export const UPDATE_READING_ITEM = 'UPDATE_READING_ITEM'

export function updateReadingStepper(readingStepper) {
  return {
    type: UPDATE_READING_STEPPER,
    readingStepper
  }
}

export function updateReadingLists(readingLists) {
  return {
    type: UPDATE_READING_LISTS,
    readingLists
  }
}

export function submitReadingItem(readingItem) {
  return {
    type: SUBMIT_READING_ITEM,
    readingItem
  }
}

export function updateReadingItem(readingItem) {
  return {
    type: UPDATE_READING_ITEM,
    readingItem
  }
}
