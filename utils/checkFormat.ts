/* eslint-disable no-unreachable-loop */
/**
 *
 * @param obj
 * @returns true: 空, false: 空じゃない
 */
export const objIsEmpty = (obj: any): boolean => {
  for (const i in obj) {
    return false
  }
  return true
}

/**
 *
 * @param str
 * @returns true: 半角数字の場合
 */
export const isNumber = (str: string): boolean => {
  return /^[0-9]+$/.test(str)
}

/**
 * 数字を全角から半角に変換する
 * @param str
 * @returns
 */
export const numberZenkakuToHankaku = (str: string): string => {
  return str.replace(/[０-９]/g, m =>
    String.fromCharCode(m.charCodeAt(0) - 0xfee0)
  )
}

/**
 * ひらがなをカタカナに変換する
 * @param str
 * @returns
 */
export const hiraToKana = (str: string): string => {
  return str.replace(/[\u3042-\u3093]/g, m =>
    String.fromCharCode(m.charCodeAt(0) + 96)
  )
}
