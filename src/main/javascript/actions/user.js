export const UPDATE_AGREEMENT = 'UPDATE_AGREEMENT'

export function updateAgreement(agreed) {
  return {
    type: UPDATE_AGREEMENT,
    agreed
  }
}
