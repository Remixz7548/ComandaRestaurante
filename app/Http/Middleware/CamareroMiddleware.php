<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CamareroMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (auth()->check() && auth()->user()->user_type == 'camarero') {
            // Lógica específica para el usuario de tipo "cocinero"
            // ...
            return $next($request);
        }

        return redirect('/');
    }
}
