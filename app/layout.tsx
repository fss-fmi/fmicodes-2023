export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html>
        <head>
            <title>FMICodes</title>
        </head>
        <body>{children}</body>
        </html>
    )
}
