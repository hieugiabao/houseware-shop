<?php

namespace App\Shop\Tools;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

trait UploadableTrait
{
  /**
   * Upload a single file in the server
   *
   * @param $file
   * @param string $folder
   * @return false|string
   */
  public function uploadOne($file, string $folder = null)
  {
    $file_name = time() . '-' . $file->getClientOriginalName();

    $file_path = $folder . '/' . $file_name;

    Storage::disk('s3')->put($file_path, file_get_contents($file->getRealPath()), 'public');
    return $file_path;
  }

  public function deleteFile($file_path)
  {
    Storage::disk('s3')->delete($file_path);
  }
}
