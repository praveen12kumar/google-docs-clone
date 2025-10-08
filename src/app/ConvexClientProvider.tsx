"use client";

import { ReactNode } from "react";
import {ConvexProviderWithClerk} from 'convex/react-clerk';
import {ClerkProvider, useAuth, SignIn} from '@clerk/clerk-react';
import {ConvexReactClient, Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { Spinner } from "@/components/ui/spinner";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
  <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
    <ConvexProviderWithClerk
    useAuth={useAuth}
    client={convex}
    > 
    
    <Authenticated>
    {children}
    </Authenticated>
    <Unauthenticated>
      <div className="min-w-screen flex flex-col items-center justify-center h-screen">
        <SignIn/>
      </div>
    </Unauthenticated>
    <AuthLoading>
      <div className="min-w-screen flex flex-col items-center justify-center h-screen">
        <Spinner className="size-10"/>
      </div>
    </AuthLoading>
    </ConvexProviderWithClerk>
    </ClerkProvider>);
}