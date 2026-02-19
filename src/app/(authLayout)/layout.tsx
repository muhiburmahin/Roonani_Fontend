
import { Navbar } from "@/src/components/layout/Navbar";
import { Providers } from "@/src/providers/Providers";


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <div>
                <Navbar />
                {children}
            </div>
        </Providers>
    );
}