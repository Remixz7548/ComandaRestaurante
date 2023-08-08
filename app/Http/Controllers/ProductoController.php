<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $productos = Producto::all();
        return response()->json($productos);
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
        $existingName = Producto::where('name', $request->name)->first();
        if ($existingName) {
            return response()->json(['error' => 'Este producto ya está registrado en la base de datos']);
        }

        $producto = new Producto();
        $producto->name = $request->name;
        $producto->price = $request->price;
        $producto->category = $request->category;
        $producto->status = $request->status;

        $producto->save();
        return response()->json(['message' => 'Producto creado correctamente']);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {

        $category = $request->get('categoria');
        $productosFiltrados = Producto::where('category', $category)->get();
        
        return response()->json($productosFiltrados);
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
        $producto = Producto::where('id', $id)->get();
        
        return response()->json($producto);
    }

    public function update(Request $request, $id)
    {
        $producto = Producto::find($id);

        $existingName = Producto::where('name', $request->name)->first();

        if ($existingName && $existingName->id !== $producto->id) {
            return response()->json(['error' => 'Este nombre de producto ya está registrado en la base de datos']);
        }
        
        if (!$producto) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        $producto->name = $request->name;
        $producto->price = $request->price;
        $producto->category = $request->category;
        $producto->status = $request->status;

        $producto->save();

        return response()->json(['message' => 'Producto actualizado correctamente']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        $producto->delete();

        return response()->json(['message' => 'Producto eliminado correctamente']);
    }
}
