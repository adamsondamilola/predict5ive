<?php

namespace App\Services;

class Response
{
    public function res($status, $message, $code){
        return response()->json(['status' => $status, 'message' => $message], $code);
    }
}
