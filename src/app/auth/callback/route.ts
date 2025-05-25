// app/auth/callback/route.ts
import { createClient } from '@/api/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = createClient()
    const { data, error } = await (await supabase).auth.exchangeCodeForSession(code)
    
    if (!error && data.user) {
      // Create profile for Google OAuth users
      const { error: profileError } = await (await supabase)
        .from('profiles')
        .upsert({
          id: data.user.id,
          full_name: data.user.user_metadata.full_name || data.user.user_metadata.name,
          // Note: For Google OAuth, you won't have referrer info unless you pass it in the state
        }, {
          onConflict: 'id'
        })

      if (profileError) {
        console.error('Profile creation error:', profileError)
      }

      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
