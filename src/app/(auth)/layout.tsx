interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({children}: AuthLayoutProps)=>{
    return (
        <>
        <div className="">
            <p className="flex-1 bg-zinc-300">header</p>
        {children}
        </div>
        </>
    )
}

export default AuthLayout;