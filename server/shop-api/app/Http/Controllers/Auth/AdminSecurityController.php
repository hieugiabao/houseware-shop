<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Shop\Employees\Repositories\EmployeeRepositoryInterface;
use App\Shop\Employees\Requests\EmployeeLoginRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\UnauthorizedException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;

class AdminSecurityController extends Controller
{
  /**
   * @var EmployeeRepositoryInterface $employeeRepo
   *
   */
  private $employeeRepo;

  /**
   * Create a new controller instance.
   *
   * @param EmployeeRepositoryInterface $employeeRepository
   */
  public function __construct(EmployeeRepositoryInterface $employeeRepository)
  {
    $this->employeeRepo = $employeeRepository;
  }

  /**
   * Login the employee
   *
   * @param EmployeeLoginRequest $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function login(EmployeeLoginRequest $request)
  {
    $details = $request->only('email', 'password');
    $details['status'] = 1;

    $refresh_token = auth('employee')->setTTL(1)->attempt($details);
    $access_token = auth('employee')->setTTL(config('jwt.admin-ttl'))->attempt($details);

    if (!$access_token) {
      throw new UnauthorizedException('Invalid credentials', 401);
    }

    return $this->createTokenResponse($access_token, $refresh_token);
  }

  /**
   * Get the authenticated Employee.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function me()
  {
    return response()->json(auth('employee')->user());
  }

  /**
   * Log the employee out (Invalidate the token).
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function logout(Request $request)
  {
    auth('employee')->logout();

    if ($request->has('refresh_token')) {
      JWTAuth::setToken($request->refresh_token)->invalidate();
    }
    return response()->json(['message' => 'Successfully logged out']);
  }

  /**
   * Refresh the access token
   *
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function refresh(Request $request)
  {
    JWTAuth::factory()->setTTL(config('jwt.admin-ttl'));
    $access_token = auth('employee')->refresh();
    $payload_array = JWTAuth::manager()->getJWTProvider()->decode($access_token);

    JWTAuth::factory()->setTTL(1);
    $payload = JWTFactory::make($payload_array);
    $refresh_token = JWTAuth::encode($payload);
    return $this->createTokenResponse($access_token, $refresh_token);
  }

  /**
   * Get the token array structure.
   *
   * @param  string $token
   * @param  string $refresh_token
   *
   * @return \Illuminate\Http\JsonResponse
   */
  private function createTokenResponse(string $access_token, string $refresh_token)
  {
    return response()->json([
      'access_token' => $access_token,
      'refresh_token' => $refresh_token,
      'token_type' => 'bearer',
      'expires_in' => config('jwt.admin-ttl') * 60,
      'employee' => auth('employee')->user()
    ]);
  }
}
