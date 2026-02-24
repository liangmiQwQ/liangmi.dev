import type { IInfo } from '~/types'

export async function useIInfo(): Promise<ComputedRef<IInfo>> {
  const { data } = await useFetch<IInfo>('/i.json')
  return computed(() => data.value!)
}
