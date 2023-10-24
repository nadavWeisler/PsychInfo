export function GetCreditsLocalizationKeys<TName extends string>(name: TName) {
  return {
    title: `credits.${name}.title`,
    description: `credits.${name}.description`
  } as const;
}
