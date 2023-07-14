<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @param  string|null  ...$guards
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, ...$guards)
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                if (Auth::user()->user_type === 'admin') {
                    return redirect('/Admin'); // redirecciona a la página de admin si el usuario es admin
                } else if (Auth::user()->user_type === 'cajero') {
                    return redirect('/Cajero'); // redirecciona a la página de cajero si el usuario es cajero
                } else if (Auth::user()->user_type === 'cocinero') {
                    return redirect('/Cocinero'); // redirecciona a la página de cocinero si el usuario es cocinero
                } else if (Auth::user()->user_type === 'camarero') {
                    return redirect('/Camarero'); // redirecciona a la página de camarero si el usuario es camarero
                }
            }
        }

        return $next($request);
    }
}
