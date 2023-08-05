<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empleado;

class EmpleadoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $empleados = Empleado::all();
        return response()->json($empleados);
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
        $existingUsername = Empleado::where('username', $request->username)->first();
        if ($existingUsername) {
            return response()->json(['error' => 'Este usuario ya está registrado en la base de datos']);
        }

        $empleado = new Empleado();
        $empleado->name = $request->name;
        $empleado->username = $request->username;
        $empleado->password = bcrypt($request->password);
        $empleado->user_type = $request->user_type;

        $empleado->save();
        return response()->json(['message' => 'Empleado creado correctamente']);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {

        $user_type = $request->get('rol');
        $empleadosFiltrados = Empleado::where('user_type', $user_type)->get();
        
        return response()->json($empleadosFiltrados);
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

    public function showUpdate(Request $request)
    {

        $id = $request->get('id');
        $empleado = Empleado::where('id', $id)->get();
        
        return response()->json($empleado);
    }

    public function update(Request $request, $id)
    {
        $empleado = Empleado::find($id);

        $existingUsername = Empleado::where('username', $request->username)->first();

        if ($existingUsername) {
            return response()->json(['error' => 'Este usuario ya está registrado en la base de datos']);
        }
        
        if (!$empleado) {
            return response()->json(['error' => 'Empleado no encontrado'], 404);
        }

        $empleado->name = $request->name;
        $empleado->username = $request->username;
        $empleado->password = bcrypt($request->password);
        $empleado->user_type = $request->user_type;

        $empleado->save();

        return response()->json(['message' => 'Empleado actualizado correctamente']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $empleado = Empleado::find($id);

        if (!$empleado) {
            return response()->json(['error' => 'Empleado no encontrado'], 404);
        }

        $empleado->delete();

        return response()->json(['message' => 'Empleado eliminado correctamente']);
        }
}
