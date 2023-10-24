export function getCreditsLocalizationKeys<TName extends string>(name: TName) {
  return {
    title: `credits.${name}.title`,
    description: `credits.${name}.description`
  } as const;
}
