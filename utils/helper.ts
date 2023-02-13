/* eslint-disable no-unreachable-loop */
/**
 *
 * @param obj
 * @returns true: 空, false: 空じゃない
 */
export const objIsEmpty = (obj: any) => {
  for (const i in obj) {
    return false
  }
  return true
}
