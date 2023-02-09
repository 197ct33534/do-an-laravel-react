<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class CheckTokenExpered
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
        $hashToken = $request->header('authorization');
        $hashToken = trim(str_replace('Bearer', ' ', $hashToken));

        $token =  PersonalAccessToken::findToken($hashToken);
        if ($token) {
            $tokenCreatedAt = $token->created_at;
            $expire = Carbon::parse($tokenCreatedAt)->addMinutes(config('sanctum.expiration'));
            // token hết hạn
            if (!(Carbon::now() >= $expire)) {
                return $next($request);
            }
            return abort(401, 'Token hết hạn');
        }
        return abort(403, 'Bạn không có quyền truy cập');
    }
}
