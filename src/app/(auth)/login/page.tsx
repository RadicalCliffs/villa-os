'use client';

import { useState } from 'react';
import { Home, Mail, Lock, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

type AuthMode = 'login' | 'signup';
type UserRole = 'owner' | 'manager' | 'staff';

export default function LoginPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [role, setRole] = useState<UserRole>('manager');

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-800 via-green-700 to-emerald-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 text-white mb-2">
            <Home className="h-10 w-10" />
            <h1 className="text-3xl font-bold tracking-tight">VillaOS</h1>
          </div>
          <p className="text-emerald-200">Villa Management for Phuket</p>
        </div>

        <Card className="shadow-xl">
          <CardContent className="py-8 px-6">
            {/* Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  mode === 'login' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                }`}
                onClick={() => setMode('login')}
              >
                Login
              </button>
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  mode === 'signup' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                }`}
                onClick={() => setMode('signup')}
              >
                Sign Up
              </button>
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">I am a:</label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { value: 'owner' as const, label: 'Owner' },
                  { value: 'manager' as const, label: 'Manager' },
                  { value: 'staff' as const, label: 'Staff' },
                ]).map(r => (
                  <button
                    key={r.value}
                    className={`py-2 px-3 text-sm font-medium rounded-lg border-2 transition-all ${
                      role === r.value
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                    onClick={() => setRole(r.value)}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={e => e.preventDefault()} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="+66 xx xxx xxxx"
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" size="lg">
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-emerald-600 hover:text-emerald-700">
                Continue to Dashboard (demo)
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-emerald-200 text-xs mt-6">
          VillaOS — Property Management for Phuket, Thailand
        </p>
      </div>
    </div>
  );
}
