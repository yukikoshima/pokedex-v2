const suteganaMap = [
  'ァ',
  'ィ',
  'ゥ',
  'ェ',
  'ォ',
  'ヵ',
  'ㇰ',
  'ヶ',
  'ㇱ',
  'ㇲ',
  'ッ',
  'ㇳ',
  'ㇴ',
  'ㇵ',
  'ㇶ',
  'ㇷ',
  'ㇷ゚',
  'ㇸ',
  'ㇹ',
  'ㇺ',
  'ャ',
  'ュ',
  'ョ',
  'ㇻ',
  'ㇼ',
  'ㇽ',
  'ㇾ',
  'ㇿ',
  'ヮ',
]

const kanaMap = [
  'ア',
  'イ',
  'ウ',
  'エ',
  'オ',
  'カ',
  'ク',
  'ケ',
  'シ',
  'ス',
  'ツ',
  'ト',
  'ヌ',
  'ハ',
  'ヒ',
  'フ',
  'プ',
  'ヘ',
  'ホ',
  'ム',
  'ヤ',
  'ユ',
  'ヨ',
  'ラ',
  'リ',
  'ル',
  'レ',
  'ロ',
  'ワ',
]

const isSutegana = (name: string): boolean => {
  return suteganaMap.some(kana => name.endsWith(kana))
}

const getSuteganaMapIndex = (name: string): number => {
  return suteganaMap.findIndex(kana => name.endsWith(kana))
}

export const removeEndNameIfNeeded = (name: string): string => {
  // 末尾が長音の場合
  if (name.endsWith('ー')) {
    const removeEndName = name.slice(0, -1)
    if (!isSutegana(removeEndName)) return removeEndName

    // 末尾が長音かつ末尾から2文字目が、すてがなの場合...例: カイリューとか
    const idx = getSuteganaMapIndex(removeEndName)
    return idx !== -1
      ? removeEndName.replace(suteganaMap[idx], kanaMap[idx])
      : removeEndName
  }

  // 末尾がすてがなの場合
  if (isSutegana(name)) {
    const idx = getSuteganaMapIndex(name)
    return idx !== -1 ? name.replace(suteganaMap[idx], kanaMap[idx]) : name
  }

  // ニドラン♂の場合
  if (name.endsWith('♂')) {
    return name.replace(/♂/g, 'オス')
  }

  // ニドラン♀の場合
  if (name.endsWith('♀')) {
    return name.replace(/♀/g, 'メス')
  }

  return name
}
