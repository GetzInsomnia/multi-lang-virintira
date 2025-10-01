import type { ComponentProps } from 'react';

import { JsonLd } from './JsonLd';

type StructuredDataProps = ComponentProps<typeof JsonLd>;

export function StructuredData(props: StructuredDataProps) {
  return <JsonLd {...props} />;
}
