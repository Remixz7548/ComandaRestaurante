<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $credentials = $request->only('username', 'password');
        if (Auth::attempt($credentials)) {
            $user = Usuario::where('username', $request->username)->first();
            if($user->user_type == 'admin') {
                return response()->json(['msjadmin' => '¡Has iniciado sesion como administrador!']);
            } elseif($user->user_type == 'cajero') {
                return response()->json(['msjcajero' => '¡Has iniciado sesion!']);
            } elseif($user->user_type == 'camarero') {
                return response()->json(['msjcamarero' => '¡Has iniciado sesion!']);
            } elseif($user->user_type == 'cocinero') {
                return response()->json(['msjcocinero' => '¡Has iniciado sesion!']);
            } else {
                return response()->json(['error' => 'El tipo de usuario no es válido']);
            }
        } else {
            return response()->json(['error' => 'El usuario o la contraseña son incorrectos']);
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
