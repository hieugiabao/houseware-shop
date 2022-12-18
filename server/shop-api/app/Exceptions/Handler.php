<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;
use Response;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;

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
		$this->renderable(function (HttpException $e, Request $request) {
			return response()->json(
				[
					"statusCode" => $e->getStatusCode(),
					"message" => $e->getMessage(),
					"path" => $request->getPathInfo(),
					"trace" => $e->getTraceAsString(),
				],
				$e->getStatusCode()
			);
		});

		$this->renderable(function (TokenBlacklistedException $e, Request $request) {
			return response()->json(
				[
					"statusCode" => 401,
					"message" => $e->getMessage(),
					"path" => $request->getPathInfo(),
					"trace" => $e->getTraceAsString(),
				],
				401
			);
		});
	}
}
