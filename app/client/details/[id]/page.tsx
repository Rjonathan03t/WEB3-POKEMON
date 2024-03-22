'use client'
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface details {
    image: string;
    name: string;
    height: string;
    weight: number;
    type: number;
    number: string;
}

export default function Details() {
    const pathName = usePathname();
    const id = pathName ? pathName.split("/").pop() : null;
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((response) => response.json())
            .then((data) => console.log)
    }, []);

    return (
        <div>

        </div>
    );
}