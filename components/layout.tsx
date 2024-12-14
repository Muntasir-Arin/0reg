import { Button } from "@/components/ui/button"
import Link from "next/link"
import { UserCircle2, BookCopy } from 'lucide-react'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden z-0">
      {/* Background glow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40rem] left-1/2 -translate-x-1/2 w-[80rem] h-[80rem] bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      {/* Grainy overlay */}
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 3000 3000' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            mixBlendMode: 'soft-light',
          }}
        ></div>
      </div>
      
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <Link 
                href="/"
                className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
              >
                Schedule Builder
              </Link>
              <Link 
                href="/swap"
                className="text-gray-300 hover:text-white flex items-center space-x-2"
              >
                <BookCopy className="h-4 w-4" />
                <span>Course Swap</span>
              </Link>
            </div>
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white"
            >
              <UserCircle2 className="h-5 w-5 mr-2" />
              Login
            </Button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  )
}

