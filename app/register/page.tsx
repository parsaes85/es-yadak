'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

function RegisterRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const redirect = searchParams.get('redirect');
    const targetUrl = redirect
      ? `/login?tab=register&redirect=${encodeURIComponent(redirect)}`
      : '/login?tab=register';
    router.replace(targetUrl);
  }, [router, searchParams]);

  return (
    <div className="max-w-md mx-auto my-12 p-8 text-center bg-white rounded-3xl border border-slate-200">
      <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto mb-3" />
      <p className="text-xs text-slate-500 font-bold">در حال انتقال به فرم ثبت‌نام ای‌اس یدک...</p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-md mx-auto my-12 p-8 text-center bg-white rounded-3xl border border-slate-200">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto mb-3" />
          <p className="text-xs text-slate-500 font-bold">در حال انتقال...</p>
        </div>
      }
    >
      <RegisterRedirect />
    </Suspense>
  );
}
