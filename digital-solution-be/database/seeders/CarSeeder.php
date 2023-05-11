<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        $cars = [
            [
                'merek' => 'Toyota',
                'jenis' => 'Camry',
                'stock' => 1,
                'harga' => 450000000,
                'keterangan' => "Sedan (2016)",
            ],
            [
                'merek' => 'Honda',
                'jenis' => 'CR-V',
                'stock' => 5,
                'harga' => 325000000,
                'keterangan' => "SUV (2018)",
            ],
            [
                'merek' => 'Ford',
                'jenis' => 'Ranger',
                'stock' => 2,
                'harga' => 250000000,
                'keterangan' => "Pick-up (2015)",
            ],
        ];
        
        collect($cars)->each(function ($car){
            DB::table('cars')->insert($car);
        });
    }
}
