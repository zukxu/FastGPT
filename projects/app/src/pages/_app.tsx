import type { AppProps } from 'next/app';
import Script from 'next/script';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { appWithTranslation } from 'next-i18next';

import QueryClientContext from '@/web/context/QueryClient';
import ChakraUIContext from '@/web/context/ChakraUI';
import { useInitApp } from '@/web/context/useInitApp';

import '@/web/styles/reset.scss';

function App({ Component, pageProps }: AppProps) {
  const { feConfigs, scripts, title } = useInitApp();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={`${title} 是一个大模型应用编排系统，提供开箱即用的数据处理、模型调用等能力，可以快速的构建知识库并通过 Flow 可视化进行工作流编排，实现复杂的知识库场景！`}
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no, viewport-fit=cover"
        />
        <link rel="icon" href={feConfigs.favicon || process.env.SYSTEM_FAVICON} />
      </Head>
      {scripts?.map((item, i) => <Script key={i} strategy="lazyOnload" {...item}></Script>)}

      <QueryClientContext>
        <ChakraUIContext>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraUIContext>
      </QueryClientContext>
    </>
  );
}

export default appWithTranslation(App);
