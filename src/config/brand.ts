/**
 * White-label brand configuration.
 *
 * SalesBondhu is deployed per client: the app name stays the same, while the client's
 * name, colours and product catalogue are swapped in at build time. This showcase ships
 * with an invented demo brand ("Shapla Paints") so no real client assets are included.
 */
export interface BrandConfig {
  appName: string;
  clientName: string;
  clientNameBn: string;
  /** Short monogram shown when no logo asset is bundled. */
  monogram: string;
  colors: {
    primary: string;
    primaryDark: string;
    accent: string;
  };
  /** True for the public showcase build: every screen runs on mock data. */
  demoMode: boolean;
}

export const brand: BrandConfig = {
  appName: 'SalesBondhu AI',
  clientName: 'Shapla Paints',
  clientNameBn: 'শাপলা পেইন্টস',
  monogram: 'SP',
  colors: {
    primary: '#006c49',
    primaryDark: '#0e1c2f',
    accent: '#6cf8bb',
  },
  demoMode: true,
};
