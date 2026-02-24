import type { IInfo } from '~/types'
import info from '~/assets/me/i.json'

export function useIInfo(): IInfo {
  return info as any
}
