import Footer from "./Footer"
import Header from "./Header"

type StoreLayoutProps = {
    children: React.ReactNode
}

const StoreLayout = ({children} : StoreLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
    </div>
  )
}

export default StoreLayout