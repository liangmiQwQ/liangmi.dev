import type { IInfo } from '~/types.ts'

type Contact = IInfo['contact']

export function getContactUrls(contact: Contact): Record<keyof Contact, string> {
  return {
    github: `https://github.com/${contact.github}`,
    twitter: `https://x.com/${contact.twitter}`,
    email: `mailto:${contact.email}`,
    bsky: `https://bsky.app/profile/${contact.bsky}`,
    youtube: `https://www.youtube.com/@${contact.youtube}`,
    bilibili: `https://space.bilibili.com/${contact.bilibili}`
  }
}
