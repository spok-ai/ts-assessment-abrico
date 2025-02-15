import { ReactNode } from 'react';

import { Metadata } from 'next';

import { Document } from '@/app/Document';
import { NextLoader } from '@/app/NextLoader';
import { getEnvHintTitlePrefix } from '@/features/devtools/EnvHint';

export const metadata: Metadata = {
  title: {
    template: `${getEnvHintTitlePrefix()} %s`,
    default: `${getEnvHintTitlePrefix()} Abrico [web]`,
  },
  applicationName: 'Start UI [web]',
  description: 'Opinionated UI starter',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  console.log('render');
  return (
    <>
      <Document>
        <NextLoader />
        {children}
      </Document>
    </>
  );
}
