import { TCreateClassSchema } from "@/lib/types";
import { FieldValues, useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";


export default function CreateClassForm({ setShowModal }: any) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<TCreateClassSchema>();

    const onSubmit = async (data: FieldValues) => {
        const response = await fetch('/api/classes', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const responseData = await response.json();
        if (!response.ok) {
            alert("Submitting form failed!");
            return;
        }
    
        if (responseData.success) {
            setShowModal(false);
            toast('Turma Registrada com sucesso!', {
                type: "success",
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition: Bounce,
                className: "bg-[#C9FCFF] text-black",
                progressClassName: "bg-palette-sea-green",
                icon: ({ theme, type }) => <FaCheckCircle color="#18837E" />
            });
        }
    }

    return (
        <form id="formClassCreate" onSubmit={handleSubmit(onSubmit)} className="p-8 py-4 flex flex-col justify-items-start ">
            <div>
                <div className={`w-[35%] flex flex-col mb-4 lg:mb-2`}>
                    <label className={`text-md font-semibold text-start `}>Digital Solutions</label>
                    <input {...register("turma_number")} defaultValue={0} className={`rounded h-9 text-center text-palette-sea-green p-2 border-[1px] border-palette-line`} />

                </div>
            </div>

            <div className={`w-full flex flex-col mb-4 lg:mb-2`}>
                <label className={`text-md font-semibold text-start`}>Padrinho ou Madrinha</label>
                <input {...register("responsible")}  className={`rounded h-9 p-2 border-[1px] border-palette-line`} />

            </div>

            <div className={` flex flex-col mb-4`}>
                <label className={`text-md font-semibold text-start`}>Período</label>
                <select {...register("shift")} className={`border border-palette-line bg-gray-50 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
                    <option defaultValue={true} value="NA"></option>
                    <option value="Manha">Manhã</option>
                    <option value="Tarde">Tarde</option>
                </select>
            </div>
            <div className="flex gap-8 mt-4 items-center">
                <button type="submit" className="bg-palette-sea-green px-5 py-2 rounded text-white disabled:opacity-50">
                    {isSubmitting ? 'Carregando...' : 'Adicionar'}
                </button>
                <button onClick={() => { setShowModal(false); }} className="bg-[#F4F4F4] px-5 py-3 rounded text-palette-sea-green">
                    Cancelar
                </button>
            </div>
        </form>
    );
}
