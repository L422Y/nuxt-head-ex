export interface HeadExtraOptions {
  extra: string,
  twitterImageSize: string,
  defaults: HeadExtraObj
}

export interface HeadExtraObj {
  meta?: any,
  title?: string,
  subtitle?: string,
  description?: string,
  section?: string,
  socialImageURL?: string,
}
