interface TableFormatProps {
    headers: string[],
}
export default function HeaderTable ( { headers }: TableFormatProps ) {
    return (

        <thead className="bg-indigo-400/10 ">
            <tr>
            {headers.map((header) => (
                <th className="px-[0.3rem] md:px-[0.8rem] xl:px-[2rem] py-[0.5rem] text-left text-[0.6rem] md:text-[0.8rem] xl:text-[1rem]">{header}</th>
            ))}
            </tr>
        </thead>
    )
}