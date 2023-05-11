<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function getAll(){
        return Car::all();
    }

    public function create(Request $request){
        
        $validated = $request->validate([
            'merek' => 'required',
            'jenis' => 'required',
            'stock' => 'required|min:0',
            'harga' => 'required|min:0',
            'keterangan' => 'present',
        ]);

        $car = Car::create($validated);

        return $car;
    }

    public function update(Request $request, $id){
        $validated = $request->validate([
            'merek' => 'required',
            'jenis' => 'required',
            'stock' => 'required|min:0',
            'harga' => 'required|min:0',
            'keterangan' => 'present',
        ]);

        $car = Car::findOrFail($id);

        $car->update($validated);

        return $car;
    }

    public function delete($id){
        
        $car = Car::findOrFail($id);
        $car->delete();

        return response()->json([
            'message' => 'Car deleted successfully'
        ]);
    }

    public function detailById($id){

        $car = Car::findOrFail($id);
        return $car;
    }
}
