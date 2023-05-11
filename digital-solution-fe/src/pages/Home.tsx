import { Button, Table, TextInput } from "@mantine/core";
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { notifications } from "@mantine/notifications";

interface Car {
    id: number,
    merek: string,
    harga: number,
    jenis: string,
    keterangan: string,
    stock: number
}

export default function Home() {

    const [ cars, setCars ] = useState<Car[]>([]);
    const [ filteredCars, setFilteredCars ] = useState<Car[]>([]);
    const [ search, setSearch ] = useState("");
    const [ debouncedSearch ] = useDebouncedValue(search, 200);

    const fetchData = async () => {
        try {
            const response = await axios("http://localhost:8000/api/cars")
            const data = response.data;
            setCars(data.map((car: any) => ({
                id: car.id,
                merek: car.merek,
                harga: car.harga,
                jenis: car.jenis,
                keterangan: car.keterangan,
                stock: car.stock,
            })));
        } catch (e: any){
            console.error(e);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        //filter cars by debounced search
        setFilteredCars(cars.filter((car) => {
            return (
                car.merek.toLowerCase().includes(debouncedSearch.toLowerCase())
                // car.jenis.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                // car.keterangan.toLowerCase().includes(debouncedSearch.toLowerCase())
            )
        }))
    }, [ debouncedSearch, cars ])

    const handleDelete = async (id: number) => {
        try {
            await axios.post(`http://localhost:8000/api/cars/delete/${id}`);

            notifications.show({
                title: 'Notification',
                message: 'Car data has been deleted successfully',
            });

            fetchData()
        } catch (e: any){
            notifications.show({
                title: 'Notification',
                message: 'Can\'t delete the data',
            });
        }
    }

	return (
		<main className="poppins flex flex-col w-screen px-8 py-4 gap-4">
			<h1 className="text-xl font-bold">Data Mobil</h1>
			<div className="w-full flex justify-between items-end">
				<TextInput value={ search } onChange={ (e) => setSearch(e.target.value) } sx={{ width: "12rem" }} label="Cari Mobil" />
                
                <Link to="/create">
                    <button className="rounded-md px-3 py-2 bg-green-600 text-white text-sm">Tambah Mobil</button>
                </Link>
			</div>

			<div className="w-full max-w-screen-lg p-4 self-center rounded-lg border border-gray-300 bg-gray-50">
				<Table verticalSpacing="md" striped highlightOnHover withColumnBorders>
					<thead>
						<tr>
							<td>Merek Produk</td>
							<td>Jenis Produk</td>
							<td>Jumlah Stock</td>
							<td>Harga Produk</td>
							<td>Keterangan</td>
							<td>Aksi</td>
						</tr>
					</thead>
                    <tbody>
                        {
                            filteredCars.map((car) => (
                                <tr>
                                    <td>{ car.merek }</td>
                                    <td>{ car.jenis }</td>
                                    <td>{ car.stock }</td>
                                    <td>{ car.harga }</td>
                                    <td>{ car.keterangan }</td>
                                    <td className="flex">
                                        <Link to={`/edit/${ car.id }`}>
                                            <i className="bi bi-pencil-square text-orange-700" />
                                        </Link>

                                        <button onClick={ () => handleDelete(car.id) }>
                                            <i className="bi bi-trash text-red-500" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
				</Table>
			</div>
		</main>
	);
}
