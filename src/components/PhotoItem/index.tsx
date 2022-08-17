type Props = {
    url: string;
    name: string;
    onDelete: (name: string) => void;
}

export function PhotoItem({ url, name, onDelete }: Props) {
    return (
        <div id="container" className="bg-[#3D3F43] rounded-xl p-3 m-2">
            <img className="max-w-full block mb-3 rounded-xl" src={url} alt={name} />
            {name}
            <button className="block bg-[#756DF4] text-white p-paddingone text-sm rounded-xl m-margintwo cursor-pointer hover:bg-[#574cf6]" onClick={() => onDelete(name)}>Excluir</button>
        </div>
    )
}