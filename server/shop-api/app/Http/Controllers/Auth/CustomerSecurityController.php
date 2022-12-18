<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Shop\Customers\Repositories\CustomerRepositoryInterface;
use App\Shop\Customers\Requests\LoginCustomerRequest;
use App\Shop\Customers\Requests\RegisterCustomerRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\UnauthorizedException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;

class CustomerSecurityController extends Controller
{

  /**
   * @var CustomerRepositoryInterface $customerRepo
   */
  private $customerRepo;

  /**
   * Create a new controller instance.
   *
   * @param CustomerRepositoryInterface $customerRepository
   */
  public function __construct(CustomerRepositoryInterface $customerRepository)
  {
    $this->middleware('guest')->except('logout', 'me');
    $this->customerRepo = $customerRepository;
  }

  /**
   * Login the customer
   *
   * @param LoginCustomerRequest $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function login(LoginCustomerRequest $request)
  {
    $details = $request->only('email', 'password');
    $details['status'] = 1;
    JWTAuth::factory()->setTTL(1);
    $refresh_token = JWTAuth::attempt($details);
    JWTAuth::factory()->setTTL(config('jwt.ttl'));
    $access_token = JWTAuth::attempt($details);

    if (!$access_token) {
      throw new UnauthorizedException('Invalid credentials', 401);
    }

    return $this->createTokenResponse($access_token, $refresh_token);
  }

  /**
   * Register a new customer
   *
   * @param RegisterCustomerRequest $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function register(RegisterCustomerRequest $request)
  {
    $this->customerRepo->createCustomer($request->all());
    return response()->noContent(201);
  }

  /**
   * Log the user out (Invalidate the token).
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function logout(Request $request)
  {
    auth()->logout();
    if ($request->has('refresh_token')) {
      JWTAuth::setToken($request->refresh_token)->invalidate();
    }
    return response()->json(null, 204);
  }

  /**
   * Refresh a token.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function refresh()
  {
    $access_token = auth()->refresh();
    $payload_array = JWTAuth::manager()->getJWTProvider()->decode($access_token);

    JWTAuth::factory()->setTTL(1);
    $payload = JWTFactory::make($payload_array);
    $refresh_token = JWTAuth::encode($payload);
    return $this->createTokenResponse($access_token, $refresh_token);
  }

  /**
   * Get the authenticated User.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function me()
  {
    return response()->json(auth()->user());
  }

  /**
   * Get the token array structure.
   *
   * @param  string $token
   *
   * @return \Illuminate\Http\JsonResponse
   */
  private function createTokenResponse(string $access_token, string $refresh_token)
  {
    return response()->json([
      'access_token' => [
        'token' => str($access_token),
        'type' => 'Bearer',
        'expires_in' => config('jwt.ttl') * 60,
      ],
      'refresh_token' => [
        'token' => str($refresh_token),
        'type' => 'Bearer',
        'expires_in' => config('jwt.refresh_ttl') * 60,
      ],
      'user' => auth()->user()
    ]);
  }
}
