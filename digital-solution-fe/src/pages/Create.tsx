import axios from "axios";
import { useState } from "react";

import { useForm } from "@mantine/form";
import { TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export default function Create() {
	const [isSubmitting, setSubmitting] = useState(false);
	const navigate = useNavigate();

	const form = useForm({
		initialValues: {
			merek: "",
			jenis: "",
			stock: 0,
			harga: 0,
			keterangan: "",
		},

		validate: {
			merek: (value) => (value === "" ? "Harus diisi" : null),
			jenis: (value) => (value === "" ? "Harus diisi" : null),
			keterangan: (value) => (value === "" ? "Harus diisi" : null),
			stock: (value) => (value < 0 ? "Harus lebih dari 0" : null),
			harga: (value) => (value < 0 ? "Harus lebih dari 0" : null),
		},
	});

	const onSubmit = async (values: typeof form.values) => {
		try {
            setSubmitting(true);
			await axios.post("http://localhost:8000/api/cars/create", values);

			notifications.show({
				title: "Notification",
				message: "Car data has been created successfully",
			});
			navigate("/", { replace: true });
		} catch (error) {
			console.error(error);
		} finally {
            setSubmitting(false);
        }
	};

	return (
		<main className="poppins flex flex-col w-screen px-8 py-4 gap-4">
			<h1 className="text-xl font-bold">Buat Data Mobil</h1>

			<form
				onSubmit={form.onSubmit((values) => onSubmit(values))}
				className="max-w-screen-lg w-full flex flex-col border rounded-lg p-4 bg-gray-50"
			>
				<TextInput
					withAsterisk
					label="Merek Produk"
					placeholder="Toyota"
					{...form.getInputProps("merek")}
				/>

				<TextInput
					withAsterisk
					label="Jenis Produk"
					placeholder="Vios"
					{...form.getInputProps("jenis")}
				/>

				<TextInput
					withAsterisk
					label="Jumlah Stock"
					type="number"
					min="0"
					placeholder=""
					{...form.getInputProps("stock")}
				/>

				<TextInput
					withAsterisk
					label="Harga Produk"
					type="number"
					min="0"
					placeholder=""
					{...form.getInputProps("harga")}
				/>

				<TextInput
					label="Keterangan"
					placeholder="Sedan (2013)"
					{...form.getInputProps("keterangan")}
				/>

				<button
					disabled={isSubmitting}
					type="submit"
					className="px-3 py-2 bg-green-600 text-white rounded-md self-center mt-8"
				>
					{isSubmitting ? "Loading..." : "Submit"}
				</button>
			</form>
		</main>
	);
}
