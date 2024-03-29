import { Ref } from 'vue'

export interface HeadExtraObj {
  meta?: any,
  extra?: string,
  title?: string,
  subtitle?: string,
  section?: string,
  description?: string,
  socialImageURL?: string,
}

export interface HeadExtraHooks {
  'headExtra:update': any
}

export interface ModuleOptions {
  /**
   * Extra text to append to end of title(s)
   * @type string
   */
  extra?: string,
  /**
   * Separator for title / section / extra
   * @default '-'
   * @type string
   */
  separator?: '-' | '|' | string,
  /**
   * Twitter card image size
   * @default summary_large_image
   * @type string
   */
  twitterImageSize?: 'summary' | 'summary_large_image' | 'app' | 'player',
  /**
   * Default/fallback values for meta tags when none are supplied for a page
   * @example
   * {
   *   title: 'Hello World',
   *   subtitle: 'A stream of consciousness',
   *   description: 'How did we even get here?!',
   *   section: 'BLOG',
   *   socialImageURL: 'https://l422y.com/shareImage?path={{fullPath}}',
   * }
   * @type HeadExtraObj
   */
  defaults?: HeadExtraObj
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    headExtra?: Partial<ModuleOptions>
  }

  interface NuxtOptions {
    headExtra?: Partial<ModuleOptions>
  }

  interface NuxtHooks extends HeadExtraHooks {
  }

  interface NuxtApp {
    $headExtra: Ref<HeadExtraObj>
  }
}
