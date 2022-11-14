export interface HeadExtraObj {
  meta?: any,
  title?: string,
  subtitle?: string,
  section?: string,
  description?: string,
  socialImageURL?: string,
}
export interface HeadExtraHooks {
  'headExtra:update': any
}

export interface HeadExtraOptions {
  /**
   * Extra text to append to end of title(s)
   * @type string
   */
  extra: string,
  /**
   * Twitter card image size
   * @default summary_large_image
   * @type string
   */
  twitterImageSize: 'summary' | 'summary_large_image' | 'app' | 'player',
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
   * @type string
   */
  defaults: HeadExtraObj
}
