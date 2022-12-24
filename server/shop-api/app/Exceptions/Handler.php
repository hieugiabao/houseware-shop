<?php

namespace App\Exceptions;

use App\Shop\Base\ApiError;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Illuminate\Validation\UnauthorizedException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;
use Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class Handler extends ExceptionHandler
{
	/**
	 * A list of exception types with their corresponding custom log levels.
	 *
	 * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
	 */
	protected $levels = [
		//
	];

	/**
	 * A list of the exception types that are not reported.
	 *
	 * @var array<int, class-string<\Throwable>>
	 */
	protected $dontReport = [
		//
	];

	/**
	 * A list of the inputs that are never flashed to the session on validation exceptions.
	 *
	 * @var array<int, string>
	 */
	protected $dontFlash = [
		'current_password',
		'password',
		'password_confirmation',
	];

	/**
	 * Register the exception handling callbacks for the application.
	 *
	 * @return void
	 */
	public function register()
	{

		$this->renderable(function (TokenBlacklistedException|UnauthorizedException|TokenInvalidException|TokenExpiredException|JWTException|AuthorizationException $e, Request $request) {
			return response()->json(
				new ApiError(
					401,
					$e->getMessage(),
					$e->getTraceAsString(),
					$request->getPathInfo()
				),
				401
			);
		});

		$this->renderable(function (HttpException $e, Request $request) {
			return response()->json(
				new ApiError(
					$e->getStatusCode(),
					$e->getMessage(),
					$e->getTraceAsString(),
					$request->getPathInfo()
				),
				$e->getStatusCode()
			);
		});

		$this->renderable(function (\Exception $e, Request $request) {
			return response()->json(
				new ApiError(
					500,
					$e->getMessage(),
					$e->getTraceAsString(),
					$request->getPathInfo()
				),
				500
			);
		});
	}
}
