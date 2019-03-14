export function Document(props) {
  const {Html, Head, Body, children, siteData, renderMeta} = props

  return (
    <Html lang="th">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css?family=Pridi:200,300,400&amp;subset=thai" rel="stylesheet" />
        <link rel="apple-touch-icon" sizes="57x57" href="/logo/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/logo/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/logo/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/logo/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/logo/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/logo/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/logo/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/logo/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192"  href="/logo/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/logo/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo/favicon-16x16.png" />
        <link rel="manifest" href="/logo/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />

        <title>สมัครเข้าค่าย Junior Webmaster Camp</title>

        <meta
          name="description"
          content="พบกันเร็วๆ นี้ กับค่าย Junior Webmaster Camp"
        />

        <meta
          itemProp="name"
          content="สมัครเข้าค่าย Junior Webmaster Camp"
        />

        <meta
          itemProp="description"
          content="พบกันเร็วๆ นี้ กับค่าย Junior Webmaster Camp"
        />

        <meta itemProp="image" content="https://registration.jwc.in.th/images/og01031423.jpg" />

        <meta name="twitter:card" content="summary" />

        <meta
          name="twitter:title"
          content="สมัครเข้าค่าย Junior Webmaster Camp"
        />

        <meta
          name="twitter:description"
          content="พบกันเร็วๆ นี้ กับค่าย Junior Webmaster Camp"
        />

        <meta name="twitter:site" content="@jwcth" />
        <meta name="twitter:creator" content="@jwcth" />

        <meta
          name="twitter:image:src"
          content="https://registration.jwc.in.th/images/og01031423.jpg"
        />

        <meta
          property="og:title"
          content="สมัครเข้าค่าย Junior Webmaster Camp"
        />

        <meta
          property="og:description"
          content="พบกันเร็วๆ นี้ กับค่าย Junior Webmaster Camp"
        />

        <meta
          property="og:image"
          content="https://registration.jwc.in.th/images/og01031423.jpg"
        />
        <meta property="og:url" content="https://registration.jwc.in.th/" />
        <meta property="og:site_name" content="Junior Webmaster Camp" />
        <meta property="og:locale" content="th_TH" />
        <meta property="fb:admins" content="100000148980818" />
        <meta property="fb:app_id" content="1540852432838036" />
        <meta property="og:type" content="website" />
      </Head>
      <Body>{children}</Body>
    </Html>
  )
}
