'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
interface PokeType {
    name: string;
    url: string;
    id: string;
    img: string;
}

const Client = () => {
    const [pokeList, setPokeList] = useState<PokeType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const offset = (currentPage - 1) * 50;
        const url = `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`;

        fetch(url)
            .then((r) => r.json())
            .then((data) => {
                const pokemon = data.results.map((p: PokeType) => {
                    return {
                        name: p.name,
                        id: p.url.split('/').pop(),
                        url: p.url,
                    };
                });
                setPokeList(pokemon)
                setTotalPages(Math.ceil(data.count / 50));
            });
    }, [currentPage]);

    return (
        <div>
            <h1 className="text-3xl text-center text-yellow-500 border-solid border-b-2 border-yellow-500">
                POKEMON LIST
            </h1>
            <ul>
                {pokeList.map((p) => (
                    <li key={p.id} className="text-center border-solid border-b-2 border-white py-4 ">
                        {p.name}
                        <img src={p.img} alt='' />
                        <Link href={`client/details/${p.id}`} className="border-solid border-blue-300 border-2 rounded py-1 px-3">Details</Link>
                    </li>
                ))}
            </ul>
            <div className="flex flex-row gap-16 justify-end mr-16 mt-12">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Précédent</button>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Suivant</button>
            </div>
        </div>
    );
}

export default Client;
