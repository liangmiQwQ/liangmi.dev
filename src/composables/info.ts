import type { IInfo } from '~/types'
import info from '@app/assets/me/i.json'

export function useIInfo(): IInfo {
  return info as IInfo
}
